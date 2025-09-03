import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="hero">
      <h1>AI Auto-CFO for freelancers and small firms</h1>
      <p className="lead">Insight Hunter automates bookkeeping, forecasting, and reporting so you can focus on revenue, not spreadsheets.</p>
      <div className="cta">
        <Link className="btn-primary" to="/signup">Start free</Link>
        <Link className="btn" to="/dashboard">Live demo</Link>
      </div>

      <div style={{marginTop:28}} className="grid kpi">
        {[
          { label: 'MRR', value: '$6,400' },
          { label: 'Active Workspaces', value: '41' },
          { label: 'Reports / wk', value: '183' },
          { label: 'Avg Close Time', value: '3.2 days' }
        ].map((k,i)=>(
          <div key={i} className="card">
            <div style={{fontSize:12,opacity:.7, marginBottom:6}}>{k.label}</div>
            <div style={{fontSize:22, fontWeight:800}}>{k.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
