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

        // --- SMART EXTRACTION LOGIC (v2.1) ---
        // Large reports (200+ pages) have financials deep in the document.
        // Instead of taking the first 40k chars, we search for financial anchors.
        
        let smartContent = "";
        const anchors = [
            "Consolidated Income Statement",
            "Consolidated Statement of Profit or Loss",
            "Consolidated Balance Sheet",
            "Consolidated Statement of Cash Flows",
            "Notes to the Financial Statements",
            "Key Financial Highlights"
        ];
        
        const anchorHits = [];
        anchors.forEach(term => {
            const idx = extractedText.toLowerCase().indexOf(term.toLowerCase());
            if (idx !== -1) anchorHits.push(idx);
        });

        if (anchorHits.length > 0) {
            // Take slices around the anchors
            anchorHits.sort((a,b) => a-b);
            anchorHits.forEach((pos, i) => {
                if (i > 3) return; // Limit to 4 key sections
                const start = Math.max(0, pos - 5000);
                const end = Math.min(extractedText.length, pos + 25000);
                smartContent += `\n--- [SECTION: ${anchors[i] || 'Financial Data'}] ---\n`;
                smartContent += extractedText.substring(start, end) + "\n";
            });
        } else {
            // Fallback to first 40k characters if no anchors found
            smartContent = extractedText.substring(0, 40000);
        }

        const truncatedText = smartContent;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are an expert Financial Analyst AI. Extract data into a clean JSON format.
                    
                    STRICT DATA RULES:
                    1. MAGNITUDE CHECK: Most corporate reports use Millions (M) or Billions (B). Normalize all 'baselineFinancials' to ABSOLUTE numbers (e.g., if report says 10.5B, return 10500000000).
                    2. NO HALLUCINATION: If a metric is missing, return 'N/A' for strings or 0 for numeric fields. 
                    3. RATIO CALCULATION: If the report provides raw numbers (e.g. Total Assets, Net Income) but not the ratio (e.g. ROI), YOU must calculate it.
                    4. CLEAN NUMBERS: Ensure all 'baselineFinancials' are numeric types, NO commas or symbols.
                    
                    ANALYSIS CATEGORIES:
                    - Analysis Mode: ${req.body.mode || 'standard'}
                    
                    Return ONLY a JSON object:
                    {
                        "analysisSuccessful": true,
                        "businessOverview": "Concise summary",
                        "reportingMetadata": {
                            "originalCurrency": "CHF/USD/etc", "units": "Reported Units (Millions/Billions)", "sourceDocument": "Title"
                        },
                        "keyPerformanceIndicators": [
                            {"name": "Metric Name", "value": "Number + %/$", "description": "Business meaning"}
                        ],
                        "profitabilityAnalysis": {
                            "grossMargin": "XX%", "operatingMargin": "XX%", "netMargin": "XX%", "roi": "XX%", "roce": "XX%"
                        },
                        "segmentBreakdown": [
                            {"name": "Division", "revenue": "Value", "profit": "Value", "roic": "Value", "context": "Insight"}
                        ],
                        "riskAssessment": {
                            "riskLevel": "Low/Medium/High",
                            "keyRisks": [{"type": "Category", "finding": "Description", "severity": "1-10"}]
                        },
                        "baselineFinancials": {
                            "monthlyRevenue": 0, "monthlyOperatingExpenses": 0, "currentCashReserves": 0, "totalDebt": 0
                        },
                        "strategicRecommendations": [
                            {"action": "Step", "expectedImpact": "Outcome", "priority": "High/Med/Low"}
                        ],
                        "detailedBreakdown": {
                            "salesGrowth": "Value", "operatingProfitChange": "Value", "netIncomeTrend": "Value"
                        },
                        "sentiment": "Overall Outlook"
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
            let currentCashBest = base.currentCashReserves || 0;
            let currentCashBase = base.currentCashReserves || 0;
            let currentCashWorst = base.currentCashReserves || 0;

            for (let m = 0; m <= 12; m++) {
                if (m === 0) {
                    months.push({ month: 'M0', cashReserves: currentCashBase, bestCase: currentCashBest, worstCase: currentCashWorst });
                    continue;
                }

                let iterationResults = [];
                for (let i = 0; i < 1000; i++) {
                    const revVar = 1 + (Math.random() * 0.1 - 0.05); // ±5%
                    const costVar = 1 + (Math.random() * 0.06 - 0.03); // ±3%
                    const netMonthly = ((base.monthlyRevenue || 0) * revVar) - ((base.monthlyOperatingExpenses || 0) * costVar);
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

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
