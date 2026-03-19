import { useState, useRef, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);

  // Macro Stress Tester State
  const [interestRateShock, setInterestRateShock] = useState(0); // Additive % point
  const [costShock, setCostShock] = useState(0); // Multiplicative % increase in expenses
  const [demandShock, setDemandShock] = useState(0); // Multiplicative % decrease in revenue

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
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
    setResults(null);
    
    // Reset sliders
    setInterestRateShock(0);
    setCostShock(0);
    setDemandShock(0);
    
    const formData = new FormData();
    formData.append('document', file);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze document');
      }
      
      if (data.success && data.analysis) {
        setResults(data.analysis);
      } else {
        throw new Error('Invalid response array from server');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const scrollToApp = () => {
    document.getElementById('analyzer-app')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getSentimentBadgeClass = (sentiment) => {
    if (!sentiment) return 'neutral';
    const s = sentiment.toLowerCase();
    if (s.includes('positive') || s.includes('good') || s.includes('bullish')) return 'positive';
    if (s.includes('negative') || s.includes('bad') || s.includes('bearish')) return 'negative';
    return 'neutral';
  };

  // Predictive calculations for the UI using the extracted baselineFinancials
  const chartData = useMemo(() => {
    if (!results || !results.baselineFinancials) return [];
    
    const base = results.baselineFinancials;
    const months = [];
    
    // Convert sliders to decimal impacts
    const revenueImpact = 1 - (demandShock / 100); 
    const expenseImpact = 1 + (costShock / 100);
    
    // Calculate new monthly burned cash with debt interest assumed 5% base + interest rate shock
    const annualInterestRate = Math.max(0, 0.05 + (interestRateShock / 100));
    const monthlyInterestExp = (base.totalDebt * annualInterestRate) / 12;
    
    let currentCash = base.currentCashReserves;
    
    for (let i = 0; i <= 12; i++) {
        // Assume organic base growth naturally limits some disaster but applying shocks:
        const currentRev = base.monthlyRevenue * revenueImpact;
        const currentExp = base.monthlyOperatingExpenses * expenseImpact;
        
        const netCashFlow = currentRev - currentExp - monthlyInterestExp;
        
        if (i > 0) currentCash += netCashFlow;
        
        months.push({
            month: `Month ${i}`,
            cashReserves: Math.floor(currentCash),
            revenue: Math.floor(currentRev)
        });
    }
    return months;
  }, [results, interestRateShock, costShock, demandShock]);

  // Derived predictive metric
  const runwayMonths = useMemo(() => {
    if(!chartData.length) return 0;
    const bankruptIndex = chartData.findIndex(d => d.cashReserves <= 0);
    return bankruptIndex === -1 ? '>12 Months' : `${bankruptIndex} Months`;
  }, [chartData]);


  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          FinanceAI Predictor
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#analyzer-app" className="nav-link">App</a>
        </div>
        <button onClick={scrollToApp} className="nav-btn">Try For Free</button>
      </nav>

      <section className="hero">
        <div className="hero-pill flex items-center gap-2"><Activity size={16}/> New: What-If Macro Tester</div>
        <h1 className="hero-title">
          Don't Just Read The Past. <br/><span>Predict The Future.</span>
        </h1>
        <p className="hero-subtitle">
          FinanceAI not only extracts risk metrics, but generates a dynamic 12-month forward predictive model that stress-tests the company's survival against customizable macroeconomic shocks.
        </p>
        <div className="hero-cta">
          <button onClick={scrollToApp} className="btn-primary">Test A Document Now</button>
        </div>
      </section>

      {/* App Section / Analyzer */}
      <section id="analyzer-app" className="app-section">
        <div className="app-container">
          
          {!results && !loading && (
            <div className="upload-card">
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 className="upload-title">Drop financial statement here</h2>
                <p className="upload-subtitle">Upload 10-Qs, 10-Ks, or earning calls transcripts to build a forecast.</p>
              </div>

              <div 
                className={`drop-zone ${dragActive ? "active" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()}
              >
                <div className="upload-icon">📄</div>
                {file ? (
                  <h3 style={{color: 'var(--text-primary)'}}>{file.name}</h3>
                ) : (
                  <>
                    <h3 style={{color: 'white', marginBottom: '8px'}}>Click to upload or drag and drop</h3>
                    <p style={{color: 'var(--text-secondary)'}}>PDF or TXT</p>
                  </>
                )}
                
                <input 
                  ref={inputRef}
                  type="file" 
                  className="file-input" 
                  accept=".pdf,.txt"
                  onChange={handleChange}
                />
              </div>
              
              {error && <p style={{ color: 'var(--danger)', marginTop: '16px', textAlign: 'center' }}>{error}</p>}
              
              <button 
                className="analyze-btn" 
                onClick={analyzeDocument}
                disabled={!file}
              >
                {file ? 'Generate Insights & Forecast Model' : 'Select a File First'}
              </button>
            </div>
          )}

          {loading && (
            <div className="upload-card" style={{ padding: '80px 48px' }}>
              <div className="loader-container">
                <div className="loader"></div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Building Predictive Model...</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Extracting baseline cash burn, debt footprints, and mapping sentiment.</p>
              </div>
            </div>
          )}

          {results && (
            <div className="results-container">
              <div className="results-header">
                <div>
                  <h2 className="results-title">FinanceAI Intelligence Report</h2>
                </div>
                <button className="reset-btn" onClick={() => { setResults(null); setFile(null); }}>
                  Analyze New File
                </button>
              </div>
              
              <div className="results-grid" style={{ marginBottom: "40px" }}>
                
                {/* Sentiment */}
                <div className="result-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>Management Tone</h3>
                  <div className={`sentiment-badge ${getSentimentBadgeClass(results.sentiment)}`}>
                    {results.sentiment}
                  </div>
                </div>

                {/* Exec Summary */}
                <div className="result-card">
                  <h3>Executive Summary</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{results.summary}</p>
                </div>
              </div>

              {/* STRESS TESTER UI */}
              {results.baselineFinancials && (
                <div className="result-card full-width" style={{ marginBottom: "40px", border: "1px solid rgba(139, 92, 246, 0.5)", background: "rgba(15, 23, 42, 0.8)", boxShadow: "0 10px 40px rgba(0,0,0,0.5)"}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
                        <Activity className="text-secondary" style={{color: 'var(--accent-secondary)'}} />
                        <h2 style={{ color: 'white', fontSize: '1.75rem' }}>Interactive Macro-Shock Predictor</h2>
                    </div>
                    
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                        Based on the document's extracted baseline financials (Monthly Rev: ${(results.baselineFinancials.monthlyRevenue/1000000).toFixed(1)}M, Cash: ${(results.baselineFinancials.currentCashReserves/1000000).toFixed(1)}M, Debt: ${(results.baselineFinancials.totalDebt/1000000).toFixed(1)}M). Adjust sliders below to stress-test the company's 12-month runway horizon!
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '40px' }}>
                        
                        {/* Interactive Sliders Form */}
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: '600'}}>
                                    <span>Interest Rate Shock</span>
                                    <span style={{color: interestRateShock > 0 ? 'var(--danger)' : 'var(--text-secondary)'}}>+{interestRateShock}%</span>
                                </label>
                                <input 
                                    type="range" min="0" max="10" step="0.5" 
                                    value={interestRateShock} 
                                    onChange={(e)=>setInterestRateShock(parseFloat(e.target.value))}
                                    style={{width: '100%', accentColor: 'var(--accent-secondary)'}}
                                />
                                <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>Simulate sudden debt refinancing spike</span>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: '600'}}>
                                    <span>Supply Chain Inflation (Cost Shock)</span>
                                    <span style={{color: costShock > 0 ? 'var(--danger)' : 'var(--text-secondary)'}}>+{costShock}%</span>
                                </label>
                                <input 
                                    type="range" min="0" max="50" step="1" 
                                    value={costShock} 
                                    onChange={(e)=>setCostShock(parseFloat(e.target.value))}
                                    style={{width: '100%', accentColor: 'var(--accent-secondary)'}}
                                />
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: '600'}}>
                                    <span>Consumer Demand Crash</span>
                                    <span style={{color: demandShock > 0 ? 'var(--danger)' : 'var(--text-secondary)'}}>-{demandShock}%</span>
                                </label>
                                <input 
                                    type="range" min="0" max="50" step="1" 
                                    value={demandShock} 
                                    onChange={(e)=>setDemandShock(parseFloat(e.target.value))}
                                    style={{width: '100%', accentColor: 'var(--accent-secondary)'}}
                                />
                            </div>

                            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '16px', borderRadius: '12px', marginTop: '32px' }}>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Predicted Survival Runway</div>
                                <div style={{ fontSize: '2rem', fontWeight: '800', color: runwayMonths === '>12 Months' ? 'var(--success)' : 'var(--danger)'}}>
                                    {runwayMonths}
                                </div>
                            </div>
                        </div>

                        {/* Chart Result */}
                        <div style={{ height: '400px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                                    <YAxis tickFormatter={(val)=> "$" + (val/1000000).toFixed(0) + "M"} width={80} stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                                    <Tooltip 
                                      contentStyle={{backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(139, 92, 246, 0.4)', color: '#fff', borderRadius: '8px'}}
                                      formatter={(val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(val)}
                                    />
                                    <Legend />
                                    <Line type="monotone" name="Projected Cash Reserves" dataKey="cashReserves" stroke="var(--accent-secondary)" strokeWidth={3} dot={{r: 4, fill: "var(--accent-secondary)"}} activeDot={{ r: 8 }} />
                                    <Line type="monotone" name="Monthly Revenue Track" dataKey="revenue" stroke="var(--accent-color)" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
              )}

              <div className="results-grid">
                
                {/* Risks */}
                <div className="result-card">
                  <h3 style={{ color: 'var(--danger)' }}>Identified Qualitative Risks</h3>
                  <ul className="data-list risks">
                    {results.risks?.map((risk, index) => (
                      <li key={index}>{risk}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Opportunities */}
                <div className="result-card">
                  <h3 style={{ color: 'var(--success)' }}>Strategic Opportunities</h3>
                  <ul className="data-list opps">
                    {results.opportunities?.map((opportunity, index) => (
                      <li key={index}>{opportunity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
