// app/routes/_index.tsx
import * as React from "react"
import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <div style={{ background: "#050809", color: "#e8f1ef", minHeight: "100vh" }}>
      <header style={{ padding: "24px 16px 8px", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg,#1fd1b5,#31e1c5)"
            }}
            aria-hidden
          />
          <strong style={{ fontSize: 18, letterSpacing: 0.4 }}>Insight Hunter</strong>
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 16px" }}>
        {/* Hero */}
        <section style={{ display: "grid", gap: 16 }}>
          <h1 style={{ fontSize: 36, lineHeight: 1.15, margin: 0 }}>
            AI-powered Auto-CFO for freelancers & small firms
          </h1>
          <p style={{ opacity: 0.85, fontSize: 16, margin: 0 }}>
            Automate reporting, forecasting, and cash-flow clarity. Upload a CSV or connect your data — get
            instant dashboards, trends, and executive-ready PDFs.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            <Link to="/dashboard" style={cta()}>Open Dashboard</Link>
            <Link to="/upload" style={ghost()}>Upload CSV</Link>
            <Link to="/portal" style={ghost()}>Client Portal</Link>
          </div>

          {/* Trust strip / quick KPIs */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))",
            gap: 12, marginTop: 18
          }}>
            {[
              ["Set up in minutes", "No bookkeeping overhaul needed"],
              ["Forecasts & alerts", "Spot risks before they bite"],
              ["Export to PDF", "Board-ready reports"]
            ].map(([h, s]) => (
              <div key={h}
                   style={{ background: "#0f1a1a", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>{h}</div>
                <div style={{ opacity: .7, fontSize: 13 }}>{s}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature cards */}
        <section style={{ marginTop: 28, display: "grid", gap: 12,
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
          {features.map(f => (
            <article key={f.title}
                     style={{ background: "#0b1213", border: "1px solid rgba(255,255,255,.08)",
                       borderRadius: 16, padding: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{f.title}</div>
              <p style={{ opacity: .75, fontSize: 14, marginBottom: 12 }}>{f.subtitle}</p>
              <ul style={{ margin: 0, paddingLeft: 18, opacity: .8, fontSize: 13 }}>
                {f.points.map(p => <li key={p} style={{ marginBottom: 6 }}>{p}</li>)}
              </ul>
            </article>
          ))}
        </section>

        {/* How it works */}
        <section style={{ marginTop: 28 }}>
          <h3 style={{ margin: 0, fontSize: 18, marginBottom: 10 }}>How it works</h3>
          <ol style={{ margin: 0, paddingLeft: 18, opacity: .85 }}>
            <li>Upload a CSV or connect your accounting data (QB/Xero stub).</li>
            <li>We parse, classify, and surface insights automatically.</li>
            <li>Review dashboards, tweak scenarios, and export a PDF report.</li>
          </ol>
        </section>

        {/* API demo note */}
        <section style={{ marginTop: 28, opacity: .65, fontSize: 13 }}>
          Demo endpoints: <code>/api/health</code>, <code>/api/summary</code>, <code>/api/forecast</code>.
        </section>
      </main>

      <footer style={{ padding: "24px 16px 40px", opacity: .6, textAlign: "center" }}>
        © {new Date().getFullYear()} Insight Hunter
      </footer>
    </div>
  )
}

function cta(): React.CSSProperties {
  return {
    display: "inline-block", padding: "12px 14px", background: "#1fd1b5",
    color: "#001310", borderRadius: 12, fontWeight: 700, textDecoration: "none"
  }
}
function ghost(): React.CSSProperties {
  return {
    display: "inline-block", padding: "12px 14px", background: "#0f1a1a",
    color: "#cfe8e4", borderRadius: 12, fontWeight: 600, textDecoration: "none",
    border: "1px solid rgba(255,255,255,.12)"
  }
}

const features = [
  {
    title: "Dashboard",
    subtitle: "KPIs and trends at a glance.",
    points: ["MRR, Active Clients, AR/AP (stubs)", "Recent activity feed (stub)", "Drill-downs (stub)"]
  },
  {
    title: "Forecast",
    subtitle: "Cash-flow scenarios in minutes.",
    points: ["Receipts vs disbursements", "EOM balance line", "Sensitivity toggles (stub)"]
  },
  {
    title: "Reports",
    subtitle: "Board-ready PDFs in one click.",
    points: ["P&L (stub)", "Balance Sheet (stub)", "Custom commentary (stub)"]
  },
  {
    title: "Analytics & Trends",
    subtitle: "Narrative insights from your data.",
    points: ["Invoice risk signal (stub)", "Spike & seasonality (stub)", "Vendor concentration (stub)"]
  },
  {
    title: "Client Portal",
    subtitle: "Shareable link for stakeholders.",
    points: ["Read-only dashboards (stub)", "Report downloads (stub)", "Access controls (stub)"]
  },
  {
    title: "Integrations",
    subtitle: "Meet you where your books live.",
    points: ["QuickBooks Online (stub)", "Xero (stub)", "CSV importer (ready)"]
  }
]
