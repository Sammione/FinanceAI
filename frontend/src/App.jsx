import { useState, useRef, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Line, Legend, Cell, PieChart, Pie } from 'recharts';
import { Activity, BarChart3, TrendingUp, AlertTriangle, Briefcase, ChevronRight, FileText, Upload, RefreshCw, Layers, ShieldCheck, MessageSquare, Target, Zap, AlertCircle, Database, GitBranch, PieChart as PieIcon, TrendingDown } from 'lucide-react';

// STABLE COMPONENTS
const Header = ({ onHome, onAnalyze }) => (
  <nav className="enterprise-nav">
    <div className="nav-logo" onClick={onHome}>
      <div className="logo-badge">EXECUTIVE</div>
      <span>FinanceAI CFO</span>
    </div>
    <div className="nav-actions">
       <button onClick={onHome}>Risk Center</button>
       <button onClick={onAnalyze}>Filing Input</button>
       <button className="demo-btn">Live Data Feed <div className="pulse-dot"></div></button>
    </div>
  </nav>
);

const AnalysisLoader = () => (
  <div className="enterprise-loader">
     <div className="spinner-orbit">
       <div className="dot"></div>
     </div>
     <h2>Initializing Enterprise Intelligence Layer v4.0</h2>
     <p>Running LSTM-BiLSTM Revenue Forecasts | Monte Carlo Risk Banding | Fraud ISO-Forest Scans...</p>
  </div>
);

