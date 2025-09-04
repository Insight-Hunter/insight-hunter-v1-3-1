import { useState } from "react";
import "./welcome.css";
import DemoModal from "../components/DemoModal";

export default function Welcome() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <main className="ih-welcome">
      {/* Header */}
      <header className="ih-header">
        <div className="ih-logo" aria-label="Insight Hunter">
          <span className="ih-logo-mark">◈</span>
          <span className="ih-logo-type">INSIGHT&nbsp;HUNTER</span>
        </div>

        <nav className="ih-nav">
          <a href="/dashboard">Dashboard</a>
          <a href="/forecast">Forecast</a>
          <a href="/reports">Reports</a>
          <a href="/settings">Settings</a>
        </nav>
      </header>

      {/* Hero section */}
      <section className="ih-hero">
        <h1 className="ih-title">
          <span>Welcome to</span>
          <br />
          <span>Insight Hunter</span>
        </h1>
        <p className="ih-subtitle">
          Auto-CFO for freelancers and small firms — upload CSVs, get clean
          reports, forecasts, and cash-flow insights in minutes.
        </p>

        <div className="ih-cta">
          <a className="ih-btn ih-btn-primary" href="/setup">
            Start Setup
          </a>
          <button
            className="ih-btn ih-btn-secondary"
            onClick={() => setShowDemo(true)}
          >
            Watch Demo
          </button>
        </div>

        <div className="ih-hero-card" role="img" aria-label="Product preview">
          <div className="ih-kpis">
            <div className="ih-kpi">
              <div className="ih-kpi-label">MRR</div>
              <div className="ih-kpi-value">$6,400</div>
            </div>
            <div className="ih-kpi">
              <div className="ih-kpi-label">Active Clients</div>
              <div className="ih-kpi-value">18</div>
            </div>
            <div className="ih-kpi">
              <div className="ih-kpi-label">Avg. DSO</div>
              <div className="ih-kpi-value">27d</div>
            </div>
          </div>
          <div className="ih-chart-placeholder">
            <div className="bar" style={{ height: "36%" }} />
            <div className="bar" style={{ height: "54%" }} />
            <div className="bar" style={{ height: "70%" }} />
            <div className="bar" style={{ height: "45%" }} />
            <div className="bar" style={{ height: "82%" }} />
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="ih-features">
        <div className="ih-feature">
          <div className="ih-icon">📊</div>
          <h3>One-click Reports</h3>
          <p>Upload CSVs and export polished P&L, balance sheet, and KPI PDFs.</p>
        </div>
        <div className="ih-feature">
          <div className="ih-icon">📈</div>
          <h3>Forecasts that Learn</h3>
          <p>Rolling 12-month cash-flow and revenue forecasts with trend awareness.</p>
        </div>
        <div className="ih-feature">
          <div className="ih-icon">🔔</div>
          <h3>Smart Alerts</h3>
          <p>Catch invoice risk, runway dips, and spend anomalies before they bite.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="ih-footer">
        <span>© {new Date().getFullYear()} Insight Hunter</span>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </footer>

      {/* Demo modal placeholder */}
      <DemoModal open={showDemo} onClose={() => setShowDemo(false)}>
        <div className="ih-demo-body">
          <div className="ih-demo-poster" />
          <p className="ih-demo-note">
            Demo placeholder — drop in your video embed or walkthrough here.
          </p>
        </div>
      </DemoModal>
    </main>
  );
}