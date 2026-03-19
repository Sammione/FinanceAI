import { useState, useRef, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Scatter, ScatterChart } from 'recharts';
import { Activity, BarChart3, TrendingUp, AlertTriangle, Briefcase, ChevronRight, FileText, Upload, RefreshCw, Layers, ShieldCheck, MessageSquare, Target, Settings, Info, Zap, AlertCircle } from 'lucide-react';

// STABLE COMPONENT DEFINITIONS (OUTSIDE APP)
const LandingView = ({ onLaunch, onExplore }) => (
  <div className="landing-page">
    <section className="hero">
      <div className="hero-pill"><ShieldCheck size={14} style={{marginRight: '6px'}}/> Banking-Grade AI Architecture</div>
      <h1 className="hero-title">Decision Intelligence <br/><span>For Strategic CFOs</span></h1>
      <p className="hero-subtitle">The world's most advanced AI-CFO platform. From document processing to real-time Monte Carlo simulations and Fraud Detection—all in one unified command center.</p>
      <div className="hero-cta">
        <button onClick={onLaunch} className="btn-primary">Initialize AI CFO <ChevronRight size={18}/></button>
        <button onClick={onExplore} className="btn-secondary">Explore Advanced Features ↓</button>
      </div>
    </section>

    <div className="features-grid" id="features">
      <div className="feature-card" onClick={onLaunch}>
        <div className="feature-icon"><Zap/></div>
        <h3>Explainable AI (XAI)</h3>
        <p>Transparency at the core. Inspect every formula (ROE, ROIC, EBITDA) used to derive our institutional-grade forecasts.</p>
      </div>
      <div className="feature-card" onClick={onLaunch}>
        <div className="feature-icon"><Target/></div>
        <h3>Decision Engine</h3>
        <p>Go beyond summary. Get tactical risk-adjusted recommendations for cost reduction and debt refinancing.</p>
      </div>
      <div className="feature-card" onClick={onLaunch}>
        <div className="feature-icon"><RefreshCw/></div>
        <h3>Monte Carlo Risk</h3>
        <p>Simulation engine running thousands of probabilistic scenarios (Best/Worst/Base) to map future volatility.</p>
      </div>
    </div>
  </div>
);

const AnalyzerView = ({ loading, file, dragActive, error, handleDrag, handleDrop, handleChange, analyzeDocument, inputRef }) => (
  <section className="app-section" id="analyzer-app">
    <div className="app-container">
      {loading ? (
        <div className="upload-card central-loading">
           <div className="loader"></div>
           <h2 style={{textAlign: 'center', marginBottom: '10px'}}>Launching Decision Engine...</h2>
           <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>Running Monte Carlo simulations, extracting the Financial Scorecard, and scanning for anomalies...</p>
        </div>
      ) : (
        <div className="upload-card">
           <div style={{textAlign: 'center', marginBottom: '40px'}}>
              <h2 style={{fontSize: '2.5rem', marginBottom: '10px'}}>Strategic Upload</h2>
              <p style={{color: 'var(--text-secondary)'}}>Upload institutional filings to initialize the AI-CFO reasoning engine.</p>
           </div>
           
           <div 
              className={`drop-zone ${dragActive ? "active" : ""}`}
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
              onClick={() => inputRef.current.click()}
            >
              <div className="upload-icon"><Upload size={48}/></div>
              {file ? <h3 style={{color: 'white'}}>{file.name}</h3> : <p>Drop 10-K, 10-Q or Private Filings</p>}
              <input ref={inputRef} type="file" className="file-input" accept=".pdf,.txt" onChange={handleChange} />
            </div>
            
            {error && <div className="error-box" style={{color: 'var(--danger)', textAlign: 'center', marginTop: '16px'}}><AlertCircle style={{display:'inline', marginRight:'8px'}} size={18}/>{error}</div>}
            <button className="btn-primary" style={{width: '100%', marginTop: '30px', padding: '20px', justifyContent: 'center'}} onClick={analyzeDocument} disabled={!file || loading}>
                 {file ? 'Run Quantitative Analysis' : 'Select SEC Filing'}
            </button>
        </div>
      )}
    </div>
  </section>
);

