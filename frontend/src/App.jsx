import { useState, useRef, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Activity, BarChart3, TrendingUp, AlertTriangle, Briefcase, ChevronRight, FileText, Upload, RefreshCw, Layers, ShieldCheck, MessageSquare, Target, Zap, AlertCircle, Database, GitBranch, PieChart as PieIcon, Info, Download } from 'lucide-react';

const Header = ({ onHome, onAnalyze }) => (
  <nav className="main-nav">
    <div className="nav-logo" onClick={onHome}>
      <div className="logo-icon"><TrendingUp size={20}/></div>
      <span>FinanceAI <span style={{opacity:0.6, fontWeight:400}}>Enterprise</span></span>
    </div>
    <div className="nav-links">
       <button onClick={onHome}>Solutions</button>
       <button onClick={onAnalyze}>The Engine</button>
       <button className="contact-btn">Live Market Feed <div className="pulse-dot"></div></button>
    </div>
  </nav>
);

const AnalysisLoader = () => (
  <div className="upload-card">
     <div className="loader"></div>
     <h2 style={{fontSize: '2rem', fontWeight: 900, marginBottom: '10px'}}>Neural Engine Online</h2>
     <p style={{color: 'var(--text-secondary)'}}>Running Bi-LSTM Forecasting | Calculating RADS Decision Trees | Scanning Anomaly Vectors...</p>
  </div>
);

