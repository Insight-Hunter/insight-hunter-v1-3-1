import { useEffect, useRef, useState } from 'react'
import { Chart } from 'chart.js/auto'

type Row = { month: string; cashIn: number; cashOut: number; netCash: number }

export default function Forecast(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const chartRef = useRef<Chart | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = True

    async function load(){
      try{
        const res = await fetch('/api/demo/forecast')
        const rows: Row[] = await res.json()

        if(!mounted || !canvasRef.current) return
        const labels = rows.map(r => r.month)
        const cashIn = rows.map(r => r.cashIn)
        const cashOut = rows.map(r => r.cashOut)
        const netCash = rows.map(r => r.netCash)

        const ctx = canvasRef.current.getContext('2d')
        if(!ctx) return

        if(chartRef.current){
          chartRef.current.destroy()
        }

        chartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              { label:'Cash In', data: cashIn },
              { label:'Cash Out', data: cashOut },
              { label:'Net Cash', data: netCash },
            ]
          },
          options: {
            responsive:true,
            plugins: { legend: { display: true, labels: { color: '#d0d7d6' } } },
            scales: { 
              x: { ticks: { color: '#d0d7d6' }, grid: { color: '#2a3232' } },
              y: { ticks: { color: '#d0d7d6' }, grid: { color: '#2a3232' } }
            }
          }
        })
      } finally {
        if(mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false; if(chartRef.current) chartRef.current.destroy() }
  }, [])

  return (
    <div>
      <h1 style={{fontSize:28, margin:'4px 0 12px'}}>Forecast</h1>
      <div className="card">
        {loading ? <div style={{padding:12, opacity:.8}}>Loading forecast…</div> : null}
        <canvas ref={canvasRef} height={180}/>
      </div>
    </div>
  )
}
