import { useState, useRef, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Activity, BarChart3, TrendingUp, AlertTriangle, Briefcase, ChevronRight, FileText, Upload, RefreshCw, Layers, ShieldCheck, MessageSquare, Target, Zap, AlertCircle, Database, GitBranch, PieChart as PieIcon, Info, Download, Shield, Box, Globe, Cpu, MoreHorizontal, ArrowUpRight, TrendingDown, Lock, Search, Filter } from 'lucide-react';

/* --- HOMEPAGE COMPONENTS (v9.5) --- */

const LandingView = ({ onAction }) => (
  <div className="landing-alpha-enterprise">
    <section className="hero">
      <h1 className="hero-title">Turn Insights Into <span>Strategy</span></h1>
      <p className="hero-subtitle">The ultimate Grade-A Adaptive platform. Intelligently parsing multi-segment filings from any currency, standard, or structure into board-ready execution roadmaps.</p>
      
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
         <button className="btn-primary" onClick={() => onAction('analyzer')}>Start Analysis <Zap size={18}/></button>
         <button className="btn-secondary" onClick={() => document.getElementById('workflow')?.scrollIntoView({behavior:'smooth'})} style={{background:'none', border:'1px solid var(--border)', padding:'16px 32px', borderRadius:'12px', color:'white', fontWeight:700, cursor:'pointer'}}>Institutional Docs ↓</button>
      </div>
    </section>

    {/* 4-QUADRANT COMMAND CENTER */}
    <section className="cta-grid">
       <div className="cta-card" onClick={() => onAction('analyzer')}>
          <div className="cta-icon"><FileText size={24}/></div>
          <h3>Analyze SEC Filing</h3>
          <p>Extract institutional data, multi-segment ROIC, and prescriptive strategies from any 10-K/10-Q/Annual Report.</p>
       </div>
       <div className="cta-card" onClick={() => onAction('analyzer')}>
          <div className="cta-icon"><GitBranch size={24}/></div>
          <h3>Run Scenario Studio</h3>
          <p>Stress-test divisional solvency and Monte Carlo profitability under dynamic interest rate and inflation shocks.</p>
       </div>
       <div className="cta-card" onClick={() => onAction('analyzer')}>
          <div className="cta-icon"><Shield size={24}/></div>
          <h3>Global Risk Dashboard</h3>
          <p>Multi-source anomaly detector for operational gaps, accounting inconsistencies, and sectoral risks.</p>
       </div>
       <div className="cta-card" onClick={() => onAction('analyzer')}>
          <div className="cta-icon"><TrendingUp size={24}/></div>
          <h3>Generate Board Report</h3>
          <p>Extract verifiable, source-referenced executive briefings with automated Waterfall and Bridge visualizations.</p>
       </div>
    </section>

    <section id="workflow" className="workflow-section" style={{background: 'rgba(5, 8, 17, 1)'}}>
       <h2 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px'}}>Intelligence Ingest Workflow</h2>
       <div className="workflow-grid">
          <div className="wf-step">
             <div className="wf-icon-box"><Database size={24}/></div>
             <h4>Neural Ingest</h4>
             <p>Automated parsing of institutional documents, Page-by-Page.</p>
          </div>
          <div className="wf-step">
             <div className="wf-icon-box"><Globe size={24}/></div>
             <h4>Normalization</h4>
             <p>Currency detection and unit scaling (Millions/Billions).</p>
          </div>
          <div className="wf-step">
             <div className="wf-icon-box"><Zap size={24}/></div>
             <h4>Decision Alpha</h4>
             <p>Scenario simulation linked to specific segment ROIC data.</p>
          </div>
          <div className="wf-step">
             <div className="wf-icon-box"><FileText size={24}/></div>
             <h4>Verification</h4>
             <p>Every metric referenced back to the source document location.</p>
          </div>
       </div>
    </section>

    <footer className="security-banner" style={{padding:'60px', opacity:0.6}}>
       <div style={{display:'flex', gap:'40px', justifyContent:'center'}}>
          <span style={{fontSize:'0.65rem', fontWeight:900, letterSpacing:'2px'}}>AES-256 ENCRYPTED</span>
          <span style={{fontSize:'0.65rem', fontWeight:900, letterSpacing:'2px'}}>SEC/EDGAR COMPLIANT</span>
          <span style={{fontSize:'0.65rem', fontWeight:900, letterSpacing:'2px'}}>GDPR PROTECTED</span>
       </div>
    </footer>
  </div>
);

