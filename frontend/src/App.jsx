import { useState, useRef, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, BarChart3, TrendingUp, AlertTriangle, Briefcase, ChevronRight, FileText, Upload, RefreshCw, Layers, ShieldCheck } from 'lucide-react';

// STABLE COMPONENT DEFINITIONS (OUTSIDE APP)
const LandingView = ({ onLaunch, onExplore }) => (
  <div className="landing-page">
    <section className="hero">
      <div className="hero-pill"><ShieldCheck size={14} style={{marginRight: '6px'}}/> Institutional Grade Security</div>
      <h1 className="hero-title">Predictive Intelligence <br/><span>For The Modern Financier</span></h1>
      <p className="hero-subtitle">The world's first automated stress-testing platform. Upload any financial document and generate dynamic 12-month forward predictive models against market shocks.</p>
      <div className="hero-cta">
        <button onClick={onLaunch} className="btn-primary">Launch Prediction Engine <ChevronRight size={18}/></button>
        <button onClick={onExplore} className="btn-secondary">Explore Features ↓</button>
      </div>
    </section>

    <div className="features-grid" id="features">
      <div className="feature-card" onClick={onLaunch}>
        <div className="feature-icon"><Activity/></div>
        <h3>Static to Dynamic</h3>
        <p>We convert historical 10-Ks into living spreadsheets that react to your chosen market macro-environment.</p>
      </div>
      <div className="feature-card" onClick={onLaunch}>
        <div className="feature-icon"><Layers/></div>
        <h3>Risk Forensics</h3>
        <p>Unlocked hidden liabilities buried deep in legal footnotes using advanced NLP proprietary logic.</p>
      </div>
      <div className="feature-card" onClick={onLaunch}>
        <div className="feature-icon"><Briefcase/></div>
        <h3>Institutional Quality</h3>
        <p>Designed for Hedge Funds, VC firms, and M&A analysts seeking immediate quantitative extraction.</p>
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
           <h2 style={{textAlign: 'center'}}>Constructing Predictive Model</h2>
           <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>Our AI is deep-scanning the document to extract baseline cash-burn, debt structures, and revenue guidance...</p>
        </div>
      ) : (
        <div className="upload-card">
           <div style={{textAlign: 'center', marginBottom: '40px'}}>
              <h2 style={{fontSize: '2.5rem', marginBottom: '10px'}}>Analyze & Forecast</h2>
              <p style={{color: 'var(--text-secondary)'}}>Upload a PDF report or TXT filing to generate your real-time dashboard.</p>
           </div>
           
           <div 
              className={`drop-zone ${dragActive ? "active" : ""}`}
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
              onClick={() => inputRef.current.click()}
            >
              <div className="upload-icon"><Upload size={48}/></div>
              {file ? <h3 style={{color: 'white'}}>{file.name}</h3> : <p>Drag & Drop Filing or Click to Browse</p>}
              <input ref={inputRef} type="file" className="file-input" accept=".pdf,.txt" onChange={handleChange} />
            </div>
            
            {error && <div className="error-box" style={{color: 'var(--danger)', textAlign: 'center', marginTop: '16px'}}>{error}</div>}
            <button className="btn-primary" style={{width: '100%', marginTop: '30px', padding: '20px', justifyContent: 'center'}} onClick={analyzeDocument} disabled={!file || loading}>
                 {file ? 'Run Full Forecasting Analysis' : 'Awaiting Selection'}
            </button>
        </div>
      )}
    </div>
  </section>
);

