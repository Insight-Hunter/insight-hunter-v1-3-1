// src/components/DemoModal.tsx
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./DemoModal.css"

// Simple hook to animate numbers
function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!target) return
    let start = 0
    const stepTime = Math.max(Math.floor(duration / target), 20)
    const timer = setInterval(() => {
      start += 1
      setValue(start)
      if (start >= target) clearInterval(timer)
    }, stepTime)
    return () => clearInterval(timer)
  }, [target, duration])
  return value
}

export default function DemoModal({ onClose }) {
  const SLIDE_DURATION = 3500 // ms
  const [index, setIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [progress, setProgress] = useState(0)
  const [kpis, setKpis] = useState(null)

  // Fetch KPI data once
  useEffect(() => {
    fetch("/api/summary")
      .then(res => res.json())
      .then(data => setKpis(data))
      .catch(() => setKpis({ mrr: 12000, clients: 8, invoices: 42 })) // fallback
  }, [])

  // Autoplay + progress sync
  useEffect(() => {
    if (!autoPlay) return
    setProgress(0)
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100)
      setProgress(pct)
      if (elapsed >= SLIDE_DURATION) {
        setIndex(i => (i < 3 ? i + 1 : i))
      } else {
        requestAnimationFrame(tick)
      }
    }
    requestAnimationFrame(tick)
  }, [index, autoPlay])

  const replay = () => {
    setIndex(0)
    setAutoPlay(true)
  }

  // Animated KPI values (only when on slide 2 index)
  const mrrVal = useCountUp(index === 2 && kpis ? kpis.mrr : 0)
  const clientsVal = useCountUp(index === 2 && kpis ? kpis.clients : 0)
  const invoicesVal = useCountUp(index === 2 && kpis ? kpis.invoices : 0)

  const slides = [
    { title: "Welcome", content: "Insight Hunter helps you forecast, report, and grow." },
    { title: "Connect Data", content: "Upload your CSV or sync with QuickBooks." },
    {
      title: "Customize Dashboard",
      content: kpis ? (
        <div className="kpi-grid">
          <div><span className="kpi-number">${mrrVal}</span><span className="kpi-label">MRR</span></div>
          <div><span className="kpi-number">{clientsVal}</span><span className="kpi-label">Clients</span></div>
          <div><span className="kpi-number">{invoicesVal}</span><span className="kpi-label">Invoices</span></div>
        </div>
      ) : "Loading KPIs..."
    },
    { title: "Share Insights", content: "Invite clients or generate reports." }
  ]

  return (
    <div className="demo-modal-overlay">
      <div className="demo-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="slide">
          <h2>{slides[index].title}</h2>
          <div className="slide-content">{slides[index].content}</div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {index === slides.length - 1 && (
          <div className="cta-row">
            <Link to="/dashboard" className="cta-primary">Try It Now</Link>
            <button onClick={replay} className="cta-secondary">Replay Demo</button>
          </div>
        )}
      </div>
    </div>
  )
}
