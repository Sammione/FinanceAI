import { useState, useRef, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { Activity, BarChart3, TrendingUp, AlertTriangle, Briefcase, ChevronRight, FileText, Upload, RefreshCw, Layers, ShieldCheck, MessageSquare, Target, Zap, AlertCircle, Database, GitBranch, PieChart as PieIcon, Info, Download, Box, Globe, Cpu, Layers as LayersIcon } from 'lucide-react';

const Header = ({ onHome, onAnalyze }) => (
  <nav className="main-nav" style={{padding: '15px 40px', background: 'rgba(2, 6, 23, 0.95)', borderBottom: '1px solid var(--border)'}}>
    <div className="nav-logo" onClick={onHome}>
      <div className="logo-icon" style={{background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><TrendingUp size={16}/></div>
      <span style={{fontWeight: 900, fontSize: '1.25rem'}}>FinanceAI <span style={{opacity: 0.5, fontWeight: 400}}>/ ALPHA-CORE v8</span></span>
    </div>
    <div className="nav-links">
       <button onClick={onHome}>Global Risk Dashboard</button>
       <button onClick={onAnalyze}>Intelligence Ingest</button>
       <button className="contact-btn">Institutional Feed <div className="pulse-dot"></div></button>
    </div>
  </nav>
);

const AnalysisLoader = () => (
  <div className="enterprise-loader" style={{textAlign: 'center', padding: '120px 40px'}}>
     <div className="loader"></div>
     <h2 style={{fontSize: '3rem', fontWeight: 900, letterSpacing: '-2px'}}>Initializing Alpha-Core</h2>
     <p style={{color: 'var(--text-secondary)', fontSize: '1.1rem'}}>Running Bi-LSTM Multi-Segment Forecasts | Generating RADS Decision Studio | Syncing Refinitiv Live Feeds...</p>
  </div>
);

const SegmentDrillDown = ({ segments }) => (
  <div className="result-card segment-box-expert">
     <h3><Box size={16}/> Multi-Division RoIC Intelligence</h3>
     <div className="expert-table" style={{marginTop: '20px'}}>
        <div className="table-header" style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', paddingBottom: '10px', borderBottom: '1px solid var(--border)', fontWeight: 800}}>
           <span>Division</span> <span>Revenue</span> <span>EBITDA</span> <span>ROIC</span> <span>Operational Risk</span>
        </div>
        {segments?.map((s, i) => (
          <div key={i} className="table-row" style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', fontSize: '0.85rem', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.03)'}}>
             <span style={{fontWeight: 800}}>{s.division}</span>
             <span>{s.revenue}</span>
             <span style={{color: 'var(--success)'}}>{s.ebitda}</span>
             <span style={{color: 'var(--accent-primary)', fontWeight: 900}}>{s.roic}</span>
             <span style={{fontSize: '0.75rem', opacity: 0.6}}>{s.risk}</span>
          </div>
        ))}
     </div>
  </div>
);

const ScenarioStudio = ({ scenarios }) => (
  <div className="result-card scenario-studio-master">
     <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h3><GitBranch size={16}/> Master Scenario Studio</h3>
        <span style={{fontSize: '0.6rem', background: 'var(--accent-primary)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontWeight: 900}}>SIMULATION ACTIVE</span>
     </div>
     <div className="scenario-comparison" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
        {scenarios?.map((sc, i) => (
          <div key={i} className={`scenario-path-box sc-${i}`} style={{padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid var(--border)'}}>
             <div className="sc-header" style={{display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 800, marginBottom: '10px'}}>
                <span>SCENARIO {sc.id}</span>
                <span style={{color: 'var(--accent-primary)'}}>RADS: {sc.rads}</span>
             </div>
             <h4 style={{fontSize: '1.25rem', fontWeight: 900, marginBottom: '15px'}}>{sc.name}</h4>
             <div className="sc-metrics" style={{display: 'flex', gap: '15px'}}>
                <div style={{flex: 1}}>
                   <span style={{display: 'block', fontSize: '0.6rem', color: 'var(--text-secondary)'}}>Projected ROI</span>
                   <div style={{fontSize: '1.1rem', fontWeight: 900, color: 'var(--success)'}}>{sc.roi}</div>
                </div>
                <div style={{flex: 1}}>
                   <span style={{display: 'block', fontSize: '0.6rem', color: 'var(--text-secondary)'}}>Cash Runway</span>
                   <div style={{fontSize: '1.1rem', fontWeight: 900, color: 'var(--warning)'}}>{sc.runway}</div>
                </div>
             </div>
             <button style={{width: '100%', marginTop: '20px', background: 'none', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 800}}>Model This Decision Path</button>
          </div>
        ))}
     </div>
  </div>
);

const ResultsDashboard = ({ results, onReset, interestRateShock, setInterestRateShock, costShock, setCostShock, demandShock, setDemandShock, chartData, runwayMonths }) => (
  <div className="alpha-core-results" style={{padding: '40px'}}>
    <div className="dashboard-header-master" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', borderLeft: '6px solid var(--accent-primary)', paddingLeft: '25px'}}>
       <div>
          <div className="breadcrumb-master" style={{fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '2px'}}>INSTITUTIONAL QUANTITATIVE LAYER / V8.0_CORE</div>
          <h1 style={{fontSize: '3rem', fontWeight: 900, letterSpacing: '-2px'}}>{results?.sentiment} EXECUTIVE POSITIONING</h1>
       </div>
       <div style={{display: 'flex', gap: '15px'}}>
          <button className="expert-btn" onClick={onReset} style={{padding: '12px 24px', border: '1px solid var(--border)', background: 'none', color: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: 800}}>New Case File</button>
          <button className="btn-primary" style={{padding: '12px 24px', borderRadius: '12px'}}><Download size={18}/> Generate Board Deck</button>
       </div>
    </div>

    <div className="dashboard-layout">
       {/* COLUMN 1: RATIOS & RISK */}
       <div className="dash-col-1">
          <div className="result-card">
              <h3><Target size={16}/> Alpha-Score IQ</h3>
              <div className="score-container-master" style={{textAlign: 'center', padding: '30px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '25px', border: '1px solid var(--accent-primary)'}}>
                 <div style={{fontSize: '4.5rem', fontWeight: 900, color: 'var(--accent-primary)', lineHeight: 1}}>{results?.decisionIntelligence?.overallScore || 0}%</div>
                 <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px'}}>Risk-Adjusted Execution Index</div>
              </div>
              <div className="rec-list-master" style={{marginTop: '20px'}}>
                 {results?.decisionIntelligence?.recommendations?.map((r, i) => (
                    <div key={i} className="rec-item-master" style={{padding: '12px', borderBottom: '1px solid var(--border)', marginBottom: '10px'}}>
                       <div style={{fontSize: '0.6rem', color: 'var(--success)', fontWeight: 900}}>PRESCRIPTIVE ALPHA</div>
                       <div style={{fontWeight: 800, fontSize: '0.95rem', marginTop: '4px'}}>{r.strategy}</div>
                    </div>
                 ))}
              </div>
          </div>

          <div className="result-card">
              <h3><AlertTriangle size={16} color="var(--danger)"/> Anomaly Vector Heatmap</h3>
              <div className="heatmap-master" style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', margin: '20px 0'}}>
                 {Array.from({length: 25}).map((_, i) => (
                   <div key={i} style={{height: '10px', background: i < 5 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255,255,255,0.05)', borderRadius: '2px'}}></div>
                 ))}
              </div>
              <div className="alert-list" style={{maxHeight: '200px', overflowY: 'auto'}}>
                 {results?.anomalyIntelligence?.alerts?.map((a, i) => (
                    <div key={i} className="alert-item" style={{background: 'rgba(239, 68, 68, 0.05)', padding: '10px', borderLeft: '4px solid var(--danger)', borderRadius: '4px', marginBottom: '8px'}}>
                       <div style={{fontSize: '0.7rem', fontWeight: 800}}>LV.{a.severity} {a.type}</div>
                       <p style={{fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px'}}>{a.correction}</p>
                    </div>
                 ))}
              </div>
          </div>
       </div>

       {/* COLUMN 2: PRIMARY INTERACTION & FORECAST */}
       <div className="dash-col-2">
          <div className="result-card grid-4-master" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '15px'}}>
              {results?.keyMetrics?.map((m, i) => (
                <div key={i} className="m-box-master" style={{background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '20px', textAlign: 'center'}}>
                   <div style={{fontSize: '1.5rem', fontWeight: 900, color: 'white'}}>{m.value}</div>
                   <div style={{fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase'}}>{m.name}</div>
                </div>
              ))}
          </div>

          <div className="result-card chart-primary">
              <div className="chart-header-master" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
                 <div>
                    <h2 style={{fontSize: '1.75rem', fontWeight: 900}}>Bi-LSTM Monte Carlo Cash Prediction</h2>
                    <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>Neural Forecast Confidence: {results?.advancedForecasting?.confidenceInterval || "92%"}</p>
                 </div>
                 <div className="runway-master" style={{textAlign: 'right'}}>
                    <span style={{fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-secondary)'}}>PROBABLE SOLVENCY</span>
                    <div style={{fontSize: '2.5rem', fontWeight: 900, color: runwayMonths.includes('>') ? 'var(--success)' : 'var(--danger)'}}>{runwayMonths}</div>
                 </div>
              </div>

              <ResponsiveContainer width="100%" height={340}>
                 <AreaChart data={chartData}>
                    <defs>
                       <linearGradient id="mainBandAlpha" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={11} />
                    <YAxis hide />
                    <Tooltip contentStyle={{backgroundColor: '#020617', border: '1px solid var(--border)'}} />
                    <Area type="monotone" dataKey="bestCase" stroke="var(--success)" fill="none" strokeDasharray="5 5" name="Optimistic" />
                    <Area type="monotone" dataKey="worstCase" stroke="var(--danger)" fill="none" strokeDasharray="5 5" name="Pessimistic" />
                    <Area type="monotone" dataKey="cashReserves" stroke="#3b82f6" strokeWidth={5} fill="url(#mainBandAlpha)" name="Neural Baseline" />
                 </AreaChart>
              </ResponsiveContainer>

              <div className="master-controls" style={{display: 'flex', gap: '30px', marginTop: '30px', borderTop: '1px solid var(--border)', paddingTop: '25px'}}>
                  <div style={{flex: 1}}>
                     <label style={{fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 800, marginBottom: '10px', display: 'block'}}>Fed Rate Spike (+%)</label>
                     <input type="range" min="0" max="10" value={interestRateShock} onChange={(e)=>setInterestRateShock(parseFloat(e.target.value))} style={{width: '100%'}}/>
                  </div>
                  <div style={{flex: 1}}>
                     <label style={{fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 800, marginBottom: '10px', display: 'block'}}>Supply Cost Inflation (+%)</label>
                     <input type="range" min="0" max="50" value={costShock} onChange={(e)=>setCostShock(parseFloat(e.target.value))} style={{width: '100%'}}/>
                  </div>
                  <div style={{flex: 1}}>
                     <label style={{fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 800, marginBottom: '10px', display: 'block'}}>Revenue Volatility (-%)</label>
                     <input type="range" min="0" max="50" value={demandShock} onChange={(e)=>setDemandShock(parseFloat(e.target.value))} style={{width: '100%'}}/>
                  </div>
              </div>
          </div>

          <ScenarioStudio scenarios={results?.scenarioStudio?.scenarios} />
       </div>

       {/* COLUMN 3: GLOBAL MARKET FEEDS & SEGMENTS */}
       <div className="dash-col-3">
          <div className="result-card rt-data">
             <h3><Database size={16}/> Live Market Orchestrator</h3>
             <div className="feed-list" style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem'}}><span>SPY [S&P 500]</span> <span style={{color: 'var(--success)'}}>+1.12%</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem'}}><span>FX USD/EUR</span> <span style={{color: 'var(--danger)'}}>-0.24%</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem'}}><span>WACC Analyst Est</span> <span style={{color: 'var(--accent-primary)'}}>8.2%</span></div>
             </div>
          </div>

          <SegmentDrillDown segments={results?.deepSegments} />

          <div className="result-card decision-intelligence">
             <h3><Zap size={16}/> Execution Roadmap</h3>
             <div className="roadmap-items">
                {results?.prescriptiveStrategy?.map((s, i) => (
                  <div key={i} style={{background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '12px'}}>
                     <div style={{fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 900}}>TACTICAL TASK {i+1}</div>
                     <h4 style={{fontSize: '0.9rem', fontWeight: 800, marginTop: '4px'}}>{s.action}</h4>
                     <div style={{fontSize: '0.7rem', color: 'var(--success)', marginTop: '6px'}}>Delta: {s.outcome}</div>
                  </div>
                ))}
             </div>
          </div>

          <div className="cfo-chat-compact-expert" style={{border: '1px solid var(--accent-primary)', borderRadius: '20px', background: 'rgba(2, 6, 23, 0.95)', overflow: 'hidden'}}>
             <div style={{background: 'var(--accent-primary)', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 900}}>
                <MessageSquare size={16}/> AI CFO Advisor
             </div>
             <div style={{padding: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)', minHeight: '100px'}}>
                System initialized. I have identified a {results?.deepSegments?.[0]?.roic} ROIC opportunity in the {results?.deepSegments?.[0]?.division} division. Shall we model a capital reallocation strategy?
             </div>
             <div style={{display: 'flex', borderTop: '1px solid var(--border)', padding: '10px'}}>
                <input placeholder="Ask about division ROIC..." style={{flex: 1, background: 'none', border: 'none', outline: 'none', color: 'white'}} />
                <button style={{background: 'var(--accent-primary)', border: 'none', color: 'white', borderRadius: '6px', padding: '6px'}}><Zap size={16}/></button>
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

  const handleFile = (f) => { setError(''); if (!f) return; if (f.type !== 'application/pdf' && f.type !== 'text/plain') { setError('Supported: PDF/TXT'); return; } setFile(f); };

  const analyzeDocument = async () => {
    if (!file) return; setLoading(true); setError('');
    const fd = new FormData(); fd.append('document', file);
    try {
      const resp = await fetch('/api/analyze', { method: 'POST', body: fd });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Enterprise Node Error');
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
    <div className="alpha-core-wrapper">
      <Header onHome={() => setCurrentPage('landing')} onAnalyze={() => setCurrentPage('analyzer')} />
      <main className="main-content-alpha">
        {currentPage === 'landing' && (
          <div className="landing-alpha">
            <section className="hero">
               <h1 className="hero-title">Decision Intelligence <br/><span>Alpha-Core v8</span></h1>
               <p className="hero-subtitle">The first institutional-grade AI terminal uniting multi-segment ROIC analytics with interactive Monte Carlo scenario studios.</p>
               <button className="btn-primary" onClick={() => setCurrentPage('analyzer')} style={{margin: '0 auto'}}>Analyze SEC Filing <ChevronRight size={18}/></button>
            </section>
          </div>
        )}

        {currentPage === 'analyzer' && (
           <div className="analyzer-alpha" style={{padding: '60px'}}>
             {loading ? <AnalysisLoader /> : (
                <div className="upload-card">
                   <h2 style={{fontSize: '3rem', fontWeight: 900, marginBottom: '20px'}}>Intelligence Ingest</h2>
                   <div className="drop-zone" onClick={() => inputRef.current.click()}>
                      <Upload size={48} style={{color: 'var(--accent-primary)', marginBottom: '20px'}} />
                      <p style={{fontWeight: 800}}>{file ? file.name : "Select Institutional Document (PDF/TXT)"}</p>
                      <input ref={inputRef} style={{display: 'none'}} type="file" onChange={(e)=>handleFile(e.target.files[0])} />
                   </div>
                   {error && <p style={{color: 'var(--danger)', marginTop: '20px'}}>{error}</p>}
                   {file && <button className="btn-primary" style={{width: '100%', marginTop: '30px', justifyContent: 'center'}} onClick={analyzeDocument}>Run Neural Extraction</button>}
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
      <footer className="footer-alpha" style={{padding: '60px', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.8rem', opacity: 0.5}}>
        © 2026 FinanceAI Institutional Labs. All Neural Vectors Encrypted.
      </footer>
    </div>
  );
}

export default App;