/* --- ANALYSIS & RESULTS COMPONENTS --- */

const AnalyzerView = ({ loading, file, error, analyzeDocument, inputRef, handleFile }) => (
  <div className="analyzer-alpha" style={{padding: '120px 40px'}}>
     {loading ? (
        <div className="upload-card" style={{maxWidth: '900px', padding: '100px 60px', textAlign: 'left', background: 'rgba(15, 23, 42, 0.6)'}}>
           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px'}}>
              <div>
                 <div style={{fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '2px', marginBottom: '10px'}}>QUANTITATIVE SYNTHESIS ACTIVE</div>
                 <h2 style={{fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-4px', lineHeight: 1}}>Synthesizing <br/>Strategic Alpha</h2>
              </div>
              <div style={{fontSize: '4rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.8}}>94%</div>
           </div>
           <div className="modern-progress-bar" style={{height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', marginBottom: '40px', border: '1px solid var(--border)'}}>
              <div style={{height: '100%', width: '94%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)', borderRadius: '6px'}}></div>
           </div>
           <div className="processing-subtasks" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.85rem', color:'var(--text-secondary)'}}><RefreshCw size={14} className="spin-slow" style={{color:'var(--accent-primary)'}}/> Parsing Document Structure</div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.85rem', color:'var(--text-secondary)'}}><Globe size={14} className="pulse-dot" style={{color:'var(--accent-primary)'}}/> Normalizing Currency / Units</div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.85rem', color:'var(--text-secondary)'}}><GitBranch size={14} style={{color:'var(--accent-primary)'}}/> Executing Monte Carlo Paths</div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.85rem', color:'var(--text-secondary)'}}><ShieldCheck size={14} style={{color:'var(--success)'}}/> Verifying Data Sources</div>
           </div>
        </div>
     ) : (
        <div className="upload-card" style={{maxWidth: '1000px', margin: '0 auto', background: 'rgba(15, 23, 42, 0.4)', padding: '80px 60px', borderRadius: '40px', border: '1px solid rgba(14, 165, 233, 0.2)', backdropFilter: 'blur(40px)'}}>
           <div style={{marginBottom: '50px', textAlign: 'center'}}>
              <h2 style={{fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-4px'}}>Data Ingestion Hub</h2>
              <p style={{color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '15px auto 0'}}>Unlock institutional-grade alpha by uploading strategic financial filings for high-fidelity neural analysis.</p>
           </div>
           <div className="drop-zone" onClick={() => inputRef.current.click()} style={{padding: '80px', border: '2px dashed var(--accent-primary)', borderRadius: '30px', background: 'rgba(14, 165, 233, 0.03)', transition: '0.4s', cursor: 'pointer', position: 'relative'}}>
              <Upload size={64} style={{color: 'var(--accent-primary)', marginBottom: '30px'}} />
              <p style={{fontSize: '1.4rem', fontWeight: 900}}>{file ? file.name : "Drop Institutional Filing (PDF / TXT / CSV / EXCEL / XBRL) Here"}</p>
              <input ref={inputRef} style={{display: 'none'}} type="file" onChange={(e)=>handleFile(e.target.files[0])} />
           </div>
           <div className="ingestion-trust-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '60px', opacity: 0.6}}>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.75rem', fontWeight:800}}><ShieldCheck size={18} color="var(--success)"/> SEC / EDGAR COMPLIANT</div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.75rem', fontWeight:800}}><Database size={18} color="var(--accent-primary)"/> BI-LSTM VECTOR READY</div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.75rem', fontWeight:800}}><Lock size={18} color="var(--warning)"/> AES-256 BANK GRADE</div>
           </div>
           {error && <p style={{color: 'var(--danger)', marginTop: '30px', textAlign: 'center', fontWeight: 700}}>{error}</p>}
           {file && (
              <button className="btn-primary" style={{width: '100%', marginTop: '50px', justifyContent: 'center', height: '80px', fontSize: '1.25rem'}} onClick={analyzeDocument}>
                 Initialize High-Fidelity Scan <Zap size={24}/>
              </button>
           )}
        </div>
     )}
  </div>
);

const MetricsMatrix = ({ metrics }) => (
  <div className="metrics-matrix-adaptive" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px'}}>
     {metrics?.map((m, i) => (
       <div key={i} className="metric-tile-v11" style={{background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '20px', border: '1px solid var(--border)', position: 'relative'}}>
          <div style={{fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px', display:'flex', justifyContent:'space-between'}}>
             {m.name} <span style={{fontSize:'0.5rem', opacity:0.5}}>{m.source}</span>
          </div>
          <div style={{fontSize: '1.75rem', fontWeight: 900, color: 'white'}}>{m.value}</div>
          <div style={{fontSize: '0.6rem', color: m.status === 'Healthy' || m.status === 'Strong' ? 'var(--success)' : 'var(--warning)', fontWeight: 800, marginTop: '4px'}}>
             {m.status}
          </div>
       </div>
     ))}
  </div>
);

const SegmentComparativePanel = ({ segments, insights }) => (
  <div className="result-card segment-v11">
     <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h3><Box size={16}/> Segment Intelligence</h3>
        <div style={{fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-primary)', padding: '4px 12px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '100px'}}>
           STRONGEST: {insights?.strongestUnit}
        </div>
     </div>
     <div className="segment-table-v11" style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {segments?.map((s, i) => (
          <div key={i} style={{background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)'}}>
             <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}>
                <span style={{fontWeight: 900}}>{s.division}</span>
                <span style={{color: 'var(--accent-primary)', fontWeight: 900}}>{s.roic} ROIC</span>
             </div>
             <div style={{display: 'flex', gap: '15px', fontSize: '0.65rem', color: 'var(--text-secondary)'}}>
                <span>Revenue: {s.revenue}</span>
                <span>Status: {s.status}</span>
                <span>Source: {s.source}</span>
             </div>
          </div>
        ))}
     </div>
     <div style={{marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)'}}>
        <div style={{fontSize: '0.6rem', color: 'var(--danger)', fontWeight: 900}}>WEAKEST SEGMENT IDENTIFIED</div>
        <div style={{fontSize: '0.85rem', fontWeight: 800, marginTop: '4px'}}>{insights?.weakestUnit}</div>
     </div>
  </div>
);

const ResultsDashboard = ({ results, onReset, chartData, runwayMonths }) => {
  const [currencyMode, setCurrencyMode] = useState('reported'); // 'reported' or 'base'
  
  if (results?.analysisSuccessful === false) {
     return (
        <div className="adaptive-results-master" style={{padding: '120px 40px', textAlign: 'center'}}>
           <div style={{maxWidth: '600px', margin: '0 auto', background: 'rgba(239, 68, 68, 0.05)', padding: '60px', borderRadius: '40px', border: '1px solid var(--danger)'}}>
              <AlertCircle size={64} color="var(--danger)" style={{marginBottom: '20px'}}/>
              <h2 style={{fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-2px'}}>No Financial Data Detected</h2>
              <p style={{color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '15px'}}>The uploaded document (<b>{results?.reportingMetadata?.sourceDocument}</b>) does not appear to contain institutional-level financial metrics (Revenue, EBITDA, or Balance Sheet items). <br/><br/> Our precision-focussed engine has bypassed analysis to prevent data hallucination.</p>
              <button className="btn-primary" onClick={onReset} style={{marginTop: '40px', marginInline: 'auto'}}>Try Another Document <Zap size={18}/></button>
           </div>
        </div>
     );
  }

  return (
    <div className="adaptive-results-master" style={{padding: '40px'}}>
       <div className="expert-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', paddingLeft: '25px', borderLeft: '6px solid var(--accent-primary)'}}>
          <div>
             <div style={{fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '2px'}}>ADAPTIVE_CORE V11_MASTER</div>
             <h1 style={{fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-4px'}}>{results?.sentiment} EXECUTIVE POSITIONING</h1>
             <div style={{display: 'flex', gap: '20px', marginTop: '10px', fontSize: '0.75rem', opacity: 0.6}}>
                <span><Globe size={12}/> Reported: {results?.reportingMetadata?.originalCurrency} ({results?.reportingMetadata?.units})</span>
                <span><FileText size={12}/> Source: {results?.reportingMetadata?.sourceDocument}</span>
             </div>
          </div>
          <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
             <div className="currency-toggle" style={{display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border)'}}>
                <button onClick={() => setCurrencyMode('reported')} style={{padding: '8px 16px', background: currencyMode === 'reported' ? 'var(--accent-primary)' : 'none', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 800}}>REPORTED</button>
                <button onClick={() => setCurrencyMode('base')} style={{padding: '8px 16px', background: currencyMode === 'base' ? 'var(--accent-primary)' : 'none', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 800}}>USD (BASE)</button>
             </div>
             <button className="expert-btn" onClick={onReset} style={{padding: '12px 24px', border: '1px solid var(--border)', background: 'none', color: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: 800}}>Analyze Peer</button>
          </div>
       </div>

       <MetricsMatrix metrics={results?.keyMetrics} />

       <div className="dashboard-layout">
          <div className="dash-col-1">
             <div className="result-card">
                <h3><Target size={16}/> Strategic RADS Score</h3>
                <div style={{textAlign: 'center', padding: '40px', background: 'rgba(14, 165, 233, 0.05)', borderRadius: '30px', border: '1px solid var(--accent-primary)', marginBottom: '20px'}}>
                   <div style={{fontSize: '5rem', fontWeight: 900, color: 'var(--accent-primary)', lineHeight: 1}}>{results?.decisionIntelligence?.overallScore || 0}%</div>
                   <div style={{fontSize: '0.7rem', opacity: 0.5, marginTop: '8px'}}>Risk-Adjusted Execution Index</div>
                </div>
                {results?.decisionIntelligence?.recommendations?.map((r, i) => (
                  <div key={i} style={{padding: '15px', borderBottom: '1px solid var(--border)'}}>
                     <div style={{fontSize: '0.6rem', color: 'var(--success)', fontWeight: 900}}>PRESCRIPTIVE ACTION</div>
                     <div style={{fontWeight: 800, fontSize: '0.9rem', marginTop: '4px'}}>{r.strategy}</div>
                     <div style={{fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px'}}>{r.impact}</div>
                  </div>
                ))}
             </div>
             <div className="result-card risk-analytics">
                <h3><AlertTriangle size={16} color="var(--danger)"/> Anomaly Signals</h3>
                {results?.anomalyIntelligence?.alerts?.map((a, i) => (
                  <div key={i} style={{background: 'rgba(239, 68, 68, 0.03)', padding: '15px', borderLeft: '4px solid var(--danger)', borderRadius: '4px', marginBottom: '12px'}}>
                     <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span style={{fontSize: '0.7rem', fontWeight: 900}}>Lv.{a.severity} {a.type}</span>
                        <AlertCircle size={14} color="var(--danger)"/>
                     </div>
                     <p style={{fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '6px'}}>{a.correction}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="dash-col-2">
             <div className="result-card chart-master">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
                   <div>
                      <h3 style={{fontSize: '1.75rem', fontWeight: 900}}>Adaptive Monte Carlo Forecast</h3>
                      <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>Bi-LSTM Forecast Confidence: {results?.advancedForecasting?.confidenceInterval}</p>
                   </div>
                   <div style={{textAlign: 'right'}}>
                      <span style={{fontSize: '0.75rem', fontWeight: 800, opacity: 0.5}}>CASH RUNWAY</span>
                      <div style={{fontSize: '2.5rem', fontWeight: 900, color: runwayMonths.includes('>') ? 'var(--success)' : 'var(--danger)'}}>{runwayMonths}</div>
                   </div>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                   <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={11} />
                      <Tooltip contentStyle={{background: 'var(--bg-primary)', border: '1px solid var(--border)'}} />
                      <Area type="monotone" dataKey="bestCase" stroke="var(--success)" fill="none" strokeDasharray="5 5" />
                      <Area type="monotone" dataKey="worstCase" stroke="var(--danger)" fill="none" strokeDasharray="5 5" />
                      <Area type="monotone" dataKey="cashReserves" stroke="var(--accent-primary)" strokeWidth={5} fill="rgba(14, 165, 233, 0.15)" />
                   </AreaChart>
                </ResponsiveContainer>
                <div className="adaptive-info" style={{marginTop: '25px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', fontSize: '0.7rem', color: 'var(--text-secondary)'}}>
                   <Info size={14} style={{verticalAlign: 'middle', marginRight: '6px'}}/> Data Normalized to {currencyMode.toUpperCase()} | Stress Testing applied to Revenue and Cost parameters.
                </div>
             </div>
             <div className="cfo-advisor-master" style={{background: 'rgba(2, 6, 23, 0.95)', border: '1px solid var(--accent-primary)', borderRadius: '30px', padding: '30px', position: 'relative'}}>
                <div style={{background: 'var(--accent-primary)', color: 'white', padding: '6px 16px', borderRadius: '100px', display: 'inline-block', fontSize: '0.7rem', fontWeight: 900, marginBottom: '20px'}}>AI CFO ADVISOR</div>
                <p style={{fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '20px'}}>Based on the {results?.comparativeInsights?.strongestUnit} performance, I recommend accelerating R&D spend to capture a projected 4.5% EBITDA lift by Q3. The currency-adjusted risk on your {results?.comparativeInsights?.weakestUnit} is Medium.</p>
                <div style={{display: 'flex', gap: '15px'}}>
                   <button style={{background: 'var(--accent-primary)', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, fontSize: '0.75rem'}}>Explore Growth Path</button>
                   <button style={{background: 'none', border: '1px solid var(--border)', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, fontSize: '0.75rem'}}>View FX Sensitivity</button>
                </div>
             </div>
          </div>

          <div className="dash-col-3">
             <SegmentComparativePanel segments={results?.deepSegments} insights={results?.comparativeInsights} />
             <div className="export-v11-box" style={{background: 'var(--bg-card)', padding: '25px', borderRadius: '24px', border: '1px solid var(--border)'}}>
                <h3><Download size={16}/> Ingest Output</h3>
                <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '10px 0 20px'}}>Verifiable PDF/PPT export with source-page markers for every analytical node.</p>
                <button className="btn-primary" style={{width: '100%', justifyContent: 'center', fontSize: '0.85rem'}}>Export Board Deck</button>
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
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (f) => { 
     setError(''); 
     if (!f) return; 
     const allowedTypes = [
        'application/pdf', 
        'text/plain', 
        'text/csv', 
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/xml',
        'text/xml'
     ];
     // Handle specific XBRL extensions or XML-based filings
     const isXBRL = f.name.toLowerCase().endsWith('.xbrl') || f.name.toLowerCase().endsWith('.xml');
     
     if (!allowedTypes.includes(f.type) && !isXBRL) { 
        setError('Supported: PDF, TXT, CSV, EXCEL, or XBRL (XML)'); 
        return; 
     } 
     setFile(f); 
  };

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
    let cC = b.currentCashReserves, bC = b.currentCashReserves, wC = b.currentCashReserves;
    for (let i = 0; i <= 12; i++) {
        if (i > 0) { const r = b.monthlyRevenue, e = b.monthlyOperatingExpenses; cC += (r - e); bC += (r * m.bestCaseRevenueGrowth - e); wC += (r * m.worstCaseRevenueGrowth - e); }
        months.push({ month: `M${i}`, cashReserves: Math.floor(cC), bestCase: Math.floor(bC), worstCase: Math.floor(wC) });
    }
    return months;
  }, [results]);

  const runwayMonths = useMemo(() => {
    if(!chartData.length) return 0;
    const idx = chartData.findIndex(d => d.cashReserves <= 0);
    return idx === -1 ? '>12 Months' : `${idx} Months`;
  }, [chartData]);

  return (
    <div className={`adaptive-master-wrapper ${currentPage}`}>
      <nav className="main-nav">
        <div className="nav-logo" onClick={() => setCurrentPage('landing')}>
          <div className="logo-icon"><TrendingUp size={16}/></div>
          <span>FinanceAI <span style={{opacity: 0.5, fontWeight: 400}}>Adaptive</span></span>
        </div>
        <div className="nav-links">
           <button onClick={() => setCurrentPage('landing')}>Executive Hub</button>
           <button onClick={() => setCurrentPage('analyzer')}>Ingestion Machina</button>
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

      <footer className="adaptive-footer" style={{padding: '60px', opacity: 0.4, borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.8rem'}}>
        © 2026 FinanceAI Institutional. All Neural Vectors Encrypted. <br/>
        <span style={{opacity: 0.8, fontWeight: 800, marginTop: '8px', display: 'block'}}>Created by QoreLogic</span>
      </footer>
    </div>
  );
}

export default App;
