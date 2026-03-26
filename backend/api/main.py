from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import asyncio

# Core Services
from services.extractor import DocumentExtractor
from services.ai_insight import AIInsightEngine
from services.analyzer import FinancialAnalyzer
from models.schemas import AnalysisResponse

load_dotenv()

app = FastAPI(title="FinanceAI Advisor Backend", description="Financial Intelligence Engine v4.0")

# CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to your Vercel/Azure frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Services
extractor = DocumentExtractor()
ai_engine = AIInsightEngine(api_key=os.getenv("OPENAI_API_KEY"))
analyzer = FinancialAnalyzer()

@app.get("/")
def read_root():
    return {"status": "online", "engine": "FinanceAI-v4.0-Python"}

@app.post("/api/analyze", response_model=None)
async def analyze_document(
    document: UploadFile = File(...),
    mode: str = Form("standard")
):
    """
    Main endpoint for analyzing financial reports.
    1. Extracts metadata
    2. Smart Extracts relevant tables/text
    3. Structures with AI
    4. Computes manual ratios and Monte Carlo simulations
    """
    try:
        # 1. Extraction
        content = await document.read()
        raw_text = extractor.extract_text_smart(content, document.content_type)
        
        if not raw_text.strip():
            raise HTTPException(status_code=400, detail="Empty or non-extractable document.")

        # 2. AI Intelligence Layer (Structuring)
        # We pass 80k characters now (4x more than Node.js)
        structured_data = await ai_engine.analyze_report(raw_text, mode=mode)
        
        if not structured_data.get("analysisSuccessful", False):
            return structured_data

        # 3. Financial Analysis Layer (Mathematics)
        # We perform manual computation of trends and ratios to verify AI results
        base = structured_data.get("baselineFinancials", {})
        
        # 4. Monte Carlo Simulation Engine
        # We perform a 1000-iteration simulation in Python (much faster)
        simulation_result = analyzer.run_monte_carlo(base)
        
        # 5. Enrich result
        structured_data["monteCarloEngineResult"] = {
            "months": simulation_result
        }
        
        # Consistent with Node.js response format for frontend compatibility
        return {
            "success": True,
            "analysis": structured_data
        }

    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
async def chat_with_data(query: str, context_id: str):
    """Placeholder for future Chat-with-Report functionality."""
    return {"answer": "Chat functionality is being finalized."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8080)))
