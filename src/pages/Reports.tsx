import React, { useEffect, useState } from 'react'
import { jsPDF } from 'jspdf'

type Kpi = { label: string; value: string }

export default function Reports(){
  const [kpis, setKpis] = useState<Kpi[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/demo/summary')
        if(!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: Kpi[] = await res.json()
        if(mounted) setKpis(data || [])
      } catch (e:any) {
        if(mounted) setError(e?.message || 'Failed to load KPIs')
      } finally {
        if(mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const downloadReportPdf = () => {
    const doc = new jsPDF()
    // Title
    doc.setFontSize(18)
    doc.text('Insight Hunter - Weekly Report', 20, 20)
    // Date
    doc.setFontSize(12)
    const today = new Date()
    doc.text(`Date: ${today.toLocaleDateString()}`, 20, 30)

    // Dynamic KPIs
    let y = 50
    doc.setFontSize(12)
    if (kpis && kpis.length){
      doc.text('Summary KPIs:', 20, y); y += 8
      kpis.forEach(k => {
        doc.text(`• ${k.label}: ${k.value}`, 24, y)
        y += 8
      })
    } else {
      doc.text('No KPI data available.', 20, y)
    }

    doc.save('weekly_report.pdf')
  }

  return (
    <div>
      <h1 style={{fontSize:28, margin:'4px 0 12px'}}>Reports</h1>
      <p className="lead">Generate P&L, Balance Sheet, and KPI PDFs.</p>

      <div className="card" style={{margin:'8px 0', padding:'12px'}}>
        <div style={{fontSize:16, fontWeight:700, marginBottom:8}}>This Week’s KPIs</div>
        {loading && <div style={{opacity:.8}}>Loading KPIs…</div>}
        {error && <div style={{color:'#faa'}}>Error: {error}</div>}
        {!loading && !error && (
          <ul style={{margin:0, paddingLeft:18}}>
            {kpis.map((k, i) => (
              <li key={i} style={{margin:'6px 0'}}>
                <span style={{opacity:.75}}>{k.label}:</span> <strong>{k.value}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={downloadReportPdf} className="btn btn-primary download-btn">Download PDF</button>
    </div>
  )
}