const ResultsView = ({ results, onReset, interestRateShock, setInterestRateShock, costShock, setCostShock, demandShock, setDemandShock, chartData, runwayMonths }) => (
  <section className="results-page">
    <div className="results-wrapper">
      <div className="results-header">
         <div>
            <h1>FinanceAI Intelligence Report</h1>
            <p className="subtitle">Extracted on {new Date().toLocaleDateString()} from your filing</p>
         </div>
         <button className="reset-btn" onClick={onReset}>
           <RefreshCw size={16} style={{marginRight: '8px'}}/> New Analysis
         </button>
      </div>

      <div className="result-card full-width scorecard">
         <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
               <ShieldCheck style={{color: '#10b981'}} />
               <h3>Institutional Scorecard</h3>
            </div>
            <div className={`sentiment-badge ${results.sentiment?.toLowerCase().includes('positive') ? 'positive' : results.sentiment?.toLowerCase().includes('negative') ? 'negative' : 'neutral'}`}>
              {results.sentiment}
            </div>
         </div>
         <div className="metrics-grid">
            {results.keyMetrics?.map((m, i) => (
              <div key={i} className="metric-item highlight">
                 <div className="metric-value">{m.value}</div>
                 <div className="metric-name">{m.name}</div>
              </div>
            ))}
            <div className="metric-item highlight benchmark">
               <div className="metric-value" style={{fontSize: '1.2rem', color: '#60a5fa'}}>{results.marketBenchmark || 'Targeting Sector Average'}</div>
               <div className="metric-name">Market Performance</div>
            </div>
         </div>
      </div>

      <div className="result-card full-width predictor-card">
         <div className="predictor-header">
            <Activity className="predictor-icon" />
            <div>
              <h2>Predictive Forward-Looking Simulator</h2>
              <p>Stress-test company survival under macro shocks.</p>
            </div>
         </div>
         
         <div className="predictor-layout">
            <div className="predictor-controls">
               <div className="control-group">
                  <label>Interest Rate Refinancing Spike</label>
                  <input type="range" min="0" max="10" step="0.5" value={interestRateShock} onChange={(e)=>setInterestRateShock(parseFloat(e.target.value))} />
                  <div className="control-label"><span>0%</span> <span>+{interestRateShock}%</span> <span>10%</span></div>
               </div>
               <div className="control-group">
                  <label>Operational Cost Inflation</label>
                  <input type="range" min="0" max="50" step="1" value={costShock} onChange={(e)=>setCostShock(parseFloat(e.target.value))} />
                  <div className="control-label"><span>0%</span> <span>+{costShock}%</span> <span>50%</span></div>
               </div>
               <div className="control-group">
                  <label>Revenue / Demand Collapse</label>
                  <input type="range" min="0" max="50" step="1" value={demandShock} onChange={(e)=>setDemandShock(parseFloat(e.target.value))} />
                  <div className="control-label"><span>0%</span> <span>-{demandShock}%</span> <span>50%</span></div>
               </div>
               <div className="runway-stat">
                  <span style={{color: 'var(--text-secondary)', display: 'block', marginBottom: '8px'}}>Predicted Survival Runway</span>
                  <h2 style={{color: runwayMonths.includes('>') ? '#10b981' : '#ef4444', fontSize: '2.5rem', fontWeight: '900'}}>{runwayMonths}</h2>
               </div>
            </div>
            
            <div className="predictor-chart">
               <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" tickFormatter={(v)=>`$${(v/1000000).toFixed(0)}M`} />
                      <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff'}} />
                      <Area type="monotone" dataKey="cashReserves" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCash)" strokeWidth={3} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className="results-bottom-grid">
         <div className="result-card">
            <h3 className="section-title" style={{display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px'}}><AlertTriangle style={{color: '#ef4444'}}/> Identified Vulnerabilities</h3>
            <ul className="info-list risks">
               {results.risks?.map((r,i)=><li key={i}>{r}</li>)}
            </ul>
         </div>
         <div className="result-card">
            <h3 className="section-title" style={{display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px'}}><TrendingUp style={{color: '#10b981'}}/> Strategic Opportunities</h3>
            <ul className="info-list opportunities">
               {results.opportunities?.map((o,i)=><li key={i}>{o}</li>)}
            </ul>
         </div>
         <div className="result-card full-width conclusion">
            <h3>Management Assessment</h3>
            <p style={{marginTop: '16px', lineHeight: '1.8', color: 'var(--text-secondary)'}}>{results.summary}</p>
            <div className="final-verdict" style={{marginTop: '30px', padding: '20px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '14px', border: '1px solid rgba(59, 130, 246, 0.2)'}}>
                <strong style={{color: 'white'}}>AI PROJECTION:</strong> {results.conclusion}
            </div>
         </div>
      </div>
    </div>
  </section>
);

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); 
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);

  // Macro Stress Tester State
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
      setError('Unsupported file type. Please upload a PDF or TXT file.');
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
      if (!response.ok) throw new Error(data.error || 'Failed to analyze document');
      if (data.success && data.analysis) {
        setResults(data.analysis);
        setCurrentPage('results');
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
    const months = [];
    const revenueImpact = 1 - (demandShock / 100); 
    const expenseImpact = 1 + (costShock / 100);
    const annualInterestRate = Math.max(0, 0.05 + (interestRateShock / 100));
    const monthlyInterestExp = (base.totalDebt * annualInterestRate) / 12;
    let currentCash = base.currentCashReserves;
    for (let i = 0; i <= 12; i++) {
        const currentRev = base.monthlyRevenue * revenueImpact;
        const currentExp = base.monthlyOperatingExpenses * expenseImpact;
        const netCashFlow = currentRev - currentExp - monthlyInterestExp;
        if (i > 0) currentCash += netCashFlow;
        months.push({
            month: `M${i}`,
            cashReserves: Math.floor(currentCash),
            revenue: Math.floor(currentRev)
        });
    }
    return months;
  }, [results, interestRateShock, costShock, demandShock]);

  const runwayMonths = useMemo(() => {
    if(!chartData.length) return 0;
    const bankruptIndex = chartData.findIndex(d => d.cashReserves <= 0);
    return bankruptIndex === -1 ? '>12 Months' : `${bankruptIndex} Months`;
  }, [chartData]);

  const onExplore = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else {
        setCurrentPage('landing');
        setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }

  return (
    <div className="main-wrapper">
      <nav className="main-nav">
        <div className="nav-logo" onClick={() => setCurrentPage('landing')}>
          <div className="logo-icon"><TrendingUp size={20}/></div>
          <span>FinanceAI</span>
        </div>
        <div className="nav-links">
           <button onClick={onExplore}>Features</button>
           <button onClick={() => setCurrentPage('analyzer')}>Analyze</button>
           <button className="contact-btn" onClick={() => setCurrentPage('analyzer')}>Launch Engine</button>
        </div>
      </nav>

      <div className="content-area">
        {currentPage === 'landing' && <LandingView onLaunch={() => setCurrentPage('analyzer')} onExplore={onExplore} />}
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

      <footer className="main-footer">
        <p>© 2026 FinanceAI Technologies. All rights reserved.</p>
        <div className="footer-links" style={{marginTop: '16px', fontSize: '0.85rem', opacity: 0.6}}>Secure • Compliant • Institutional Grade</div>
      </footer>
    </div>
  );
}

export default App;
