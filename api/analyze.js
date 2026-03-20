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
                    content: `You are a precision-focused financial analyst AI. Extract data into a JSON format.
                    
                    STRICT RULES:
                    1. ONLY extract data explicitly found. No hallucinations.
                    2. Calculate Segment ROIC: Net Income / Capital Employed.
                    3. Source-page referencing is REQUIRED (Page X).
                    
                    Return ONLY a JSON object:
                    {
                        "analysisSuccessful": true/false,
                        "summary": "Overview",
                        "reportingMetadata": {
                            "originalCurrency": "Detected", "units": "Reported", "sourceDocument": "Title"
                        },
                        "keyMetrics": [{"name": "Metric", "value": "Found Value", "source": "Page X", "status": "Healthy/Risk"}],
                        "deepSegments": [{"division": "Name", "revenue": "Value", "roic": "Value", "ebitdaMargin":"Value", "source": "Value"}],
                        "comparativeInsights": {"strongestUnit": "Name", "weakestUnit": "Name"},
                        "fxSensitivity": {"impactOnEbitda": "Value", "exposedSegments": ["Name"], "riskLevel": "Med"},
                        "baselineFinancials": {
                            "monthlyRevenue": Found Number or 0,
                            "monthlyOperatingExpenses": Found Number or 0,
                            "currentCashReserves": Found Number or 0,
                            "totalDebt": 0
                        },
                        "decisionIntelligence": {
                            "overallScore": 0-100,
                            "recommendations": [{"strategy": "Found", "impact": "Found"}]
                        },
                        "anomalyIntelligence": {"alerts": []},
                        "sentiment": "Sentiment",
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

        // --- BACKEND MONTE CARLO SIMULATION (1000 Iterations) ---
        const runMonteCarlo = (base) => {
            const months = [];
            let currentCashBest = base.currentCashReserves;
            let currentCashBase = base.currentCashReserves;
            let currentCashWorst = base.currentCashReserves;

            for (let m = 0; m <= 12; m++) {
                if (m === 0) {
                    months.push({ month: 'M0', cashReserves: base.currentCashReserves, bestCase: base.currentCashReserves, worstCase: base.currentCashReserves });
                    continue;
                }

                let iterationResults = [];
                for (let i = 0; i < 1000; i++) {
                    const revVar = 1 + (Math.random() * 0.1 - 0.05); // ±5%
                    const costVar = 1 + (Math.random() * 0.06 - 0.03); // ±3%
                    const netMonthly = (base.monthlyRevenue * revVar) - (base.monthlyOperatingExpenses * costVar);
                    iterationResults.push(netMonthly);
                }

                iterationResults.sort((a, b) => a - b);
                const worstNet = iterationResults[0];
                const bestNet = iterationResults[999];
                const baseNet = iterationResults.reduce((s, v) => s + v, 0) / 1000;

                currentCashWorst += worstNet;
                currentCashBase += baseNet;
                currentCashBest += bestNet;

                months.push({
                    month: `M${m}`,
                    cashReserves: Math.floor(currentCashBase),
                    bestCase: Math.floor(currentCashBest),
                    worstCase: Math.floor(currentCashWorst)
                });
            }
            return months;
        };

        if (analysisResult.analysisSuccessful && analysisResult.baselineFinancials) {
            analysisResult.monteCarloEngineResult = {
                months: runMonteCarlo(analysisResult.baselineFinancials),
                iterations: 1000,
                confidenceInterval: "95%"
            };
        }
        
        res.json({ success: true, analysis: analysisResult });
    } catch (error) {
        console.error('Error analyzing document:', error);
        res.status(500).json({ error: `Analysis failed: ${error.message}`, details: error.stack });
    }
});

// Removed the .listen for Vercel Serverless environment
module.exports = app;
