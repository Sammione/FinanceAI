from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class ReportingMetadata(BaseModel):
    originalCurrency: str = "Detected"
    units: str = "Reported"
    sourceDocument: str = "Title"

class KPI(BaseModel):
    name: str
    value: str
    description: str

class ProfitabilityAnalysis(BaseModel):
    grossMargin: str = "N/A"
    operatingMargin: str = "N/A"
    netMargin: str = "N/A"
    roi: str = "N/A"
    roce: str = "N/A"

class Segment(BaseModel):
    name: str
    revenue: str
    profit: str
    roic: str
    context: str

class Risk(BaseModel):
    type: str
    finding: str
    severity: int

class RiskAssessment(BaseModel):
    riskLevel: str
    keyRisks: List[Risk]

class BaselineFinancials(BaseModel):
    monthlyRevenue: float = 0
    monthlyOperatingExpenses: float = 0
    currentCashReserves: float = 0
    totalDebt: float = 0

class Recommendation(BaseModel):
    action: str
    expectedImpact: str
    priority: str

class AnalysisResponse(BaseModel):
    analysisSuccessful: bool = True
    businessOverview: str
    reportingMetadata: ReportingMetadata
    keyPerformanceIndicators: List[KPI]
    profitabilityAnalysis: ProfitabilityAnalysis
    segmentBreakdown: List[Segment]
    riskAssessment: RiskAssessment
    baselineFinancials: BaselineFinancials
    strategicRecommendations: List[Recommendation]
    sentiment: str
    monteCarloEngineResult: Optional[Dict] = None
