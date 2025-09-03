import { useEffect, useRef } from "react";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function Analytics() {
  const trendRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!trendRef.current) return;
    const ctx = trendRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["W1", "W2", "W3", "W4"],
        datasets: [
          { label: "Net Income", data: [7.2, 8.1, 6.9, 9.4], borderColor: "#4bc0c0", backgroundColor: "rgba(75,192,192,.2)", tension: 0.35 }
        ]
      },
      options: { responsive: true, plugins: { legend: { display: true } } }
    });

    return () => chart.destroy();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Analytics & Trends</h1>
      <p style={{ opacity: 0.8, marginTop: -8 }}>“Your invoice risk increased 12% last month.”</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        <canvas ref={trendRef} />
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>MRR growth trending +5% MoM.</li>
          <li>COGS stable; margin improving +1.3 pts.</li>
          <li>Invoices past due: 3 ($1,100).</li>
        </ul>
      </div>
    </main>
  );
}