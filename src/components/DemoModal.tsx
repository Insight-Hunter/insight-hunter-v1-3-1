// src/components/DemoModal.tsx
import { useEffect, useState } from "react"
import "./DemoModal.css"

const demoSlides = [
  { title: "Real-Time KPIs", value: "$12,480", description: "Revenue this week" },
  { title: "Burn Rate", value: "$3,210", description: "Monthly spend" },
  { title: "Forecast Accuracy", value: "92%", description: "AI prediction confidence" },
]

export default function DemoModal({ onClose }: { onClose?: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % demoSlides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const { title, value, description } = demoSlides[currentSlide]

  return (
    <div className="demo-modal">
      <div className="demo-card">
        <h2 className="demo-title">{title}</h2>
        <p className="demo-value">{value}</p>
        <p className="demo-description">{description}</p>
      </div>

      {onClose && (
        <button className="demo-close" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  )
}
