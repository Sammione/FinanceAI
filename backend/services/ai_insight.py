from openai import OpenAI
import os
import json
from typing import Dict, Any

class AIInsightEngine:
    def __init__(self, api_key: str):
        self.client = OpenAI(api_key=api_key)

    async def analyze_report(self, raw_text: str, mode: str = "standard") -> Dict[str, Any]:
        """
        Sends the extracted text to GPT-4o with a highly structured prompt.
        Focuses on 'Expert Financial Analysis' for accountants and business consultants.
        """
        # Ensure we don't exceed token limits, though GPT-4o has 128k
        truncated_text = raw_text[:80000] # Take 80k chars (about 20k tokens)
        
        system_prompt = f"""
        You are a CFO-level Financial Analyst. Extract and analyze data into a clean JSON format.
        
        STRICT DATA RULES:
        1. MAGNITUDE: Large reports (Nestle, Shell, etc.) use Millions (M) or Billions (B). Normalize all values to ABSOLUTE numbers (e.g., 10.5B -> 10500000000).
        2. NO HALLUCINATION: If a metric is missing, return 'N/A' or 0 for numbers.
        3. RATIOS: Calculate ROI, ROCE, and Margins if raw data is found but ratio is missing.
        4. BUSINESS MODE: {mode.upper()} (Executive, Audit, Risk, or Forecast).
        
        Return ONLY a JSON object:
        {{
            "analysisSuccessful": true,
            "businessOverview": "Concise CFO-level summary",
            "reportingMetadata": {{
                "originalCurrency": "Detected", "units": "Reported Units", "sourceDocument": "Title"
            }},
            "keyPerformanceIndicators": [
                {{"name": "Metric", "value": "Number + %/$", "description": "Business meaning"}}
            ],
            "profitabilityAnalysis": {{
                "grossMargin": "XX%", "operatingMargin": "XX%", "netMargin": "XX%", "roi": "XX%", "roce": "XX%"
            }},
            "segmentBreakdown": [
                {{"name": "Division", "revenue": "Value", "profit": "Value", "roic": "Value", "context": "Insight"}}
            ],
            "riskAssessment": {{
                "riskLevel": "Low/Medium/High",
                "keyRisks": [{{"type": "Category", "finding": "Description", "severity": 1-10}}]
            }},
            "baselineFinancials": {{
                "monthlyRevenue": 0, "monthlyOperatingExpenses": 0, "currentCashReserves": 0, "totalDebt": 0
            }},
            "strategicRecommendations": [
                {{"action": "Specific step", "expectedImpact": "measurable outcome", "priority": "High/Med/Low"}}
            ],
            "sentiment": "Positive/Neutral/Negative Outlook"
        }}
        """

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Analyze this financial context: {truncated_text}"}
            ],
            response_format={"type": "json_object"}
        )

        return json.loads(response.choices[0].message.content)

    async def chat_with_data(self, query: str, context: Dict) -> str:
        """
        Allows users to ask follow-up questions about the specific company data.
        """
        prompt = f"Using this data: {json.dumps(context)}, answer: {query}"
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a professional financial advisor. Be concise and accurate."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
