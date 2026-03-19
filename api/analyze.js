const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');

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

        // Handle PDF files
        if (req.file.mimetype === 'application/pdf') {
            const data = await pdf(req.file.buffer);
            extractedText = data.text;
        } else if (req.file.mimetype === 'text/plain') {
            extractedText = req.file.buffer.toString('utf-8');
        } else {
            return res.status(400).json({ error: 'Unsupported file type. Please upload a PDF or TXT file.' });
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
            model: "gpt-4o", // Safe robust option with full chat and JSON support
            messages: [
                {
                    role: "system",
                    content: `You are an expert financial analyst AI. Analyze the uploaded financial document and extract insights into a structured JSON format. 
                    
                    CRITICAL INSTRUCTION: You MUST extract or intelligently estimate "baselineFinancials" (as integers in USD) based on the context, size, and scale of the company (even if you have to guess realistic baseline numbers so our interactive stress-tester UI works).
                    
                    Return ONLY a JSON object with this exact structure:
                    {
                        "summary": "A brief overview of the document",
                        "keyMetrics": [
                            {"name": "Revenue", "value": "$0.00B"},
                            {"name": "Net Income/Loss", "value": "$0.00M"},
                            {"name": "EBITDA", "value": "$0.00M"},
                            {"name": "Operating Margin", "value": "0.0%"},
                            {"name": "Debt-to-Equity", "value": "0.00"}
                        ],
                        "risks": ["Risk 1", "Risk 2"],
                        "opportunities": ["Opportunity 1", "Opportunity 2"],
                        "sentiment": "Positive/Neutral/Negative",
                        "baselineFinancials": {
                            "monthlyRevenue": 5000000, 
                            "monthlyOperatingExpenses": 4000000,
                            "currentCashReserves": 15000000,
                            "totalDebt": 5000000
                        },
                        "marketBenchmark": "Above/Below Industry Average",
                        "peerBenchmarking": [
                            {"peerName": "Competitor 1", "revenue": "$20B", "margin": "12%", "status": "Underperforming"},
                            {"peerName": "Competitor 2", "revenue": "$15B", "margin": "18%", "status": "Strong Rival"}
                        ],
                        "explainability": {
                            "formulasUsed": ["ROE = Net Income / Equity", "EBITDA Margin = EBITDA / Revenue"],
                            "reasoning": "Detailed logic for the numbers extracted"
                        },
                        "anomalyDetection": {
                            "riskScore": 85,
                            "findings": ["Inconsistent inventory turns vs revenue growth", "High debt-to-equity spike vs industry peer Danone"]
                        },
                        "decisionIntelligence": {
                            "overallScore": 72,
                            "recommendations": [
                                {"strategy": "Cost Optimization", "impact": "High", "confidence": 0.9},
                                {"strategy": "Debt Refinancing", "impact": "Medium", "confidence": 0.85}
                            ],
                            "executiveSummaryDraft": "Targeted brief for the Board of Directors"
                        },
                        "monteCarlo": {
                            "bestCaseRevenueGrowth": 1.08,
                            "worstCaseRevenueGrowth": 0.92,
                            "volatilityIndex": 0.15
                        },
                        "conclusion": "Final thoughts"
                    }`
                },
                {
                    role: "user",
                    content: `Here is the financial document text to analyze:\n\n${truncatedText}`
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
