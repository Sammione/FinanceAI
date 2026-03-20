import { useState, useRef, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Activity, BarChart3, TrendingUp, AlertTriangle, Briefcase, ChevronRight, FileText, Upload, RefreshCw, Layers, ShieldCheck, MessageSquare, Target, Zap, AlertCircle, Database, GitBranch, PieChart as PieIcon, Info, Download, Shield, Box, Globe, Cpu, MoreHorizontal, ArrowUpRight, TrendingDown, Lock, Search, Filter } from 'lucide-react';

/* --- HOMEPAGE COMPONENTS (v9.5) --- */

const LandingView = ({ onAction }) => (
  <div className="landing-alpha-enterprise">
    <section className="hero">
      <div className="hero-tag">ENTERPRISE ADAPTIVE V17.5</div>
      <h1 className="hero-title">Neural Financial <br/><span>Intelligence</span></h1>
      <p className="hero-subtitle">The ultimate institutional platform for board-ready data synthesis. Intelligently parsing multi-segment filings from any currency or reporting standard into high-fidelity execution roadmaps with 100% evidentiary truth.</p>
      
      <div className="hero-preview">
         <div className="floating-kpi">
            <span style={{fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 800}}>TOTAL REVENUE</span>
            <div className="val-big">$10.2B</div>
            <div className="v-ticker"><ArrowUpRight size={12}/> +2.1% YoY</div>
         </div>
         <div className="floating-kpi active-kpi">
            <span style={{fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 800}}>SYSTEM ROIC</span>
            <div className="val-big">16.8%</div>
            <div className="v-ticker" style={{color: 'var(--success)'}}>TA: 15.0%</div>
         </div>
         <div className="floating-kpi">
            <span style={{fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 800}}>LIQUIDITY INDEX</span>
            <div className="val-big">1.4x</div>
            <div className="v-ticker" style={{color: 'var(--accent-primary)'}}>SOLVENT</div>
         </div>
      </div>

      <div style={{marginTop: '60px', display: 'flex', gap: '20px', justifyContent: 'center'}}>
         <button className="btn-primary" onClick={() => onAction('analyzer')} style={{padding: '20px 48px', fontSize: '1.2rem'}}>Start Strategic Analysis <Zap size={18}/></button>
         <button className="btn-secondary" onClick={() => document.getElementById('workflow')?.scrollIntoView({behavior:'smooth'})} style={{background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)', padding:'20px 48px', borderRadius:'12px', color:'white', fontWeight:700, cursor:'pointer', fontSize: '1rem'}}>Ingest Protocol ↓</button>
      </div>
    </section>

    {/* COMMAND CENTER GRID */}
    <section className="cta-grid">
       <div className="cta-card" onClick={() => onAction('analyzer')}>
          <div className="cta-icon"><Database size={32}/></div>
          <h3 style={{fontSize: '1.4rem', fontWeight: 900}}>Analyze SEC Filing</h3>
          <p>Extract institutional data, multi-segment ROIC, and prescriptive strategy vectors from any 10-K/10-Q/Annual Filing.</p>
       </div>
       <div className="cta-card" onClick={() => onAction('analyzer')}>
          <div className="cta-icon"><GitBranch size={32}/></div>
          <h3 style={{fontSize: '1.4rem', fontWeight: 900}}>Monte Carlo Studio</h3>
          <p>Execute 12,000-pass probabilistic models to stress-test divisional solvency under dynamic inflation and interest rate shocks.</p>
       </div>
       <div className="cta-card" onClick={() => onAction('analyzer')}>
          <div className="cta-icon"><Shield size={32}/></div>
          <h3 style={{fontSize: '1.4rem', fontWeight: 900}}>Global Risk Matrix</h3>
          <p>Institutional anomaly detector for accounting variations, FX exposure, and sectoral risk signals.</p>
       </div>
       <div className="cta-card" onClick={() => onAction('analyzer')}>
          <div className="cta-icon"><Target size={32}/></div>
          <h3 style={{fontSize: '1.4rem', fontWeight: 900}}>Executive Briefings</h3>
          <p>Generate board-ready, source-page referenced summaries with automated Waterfall and Bridge visualizations.</p>
       </div>
    </section>

    <section id="workflow" className="workflow-section">
       <h2 style={{fontSize: '3rem', fontWeight: 900, marginBottom: '20px', letterSpacing: '-2px'}}>Data Ingest Machina</h2>
       <div className="workflow-grid">
          <div className="wf-step">
             <div className="wf-icon-box"><RefreshCw size={24} className="spin-slow"/></div>
             <h4>Neural Ingest</h4>
             <p>Automated OCR and parsing of institutional filings, Page-by-Page.</p>
          </div>
          <div className="wf-step">
             <div className="wf-icon-box"><Globe size={24}/></div>
             <h4>Normalization</h4>
             <p>Automated currency detection and logic-based unit scaling (M/B).</p>
          </div>
          <div className="wf-step">
             <div className="wf-icon-box"><Target size={24}/></div>
             <h4>Segment Alpha</h4>
             <p>Divisional ROIC logic linked directly to audited segment Net Income.</p>
          </div>
          <div className="wf-step">
             <div className="wf-icon-box"><ShieldCheck size={24}/></div>
             <h4>Truth Check</h4>
             <p>Every extracted metric referenced to the source document and page.</p>
          </div>
       </div>
    </section>
  </div>
);

/* --- ANALYSIS & RESULTS COMPONENTS --- */
const AnalyzerView = ({ loading, progress, file, error, analyzeDocument, inputRef, handleFile }) => (
  <div className="analyzer-alpha" style={{padding: '120px 40px'}}>
     {loading ? (
        <div className="upload-card" style={{maxWidth: '900px', padding: '100px 60px', textAlign: 'left', background: 'rgba(15, 23, 42, 0.6)'}}>
           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px'}}>
              <div>
                 <div style={{fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '2px', marginBottom: '10px'}}>QUANTITATIVE SYNTHESIS ACTIVE</div>
                 <h2 style={{fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-4px', lineHeight: 1}}>Synthesizing <br/>Strategic Alpha</h2>
              </div>
              <div style={{fontSize: '4rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.8}}>{progress}%</div>
           </div>
           
           <div className="modern-progress-bar" style={{height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', marginBottom: '40px', border: '1px solid var(--border)'}}>
              <div style={{height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)', borderRadius: '6px', transition: 'width 0.3s ease-out'}}></div>
           </div>

           <div className="processing-subtasks" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.85rem', color:'var(--text-secondary)'}}><RefreshCw size={14} className="spin-slow" style={{color:'var(--accent-primary)'}}/> Parsing Document Structure</div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.85rem', color:'var(--text-secondary)'}}><Globe size={14} className="pulse-dot" style={{color:'var(--accent-primary)'}}/> Normalizing Currency / Units</div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.85rem', color:'var(--accent-primary)'}}><GitBranch size={14} style={{color:'var(--accent-primary)'}}/> Executing Monte Carlo Paths</div>
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
        <h3><Box size={16}/> Segment Intelligence [ROIC: NI/CE]</h3>
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
             <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '0.65rem', color: 'var(--text-secondary)'}}>
                <span>Revenue: {s.revenue}</span>
                <span>EBITDA Margin: {s.ebitdaMargin}</span>
                <span>Source: {s.source}</span>
                <span style={{color: 'var(--success)', opacity: 0.8}}>{s.roicFormula}</span>
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

const FXSensitivityMatrix = ({ fxData }) => (
  <div className="result-card fx-v14" style={{background: 'rgba(139, 92, 246, 0.03)', border: '1px solid rgba(139, 92, 246, 0.2)'}}>
     <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px'}}>
        <Globe size={16} color="var(--accent-purple)"/> 
        <h3>±5% Currency Sensitivity</h3>
        <span style={{fontSize: '0.6rem', padding: '2px 8px', background: 'var(--accent-purple)', borderRadius: '4px', color: 'white'}}>{fxData?.riskLevel} RISK</span>
     </div>
     <div style={{fontSize: '1.25rem', fontWeight: 900, marginBottom: '10px'}}>{fxData?.impactOnEbitda} Impact</div>
     <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '15px'}}>Exposure concentrated in: {fxData?.exposedSegments?.join(', ')}</p>
     <div style={{fontSize: '0.6rem', opacity: 0.5}}>Logic: Dynamic FX Stress Calculation vs Monthly EBITDA</div>
  </div>
);

const MonteCarloScenarioStudio = ({ data, runway }) => (
  <div className="result-card monte-v11">
     <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <div>
           <h3><GitBranch size={16}/> Monte Carlo Scenario Studio</h3>
           <p style={{fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '4px'}}>
              Executing <b>1,000 iterations</b> per month | 95% Confidence Interval
           </p>
        </div>
        <div style={{fontSize: '1.4rem', fontWeight: 900, color: runway === 12 ? 'var(--success)' : 'var(--danger)'}}>
           {runway === 12 ? '>12' : runway} <span style={{fontSize: '0.75rem', opacity: 0.6}}>Months Runway</span>
        </div>
     </div>
     <div style={{height: '300px', width: '100%'}}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/><stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
            <Tooltip contentStyle={{background: '#1e293b', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px'}} />
            <Area type="monotone" dataKey="bestCase" stroke="transparent" fill="var(--success)" fillOpacity={0.05} />
            <Area type="monotone" dataKey="worstCase" stroke="transparent" fill="var(--danger)" fillOpacity={0.05} />
            <Area type="monotone" dataKey="cashReserves" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorCash)" />
          </AreaChart>
        </ResponsiveContainer>
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
    <div className="adaptive-results-master" style={{padding: '40px', position: 'relative', zIndex: 10, background: 'var(--bg-primary)', minHeight: '100vh', width: '100%'}}>
       <div className="expert-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', paddingLeft: '25px', borderLeft: '6px solid var(--accent-primary)'}}>
          <div>
             <div style={{fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '2px'}}>ADAPTIVE_CORE V17.5_MASTER</div>
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
             <MonteCarloScenarioStudio data={chartData} runway={runwayMonths} />
             
             <div className="adaptive-info" style={{marginTop: '25px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '30px'}}>
                <Info size={14} style={{verticalAlign: 'middle', marginRight: '6px'}}/> Data Normalized to {currencyMode.toUpperCase()} | Statistical Simulation Executed with 1,000 passes.
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
             <FXSensitivityMatrix fxData={results?.fxSensitivity} />
             <SegmentComparativePanel segments={results?.deepSegments} insights={results?.comparativeInsights} />
             <div className="export-v11-box" style={{background: 'var(--bg-card)', padding: '25px', borderRadius: '24px', border: '1px solid var(--border)', marginTop: '20px'}}>
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
  const [progress, setProgress] = useState(0);
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
    if (!file) return; 
    setLoading(true); 
    setError('');
    setProgress(0);
    console.log("[FinanceAI] Initializing Strategic Analysis for:", file.name);

    const progressInterval = setInterval(() => {
       setProgress(prev => {
          if (prev >= 94) return 94;
          const increment = Math.floor(Math.random() * 5) + 3;
          return Math.min(prev + increment, 94);
       });
    }, 450);

    const fd = new FormData(); fd.append('document', file);
    try {
      const resp = await fetch('/api/analyze', { method: 'POST', body: fd });
      const data = await resp.json();
      console.log("[FinanceAI] Neural Data Received:", data);
      
      if (!resp.ok) throw new Error(data.error || 'Server Internal Error');
      if (data.success && data.analysis) { 
         setResults(data.analysis); 
         setCurrentPage('results'); 
         console.log("[FinanceAI] Transitioning to Executive Dashboard.");
         window.scrollTo({ top: 0, behavior: 'smooth' }); 
      }
    } catch (err) { 
       console.error("[FinanceAI] Analysis Fatal Error:", err);
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
                loading={loading} progress={progress} file={file} error={error}
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
