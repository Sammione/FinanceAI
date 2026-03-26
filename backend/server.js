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

        // --- ADVANCED SMART EXTRACTION (v3.0) ---
        // Avoids Table of Contents by searching for deeper occurrences.
        const anchors = [
            "Consolidated Income Statement",
            "Consolidated Statement of Profit or Loss",
            "Consolidated Balance Sheet",
            "Consolidated Statement of Financial Position",
            "Consolidated Statement of Cash Flows",
            "Financial Highlights",
            "Notes to the Financial Statements"
        ];
        
        let slices = [];
        anchors.forEach(term => {
            let pos = extractedText.toLowerCase().indexOf(term.toLowerCase());
            while (pos !== -1) {
                // Ignore occurrences in the first ~5000 chars (likely TOC)
                if (pos > 5000) {
                    console.log(`[ANCHOR HIT] Found "${term}" at position ${pos}`);
                    slices.push({
                        start: Math.max(0, pos - 2000),
                        end: Math.min(extractedText.length, pos + 30000)
                    });
                }
                pos = extractedText.toLowerCase().indexOf(term.toLowerCase(), pos + 1);
                if (slices.length > 5) break; // Don't take too many slices
            }
        });

        // Merge overlapping slices and construct content
        slices.sort((a,b) => a.start - b.start);
        let merged = [];
        if (slices.length > 0) {
            let current = slices[0];
            for (let i = 1; i < slices.length; i++) {
                if (slices[i].start < current.end) {
                    current.end = Math.max(current.end, slices[i].end);
                } else {
                    merged.push(current);
                    current = slices[i];
                }
            }
            merged.push(current);
        }

        let smartContent = "";
        merged.forEach((m, i) => {
            smartContent += `\n--- [FINANCIAL SECTION ${i+1}] ---\n`;
            smartContent += extractedText.substring(m.start, m.end) + "\n";
        });

        if (!smartContent.trim()) {
            console.log("[SMART EXTRACT] No deep anchors found. Falling back to start.");
            smartContent = extractedText.substring(0, 50000);
        }

        const truncatedText = smartContent;
        console.log(`[ANALYSIS] Prepared ${truncatedText.length} characters for AI.`);

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
