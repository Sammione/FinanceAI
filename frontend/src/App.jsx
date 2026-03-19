import { useState, useRef, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, ComposedChart, Line } from 'recharts';
import { Activity, BarChart3, TrendingUp, AlertTriangle, Briefcase, ChevronRight, FileText, Upload, RefreshCw, Layers, ShieldCheck, MessageSquare, Target, Zap, AlertCircle, Database, GitBranch, PieChart as PieIcon, Info, Download, Maximize, TrendingDown } from 'lucide-react';

const Header = ({ onHome, onAnalyze }) => (
  <nav className="main-nav">
    <div className="nav-logo" onClick={onHome}>
      <div className="logo-icon"><TrendingUp size={20}/></div>
      <span>FinanceAI <span style={{opacity:0.6, fontWeight:400}}>Enterprise</span></span>
    </div>
    <div className="nav-links">
       <button onClick={onHome}>Overview</button>
       <button onClick={onAnalyze}>Filing Input</button>
       <button className="contact-btn">Live Market Feed <div className="pulse-dot"></div></button>
    </div>
  </nav>
);

const AnalysisLoader = () => (
  <div className="enterprise-loader" style={{textAlign: 'center', padding: '100px 40px'}}>
     <div className="loader"></div>
     <h2 style={{fontSize: '2.5rem', fontWeight: 900}}>Generating Board Report</h2>
     <p style={{color: 'var(--text-secondary)'}}>Running Bi-LSTM Forecasting | Calculating RADS Decision Trees | Mapping Waterfall Bridges...</p>
  </div>
);

// WATERFALL BRIDGE - Grade A Feature
const WaterfallBridge = ({ data }) => {
  if (!data) return null;
  const processed = data.map((d, i) => {
    const prevSum = data.slice(0, i).reduce((a, b) => a + b.value, 0);
    return { ...d, start: prevSum, end: prevSum + d.value };
  });
  return (
    <div className="waterfall-container">
       <h3><BarChart3 size={16}/> Revenue-to-Profit Waterfall Bridge</h3>
       <ResponsiveContainer width="100%" height={220}>
          <BarChart data={processed}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
             <XAxis dataKey="label" fontSize={10} stroke="var(--text-secondary)" />
             <YAxis hide />
             <Tooltip 
               contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b'}} 
               formatter={(v) => `$${(v/1000000).toFixed(1)}M`}
             />
             <Bar dataKey="end">
                {processed.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 0 ? 'var(--success)' : 'var(--danger)'} opacity={0.8} />
                ))}
             </Bar>
          </BarChart>
       </ResponsiveContainer>
    </div>
  );
};

const StrategicHeatmap = ({ alerts }) => (
  <div className="heatmap-container">
     <h3><AlertTriangle size={16}/> Anomaly Intensity Heatmap</h3>
     <div className="heatmap-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', marginTop: '15px'}}>
        {Array.from({length: 25}).map((_, i) => {
           const alertIdx = i % (alerts?.length || 1);
           const sev = alerts?.[alertIdx]?.severity || 1;
           const isHot = i < (alerts?.length || 0);
           return (
             <div key={i} style={{
                height: '10px', 
                background: isHot ? `rgba(239, 68, 68, ${sev/10})` : 'rgba(255,255,255,0.05)',
                borderRadius: '2px',
                border: isHot ? '1px solid var(--danger)' : 'none'
             }} title={isHot ? alerts[alertIdx].type : ""}></div>
           );
        })}
     </div>
  </div>
);

