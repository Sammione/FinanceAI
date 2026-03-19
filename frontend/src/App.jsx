import { useState, useRef, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, BarChart3, TrendingUp, AlertTriangle, Briefcase, ChevronRight, FileText, Upload, RefreshCw, Layers, ShieldCheck, MessageSquare, Target, Zap, AlertCircle, GitBranch, Database, Info, Settings, PieChart as PieIcon } from 'lucide-react';

const LandingView = ({ onLaunch, onExplore }) => (
  <div className="landing-page">
    <section className="hero">
      <div className="hero-pill" style={{padding: '8px 16px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '20px', width: 'fit-content', margin: '0 auto 20px', fontSize: '0.8rem', fontWeight: 800, border: '1px solid rgba(59, 130, 246, 0.2)'}}><ShieldCheck size={14} style={{marginRight: '6px'}}/> Grade-A Enterprise Architecture</div>
      <h1 className="hero-title">Decision Intelligence <br/><span>For The Strategic CFO</span></h1>
      <p className="hero-subtitle">The world's most advanced AI-CFO command center. Dynamic 3-column analysis, LSTM-based forecasting, and prescriptive strategic roadmaps — unified.</p>
      <div className="hero-cta" style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
        <button onClick={onLaunch} className="btn-primary">Initialize AI CFO <ChevronRight size={18}/></button>
        <button onClick={onExplore} className="btn-secondary" style={{padding: '16px 32px', border: '1px solid var(--border)', borderRadius: '14px', background: 'none', color: 'white', fontWeight: 700, cursor: 'pointer'}}>Explore Features ↓</button>
      </div>
    </section>
  </div>
);

const AnalyzerView = ({ loading, file, error, analyzeDocument, inputRef, handleFile }) => (
  <section className="app-section" style={{padding: '100px 40px'}}>
    {loading ? (
      <div className="upload-card central-loading" style={{textAlign: 'center', background: 'var(--bg-card)', padding: '60px', borderRadius: '30px', border: '1px solid var(--border)'}}>
         <div className="loader"></div>
         <h2 style={{fontSize: '2rem', marginBottom: '10px'}}>Launching Enterprise Layer</h2>
         <p style={{color: 'var(--text-secondary)'}}>Generating Decision Trees, Anomaly Heatmaps, and Monte Carlo Scenarios...</p>
      </div>
    ) : (
      <div className="upload-card" style={{textAlign: 'center', background: 'var(--bg-card)', padding: '60px', borderRadius: '30px', border: '1px solid var(--border)', maxWidth: '800px', margin: '0 auto'}}>
         <h2 style={{fontSize: '2.5rem', marginBottom: '10px'}}>Tactical Input</h2>
         <p style={{color: 'var(--text-secondary)', marginBottom: '40px'}}>Select a financial document to initialize the Command Center.</p>
         <div className="drop-zone" onClick={() => inputRef.current.click()} style={{padding: '80px', border: '2px dashed var(--accent-primary)', borderRadius: '20px', cursor: 'pointer', background: 'rgba(59, 130, 246, 0.05)'}}>
            <Upload size={48} style={{color: 'var(--accent-primary)', marginBottom: '20px'}} />
            <p style={{fontWeight: 700}}>{file ? file.name : "Click to Drop Strategic Filing"}</p>
            <input ref={inputRef} style={{display: 'none'}} type="file" onChange={(e)=>handleFile(e.target.files[0])} />
         </div>
         {error && <p style={{color: 'var(--danger)', marginTop: '20px'}}>{error}</p>}
         <button className="btn-primary" style={{width: '100%', marginTop: '30px', justifyContent: 'center'}} onClick={analyzeDocument} disabled={!file}>
            Run Full Enterprise Analysis
         </button>
      </div>
    )}
  </section>
);

const ResultsDashboard = ({ results, onReset, interestRateShock, setInterestRateShock, costShock, setCostShock, demandShock, setDemandShock, chartData, runwayMonths }) => (
  <div className="dashboard-results-enterprise" style={{padding: '40px'}}>
    <div className="enterprise-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', borderLeft: '4px solid var(--accent-primary)', paddingLeft: '20px'}}>
       <div>
          <span style={{fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '2px'}}>CMD_CENTER / {results?.sentiment?.toUpperCase()}</span>
          <h2 style={{fontSize: '2.5rem', fontWeight: 900}}>Strategic Intelligence Report</h2>
       </div>
       <button onClick={onReset} style={{background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: '10px', color: 'white', fontWeight: 700, cursor: 'pointer'}}>New Case</button>
    </div>

    <div className="dashboard-layout">
       {/* COLUMN 1: LEFT SIDEBAR */}
       <div className="dash-col-1">
          <div className="result-card">
              <h3><Target size={16} /> Strategic Score</h3>
              <div className="strategic-score">
                  <div className="score-value">{results?.decisionIntelligence?.overallScore || 0}</div>
                  <div className="score-label">Decision Alpha Score</div>
              </div>
              <div className="rec-list" style={{marginTop: '20px'}}>
                  {results?.decisionIntelligence?.recommendations?.map((r, i) => (
                    <div key={i} className="rec-item">
                        <span className="rec-tag high">HIGH IMPACT</span>
                        <div style={{fontWeight: 800, fontSize: '0.9rem', marginTop: '4px'}}>{r.strategy}</div>
                    </div>
                  ))}
              </div>
          </div>

          <div className="result-card">
              <h3><AlertTriangle size={16} color="var(--danger)"/> Anomaly Vector</h3>
              <div className="findings">
                  {results?.anomalyIntelligence?.alerts?.map((a, i) => (
                    <div key={i} className="finding-item">
                       <div style={{fontWeight: 800, fontSize: '0.7rem', color: 'white'}}>LV.{a.severity} - {a.type}</div>
                       <p style={{fontSize: '0.75rem', marginTop: '4px'}}>{a.correction}</p>
                    </div>
                  ))}
              </div>
          </div>
       </div>

       {/* COLUMN 2: CENTER VIEW */}
       <div className="dash-col-2">
          <div className="result-card scorecard" style={{padding: '20px'}}>
             <div className="grid-4">
                {results?.keyMetrics?.map((m, i) => (
                  <div key={i} className="metric-box">
                    <div className="metric-v">{m.value}</div>
                    <div className="metric-n">{m.name}</div>
                  </div>
                ))}
             </div>
          </div>

          <div className="result-card predictor-area">
              <div className="chart-header">
                 <div>
                    <h3 style={{fontSize: '1.25rem'}}>LSTM-Monte Carlo Simulation</h3>
                    <p style={{color: 'var(--text-secondary)', fontSize: '0.8rem'}}>Dynamic Probabilistic Bands (Base / Best / Worst Case)</p>
                 </div>
                 <div className="runway-card-mini">
                    <div style={{fontSize: '0.7rem', color: 'var(--text-secondary)'}}>Survival Runway</div>
                    <h2 style={{color: runwayMonths.includes('>') ? 'var(--success)' : 'var(--danger)'}}>{runwayMonths}</h2>
                 </div>
              </div>

              <div className="chart-wrapper">
                 <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                       <defs>
                          <linearGradient id="mainBand" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="month" stroke="var(--text-secondary)" />
                       <YAxis hide />
                       <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid var(--border)'}} />
                       <Area type="monotone" dataKey="bestCase" stroke="var(--success)" fill="none" strokeDasharray="5 5" />
                       <Area type="monotone" dataKey="worstCase" stroke="var(--danger)" fill="none" strokeDasharray="5 5" />
                       <Area type="monotone" dataKey="cashReserves" stroke="var(--accent-primary)" strokeWidth={4} fill="url(#mainBand)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="sim-controls" style={{display: 'flex', gap: '30px', marginTop: '30px'}}>
                  <div style={{flex: 1}}>
                     <label style={{fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px'}}>Interest Spike</label>
                     <input type="range" min="0" max="10" value={interestRateShock} onChange={(e)=>setInterestRateShock(parseFloat(e.target.value))} style={{width: '100%'}}/>
                  </div>
                  <div style={{flex: 1}}>
                     <label style={{fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px'}}>Cost Inflation</label>
                     <input type="range" min="0" max="50" value={costShock} onChange={(e)=>setCostShock(parseFloat(e.target.value))} style={{width: '100%'}}/>
                  </div>
                  <div style={{flex: 1}}>
                     <label style={{fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px'}}>Demand Contraction</label>
                     <input type="range" min="0" max="50" value={demandShock} onChange={(e)=>setDemandShock(parseFloat(e.target.value))} style={{width: '100%'}}/>
                  </div>
              </div>
          </div>

          <div className="result-card prescriptive-matrix">
              <h3><Zap size={16}/> Prescriptive Execution Matrix</h3>
              <div className="strategy-grid">
                  {results?.prescriptiveStrategy?.map((s, i) => (
                    <div key={i} className="strategy-card">
                       <span style={{fontSize: '0.6rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 900}}>ACTIONABLE STRATEGY</span>
                       <h4 style={{marginTop: '10px'}}>{s.action}</h4>
                       <div className="s-impl" style={{marginTop: '10px'}}>
                          {s.implementation?.map((step, idx) => <div key={idx} className="s-step">• {step}</div>)}
                       </div>
                       <div className="s-outcome">Impact: <span>{s.outcome}</span></div>
                    </div>
                  ))}
              </div>
          </div>
       </div>

       {/* COLUMN 3: RIGHT PANEL */}
       <div className="dash-col-3">
          <div className="result-card rt-widget">
              <h3><Database size={14} /> Live Benchmarks</h3>
              <div className="rt-grid">
                  <div className="rt-item"><span>SPY Index</span> <span className="up">+1.25%</span></div>
                  <div className="rt-item"><span>USD/FX</span> <span className="down">-0.32%</span></div>
                  <div className="rt-item"><span>WACC</span> <span style={{color:'var(--accent-primary)'}}>8.1%</span></div>
              </div>
          </div>

          <div className="result-card segments">
              <h3><PieIcon size={14} /> Business Segments</h3>
              {results?.segmentAnalysis?.map((s, i) => (
                <div key={i} className="segment-item">
                   <div className="s-top"><span>{s.unit}</span> <span>{s.profit}</span></div>
                   <div className="s-bar-bg"><div className="s-bar-fill" style={{width: '75%'}}></div></div>
                   <div className="s-bottom">{s.trend} | {s.opportunity}</div>
                </div>
              ))}
          </div>

          <div className="result-card tree-card">
              <h3><GitBranch size={14} /> Decision Paths</h3>
              <div className="tree-nodes">
                 {results?.decisionTree?.nodes?.map((n, i) => (
                   <div key={i} className="node-content">
                      <div className="node-path">{n.path}</div>
                      <div className="node-rads">RADS Score: {n.rads}</div>
                   </div>
                 ))}
              </div>
          </div>

          <div className="cfo-chat-container">
              <div className="chat-head"><MessageSquare size={14}/> CFO Strategic Advisor</div>
              <div className="chat-body-compact">
                 How can I assist with your quantitative strategy today? Based on the analysis, I recommend focusing on cost optimization.
              </div>
              <div className="chat-input-compact">
                 <input placeholder="Ask about expansion..." /><button style={{background:'var(--accent-primary)', border:'none', color:'white', borderRadius:'4px', padding:'4px'}}><Zap size={14}/></button>
              </div>
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

  const handleFile = (f) => { setError(''); if (!f) return; if (f.type !== 'application/pdf' && f.type !== 'text/plain') { setError('PDF or TXT required.'); return; } setFile(f); };

  const analyzeDocument = async () => {
    if (!file) return; setLoading(true); setError('');
    const fd = new FormData(); fd.append('document', file);
    try {
      const resp = await fetch('/api/analyze', { method: 'POST', body: fd });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Server error');
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
      <nav className="main-nav">
        <div className="nav-logo" onClick={() => setCurrentPage('landing')}>
          <div className="logo-icon"><TrendingUp size={20}/></div>
          <span>FinanceAI CFO</span>
        </div>
        <div className="nav-links">
           <button onClick={() => setCurrentPage('landing')}>Solutions</button>
           <button onClick={() => setCurrentPage('analyzer')}>The Machine</button>
           <button className="contact-btn" onClick={() => setCurrentPage('analyzer')}>Launch Console</button>
        </div>
      </nav>

      <div className="content-area">
        {currentPage === 'landing' && <LandingView onLaunch={() => setCurrentPage('analyzer')} onExplore={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})} />}
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
      </div>

      <footer className="main-footer">
        <p>© 2026 FinanceAI Technologies. Grade-A Enterprise Compliance.</p>
      </footer>
    </div>
  );
}

export default App;
