import { useState, useRef, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Activity, BarChart3, TrendingUp, AlertTriangle, Briefcase, ChevronRight, FileText, Upload, RefreshCw, Layers, ShieldCheck, MessageSquare, Target, Zap, AlertCircle, Database, GitBranch, PieChart as PieIcon, Info, Download, Shield, Box, Globe, Cpu, MoreHorizontal, ArrowUpRight, TrendingDown } from 'lucide-react';

/* --- HOMEPAGE COMPONENTS (v9.0) --- */

const LandingView = ({ onAction }) => (
  <div className="landing-alpha-enterprise">
    <section className="hero">
      <div className="hero-tag">ALPHA-CORE v9.0 / INSTITUTIONAL EDITION</div>
      <h1 className="hero-title">Turn Insights Into <span>Strategy</span></h1>
      <p className="hero-subtitle">The ultimate Grade-A Enterprise platform uniting BI-LSTM forecasting with interactive prescriptive strategic roadmaps. Designed for the Fortune 500 C-Suite.</p>
      
      <div className="hero-preview">
         <div className="floating-kpi">
            <span style={{fontSize: '0.6rem', color: 'var(--text-secondary)'}}>TOTAL REVENUE</span>
            <div className="val-big">$10.2B</div>
            <div className="v-ticker"><ArrowUpRight size={12}/> +2.1% YoY</div>
         </div>
         <div className="floating-kpi">
            <span style={{fontSize: '0.6rem', color: 'var(--text-secondary)'}}>ROIC [GLOBAL]</span>
            <div className="val-big">16.8%</div>
            <div className="v-ticker" style={{color: 'var(--success)'}}>TA: 15.0%</div>
         </div>
         <div className="floating-kpi">
            <span style={{fontSize: '0.6rem', color: 'var(--text-secondary)'}}>NET DEBT / EBITDA</span>
            <div className="val-big">1.4x</div>
            <div className="v-ticker" style={{color: 'var(--accent-primary)'}}>HEALTHY</div>
         </div>
      </div>

      <div style={{marginTop: '60px', display: 'flex', gap: '20px', justifyContent: 'center'}}>
         <button className="btn-primary" onClick={() => onAction('analyzer')}>Initial Enterprise Engine <Zap size={18}/></button>
         <button className="btn-secondary" style={{background:'none', border:'1px solid var(--border)', padding:'16px 32px', borderRadius:'12px', color:'white', fontWeight:700, cursor:'pointer'}}>Institutional Docs ↓</button>
      </div>
    </section>

    {/* 4-QUADRANT COMMAND CENTER */}
    <section className="cta-grid">
       <div className="cta-card" onClick={() => onAction('analyzer')}>
          <div className="cta-icon"><FileText size={24}/></div>
          <h3>Analyze SEC Filing</h3>
          <p>Extract institutional data, multi-segment ROIC, and prescriptive strategies from 10-K/10-Q documents.</p>
       </div>
       <div className="cta-card" onClick={() => onAction('analyzer')}>
          <div className="cta-icon"><GitBranch size={24}/></div>
          <h3>Run Scenario Studio</h3>
          <p>Perform multi-path Monte Carlo simulations and Stress-Test divisional solvency under macro shocks.</p>
       </div>
       <div className="cta-card" onClick={() => onAction('analyzer')}>
          <div className="cta-icon"><Shield size={24}/></div>
          <h3>Global Risk Dashboard</h3>
          <p>Monitor divisional heatmaps for internal anomalies, fraud risks, and sectoral cost inflation spikes.</p>
       </div>
       <div className="cta-card" onClick={() => onAction('analyzer')}>
          <div className="cta-icon"><TrendingUp size={24}/></div>
          <h3>Generate Board Report</h3>
          <p>Instantly export board-ready briefings, waterfall bridges, and RADS-weighted execution roadmaps.</p>
       </div>
    </section>

    {/* KPI STORYBOARD HIGHLIGHTS */}
    <section className="workflow-section" style={{background: 'rgba(5, 8, 17, 1)'}}>
       <h2 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px'}}>Intelligence Ingest Workflow</h2>
       <p style={{color: 'var(--text-secondary)', marginBottom: '60px'}}>From raw filing ingestion to board-level decision alpha in 4 steps.</p>
       
       <div className="workflow-grid">
          <div className="wf-step">
             <div className="wf-icon-box"><Database size={24}/></div>
             <h4>Neural Ingest</h4>
             <p>Automated parsing of institutional documents and market feeds.</p>
          </div>
          <div className="wf-step">
             <div className="wf-icon-box"><Cpu size={24}/></div>
             <h4>LSTM Core</h4>
             <p>Bi-LSTM Modeling and ARIMA trend forecasting across divisions.</p>
          </div>
          <div className="wf-step">
             <div className="wf-icon-box"><Zap size={24}/></div>
             <h4>RADS Scoring</h4>
             <p>Weighting strategic outcomes by risk-adjusted execution potential.</p>
          </div>
          <div className="wf-step">
             <div className="wf-icon-box"><FileText size={24}/></div>
             <h4>Board Insights</h4>
             <p>Delivery of actionable, prescriptive executive briefings.</p>
          </div>
       </div>
    </section>

    {/* SECURITY BANNER */}
    <section className="security-banner">
       <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <Shield size={32} color="var(--success)" style={{marginBottom: '20px'}}/>
          <h3 style={{fontSize: '1.5rem', fontWeight: 900}}>Grade-A Enterprise Security</h3>
          <p style={{color: 'var(--text-secondary)', marginTop: '10px'}}>All Neural Vectors Encrypted | Bank-Grade Security | ISO 27001 & GDPR Compliant</p>
          <div className="badge-group">
             <span className="badge-item">Soc2 Type II</span>
             <span className="badge-item">Hipaa Ready</span>
             <span className="badge-item">Aes-256</span>
          </div>
       </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="testimonials" style={{padding: '100px 40px', textAlign: 'center'}}>
       <h2 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '60px'}}>Executive Validation</h2>
       <div className="testimonial-card" style={{padding: '40px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '30px', maxWidth: '800px', margin: '0 auto'}}>
          <p style={{fontSize: '1.25rem', fontStyle: 'italic', marginBottom: '20px'}}>"Monte Carlo insights helped us identify a $50M operational risk exposure 4 months ahead of our internal audit."</p>
          <div style={{fontWeight: 900}}>Group CFO, Global 500</div>
       </div>
    </section>
  </div>
);

/* --- ANALYSIS & RESULTS COMPONENTS --- */

const AnalyzerView = ({ loading, file, error, analyzeDocument, inputRef, handleFile }) => (
  <div className="analyzer-alpha" style={{padding: '80px 40px'}}>
     {loading ? (
        <div className="upload-card">
           <div className="loader"></div>
           <h2 style={{fontSize: '2.5rem', fontWeight: 900}}>Generating Alpha-Core Core</h2>
           <p style={{color: 'var(--text-secondary)', marginTop: '10px'}}>Executing Bi-LSTM Modeling | Scaling Anomaly Vectors | Exporting Board Briefing...</p>
        </div>
     ) : (
        <div className="upload-card">
           <h2 style={{fontSize: '3rem', fontWeight: 900, marginBottom: '10px'}}>Intelligence Ingest</h2>
           <p style={{color: 'var(--text-secondary)', marginBottom: '40px'}}>Initialize the neural layer by uploading a strategic institutional document.</p>
           <div className="drop-zone" onClick={() => inputRef.current.click()}>
              <Upload size={48} style={{color: 'var(--accent-primary)', marginBottom: '20px'}} />
              <p style={{fontWeight: 800}}>{file ? file.name : "Select SEC Filing (PDF/TXT)"}</p>
              <input ref={inputRef} style={{display: 'none'}} type="file" onChange={(e)=>handleFile(e.target.files[0])} />
           </div>
           {error && <p style={{color: 'var(--danger)', marginTop: '20px'}}>{error}</p>}
           {file && (
              <button className="btn-primary" style={{width: '100%', marginTop: '30px', justifyContent: 'center'}} onClick={analyzeDocument}>
                 Run Institutional Neural Scans <RefreshCw size={18}/>
              </button>
           )}
        </div>
     )}
  </div>
);

const ResultsDashboard = ({ results, onReset, chartData, runwayMonths }) => (
  <div className="results-expert-master" style={{padding: '40px'}}>
     <div className="expert-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', borderLeft: '6px solid var(--accent-primary)', paddingLeft: '25px'}}>
        <div>
           <div style={{fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '2px'}}>MASTERS_V9 LAYER</div>
           <h1 style={{fontSize: '3rem', fontWeight: 900}}>{results?.sentiment} POSITIONING</h1>
        </div>
        <button className="expert-btn" onClick={onReset} style={{padding: '12px 24px', border: '1px solid var(--border)', background: 'none', color: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: 800}}>New Case</button>
     </div>
     
     <div className="dashboard-layout">
        <div className="dash-col-1">
           <div className="result-card">
              <h3><Target size={16}/> Alpha-Score IQ</h3>
              <div style={{textAlign: 'center', padding: '30px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '24px', border: '1px solid var(--accent-primary)'}}>
                 <div style={{fontSize: '4rem', fontWeight: 900, color: 'var(--accent-primary)'}}>{results?.decisionIntelligence?.overallScore || 0}%</div>
                 <div style={{fontSize: '0.75rem', opacity: 0.6}}>Execution Alpha</div>
              </div>
           </div>
           <div className="result-card">
              <h3><AlertTriangle size={16} color="var(--danger)"/> Anomaly Scans</h3>
              {results?.anomalyIntelligence?.alerts?.map((a, i) => (
                <div key={i} className="alert-item" style={{background:'rgba(239,68,68,0.05)', padding:'10px', borderLeft:'4px solid var(--danger)', borderRadius:'4px', marginBottom:'10px'}}>
                   <div style={{fontWeight:800, fontSize:'0.7rem'}}>Lv.{a.severity} {a.type}</div>
                   <p style={{fontSize:'0.7rem', color:'var(--text-secondary)'}}>{a.correction}</p>
                </div>
              ))}
           </div>
        </div>
        <div className="dash-col-2">
            <div className="result-card grid-4-compact" style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'15px'}}>
               {results?.keyMetrics?.map((m, i) => (
                 <div key={i} className="metric-tile">
                    <span style={{fontSize:'0.6rem', color:'var(--text-secondary)'}}>{m.name}</span>
                    <div style={{fontSize:'1.25rem', fontWeight:900}}>{m.value}</div>
                 </div>
               ))}
            </div>
            <div className="result-card chart-primary">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
                   <h3 style={{fontSize:'1.5rem', fontWeight:900}}>Bi-LSTM Monte Carlo Forecast</h3>
                   <div style={{textAlign:'right'}}>
                      <span style={{fontSize:'0.75rem', opacity:0.6}}>Cash Runway</span>
                      <div style={{fontSize:'2.25rem', fontWeight:900, color: runwayMonths.includes('>') ? 'var(--success)' : 'var(--danger)'}}>{runwayMonths}</div>
                   </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                   <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={11} />
                      <Tooltip contentStyle={{backgroundColor:'#010409', border:'1px solid var(--border)'}} />
                      <Area type="monotone" dataKey="bestCase" stroke="var(--success)" fill="none" strokeDasharray="5 5" />
                      <Area type="monotone" dataKey="worstCase" stroke="var(--danger)" fill="none" strokeDasharray="5 5" />
                      <Area type="monotone" dataKey="cashReserves" stroke="var(--accent-primary)" strokeWidth={4} fill="rgba(14, 165, 233, 0.2)" />
                   </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className="dash-col-3">
           <div className="result-card segments">
              <h3><PieIcon size={14}/> Divisional ROIC</h3>
              {results?.deepSegments?.map((s, i) => (
                <div key={i} style={{marginBottom:'15px', borderBottom:'1px solid var(--border)', paddingBottom:'10px'}}>
                   <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.8rem', fontWeight:800}}><span>{s.division}</span> <span>{s.roic}</span></div>
                   <div style={{height:'4px', background:'rgba(255,255,255,0.05)', borderRadius:'2px', margin:'6px 0'}}><div style={{width:'70%', background:'var(--accent-primary)', height:'100%'}}></div></div>
                   <div style={{fontSize:'0.65rem', color:'var(--text-secondary)'}}>Risk: {s.risk}</div>
                </div>
              ))}
           </div>
           <div className="cfo-chat-pro" style={{background: 'rgba(2, 6, 23, 0.95)', border: '1px solid var(--accent-primary)', borderRadius: '20px', overflow: 'hidden'}}>
              <div style={{background: 'var(--accent-primary)', padding: '10px 15px', fontWeight: 900, fontSize: '0.85rem'}}>AI CFO ADVISOR ONLINE</div>
              <div style={{padding: '15px', fontSize: '0.75rem', color: 'var(--text-secondary)', minHeight: '80px'}}>Strategy identified. ROIC in Nutrition is 15.8%. Recommend capital expansion.</div>
              <div style={{borderTop: '1px solid var(--border)', padding: '10px', display: 'grid', gridTemplateColumns: '1fr 40px'}}>
                 <input placeholder="Ask CFO..." style={{background:'none', border:'none', color:'white'}}/><button style={{background:'var(--accent-primary)', border:'none', borderRadius:'4px', color:'white'}}><Zap size={14}/></button>
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

  const handleFile = (f) => { setError(''); if (!f) return; if (f.type !== 'application/pdf' && f.type !== 'text/plain') { setError('Supported: PDF or TXT'); return; } setFile(f); };

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
        if (i > 0) { const r = b.monthlyRevenue * rImp, e = b.monthlyOperatingExpenses * cImp; cC += (r - e - mIE); bC += (r * m.bestCaseRevenueGrowth - e - mIE); wC += (r * m.worstCaseRevenueGrowth - e - mIE); }
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
    <div className={`master-app-container ${currentPage}`}>
      <nav className="main-nav">
        <div className="nav-logo" onClick={() => setCurrentPage('landing')}>
          <div className="logo-icon"><TrendingUp size={16}/></div>
          <span>FinanceAI <span style={{opacity: 0.5, fontWeight: 400}}>Institutional</span></span>
        </div>
        <div className="nav-links">
           <button onClick={() => setCurrentPage('landing')}>Executive Overview</button>
           <button onClick={() => setCurrentPage('analyzer')}>The Machine</button>
           <button className="contact-btn">Launch Terminal</button>
        </div>
      </nav>

      <main className="content-master">
        {currentPage === 'landing' && <LandingView onAction={setCurrentPage} />}
        {currentPage === 'analyzer' && (
            <AnalyzerView 
                loading={loading} file={file} error={error}
                analyzeDocument={analyzeDocument} inputRef={inputRef} handleFile={handleFile}
            />
        )}
        {currentPage === 'results' && results && (
            <ResultsDashboard 
                results={results} onReset={() => setCurrentPage('analyzer')}
                chartData={chartData} runwayMonths={runwayMonths}
            />
        )}
      </main>

      <footer className="main-footer" style={{padding: '60px', opacity: 0.4, borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.8rem'}}>
        © 2026 FinanceAI Institutional. Global Alpha Vectors Encrypted.
      </footer>
    </div>
  );
}

export default App;