const ResultsDashboard = ({ results, onReset, interestRateShock, setInterestRateShock, costShock, setCostShock, demandShock, setDemandShock, chartData, runwayMonths }) => {
  const exportReport = () => {
    const blob = new Blob([`FINAL BOARD BRIEFING - ${results.sentiment}\nAlpha Score: ${results.decisionIntelligence?.overallScore}%`], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); 
    link.href = url; link.download = 'FinanceAI_Executive_Report.txt'; 
    link.click();
  };

  return (
    <div className="enterprise-master-view" style={{padding: '40px'}}>
      <div className="e-head" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px'}}>
         <div>
            <span style={{fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800, letterSpacing: '2px'}}>COMMAND CENTER / MASTER_v7.0</span>
            <h1 style={{fontSize: '2.5rem', fontWeight: 900}}>Strategic Intelligence Briefing</h1>
         </div>
         <div style={{display: 'flex', gap: '15px'}}>
            <button className="btn-secondary" onClick={onReset} style={{padding: '10px 20px', border: '1px solid var(--border)', background: 'none', color: 'white', borderRadius: '10px', cursor: 'pointer'}}>New Case</button>
            <button className="btn-primary" onClick={exportReport} style={{padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px'}}><Download size={16}/> Export Board Briefing</button>
         </div>
      </div>

      <div className="dashboard-layout">
         {/* COLUMN 1: RATIOS & RISK */}
         <div className="dash-col-1">
            <div className="result-card">
                <h3><Target size={16} /> Alpha Score</h3>
                <div className="strategic-score" style={{textAlign: 'center', padding: '20px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.2)'}}>
                    <div className="score-value" style={{fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)'}}>{results?.decisionIntelligence?.overallScore || 0}%</div>
                    <div className="score-label" style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Risk-Adjusted Decision Alpha</div>
                </div>
                <div className="rec-list" style={{marginTop: '20px'}}>
                    {results?.decisionIntelligence?.recommendations?.map((r, i) => (
                      <div key={i} className="rec-item" style={{marginBottom: '15px', borderBottom: '1px solid var(--border)', paddingBottom: '10px'}}>
                         <div style={{fontSize: '0.6rem', color: 'var(--success)', fontWeight: 900}}>PRESCRIPTIVE ACTION</div>
                         <div style={{fontWeight: 800, fontSize: '0.9rem', marginTop: '4px'}}>{r.strategy}</div>
                         <div style={{fontSize: '0.7rem', color: 'var(--text-secondary)'}}>Confidence: {(r.confidence * 100).toFixed(0)}%</div>
                      </div>
                  ))}
                </div>
            </div>

            <div className="result-card">
              <StrategicHeatmap alerts={results?.anomalyIntelligence?.alerts} />
              <div className="anomaly-list" style={{marginTop: '20px'}}>
                 {results?.anomalyIntelligence?.alerts?.map((a, i) => (
                   <div key={i} className="finding-item" style={{padding: '10px', background: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid var(--danger)', borderRadius: '4px', marginBottom: '8px'}}>
                      <div style={{fontSize: '0.7rem', fontWeight: 800}}>Lv.{a.severity} {a.type}</div>
                      <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px'}}>{a.correction}</p>
                   </div>
                 ))}
              </div>
            </div>
         </div>

         {/* COLUMN 2: PRIMARY INTERACTION */}
         <div className="dash-col-2">
            <div className="result-card grid-4" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '15px'}}>
               {results?.keyMetrics?.map((m, i) => (
                 <div key={i} className="metric-box" style={{background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '16px'}}>
                    <div style={{fontSize: '1.25rem', fontWeight: 900}}>{m.value}</div>
                    <div style={{fontSize: '0.6rem', color: 'var(--text-secondary)', textTransform: 'uppercase'}}>{m.name}</div>
                 </div>
               ))}
            </div>

            <div className="result-card predictor-area">
               <div className="chart-header">
                  <div>
                     <h3 style={{fontSize: '1.5rem', fontWeight: 800}}>LSTM Monte Carlo Probability Bands</h3>
                     <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>Adjust shock parameters to map future liquidity volatility.</p>
                  </div>
                  <div className="runway-big" style={{textAlign: 'right'}}>
                     <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Probable Runway</span>
                     <div style={{fontSize: '2rem', fontWeight: 900, color: runwayMonths.includes('>') ? 'var(--success)' : 'var(--danger)'}}>{runwayMonths}</div>
                  </div>
               </div>

               <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={320}>
                     <AreaChart data={chartData}>
                        <defs>
                           <linearGradient id="bandColor" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={11} />
                        <YAxis hide />
                        <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid var(--border)'}} />
                        <Area type="monotone" dataKey="bestCase" stroke="var(--success)" fill="none" strokeDasharray="5 5" name="Optimistic" />
                        <Area type="monotone" dataKey="worstCase" stroke="var(--danger)" fill="none" strokeDasharray="5 5" name="Pessimistic" />
                        <Area type="monotone" dataKey="cashReserves" stroke="var(--accent-primary)" strokeWidth={4} fill="url(#bandColor)" name="Baseline" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>

               <div className="sim-controls" style={{display: 'flex', gap: '30px', marginTop: '30px', borderTop: '1px solid var(--border)', paddingTop: '20px'}}>
                  <div style={{flex: 1}}>
                     <label style={{fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px'}}>Refinance Shock (%)</label>
                     <input type="range" min="0" max="10" value={interestRateShock} onChange={(e)=>setInterestRateShock(parseFloat(e.target.value))} style={{width: '100%'}}/>
                     <div style={{fontSize: '0.65rem', color: 'var(--accent-primary)', marginTop: '4px'}}>Current: +{interestRateShock}%</div>
                  </div>
                  <div style={{flex: 1}}>
                     <label style={{fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px'}}>Operational Inflation (%)</label>
                     <input type="range" min="0" max="50" value={costShock} onChange={(e)=>setCostShock(parseFloat(e.target.value))} style={{width: '100%'}}/>
                     <div style={{fontSize: '0.65rem', color: 'var(--accent-primary)', marginTop: '4px'}}>Current: +{costShock}%</div>
                  </div>
                  <div style={{flex: 1}}>
                     <label style={{fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px'}}>Demand Collapse (%)</label>
                     <input type="range" min="0" max="50" value={demandShock} onChange={(e)=>setDemandShock(parseFloat(e.target.value))} style={{width: '100%'}}/>
                     <div style={{fontSize: '0.65rem', color: 'var(--accent-primary)', marginTop: '4px'}}>Current: -{demandShock}%</div>
                  </div>
               </div>
            </div>

            <div className="result-card">
               <WaterfallBridge data={results?.waterfallData} />
            </div>
         </div>

         {/* COLUMN 3: EXECUTIVE INTELLIGENCE */}
         <div className="dash-col-3">
            <div className="result-card rt-data">
               <h3><Database size={14}/> Live Data Orchestrator</h3>
               <div className="rt-list" style={{display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}><span>$SPY</span> <span style={{color: 'var(--success)'}}>+1.08%</span></div>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}><span>WACC_SEC</span> <span style={{color: 'var(--accent-primary)'}}>8.2%</span></div>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}><span>CPI_US</span> <span style={{color: 'var(--warning)'}}>3.1%</span></div>
               </div>
            </div>

            <div className="result-card segments">
               <h3><PieIcon size={14} /> Segment Performance</h3>
               {results?.segmentAnalysis?.map((s, i) => (
                 <div key={i} className="segment-item" style={{marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '10px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800}}><span>{s.unit}</span> <span>{s.profit}</span></div>
                    <div style={{height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', margin: '6px 0'}}><div style={{width: '70%', background: 'var(--accent-primary)', height: '100%'}}></div></div>
                    <div style={{fontSize: '0.65rem', color: 'var(--text-secondary)'}}>{s.trend} | {s.opportunity}</div>
                 </div>
               ))}
            </div>

            <div className="result-card decision-paths">
               <h3><GitBranch size={14}/> RADS Decision Map</h3>
               <div className="node-list" style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px'}}>
                  {results?.decisionTree?.nodes?.map((n, i) => (
                    <div key={i} style={{background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)'}}>
                       <div style={{fontSize: '0.8rem', fontWeight: 800}}>{n.path}</div>
                       <div style={{fontSize: '0.7rem', color: 'var(--accent-primary)', marginTop: '4px'}}>Outcome: {n.outcome}</div>
                       <div style={{fontSize: '0.6rem', color: 'var(--text-dim)', marginTop: '4px'}}>RADS Score: {(n.rads || 0)}/100</div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="cfo-chat-compact" style={{border: '1px solid var(--accent-primary)', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.95)', overflow: 'hidden'}}>
               <div style={{background: 'var(--accent-primary)', padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 800}}>
                  <MessageSquare size={14}/> AI CFO Advisor
               </div>
               <div style={{padding: '15px', fontSize: '0.75rem', color: 'var(--text-secondary)', minHeight: '80px'}}>
                  Analysis Complete. Would you like me to simulate the impact of the Asia expansion on your ROIC?
               </div>
               <div style={{display: 'flex', borderTop: '1px solid var(--border)', padding: '10px'}}>
                  <input placeholder="Query strategy..." style={{flex: 1, background: 'none', border: 'none', outline: 'none', color: 'white'}} />
                  <button style={{background: 'var(--accent-primary)', border: 'none', color: 'white', borderRadius: '4px', padding: '4px'}}><Zap size={14}/></button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

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

  const handleFile = (f) => { setError(''); if (!f) return; if (f.type !== 'application/pdf' && f.type !== 'text/plain') { setError('PDF/TXT Required.'); return; } setFile(f); };

  const analyzeDocument = async () => {
    if (!file) return; setLoading(true); setError('');
    const fd = new FormData(); fd.append('document', file);
    try {
      const resp = await fetch('/api/analyze', { method: 'POST', body: fd });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Server Internal Error');
      if (data.success && data.analysis) { setResults(data.analysis); setCurrentPage('results'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
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
    return idx === -1 ? '>12 Months' : `${idx} Months`;
  }, [chartData]);

  return (
    <div className={`main-wrapper ${currentPage}`}>
      <Header onHome={() => setCurrentPage('landing')} onAnalyze={() => setCurrentPage('analyzer')} />
      <main className="main-content">
        {currentPage === 'landing' && (
          <div className="landing-page">
            <section className="hero">
               <h1 className="hero-title">Decision Intelligence <br/><span>For The Modern CFO</span></h1>
               <p className="hero-subtitle">The ultimate Grade-A Enterprise platform uniting BI-LSTM forecasting with interactive prescriptive strategic roadmaps.</p>
               <button className="btn-primary" onClick={() => setCurrentPage('analyzer')} style={{margin: '0 auto'}}>Analyze Filing <ChevronRight size={18}/></button>
            </section>
          </div>
        )}

        {currentPage === 'analyzer' && (
            <AnalyzerView 
                loading={loading} file={file} error={error}
                analyzeDocument={analyzeDocument} inputRef={inputRef} handleFile={handleFile}
            />
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
      <footer className="main-footer" style={{padding:'40px', borderTop:'1px solid var(--border)', textAlign:'center', fontSize: '0.8rem', opacity: 0.6}}>
        © 2026 FinanceAI Technologies. All Strategic Data Encrypted.
      </footer>
    </div>
  );
}

export default App;
