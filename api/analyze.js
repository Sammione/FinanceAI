const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');

const xlsx = require('xlsx');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/analyze', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        let extractedText = '';

        // Handle File Types
        if (req.file.mimetype === 'application/pdf') {
            const data = await pdf(req.file.buffer);
            extractedText = data.text;
        } else if (req.file.mimetype === 'text/plain') {
            extractedText = req.file.buffer.toString('utf-8');
        } else if (req.file.mimetype === 'text/csv' || 
                   req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                   req.file.mimetype === 'application/vnd.ms-excel') {
            
            // Tabular Data Handling with XLSX
            const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            extractedText = xlsx.utils.sheet_to_csv(worksheet);
        } else if (req.file.mimetype === 'application/xml' || req.file.mimetype === 'text/xml' || req.file.originalname.endsWith('.xbrl')) {
            // XBRL / XML Parsing
            extractedText = req.file.buffer.toString('utf-8');
        } else {
            return res.status(400).json({ error: 'Unsupported file type. Please upload a PDF, TXT, CSV, EXCEL, or XBRL file.' });
        }

        if (!extractedText.trim()) {
            return res.status(400).json({ error: 'Could not extract text from document.' });
        }

        // Limit the text to avoid token limits for basic testing
        const maxLength = 12000;
        const truncatedText = extractedText.length > maxLength 
            ? extractedText.substring(0, maxLength) 
            : extractedText;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are a precision-focused financial analyst AI. Extract data from the provided text into a JSON format.
                    
                    STRICT RULES:
                    1. ONLY extract data explicitly present in the document.
                    2. DO NOT hallucinate, guess, or estimate numbers if they are not found.
                    3. If no significant numerical financial data (Revenue, Profit, EBITDA) is found, set "analysisSuccessful": false.
                    4. Set "analysisSuccessful": true ONLY if valid numerical data is extracted.
                    
                    Return ONLY a JSON object:
                    {
                        "analysisSuccessful": true/false,
                        "summary": "Overview found in text (or 'No data found')",
                        "reportingMetadata": {
                            "originalCurrency": "Detected", "units": "Reported", "sourceDocument": "Title"
                        },
                        "keyMetrics": [{"name": "Metric", "value": "Found Value", "source": "Page X", "status": "Found Status"}],
                        "deepSegments": [{"division": "Name", "revenue": "Value", "roic": "Value", "status": "Value", "source": "Value"}],
                        "comparativeInsights": {"strongestUnit": "Name", "weakestUnit": "Name"},
                        "baselineFinancials": {
                            "monthlyRevenue": 0, "monthlyOperatingExpenses": 0, "currentCashReserves": 0, "totalDebt": 0
                        },
                        "decisionIntelligence": {
                            "overallScore": 0, "recommendations": [{"strategy": "Found", "impact": "Found"}]
                        },
                        "anomalyIntelligence": {"alerts": []},
                        "monteCarlo": {"bestCaseRevenueGrowth": 1.0, "worstCaseRevenueGrowth": 1.0, "volatilityIndex": 0.0},
                        "waterfallData": [],
                        "sentiment": "Neutural",
                        "conclusion": "Conclusion"
                    }`
                },
                {
                    role: "user",
                    content: `Analyze this institutional text: ${truncatedText}`
                }
            ],
            response_format: { type: "json_object" }
        });

        const analysisResult = JSON.parse(response.choices[0].message.content);
        
        res.json({ success: true, analysis: analysisResult });
    } catch (error) {
        console.error('Error analyzing document:', error);
        res.status(500).json({ error: `Analysis failed: ${error.message}`, details: error.stack });
    }
});

// Removed the .listen for Vercel Serverless environment
module.exports = app;