const WaterfallBridge = ({ data }) => {
  if (!data) return null;
  const processed = data.map((d, i) => {
    const prevSum = data.slice(0, i).reduce((a, b) => a + b.value, 0);
    return { ...d, start: prevSum, end: prevSum + d.value };
  });
  return (
    <div className="waterfall-container">
       <h3><BarChart3 size={16}/> Revenue-to-Profit Waterfall Bridge</h3>
       <ResponsiveContainer width="100%" height={200}>
          <BarChart data={processed}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
             <XAxis dataKey="label" fontSize={10} stroke="var(--text-secondary)" />
             <YAxis hide />
             <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b'}} formatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
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

const ResultsDashboard = ({ results, onReset, interestRateShock, setInterestRateShock, costShock, setCostShock, demandShock, setDemandShock, chartData, runwayMonths }) => (
  <div className="enterprise-master-view" style={{padding: '40px'}}>
    <div className="e-head" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', borderLeft: '4px solid var(--accent-primary)', paddingLeft: '20px'}}>
       <div>
          <span style={{fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800, letterSpacing: '2px'}}>COMMAND CENTER / MASTER_PLATFORM</span>
          <h1 style={{fontSize: '2.5rem', fontWeight: 900}}>Strategic Intelligence Briefing</h1>
       </div>
       <div style={{display: 'flex', gap: '15px'}}>
          <button className="btn-secondary" onClick={onReset} style={{padding: '10px 20px', border: '1px solid var(--border)', background: 'none', color: 'white', borderRadius: '10px', cursor: 'pointer'}}>New Case</button>
          <button className="btn-primary" style={{padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px'}}><Download size={16}/> Export Board Briefing</button>
       </div>
    </div>

    <div className="dashboard-layout">
       <div className="dash-col-1">
          <div className="result-card">
              <div className="strategic-score">
                  <div className="score-value">{results?.decisionIntelligence?.overallScore || 0}%</div>
                  <div className="score-label">Decision Alpha Score</div>
              </div>
              <div className="rec-list" style={{marginTop: '20px'}}>
                  {results?.decisionIntelligence?.recommendations?.map((r, i) => (
                    <div key={i} className="finding-item" style={{borderLeft: '4px solid var(--accent-primary)', color:'white'}}>
                        <div style={{fontWeight: 900, fontSize: '0.6rem', color:'var(--success)'}}>STRATEGY</div>
                        <div style={{fontWeight: 800, fontSize: '0.9rem'}}>{r.strategy}</div>
                    </div>
                  ))}
              </div>
          </div>
          <div className="result-card">
              <h3><AlertTriangle size={16} color="var(--danger)"/> Anomaly Vectors</h3>
              {results?.anomalyIntelligence?.alerts?.map((a, i) => (
                 <div key={i} className="finding-item" style={{background: 'rgba(239, 68, 68, 0.05)', color: 'var(--text-secondary)'}}>
                    <div style={{fontWeight: 800, fontSize: '0.7rem', color:'white'}}>Lv.{a.severity} {a.type}</div>
                    <p style={{fontSize: '0.75rem', marginTop: '4px'}}>{a.correction}</p>
                 </div>
              ))}
          </div>
       </div>

       <div className="dash-col-2">
          <div className="result-card grid-4">
             {results?.keyMetrics?.map((m, i) => (
               <div key={i} className="metric-box">
                  <div className="metric-v">{m.value}</div>
                  <div className="metric-n">{m.name}</div>
               </div>
             ))}
          </div>
          <div className="result-card">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
                 <h3 style={{fontSize: '1.5rem', fontWeight: 900}}>Monte Carlo Probability Bands</h3>
                 <div style={{textAlign: 'right'}}>
                    <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Runway</span>
                    <div style={{fontSize: '2rem', fontWeight: 900, color: runwayMonths.includes('>') ? 'var(--success)' : 'var(--danger)'}}>{runwayMonths}</div>
                 </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                 <AreaChart data={chartData}>
                    <defs>
                       <linearGradient id="mainBand" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" />
                    <YAxis hide />
                    <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid var(--border)'}} />
                    <Area type="monotone" dataKey="bestCase" stroke="var(--success)" fill="none" strokeDasharray="5 5" />
                    <Area type="monotone" dataKey="worstCase" stroke="var(--danger)" fill="none" strokeDasharray="5 5" />
                    <Area type="monotone" dataKey="cashReserves" stroke="var(--accent-primary)" strokeWidth={4} fill="url(#mainBand)" />
                 </AreaChart>
              </ResponsiveContainer>
              <div style={{display:'flex', gap:'20px', marginTop:'20px'}}>
                 <div style={{flex:1}}><label style={{fontSize:'0.7rem', color:'var(--text-secondary)'}}>Rate (+%)</label><input type="range" min="0" max="10" value={interestRateShock} onChange={(e)=>setInterestRateShock(parseFloat(e.target.value))} style={{width:'100%'}}/></div>
                 <div style={{flex:1}}><label style={{fontSize:'0.7rem', color:'var(--text-secondary)'}}>Ops (+%)</label><input type="range" min="0" max="50" value={costShock} onChange={(e)=>setCostShock(parseFloat(e.target.value))} style={{width:'100%'}}/></div>
                 <div style={{flex:1}}><label style={{fontSize:'0.7rem', color:'var(--text-secondary)'}}>Demand (-%)</label><input type="range" min="0" max="50" value={demandShock} onChange={(e)=>setDemandShock(parseFloat(e.target.value))} style={{width:'100%'}}/></div>
              </div>
          </div>
          <div className="result-card">
              <WaterfallBridge data={results?.waterfallData} />
          </div>
       </div>

       <div className="dash-col-3">
          <div className="result-card segments">
             <h3><PieIcon size={14} /> Business Segments</h3>
             {results?.segmentAnalysis?.map((s, i) => (
               <div key={i} className="segment-item">
                  <div className="s-top"><span>{s.unit}</span> <span>{s.profit}</span></div>
                  <div className="s-bar-bg"><div className="s-bar-fill" style={{width: '70%'}}></div></div>
                  <div className="s-bottom">{s.trend} | {s.opportunity}</div>
               </div>
             ))}
          </div>
          <div className="result-card">
             <h3><GitBranch size={14}/> Decision Map</h3>
             {results?.decisionTree?.nodes?.map((n, i) => (
                <div key={i} style={{background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '8px'}}>
                    <div style={{fontSize: '0.8rem', fontWeight: 800}}>{n.path}</div>
                    <div style={{fontSize: '0.7rem', color: 'var(--accent-primary)'}}>RADS: {n.rads}</div>
                </div>
             ))}
          </div>
          <div className="cfo-chat-container">
              <div className="chat-head"><MessageSquare size={14}/> CFO Strategic Advisor</div>
              <div className="chat-body-compact">Analysis Complete. Your current RADS levels indicate resilience. Shall I model a debt-buyback scenario?</div>
              <div className="chat-input-compact"><input placeholder="Ask CFO..." /><button style={{background:'var(--accent-primary)', border:'none', color:'white', borderRadius:'4px', padding:'4px'}}><Zap size={14}/></button></div>
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
      if (!resp.ok) throw new Error(data.error || 'Enterprise API Error');
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
    return idx === -1 ? '>12M' : `${idx}M`;
  }, [chartData]);

  return (
    <div className="main-wrapper">
      <Header onHome={() => setCurrentPage('landing')} onAnalyze={() => setCurrentPage('analyzer')} />
      <div className="content-area">
        {currentPage === 'landing' && (
          <div className="hero">
             <h1 className="hero-title">Decision Intelligence <br/><span>For The Modern CFO</span></h1>
             <p className="hero-subtitle">The ultimate Grade-A Enterprise platform uniting BI-LSTM forecasting with interactive prescriptive strategic roadmaps.</p>
             <button className="btn-primary" onClick={() => setCurrentPage('analyzer')} style={{margin: '0 auto'}}>Analyze SEC Filing <ChevronRight size={18}/></button>
          </div>
        )}

        {currentPage === 'analyzer' && (
           <div className="analyzer-section" style={{padding: '40px'}}>
             {loading ? <AnalysisLoader /> : (
                <div className="upload-card">
                   <h2 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px'}}>Document Analysis</h2>
                   <div className="drop-zone" onClick={() => inputRef.current.click()}>
                      <Upload size={48} style={{color: 'var(--accent-primary)', marginBottom: '20px'}} />
                      <p style={{fontWeight: 700}}>{file ? file.name : "Click to select institutional filing"}</p>
                      <input ref={inputRef} style={{display: 'none'}} type="file" onChange={(e)=>handleFile(e.target.files[0])} />
                   </div>
                   {error && <p style={{color: 'var(--danger)', marginTop: '20px'}}>{error}</p>}
                   {file && <button className="btn-primary" style={{width: '100%', marginTop: '30px', justifyContent: 'center'}} onClick={analyzeDocument}>Run Neural Scans</button>}
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
      </div>
      <footer className="main-footer">© 2026 FinanceAI Technologies. Grade-A Master Infrastructure.</footer>
    </div>
  );
}

export default App;