const DecisionTreeUI = ({ data }) => (
  <div className="decision-tree-container">
    <h3><GitBranch size={16}/> Strategic Decision Paths</h3>
    <div className="tree-root">{data?.root || "Main Strategic Objective"}</div>
    <div className="tree-nodes">
       {data?.nodes?.map((node, i) => (
         <div key={i} className="tree-node">
            <div className="node-line"></div>
            <div className="node-content">
               <div className="node-path">{node.path}</div>
               <div className="node-outcome">{node.outcome}</div>
               <div className="node-rads">RADS: {node.rads}</div>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const AnomalyHeatmap = ({ alerts }) => (
  <div className="anomaly-heatmap">
     <h3><AlertTriangle size={16}/> Intelligence Alerts</h3>
     {alerts?.map((a, i) => (
        <div key={i} className={`alert-box severity-${Math.min(9, Math.floor(a.severity/2))}`}>
           <div className="alert-top">
              <span className="alert-type">{a.type}</span>
              <span className="alert-sev">Lv.{a.severity}</span>
           </div>
           <p className="alert-loc">Location: {a.location}</p>
           <p className="alert-correction"><strong>Correction:</strong> {a.correction}</p>
        </div>
     ))}
  </div>
);

const PrescriptiveMatrix = ({ strategies }) => (
  <div className="prescriptive-matrix">
     <h3><Zap size={16}/> Prescriptive Strategies (Actionable)</h3>
     <div className="strategy-grid">
       {strategies?.map((s, i) => (
         <div key={i} className="strategy-card">
            <div className="s-status" style={{color: s.riskLevel?.includes('Low') ? 'var(--success)' : 'var(--warning)'}}>• {s.riskLevel} Risk</div>
            <h4>{s.action}</h4>
            <div className="s-impl">
               {s.implementation?.map((step, idx) => <div key={idx} className="s-step">{idx+1}. {step}</div>)}
            </div>
            <div className="s-outcome">Expected: <span>{s.outcome}</span></div>
         </div>
       ))}
     </div>
  </div>
);

const ResultsDashboard = ({ results, onReset, interestRateShock, setInterestRateShock, costShock, setCostShock, demandShock, setDemandShock, chartData, runwayMonths }) => {
  return (
    <div className="enterprise-dashboard">
      <div className="dashboard-header">
         <div className="h-left">
            <span>COMMAND CENTER / {results?.sentiment} / ALPHA: {results?.decisionIntelligence?.overallScore}%</span>
            <h2>Strategic Execution Report</h2>
         </div>
         <button className="reset-btn" onClick={onReset}><RefreshCw size={14}/> Reset Input</button>
      </div>

      <div className="dash-grid">
        {/* LEFT COLUMN: Deep Analysis */}
        <div className="dash-col-1">
           <div className="result-card scorecard-compact">
              {results?.keyMetrics?.map((m, i) => (
                <div key={i} className="compact-metric">
                  <div className="c-label">{m.name}</div>
                  <div className="c-val">{m.value}</div>
                </div>
              ))}
           </div>

           <DecisionTreeUI data={results?.decisionTree} />
           <AnomalyHeatmap alerts={results?.anomalyIntelligence?.alerts} />
        </div>

        {/* MIDDLE COLUMN: Visualization & Forecast */}
        <div className="dash-col-2">
            <div className="result-card chart-card">
                <div className="chart-header">
                    <div>
                        <h3>Probabilistic Monte Carlo Forecast</h3>
                        <p>Confidence Bands: Base / LSTM Optimistic / ARIMA Conservative</p>
                    </div>
                    <div className="runway-enterprise">
                       <span>Survival</span>
                       <div className={runwayMonths.includes('>') ? 'success' : 'danger'}>{runwayMonths}</div>
                    </div>
                </div>
                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData}>
                           <defs>
                              <linearGradient id="bandColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                           <XAxis dataKey="month" stroke="#94a3b8" />
                           <YAxis stroke="#94a3b8" hide />
                           <Tooltip contentStyle={{backgroundColor: '#020617', border: '1px solid #334155'}} />
                           <Area type="monotone" dataKey="bestCase" stroke="#10b981" fillOpacity={1} fill="none" strokeDasharray="5 5" />
                           <Area type="monotone" dataKey="worstCase" stroke="#ef4444" fillOpacity={1} fill="none" strokeDasharray="5 5" />
                           <Area type="monotone" dataKey="cashReserves" stroke="#3b82f6" fillOpacity={1} fill="url(#bandColor)" strokeWidth={4} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="sim-controls">
                    <div className="sim-field">
                       <label>Rate Shock (%)</label>
                       <input type="range" min="0" max="10" value={interestRateShock} onChange={(e)=>setInterestRateShock(parseFloat(e.target.value))} />
                    </div>
                    <div className="sim-field">
                       <label>Input Costs (%)</label>
                       <input type="range" min="0" max="50" value={costShock} onChange={(e)=>setCostShock(parseFloat(e.target.value))} />
                    </div>
                    <div className="sim-field">
                       <label>Market Demand (%)</label>
                       <input type="range" min="0" max="50" value={demandShock} onChange={(e)=>setDemandShock(parseFloat(e.target.value))} />
                    </div>
                </div>
            </div>

            <PrescriptiveMatrix strategies={results?.prescriptiveStrategy} />
        </div>

        {/* RIGHT COLUMN: Real-Time & Segments */}
        <div className="dash-col-3">
            <div className="result-card rt-data">
               <h3><Database size={14}/> Real-World Benchmarks</h3>
               <div className="rt-grid">
                  <div className="rt-item"><span>SPY Index</span> <span className="up">+1.2%</span></div>
                  <div className="rt-item"><span>WACC (Sector)</span> <span className="neutral">8.2%</span></div>
                  <div className="rt-item"><span>USD/EUR</span> <span className="down">-0.4%</span></div>
               </div>
            </div>

            <div className="result-card segment-card">
               <h3><PieIcon size={14}/> Segment Performance</h3>
               {results?.segmentAnalysis?.map((s, i) => (
                 <div key={i} className="segment-item">
                    <div className="s-top"><span>{s.unit}</span> <span>{s.profit}</span></div>
                    <div className="s-bar-bg"><div className="s-bar-fill" style={{width: '70%'}}></div></div>
                    <div className="s-bottom">{s.trend} | {s.opportunity}</div>
                 </div>
               ))}
            </div>

            <div className="result-card cfo-chat-compact">
                <div className="c-head"><MessageSquare size={14} /> AI CFO Interaction</div>
                <div className="c-msgs">
                    <div className="m-sys">Analysis Complete. Your current RADS Score of {results?.decisionIntelligence?.overallScore} indicates resilience.</div>
                    <div className="m-sys">The forecast (LSTM Estimate: {results?.advancedForecasting?.lstmModelEstimate}) includes {results?.advancedForecasting?.arimaTrend}.</div>
                </div>
                <div className="c-input"><input placeholder="Ask CFO about Asia expansion..." /><button><Zap size={14}/></button></div>
            </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); 
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);

  const [interestRateShock, setInterestRateShock] = useState(0);
  const [costShock, setCostShock] = useState(0);
  const [demandShock, setDemandShock] = useState(0);

  const handleDrag = (e) => { e.preventDefault(); if (e.type === "dragenter" || e.type === "dragover") setDragActive(true); else setDragActive(false); };
  const handleDrop = (e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); };
  const handleFile = (selectedFile) => { setError(''); if (selectedFile.type !== 'application/pdf' && selectedFile.type !== 'text/plain') { setError('Use PDF/TXT.'); setFile(null); return; } setFile(selectedFile); };

  const analyzeDocument = async () => {
    if (!file) return;
    setLoading(true); setError('');
    const fd = new FormData(); fd.append('document', file);
    try {
      const resp = await fetch('/api/analyze', { method: 'POST', body: fd });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Server Error');
      if (data.success && data.analysis) { setResults(data.analysis); setCurrentPage('results'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const chartData = useMemo(() => {
    if (!results || !results.baselineFinancials) return [];
    const base = results.baselineFinancials;
    const monte = results.monteCarlo || { bestCaseRevenueGrowth: 1.05, worstCaseRevenueGrowth: 0.95 };
    const months = [];
    const rImpact = 1 - (demandShock / 100); 
    const cImpact = 1 + (costShock / 100);
    const mInterestExp = (base.totalDebt * (Math.max(0, 0.05 + (interestRateShock/100)))) / 12;
    let bCash = base.currentCashReserves, wCash = base.currentCashReserves, cCash = base.currentCashReserves;
    for (let i = 0; i <= 12; i++) {
        const curRev = base.monthlyRevenue * rImpact, curExp = base.monthlyOperatingExpenses * cImpact;
        if (i > 0) {
            cCash += (curRev - curExp - mInterestExp);
            bCash += (curRev * monte.bestCaseRevenueGrowth - curExp - mInterestExp);
            wCash += (curRev * monte.worstCaseRevenueGrowth - curExp - mInterestExp);
        }
        months.push({ month: `M${i}`, cashReserves: Math.floor(cCash), bestCase: Math.floor(bCash), worstCase: Math.floor(wCash) });
    }
    return months;
  }, [results, interestRateShock, costShock, demandShock]);

  const runwayMonths = useMemo(() => {
    if(!chartData.length) return 0;
    const bIdx = chartData.findIndex(d => d.cashReserves <= 0);
    return bIdx === -1 ? '>12M' : `${bIdx}M`;
  }, [chartData]);

  return (
    <div className="enterprise-wrapper">
      <Header onHome={() => setCurrentPage('landing')} onAnalyze={() => setCurrentPage('analyzer')} />
      
      <main className="main-content">
        {currentPage === 'landing' && (
          <div className="landing-view">
            <section className="hero-modern">
               <div className="hero-accent"></div>
               <h1 className="hero-t">THE FUTURE OF <br/><span>INSTITUTIONAL FINANCE</span></h1>
               <p className="hero-p">A Grade-A Prescriptive Intelligence Platform for Executive CFOs. LSTM Forecasting, Bi-LSTM Anomaly Detection, and Monte Carlo Stress-Testing — Unified.</p>
               <div className="hero-cta-enterprise">
                  <button onClick={() => setCurrentPage('analyzer')}>Initialize Analysis Engine</button>
                  <button className="sec-btn">Request Data Connector</button>
               </div>
            </section>
          </div>
        )}

        {currentPage === 'analyzer' && (
          <div className="analyzer-view">
             {loading ? <AnalysisLoader /> : (
                <div className="upload-container-enterprise">
                   <div className="drop-target-enterprise" 
                      onDragOver={handleDrag} onDrop={handleDrop}
                      onClick={() => inputRef.current.click()}
                    >
                      <Upload size={40} />
                      <p>{file ? file.name : "Drop Filing to Analyze"}</p>
                      <input ref={inputRef} type="file" style={{display: 'none'}} onChange={(e)=>handleFile(e.target.files[0])} />
                   </div>
                   {error && <p className="error-text">{error}</p>}
                   <button onClick={analyzeDocument} disabled={!file}>Generate Strategy Report</button>
                </div>
             )}
          </div>
        )}

        {currentPage === 'results' && results && (
          <ResultsDashboard 
            results={results} onReset={() => setCurrentPage('analyzer')}
            interestRateShock={interestRateShock} setInterestRateShock={setInterestRateShock}
            costShock={costShock} setCostShock={setCostShock}
            demandShock={demandShock} setDemandShock={setDemandShock}
            chartData={chartData} runwayMonths={runwayMonths}
          />
        )}
      </main>

      <footer className="enterprise-footer">
         <p>© 2026 FinanceAI Technologies. Grade-A Enterprise Compliance Enforced.</p>
      </footer>
    </div>
  );
}

export default App;
