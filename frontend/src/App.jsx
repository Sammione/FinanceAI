import { useState, useRef, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Activity, BarChart3, TrendingUp, AlertTriangle, Briefcase, ChevronRight, FileText, Upload, RefreshCw, Layers, ShieldCheck, MessageSquare, Target, Zap, AlertCircle, Database, GitBranch, PieChart as PieIcon, Info, Download, Shield, Box, Globe, Cpu, MoreHorizontal, ArrowUpRight, TrendingDown, Lock, Search, Filter } from 'lucide-react';

/* --- HOMEPAGE COMPONENTS (v9.5) --- */

const LandingView = ({ onAction }) => (
  <div className="landing-alpha-enterprise">
    <section className="hero">
      <div className="hero-tag">INTELLIGENCE PLATFORM V2.0</div>
      <h1 className="hero-title">Intelligent Business <br/><span>Financials</span></h1>
      <p className="hero-subtitle">The first AI-powered companion for accountants and financial consultants. Transform complex reports into clear, actionable business insights with 100% accuracy and depth.</p>
      
      <div className="hero-preview">
         <div className="floating-kpi">
            <span style={{fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 800}}>TOTAL REVENUE</span>
            <div className="val-big">$10.2M</div>
            <div className="v-ticker"><ArrowUpRight size={12}/> +5.4% YoY</div>
         </div>
         <div className="floating-kpi active-kpi" style={{borderColor: 'var(--accent-vibrant)'}}>
            <span style={{fontSize: '0.65rem', color: 'var(--accent-vibrant)', fontWeight: 800}}>GROSS MARGIN</span>
            <div className="val-big">42.8%</div>
            <div className="v-ticker" style={{color: 'var(--accent-success)'}}>Strong</div>
         </div>
         <div className="floating-kpi" style={{borderColor: 'var(--accent-warm)'}}>
            <span style={{fontSize: '0.65rem', color: 'var(--accent-warm)', fontWeight: 800}}>CASH RESERVE</span>
            <div className="val-big">$2.4M</div>
            <div className="v-ticker" style={{color: 'var(--accent-warm)'}}>Stable</div>
         </div>
      </div>

      <div style={{marginTop: '60px', display: 'flex', gap: '20px', justifyContent: 'center'}}>
         <button className="btn-primary" onClick={() => onAction('analyzer', 'standard')} style={{padding: '20px 48px', fontSize: '1.2rem'}}>Start Analysis <Zap size={18}/></button>
         <button className="btn-secondary" onClick={() => document.getElementById('workflow')?.scrollIntoView({behavior:'smooth'})} style={{background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)', padding:'20px 48px', borderRadius:'12px', color:'white', fontWeight:700, cursor:'pointer', fontSize: '1rem'}}>How it works ↓</button>
      </div>
    </section>

    {/* COMMAND CENTER GRID */}
    <section className="cta-grid">
       <div className="cta-card" onClick={() => onAction('analyzer', 'audit')}>
          <div className="cta-icon"><Database size={32}/></div>
          <h3 style={{fontSize: '1.4rem', fontWeight: 900}}>Analyze Filings</h3>
          <p>Instantly extract revenue, operating profit, and key financial ratios from any 10-K, 10-Q, or annual report.</p>
       </div>
       <div className="cta-card" onClick={() => onAction('analyzer', 'forecast')}>
          <div className="cta-icon"><GitBranch size={32}/></div>
          <h3 style={{fontSize: '1.4rem', fontWeight: 900}}>Future Forecasts</h3>
          <p>Run complex simulations to predict cash flow and business sustainability under different market conditions.</p>
       </div>
       <div className="cta-card" onClick={() => onAction('analyzer', 'risk')}>
          <div className="cta-icon"><Shield size={32}/></div>
          <h3 style={{fontSize: '1.4rem', fontWeight: 900}}>Risk Assessment</h3>
          <p>Identify hidden risks in the balance sheet, including debt exposure, currency fluctuations, and liquidity gaps.</p>
       </div>
       <div className="cta-card" onClick={() => onAction('analyzer', 'briefing')}>
          <div className="cta-icon"><Target size={32}/></div>
          <h3 style={{fontSize: '1.4rem', fontWeight: 900}}>Executive Reports</h3>
          <p>Generate clear, professional summaries ready for board meetings or client presentations with deep insights.</p>
       </div>
    </section>

    <section id="workflow" className="workflow-section">
       <h2 style={{fontSize: '3rem', fontWeight: 900, marginBottom: '20px', letterSpacing: '-2px'}}>Simple. Accurate. Professional.</h2>
       <div className="workflow-grid">
          <div className="wf-step">
             <div className="wf-icon-box" style={{borderColor: 'var(--accent-primary)'}}><RefreshCw size={24} className="spin-slow"/></div>
             <h4>Auto-Extraction</h4>
             <p>Our AI reads your documents and correctly categorizes every line item.</p>
          </div>
          <div className="wf-step">
             <div className="wf-icon-box" style={{borderColor: 'var(--accent-vibrant)'}}><Globe size={24}/></div>
             <h4>Smart Benchmarking</h4>
             <p>Compare performance against industry standards and previous periods.</p>
          </div>
          <div className="wf-step">
             <div className="wf-icon-box" style={{borderColor: 'var(--accent-warm)'}}><Target size={24}/></div>
             <h4>Return Analysis</h4>
             <p>Deep dive into ROI and ROCE to see how efficiently capital is being used.</p>
          </div>
          <div className="wf-step">
             <div className="wf-icon-box" style={{borderColor: 'var(--accent-success)'}}><ShieldCheck size={24}/></div>
             <h4>Data Integrity</h4>
             <p>Every number is linked back to the original document for easy verification.</p>
          </div>
       </div>
    </section>
  </div>
);

/* --- ANALYSIS & RESULTS COMPONENTS --- */
const AnalyzerView = ({ loading, progress, file, error, analyzeDocument, inputRef, handleFile, mode }) => (
  <div className="analyzer-alpha" style={{padding: '120px 40px'}}>
     {loading ? (
        <div className="upload-card" style={{maxWidth: '900px', margin: '0 auto', padding: '100px 60px', textAlign: 'left', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '40px', border: '1px solid var(--border)'}}>
           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px'}}>
              <div>
                 <div style={{fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '2px', marginBottom: '10px'}}>ANALYSIS IN PROGRESS</div>
                 <h2 style={{fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-4px', lineHeight: 1}}>Reading Your <br/>Financial Data</h2>
              </div>
              <div style={{fontSize: '4rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.8}}>{progress}%</div>
           </div>
           
           <div className="modern-progress-bar" style={{height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', marginBottom: '40px', border: '1px solid var(--border)'}}>
              <div style={{height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-vibrant))', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)', borderRadius: '6px', transition: 'width 0.3s ease-out'}}></div>
           </div>

           <div className="processing-subtasks" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.85rem', color:'var(--text-secondary)'}}><RefreshCw size={14} className="spin-slow" style={{color:'var(--accent-primary)'}}/> Extracting Income Statement</div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.85rem', color:'var(--text-secondary)'}}><Globe size={14} className="pulse-dot" style={{color:'var(--accent-primary)'}}/> Calculating Growth Ratios</div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.85rem', color:'var(--accent-primary)'}}><GitBranch size={14} style={{color:'var(--accent-vibrant)'}}/> Building Future Simulations</div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.85rem', color:'var(--text-secondary)'}}><ShieldCheck size={14} style={{color:'var(--accent-success)'}}/> Verifying Source Accuracy</div>
           </div>
        </div>
     ) : (
        <div className="upload-card" style={{maxWidth: '1000px', margin: '0 auto', background: 'rgba(15, 23, 42, 0.4)', padding: '80px 60px', borderRadius: '40px', border: '1px solid rgba(59, 130, 246, 0.2)', backdropFilter: 'blur(40px)'}}>
           <div style={{marginBottom: '50px', textAlign: 'center'}}>
              <h2 style={{fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-4px'}}>Document Upload</h2>
              <p style={{color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '15px auto 0'}}>Upload your financial statements (PDF, Excel, or CSV) for a comprehensive review and deep analysis.</p>
           </div>
           <div className="drop-zone" onClick={() => inputRef.current.click()} style={{padding: '80px', border: '2px dashed var(--accent-primary)', borderRadius: '30px', background: 'rgba(59, 130, 246, 0.03)', transition: '0.4s', cursor: 'pointer', position: 'relative'}}>
              <Upload size={64} style={{color: 'var(--accent-primary)', marginBottom: '30px'}} />
              <p style={{fontSize: '1.4rem', fontWeight: 900}}>{file ? file.name : "Select Financial Report to Analyze"}</p>
              <input ref={inputRef} style={{display: 'none'}} type="file" onChange={(e)=>handleFile(e.target.files[0])} />
           </div>
           <div className="ingestion-trust-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '60px', opacity: 0.6}}>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.75rem', fontWeight:800}}><ShieldCheck size={18} color="var(--accent-success)"/> SEC & XBRL COMPLIANT</div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.75rem', fontWeight:800}}><Database size={18} color="var(--accent-primary)"/> AI-DRIVEN ACCURACY</div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.75rem', fontWeight:800}}><Lock size={18} color="var(--accent-vibrant)"/> AES-256 SECURE</div>
           </div>
           {error && <p style={{color: 'var(--danger)', marginTop: '30px', textAlign: 'center', fontWeight: 700}}>{error}</p>}
           {file && (
              <button className="btn-primary" style={{width: '100%', marginTop: '50px', justifyContent: 'center', height: '80px', fontSize: '1.25rem'}} onClick={() => analyzeDocument(mode)}>
                 Start Financial Scan <Zap size={24}/>
              </button>
           )}
        </div>
     )}
  </div>
);const MetricsMatrix = ({ metrics }) => (
  <div className="metrics-matrix-adaptive" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px'}}>
     {metrics?.map((m, i) => (
       <div key={i} className="metric-tile-v11">
          <div style={{fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 800}}>
             {m.name}
          </div>
          <div style={{fontSize: '1.8rem', fontWeight: 900, color: 'white', marginBottom: '4px'}}>{m.value}</div>
          <div style={{fontSize: '0.7rem', color: 'var(--accent-primary)', opacity: 0.8, fontWeight: 700}}>
             {m.description}
          </div>
       </div>
     ))}
  </div>
);

const ProfitabilityBoard = ({ data }) => (
  <div className="result-card" style={{background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)'}}>
     <h3><PieIcon size={16}/> Profitability & Performance</h3>
     <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px'}}>
        <div>
           <div style={{fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 800}}>ROI</div>
           <div style={{fontSize: '1.5rem', fontWeight: 900}}>{data?.roi || 'N/A'}</div>
        </div>
        <div>
           <div style={{fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 800}}>ROCE</div>
           <div style={{fontSize: '1.5rem', fontWeight: 900}}>{data?.roce || 'N/A'}</div>
        </div>
        <div>
           <div style={{fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 800}}>GROSS MARGIN</div>
           <div style={{fontSize: '1.5rem', fontWeight: 900}}>{data?.grossMargin || 'N/A'}</div>
        </div>
        <div>
           <div style={{fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 800}}>OPERATING MARGIN</div>
           <div style={{fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-vibrant)'}}>{data?.operatingMargin || 'N/A'}</div>
        </div>
        <div>
           <div style={{fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 800}}>NET MARGIN</div>
           <div style={{fontSize: '1.5rem', fontWeight: 900}}>{data?.netMargin || 'N/A'}</div>
        </div>
     </div>
  </div>
);

const SegmentComparativePanel = ({ segments }) => (
  <div className="result-card segment-v11">
     <h3><Box size={16}/> Business Segment Analysis</h3>
     <div className="segment-table-v11" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
        {segments?.map((s, i) => (
          <div key={i} style={{background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '18px', border: '1px solid var(--border)'}}>
             <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                <span style={{fontWeight: 900, fontSize: '1.1rem'}}>{s.name}</span>
                <span style={{color: 'var(--accent-primary)', fontWeight: 900}}>{s.roic} ROIC</span>
             </div>
             <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)'}}>
                <span>Revenue: <b style={{color: 'white'}}>{s.revenue}</b></span>
                <span>Profit: <b style={{color: 'white'}}>{s.profit}</b></span>
             </div>
             <p style={{fontSize: '0.75rem', marginTop: '10px', color: 'var(--text-muted)'}}>{s.context}</p>
          </div>
        ))}
     </div>
  </div>
);

const MonteCarloScenarioStudio = ({ data, runway, currency }) => {
  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1.0e+9) return (value / 1.0e+9).toFixed(1) + "B";
    if (Math.abs(value) >= 1.0e+6) return (value / 1.0e+6).toFixed(1) + "M";
    if (Math.abs(value) >= 1.0e+3) return (value / 1.0e+3).toFixed(1) + "k";
    return value.toFixed(0);
  };

  return (
    <div className="result-card monte-v11">
       <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
          <div>
             <h3><GitBranch size={16}/> Business Sustainability Forecast</h3>
             <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px'}}>
                Executing <b>1,000 simulations</b> per month | 95% Confidence Interval
             </p>
          </div>
          <div style={{fontSize: '1.6rem', fontWeight: 900, color: runway === 12 ? 'var(--accent-success)' : 'var(--accent-vibrant)', background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '15px'}}>
             {runway === 12 ? '>12' : runway} <span style={{fontSize: '0.8rem', opacity: 0.6}}>Months Runway</span>
          </div>
       </div>
       <div style={{height: '320px', width: '100%', marginTop: '20px'}}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.4}/><stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(val) => [formatCurrency(val), "Cash"]}
                contentStyle={{background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '16px', fontSize: '12px', backdropFilter: 'blur(20px)'}} 
              />
              <Area type="monotone" dataKey="bestCase" stroke="transparent" fill="var(--accent-success)" fillOpacity={0.05} />
              <Area type="monotone" dataKey="worstCase" stroke="transparent" fill="var(--accent-vibrant)" fillOpacity={0.05} />
              <Area type="monotone" dataKey="cashReserves" stroke="var(--accent-primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorCash)" />
            </AreaChart>
          </ResponsiveContainer>
       </div>
       <div style={{marginTop: '20px', fontSize: '0.65rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px'}}>
          <Info size={12}/> AI-driven normalization applied to original currency values.
       </div>
    </div>
  );
};

