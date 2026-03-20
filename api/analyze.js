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
                    3. Source-page referencing is REQUIRED for EVERY metric (e.g., "Page 32").
                    4. Calculate Segment-Level ROIC using: Net Income / Capital Employed.
                    5. Compute RADS (Risk-Adjusted Decision Score) by weighting: Revenue Growth, Segment ROIC, EBITDA Margin, Debt-to-Equity, and FX Exposure.
                    6. Include a "currencySensitivity" matrix for ±5% FX shifts.
                    
                    Return ONLY a JSON object:
                    {
                        "analysisSuccessful": true/false,
                        "summary": "Full overview (Found)",
                        "reportingMetadata": {
                            "originalCurrency": "Detected", "units": "Reported", "sourceDocument": "Title"
                        },
                        "keyMetrics": [
                            {"name": "Metric", "value": "Found", "source": "Page X", "status": "Healthy/Risk"}
                        ],
                        "deepSegments": [
                            {"division": "Name", "revenue": "Value", "roic": "Calculated %", "ebitdaMargin": "Value", "roicFormula": "NI/CE", "source":"Page X"}
                        ],
                        "comparativeInsights": {
                            "strongestUnit": "Name", "weakestUnit": "Name", "groupAlpha": "Value"
                        },
                        "fxSensitivity": {
                            "impactOnEbitda": "-2.1% (per 5% FX shift)",
                            "exposedSegments": ["Pharma", "APAC Supply"],
                            "riskLevel": "High/Medium/Low"
                        },
                        "baselineFinancials": {
                            "monthlyRevenue": 0, "monthlyOperatingExpenses": 0, "currentCashReserves": 0, "totalDebt": 0
                        },
                        "decisionIntelligence": {
                            "overallScore": 0-100,
                            "recommendations": [
                                {"strategy": "Actionable Step", "impact": "Quantitative % Lift", "confidence": 0.0-1.0}
                            ]
                        },
                        "anomalyIntelligence": {
                            "alerts": [
                                {"type": "Margin Drop/Debt Spike", "severity": "Low/Med/High", "correction": "Audit Step"}
                            ]
                        },
                        "monteCarlo": {
                            "bestCaseRevenueGrowth": 1.0, 
                            "worstCaseRevenueGrowth": 1.0, 
                            "volatilityIndex": 0.0
                        },
                        "waterfallData": [
                            {"label": "Metric", "value": 0}
                        ],
                        "sentiment": "Neutural",
                        "conclusion": "Board Summary"
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
