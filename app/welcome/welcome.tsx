import { Link } from 'react-router-dom'
import { CheckCircle } from 'react-feather' // optional, or swap with emoji
import DemoSlider from "../components/DemoSlider"
import "./WelcomePage.css"

export default function Welcome() {
  const steps = [
    "Connect your accounts",
    "Set up income and expense insights",
    "Monitor Crypto Funds"
    "Ask Questions, Get AI Powered Answers"
  ]

  return (
    <div className="welcome-screen">
      <div className="logo-wrap">
        {/* Replace with your actual logo SVG/img */}
        <img src="/logo.svg" alt="Insight Hunter logo" className="logo-img" />
        <h2>INSIGHT<br/>HUNTER</h2>
      </div>

      <h1>Welcome to<br/>Insight Hunter</h1>
      <p className="lead">Get started in a few simple steps</p>

      <div className="icon-wrap">
        {/* Placeholder wallet icon */}
        <div className="wallet-icon">💼</div>
      </div>

      <ul className="checklist">
        {steps.map((s, i) => (
          <li key={i}>
            <CheckCircle size={18} color="#1fd1b5" style={{marginRight:8}}/>
            {s}
          </li>
        ))}
      </ul>
     <div className="welcome-slider-wrapper">
      <DemoSlider autoplay={true} />
     </div>
  )
}

      <Link to="/dashboard" className="btn-primary continue-btn">
        Continue
      </Link>
    </div>
  )
}