const ResultsDashboard = ({ results, onReset, chartData, runwayMonths }) => {
  if (results?.analysisSuccessful === false) {
     return (
        <div className="adaptive-results-master" style={{padding: '120px 40px', textAlign: 'center'}}>
           <div style={{maxWidth: '600px', margin: '0 auto', background: 'rgba(239, 68, 68, 0.05)', padding: '60px', borderRadius: '40px', border: '1px solid #ef4444'}}>
              <AlertCircle size={64} color="#ef4444" style={{marginBottom: '20px'}}/>
              <h2 style={{fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-2px'}}>No Financial Data Detected</h2>
              <p style={{color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '15px'}}>The uploaded document does not appear to contain standard income statement or balance sheet items. Please ensure you are uploading a valid financial report.</p>
              <button className="btn-primary" onClick={onReset} style={{marginTop: '40px', marginInline: 'auto'}}>Upload Different File <Zap size={18}/></button>
           </div>
        </div>
     );
  }

  return (
    <div className="adaptive-results-master" style={{padding: '40px', position: 'relative', zIndex: 10, background: 'var(--bg-primary)', minHeight: '100vh', width: '100%'}}>
       <div className="expert-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', paddingLeft: '25px', borderLeft: '6px solid var(--accent-vibrant)'}}>
          <div>
             <div style={{fontSize: '0.8rem', color: 'var(--accent-vibrant)', fontWeight: 900, letterSpacing: '2px'}}>EXECUTIVE FINANCIAL OVERVIEW</div>
             <h1 style={{fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-4px'}}>{results?.sentiment || 'Neutral'} Business Outlook</h1>
             <div style={{display: 'flex', gap: '20px', marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
                <span><Globe size={14}/> Reporting: {results?.reportingMetadata?.originalCurrency}</span>
                <span><FileText size={14}/> Document: {results?.reportingMetadata?.sourceDocument}</span>
             </div>
          </div>
          <button className="expert-btn" onClick={onReset} style={{padding: '12px 24px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '14px', cursor: 'pointer', fontWeight: 800}}>New Analysis</button>
       </div>

       <MetricsMatrix metrics={results?.keyPerformanceIndicators} />

       <div className="dashboard-layout">
          <div className="dash-col-1">
             <div className="result-card">
                <h3><Target size={16}/> Business Overview</h3>
                <p style={{fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)'}}>{results?.businessOverview}</p>
             </div>
             
             <div className="result-card">
                <h3><Shield size={16}/> Risk Assessment</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'}}>
                   <div style={{padding: '4px 12px', background: results?.riskAssessment?.riskLevel === 'High' ? 'var(--accent-vibrant)' : 'var(--accent-warm)', color: 'white', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 900}}>{results?.riskAssessment?.riskLevel?.toUpperCase()} RISK</div>
                </div>
                {results?.riskAssessment?.keyRisks?.map((r, i) => (
                   <div key={i} style={{marginBottom: '15px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px'}}>
                      <div style={{fontSize: '0.7rem', color: 'var(--accent-warm)', fontWeight: 800, textTransform: 'uppercase'}}>{r.type}</div>
                      <div style={{fontSize: '0.85rem', marginTop: '4px'}}>{r.finding}</div>
                   </div>
                ))}
             </div>
          </div>

          <div className="dash-col-2">
             <MonteCarloScenarioStudio data={chartData} runway={runwayMonths} />
             
             <div className="result-card" style={{marginTop: '30px'}}>
                <h3><Zap size={16}/> Strategic Recommendations</h3>
                {results?.strategicRecommendations?.map((rec, i) => (
                   <div key={i} style={{padding: '20px', borderBottom: i !== results.strategicRecommendations.length - 1 ? '1px solid var(--border)' : 'none'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                         <div style={{fontWeight: 900, color: 'var(--accent-primary)'}}>{rec.action}</div>
                         <div style={{fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px'}}>{rec.priority} PRIORITY</div>
                      </div>
                      <div style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px'}}>Expected Outcome: {rec.expectedImpact}</div>
                   </div>
                ))}
             </div>
          </div>

          <div className="dash-col-3">
             <ProfitabilityBoard data={results?.profitabilityAnalysis} />
             <SegmentComparativePanel segments={results?.segmentBreakdown} />
             
             <div style={{marginTop: '20px', padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid var(--border)'}}>
                <h4 style={{fontSize: '0.9rem', fontWeight: 800, marginBottom: '10px'}}>Export Options</h4>
                <button className="btn-primary" style={{width: '100%', justifyContent: 'center', fontSize: '0.85rem'}}>Download PDF Client Deck</button>
             </div>
          </div>
       </div>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [analysisMode, setAnalysisMode] = useState('standard');
  const inputRef = useRef(null);

  const handleAction = (page, mode = 'standard') => {
     setAnalysisMode(mode);
     setCurrentPage(page);
  };

  const handleFile = (f) => { 
     setError(''); 
     if (!f) return; 
     setFile(f); 
  };

  const analyzeDocument = async (mode) => {
    if (!file) return; 
    setLoading(true); 
    setError('');
    setProgress(0);

    const progressInterval = setInterval(() => {
       setProgress(prev => {
          if (prev >= 94) return 94;
          return Math.min(prev + Math.floor(Math.random() * 5) + 2, 94);
       });
    }, 400);

    const fd = new FormData(); 
    fd.append('document', file);
    fd.append('mode', mode);

    try {
      const resp = await fetch('/api/analyze', { method: 'POST', body: fd });
      const data = await resp.json();
      
      if (!resp.ok) throw new Error(data.error || 'Server Internal Error');
      if (data.success && data.analysis) { 
         setResults(data.analysis); 
         setCurrentPage('results'); 
         window.scrollTo({ top: 0, behavior: 'smooth' }); 
      }
    } catch (err) { 
       setError(err.message); 
    } finally { 
       clearInterval(progressInterval);
       setLoading(false); 
    }
  };

  const chartData = results?.monteCarloEngineResult?.months || [];
  
  const runwayMonths = useMemo(() => {
     if (!chartData.length) return 0;
     const breakIdx = chartData.findIndex(m => m.cashReserves <= 0);
     return breakIdx === -1 ? 12 : breakIdx;
  }, [chartData]);

  return (
    <div className={`adaptive-master-wrapper ${currentPage}`}>
      <nav className="main-nav">
        <div className="nav-logo" onClick={() => setCurrentPage('landing')}>
          <div className="logo-icon"><TrendingUp size={20}/></div>
          <span>FinanceAI <span style={{opacity: 0.5, fontWeight: 400}}>Advisor</span></span>
        </div>
        <div className="nav-links">
           <button onClick={() => setCurrentPage('landing')} style={{background:'none', border:'none', color:'white', cursor:'pointer', fontWeight: 700}}>Dashboard</button>
           <button onClick={() => handleAction('analyzer')} style={{background:'none', border:'none', color:'white', cursor:'pointer', fontWeight: 700}}>Analysis Hub</button>
        </div>
      </nav>

      <main className="content-master">
        {currentPage === 'landing' && <LandingView onAction={handleAction} />}
        {currentPage === 'analyzer' && (
            <AnalyzerView 
                loading={loading} progress={progress} file={file} error={error}
                analyzeDocument={analyzeDocument} inputRef={inputRef} handleFile={handleFile}
                mode={analysisMode}
            />
        )}
        {currentPage === 'results' && results && (
            <ResultsDashboard 
                results={results} onReset={() => setCurrentPage('landing')}
                chartData={chartData} runwayMonths={runwayMonths}
            />
        )}
      </main>

      <footer className="adaptive-footer" style={{padding: '60px', opacity: 0.4, borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.8rem'}}>
        © 2026 FinanceAI Advisor. Tailored Business Insights.
      </footer>
    </div>
  );
}

export default App;
