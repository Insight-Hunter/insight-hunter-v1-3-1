export default function Dashboard(){
  const items = [
    { label: 'Revenue (MTD)', value: '$22,310' },
    { label: 'Net Income (MTD)', value: '$7,940' },
    { label: 'Invoices due (7d)', value: '12' },
    { label: 'Cash runway', value: '7.5 months' },
  ]
  return (
    <div>
      <h1 style={{fontSize:28, margin:'4px 0 12px'}}>Dashboard</h1>
      <p className="lead" style={{marginTop:0}}>“Your invoice risk increased 12% last month.”</p>
      <div className="grid kpi">
        {items.map((k,i)=>(
          <div className="card" key={i}>
            <div style={{fontSize:12,opacity:.7, marginBottom:6}}>{k.label}</div>
            <div style={{fontSize:22, fontWeight:800}}>{k.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