const ResultsView = ({ results, onReset, interestRateShock, setInterestRateShock, costShock, setCostShock, demandShock, setDemandShock, chartData, runwayMonths }) => (
  <section className="results-page">
    <div className="results-wrapper">
      
      {/* TOP HEADER SECTION */}
      <div className="results-header">
         <div>
            <div className="breadcrumb">FinanceAI / Institutional Reporting / v3.4.1</div>
            <h1 style={{marginTop: '10px'}}>Intelligence Command Center</h1>
         </div>
         <div style={{display: 'flex', gap: '12px'}}>
            <button className="btn-secondary" style={{padding: '10px 20px'}} onClick={onReset}>New Case</button>
            <button className="btn-primary" style={{padding: '10px 20px'}}><RefreshCw size={16}/> Live Updates</button>
         </div>
      </div>

      <div className="dashboard-layout">
        <div className="dashboard-sidebar">
            <div className="sidebar-card">
                <h3><Target size={18} style={{marginRight: '8px', color: 'var(--accent-primary)'}}/> Decision Intelligence</h3>
                <div className="strategic-score">
                    <div className="score-value">{results.decisionIntelligence?.overallScore || 0}</div>
                    <div className="score-label">Risk-Adjusted Alpha Score</div>
                </div>
                <div className="recommendations-list">
                    {results.decisionIntelligence?.recommendations?.map((r, i) => (
                        <div key={i} className="rec-item">
                            <span className={`rec-tag ${r.impact?.toLowerCase()}`}>{r.impact} IMPACT</span>
                            <div style={{fontWeight: '700', fontSize: '0.9rem', marginTop: '4px'}}>{r.strategy}</div>
                            <div style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Conf: {(r.confidence*100).toFixed(0)}%</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sidebar-card anomaly-card">
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px'}}>
                    <AlertTriangle color="var(--danger)" />
                    <h3 style={{color: 'var(--text-primary)'}}>Anomaly Scan</h3>
                </div>
                <div className="findings">
                    {results.anomalyDetection?.findings?.map((f, i) => (
                        <div key={i} className="finding-item">{f}</div>
                    ))}
                </div>
            </div>
        </div>

        <div className="dashboard-main">
            {/* SCORECARD */}
            <div className="result-card scorecard" style={{marginBottom: '20px'}}>
                <div className="grid-4">
                   {results.keyMetrics?.map((m, i) => (
                    <div key={i} className="metric-box">
                       <div className="metric-v">{m.value}</div>
                       <div className="metric-n">{m.name} <Info size={12} className="info-trigger" title={results.explainability?.formulasUsed?.[i] || ""} /></div>
                    </div>
                   ))}
                   <div className="metric-box benchmark-box">
                       <div className="metric-v">{results.sentiment}</div>
                       <div className="metric-n">CFO Tone Analysis</div>
                   </div>
                </div>
            </div>

            {/* MONTE CARLO PREDICTOR */}
            <div className="result-card predictor-card">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
                    <div>
                        <h2>Monte Carlo Cash Probability</h2>
                        <p style={{color: 'var(--text-secondary)'}}>Adjust shock parameters to see probabilistic bands (Best/Base cases).</p>
                    </div>
                    <div className="runway-big">
                        <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>Projected Survival</span>
                        <div style={{fontSize: '1.8rem', fontWeight: '900', color: runwayMonths.includes('>') ? 'var(--success)' : 'var(--danger)'}}>{runwayMonths}</div>
                    </div>
                </div>

                <div className="predictor-layout">
                    <div className="p-controls">
                        <div className="c-field">
                            <label>Refinancing Spike (%)</label>
                            <input type="range" min="0" max="10" value={interestRateShock} onChange={(e)=>setInterestRateShock(parseFloat(e.target.value))} />
                        </div>
                        <div className="c-field">
                            <label>Cost Shock (%)</label>
                            <input type="range" min="0" max="50" value={costShock} onChange={(e)=>setCostShock(parseFloat(e.target.value))} />
                        </div>
                        <div className="c-field">
                            <label>Demand Impact (%)</label>
                            <input type="range" min="0" max="50" value={demandShock} onChange={(e)=>setDemandShock(parseFloat(e.target.value))} />
                        </div>
                        <div className="xai-explanation">
                            <h4>Explainable Logic</h4>
                            {results.explainability?.formulasUsed?.map((f, i) => (
                                <code key={i}>{f}</code>
                            ))}
                        </div>
                    </div>
                    <div className="p-chart-area">
                        <ResponsiveContainer width="100%" height={320}>
                            <AreaChart data={chartData}>
                                <defs>
                                  <linearGradient id="probBand" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" stroke="var(--text-secondary)" />
                                <YAxis tickFormatter={(v)=>`$${(v/1000000).toFixed(0)}M`} stroke="var(--text-secondary)" />
                                <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155'}} />
                                <Area type="monotone" dataKey="cashReserves" stroke="var(--accent-primary)" strokeWidth={3} fill="url(#probBand)" name="Base Projection" />
                                <Area type="monotone" dataKey="bestCase" stroke="#10b981" fill="none" strokeDasharray="5 5" name="Best Case" />
                                <Area type="monotone" dataKey="worstCase" stroke="#ef4444" fill="none" strokeDasharray="5 5" name="Worst Case" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* PEER BENCHMARK */}
            <div className="result-card peer-card" style={{marginTop: '20px'}}>
                <h3 style={{marginBottom: '20px'}}>Global Industry Positioning</h3>
                <div className="peer-grid">
                    {results.peerBenchmarking?.map((p, i) => (
                        <div key={i} className="peer-box">
                            <span className="p-name">{p.peerName}</span>
                            <span className="p-rev">{p.revenue} / {p.margin}</span>
                            <span className="p-stat" style={{color: p.status?.includes('Strong') ? 'var(--success)' : 'var(--danger)'}}>{p.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  </section>
);

const CFOChat = ({ results }) => (
  <div className="cfo-chat">
    <div className="chat-header">
       <MessageSquare size={16} /> AI CFO Advisor
    </div>
    <div className="chat-body">
       <div className="chat-msg system">How can I assist you with your quantitative strategy today?</div>
       <div className="chat-msg system">Based on the analysis, I recommend focusing on {results?.decisionIntelligence?.recommendations?.[0]?.strategy} due to its high impact score.</div>
    </div>
    <div className="chat-input-row">
       <input placeholder="Ask about the debt logic..." />
       <button><Zap size={14}/></button>
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); 
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const inputRef = useRef(null);

  const [interestRateShock, setInterestRateShock] = useState(0);
  const [costShock, setCostShock] = useState(0);
  const [demandShock, setDemandShock] = useState(0);

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (selectedFile) => {
    setError('');
    if (selectedFile.type !== 'application/pdf' && selectedFile.type !== 'text/plain') {
      setError('Unsupported file type. Use PDF/TXT.');
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const analyzeDocument = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('document', file);
    try {
      const response = await fetch('/api/analyze', { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Check backend/env');
      if (data.success && data.analysis) {
        setResults(data.analysis);
        setCurrentPage('results');
        setShowChat(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const chartData = useMemo(() => {
    if (!results || !results.baselineFinancials) return [];
    const base = results.baselineFinancials;
    const monte = results.monteCarlo || { bestCaseRevenueGrowth: 1.05, worstCaseRevenueGrowth: 0.95 };
    const months = [];
    const revenueImpact = 1 - (demandShock / 100); 
    const expenseImpact = 1 + (costShock / 100);
    const annualInterestRate = Math.max(0, 0.05 + (interestRateShock / 100));
    const monthlyInterestExp = (base.totalDebt * annualInterestRate) / 12;
    
    let currentCash = base.currentCashReserves;
    let bCash = base.currentCashReserves;
    let wCash = base.currentCashReserves;

    for (let i = 0; i <= 12; i++) {
        const curRev = base.monthlyRevenue * revenueImpact;
        const curExp = base.monthlyOperatingExpenses * expenseImpact;
        const netFlow = curRev - curExp - monthlyInterestExp;
        
        // Monte Carlo probabilities
        const bRev = curRev * monte.bestCaseRevenueGrowth;
        const wRev = curRev * monte.worstCaseRevenueGrowth;

        if (i > 0) {
            currentCash += netFlow;
            bCash += (bRev - curExp - monthlyInterestExp);
            wCash += (wRev - curExp - monthlyInterestExp);
        }
        
        months.push({
            month: `M${i}`,
            cashReserves: Math.floor(currentCash),
            bestCase: Math.floor(bCash),
            worstCase: Math.floor(wCash)
        });
    }
    return months;
  }, [results, interestRateShock, costShock, demandShock]);

  const runwayMonths = useMemo(() => {
    if(!chartData.length) return 0;
    const bankruptIndex = chartData.findIndex(d => d.cashReserves <= 0);
    return bankruptIndex === -1 ? '>12 Months' : `${bankruptIndex} Months`;
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
           <button onClick={() => setCurrentPage('analyzer')}>The Engine</button>
           <button className="contact-btn" onClick={() => setCurrentPage('analyzer')}>Request Demo</button>
        </div>
      </nav>

      <div className="content-area">
        {currentPage === 'landing' && <LandingView onLaunch={() => setCurrentPage('analyzer')} onExplore={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})} />}
        {currentPage === 'analyzer' && (
            <AnalyzerView 
                loading={loading} file={file} dragActive={dragActive} error={error}
                handleDrag={handleDrag} handleDrop={handleDrop} handleChange={handleChange}
                analyzeDocument={analyzeDocument} inputRef={inputRef}
            />
        )}
        {currentPage === 'results' && results && (
            <ResultsView 
                results={results} onReset={() => { setResults(null); setFile(null); setCurrentPage('analyzer'); }}
                interestRateShock={interestRateShock} setInterestRateShock={setInterestRateShock}
                costShock={costShock} setCostShock={setCostShock}
                demandShock={demandShock} setDemandShock={setDemandShock}
                chartData={chartData} runwayMonths={runwayMonths}
            />
        )}
      </div>

      {showChat && results && <CFOChat results={results} />}

      <footer className="main-footer">
        <div className="footer-content">
            <div className="footer-brand">FinanceAI CFO Platform</div>
            <p>Advanced Quantitative Reasoning Engine for Enterprise Finance.</p>
            <div className="footer-copy">© 2026 FinanceAI Technologies. Protected by Bank-Grade Encryption.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
