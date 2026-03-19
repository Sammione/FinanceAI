import { useState, useRef, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Activity, BarChart3, TrendingUp, AlertTriangle, Briefcase, ChevronRight, FileText, Upload, RefreshCw, Layers, ShieldCheck, MessageSquare, Target, Zap, AlertCircle, Database, GitBranch, PieChart as PieIcon, LineChart as LineIcon, Info } from 'lucide-react';

const Header = ({ onHome, onAnalyze }) => (
  <nav className="enterprise-nav">
    <div className="nav-logo" onClick={onHome}>
      <div className="logo-badge">EXPERT CORE</div>
      <span>FinanceAI <span style={{opacity:0.5, fontWeight:400}}>/ Terminal</span></span>
    </div>
    <div className="nav-actions">
       <button onClick={onHome}>System Overview</button>
       <button onClick={onAnalyze}>Quantitative Input</button>
       <button className="demo-btn">Live Market Feed <div className="pulse-dot"></div></button>
    </div>
  </nav>
);

const AnalysisLoader = () => (
  <div className="enterprise-loader">
     <div className="spinner-orbit">
       <div className="dot"></div>
     </div>
     <h2 style={{fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '10px'}}>Neural Engine Processing</h2>
     <p style={{fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase'}}>Parsing 10-K Vectors • Calculating WACC • Running MC Sim v3.2</p>
  </div>
);

const ResultsDashboard = ({ results, onReset, interestRateShock, setInterestRateShock, costShock, setCostShock, demandShock, setDemandShock, chartData, runwayMonths }) => (
  <div className="enterprise-dashboard">
    <div className="dashboard-header">
       <div className="h-left">
          <span>AI-DRIVEN QUANTITATIVE ASSESSMENT / SESSION_{Math.floor(Math.random()*9000)+1000}</span>
          <h2>{results?.sentiment} Strategic Posture</h2>
       </div>
    </div>

    <div className="dash-grid">
      {/* COLUMN 1: RATIOS & RISK */}
      <div className="dash-col-1">
         <div className="result-card">
            <h3><BarChart3 size={14}/> Core Ratios</h3>
            <div className="scorecard-compact">
               {results?.keyMetrics?.map((m, i) => (
                 <div key={i} className="compact-metric">
                    <div className="c-label">{m.name}</div>
                    <div className="c-val">{m.value}</div>
                 </div>
               ))}
               <div className="compact-metric" style={{border: '1px solid var(--accent-blue)'}}>
                  <div className="c-label">Sentiment Score</div>
                  <div className="c-val">{results?.decisionIntelligence?.overallScore}%</div>
               </div>
            </div>
         </div>

         <div className="result-card">
            <h3><AlertTriangle size={14}/> Anomaly Vector Scans</h3>
            <div className="anomaly-list">
               {results?.anomalyIntelligence?.alerts?.map((a, i) => (
                 <div key={i} className={`alert-box severity-\${Math.min(4, Math.ceil(a.severity/2))}`}>
                    <div className="alert-top">
                       <span className="alert-type">{a.type}</span>
                       <span className="alert-sev">Lv.{a.severity}</span>
                    </div>
                    <div className="alert-loc">{a.location}</div>
                    <div className="alert-correction">{a.correction}</div>
                 </div>
               ))}
            </div>
         </div>

         <div className="result-card cfo-chat-compact">
            <div className="c-head"><MessageSquare size={14} /> Analyst Direct-GPT</div>
            <div className="c-msgs">
               <div className="m-sys">Ready for qualitative inquiry. Model stability is nominal. Recommendations optimized for {results?.sentiment?.toLowerCase()} posture.</div>
            </div>
            <div className="c-input"><input placeholder="Query debt logic..." /><button><Zap size={14}/></button></div>
         </div>
      </div>

      {/* COLUMN 2: FORECAST & STRATEGY */}
      <div className="dash-col-2">
         <div className="result-card chart-card">
            <div className="chart-header">
               <div>
                  <h3>Forward Probabilistic Runway (12M)</h3>
                  <p style={{fontSize: '0.7rem', color: 'var(--text-dim)'}}>Basis: Monte Carlo Simulation vs LSTM Cyclicality Estimates</p>
               </div>
               <div className="runway-enterprise">
                  <span>Projected Liquidity</span>
                  <div className={runwayMonths.includes('>') ? 'success' : 'danger'}>{runwayMonths}</div>
               </div>
            </div>
            <div className="chart-wrapper">
               <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={chartData}>
                     <defs>
                        <linearGradient id="bandColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                     <XAxis dataKey="month" stroke="var(--text-dim)" fontSize={10} />
                     <YAxis stroke="var(--text-dim)" fontSize={10} hide />
                     <Tooltip 
                        contentStyle={{backgroundColor: 'var(--bg-deep)', border: '1px solid var(--border-active)', borderRadius: '8px', fontSize: '11px'}} 
                        itemStyle={{color: 'white'}}
                     />
                     <Area type="monotone" dataKey="bestCase" stroke="var(--accent-emerald)" fill="none" strokeDasharray="4 4" name="Optimum" />
                     <Area type="monotone" dataKey="worstCase" stroke="var(--accent-rose)" fill="none" strokeDasharray="4 4" name="Bearish" />
                     <Area type="monotone" dataKey="cashReserves" stroke="var(--accent-blue)" strokeWidth={3} fill="url(#bandColor)" name="Baseline" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            <div className="sim-controls">
               <div className="sim-field">
                  <label>Refinance Shock</label>
                  <input type="range" min="0" max="10" value={interestRateShock} onChange={(e)=>setInterestRateShock(parseFloat(e.target.value))} />
                  <div style={{fontSize: '0.6rem', color: 'var(--accent-blue)', marginTop: '4px'}}>+{interestRateShock}%</div>
               </div>
               <div className="sim-field">
                  <label>Operating Inflation</label>
                  <input type="range" min="0" max="50" value={costShock} onChange={(e)=>setCostShock(parseFloat(e.target.value))} />
                  <div style={{fontSize: '0.6rem', color: 'var(--accent-blue)', marginTop: '4px'}}>+{costShock}%</div>
               </div>
               <div className="sim-field">
                  <label>Revenue Contraction</label>
                  <input type="range" min="0" max="50" value={demandShock} onChange={(e)=>setDemandShock(parseFloat(e.target.value))} />
                  <div style={{fontSize: '0.6rem', color: 'var(--accent-blue)', marginTop: '4px'}}>-{demandShock}%</div>
               </div>
            </div>
         </div>

         <div className="result-card">
            <h3><Zap size={14}/> Prescriptive Performance Timeline</h3>
            <div className="strategy-grid">
               {results?.prescriptiveStrategy?.map((s, i) => (
                 <div key={i} className="strategy-card">
                    <span className="s-status" style={{color: s.riskLevel?.includes('Low') ? 'var(--accent-emerald)' : 'var(--accent-amber)'}}>{s.riskLevel} Risk Profile</span>
                    <h4>{s.action}</h4>
                    <div className="s-steps">
                       {s.implementation?.map((st, idx) => <div key={idx} className="s-step">{st}</div>)}
                    </div>
                    <div className="s-outcome">Outcome Projection: <span>{s.outcome}</span></div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* COLUMN 3: POSITIONING & NARRATIVE */}
      <div className="dash-col-3">
         <div className="result-card">
            <h3><GitBranch size={14}/> Decision Tree Vectors</h3>
            <div className="tree-root" style={{fontSize: '0.7rem', fontWeight: 800, color: 'white', opacity: 0.6}}>OBJECTIVE: {results?.decisionTree?.root}</div>
            <div className="tree-nodes">
               {results?.decisionTree?.nodes?.map((node, i) => (
                 <div key={i} className="tree-node">
                    <div className="node-content">
                       <div className="node-path">{node.path}</div>
                       <div className="node-outcome">{node.outcome}</div>
                       <div className="node-rads">RADS: {node.rads}%</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="result-card">
            <h3><Info size={14}/> Quantitative Narrative</h3>
            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6}}>{results?.summary}</p>
            <div style={{marginTop: '20px', padding: '12px', background: 'rgba(56, 189, 248, 0.05)', borderRadius: '6px', borderLeft: '3px solid var(--accent-blue)', fontSize: '0.7rem', color: 'white'}}>
               <strong>AI VERDICT:</strong> {results?.conclusion}
            </div>
         </div>

         <div className="result-card">
            <h3><PieIcon size={14}/> Performance Segments</h3>
            {results?.segmentAnalysis?.map((s, i) => (
              <div key={i} className="segment-item">
                 <div className="s-top"><span>{s.unit}</span> <span>{s.profit}</span></div>
                 <div className="s-bar-bg"><div className="s-bar-fill" style={{width: '75%'}}></div></div>
                 <div className="s-bottom">{s.trend} | Alpha: {s.opportunity}</div>
              </div>
            ))}
         </div>
      </div>
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); 
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);

  const [interestRateShock, setInterestRateShock] = useState(0);
  const [costShock, setCostShock] = useState(0);
  const [demandShock, setDemandShock] = useState(0);

  const handleFile = (f) => { setError(''); if (!f) return; if (f.type !== 'application/pdf' && f.type !== 'text/plain') { setError('Supported: PDF/TXT'); setFile(null); return; } setFile(f); };

  const analyzeDocument = async () => {
    if (!file) return; setLoading(true); setError('');
    const fd = new FormData(); fd.append('document', file);
    try {
      const resp = await fetch('/api/analyze', { method: 'POST', body: fd });
      const d = await resp.json();
      if (!resp.ok) throw new Error(d.error || 'Check server status');
      if (d.success && d.analysis) { setResults(d.analysis); setCurrentPage('results'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const chartData = useMemo(() => {
    if (!results || !results.baselineFinancials) return [];
    const b = results.baselineFinancials;
    const m = results.monteCarlo || { bestCaseRevenueGrowth: 1.05, worstCaseRevenueGrowth: 0.95 };
    const months = [];
    const rImp = 1 - (demandShock/100), cImp = 1 + (costShock/100);
    const mIE = (b.totalDebt * (Math.max(0, 0.05 + (interestRateShock/100)))) / 12;
    let cC = b.currentCashReserves, bC = b.currentCashReserves, wC = b.currentCashReserves;
    for (let i = 0; i <= 12; i++) {
        if (i > 0) {
            const r = b.monthlyRevenue * rImp, e = b.monthlyOperatingExpenses * cImp;
            cC += (r - e - mIE);
            bC += (r * m.bestCaseRevenueGrowth - e - mIE);
            wC += (r * m.worstCaseRevenueGrowth - e - mIE);
        }
        months.push({ month: `M${i}`, cashReserves: Math.floor(cC), bestCase: Math.floor(bC), worstCase: Math.floor(wC) });
    }
    return months;
  }, [results, interestRateShock, costShock, demandShock]);

  const runwayMonths = useMemo(() => {
    if(!chartData.length) return 0;
    const idx = chartData.findIndex(d => d.cashReserves <= 0);
    return idx === -1 ? '>12M' : `${idx}M`;
  }, [chartData]);

  return (
    <div className="expert-wrapper">
      <Header onHome={() => setCurrentPage('landing')} onAnalyze={() => setCurrentPage('analyzer')} />
      <main className="main-content">
        {currentPage === 'landing' && (
          <div className="hero-modern">
             <div className="hero-accent"></div>
             <h1 className="hero-t">THE QUANTUM <br/><span>FINANCIAL TERMINAL</span></h1>
             <p className="hero-p">Advanced Prescriptive Intelligence for Institutional Analysts. Real-time Monte Carlo Simulation, Neural Forecasting, and Anomaly Vector Scans — Unified at the Expert-Core Tier.</p>
             <div className="hero-cta-enterprise">
                <button onClick={() => setCurrentPage('analyzer')}>Initialize Neural Layer</button>
             </div>
          </div>
        )}
        {currentPage === 'analyzer' && (
          <div className="analyzer-view" style={{padding: '100px 40px'}}>
             {loading ? <AnalysisLoader /> : (
                <div className="upload-container-enterprise" style={{border: '1px dashed var(--border-active)', borderRadius: '12px', padding: '100px', textAlign: 'center'}}>
                   <Upload size={30} style={{color: 'var(--accent-blue)', marginBottom: '20px'}} />
                   <h3 style={{fontSize: '1rem', fontWeight: 800, marginBottom: '10px'}}>{file ? file.name : "Awaiting Data Selection"}</h3>
                   <input ref={inputRef} type="file" style={{display: 'none'}} onChange={(e)=>handleFile(e.target.files[0])} />
                   {!file && <button onClick={() => inputRef.current.click()} style={{background: 'none', color: 'var(--accent-blue)', border: '1px solid var(--accent-blue)', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer'}}>Select SEC Filing</button>}
                   {file && <button onClick={analyzeDocument} style={{background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer'}}>Analyze Vectors</button>}
                   {error && <p style={{color: 'var(--accent-rose)', marginTop: '20px', fontSize: '0.8rem'}}>{error}</p>}
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
    </div>
  );
}

export default App;
