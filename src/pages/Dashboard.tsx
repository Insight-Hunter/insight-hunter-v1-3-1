import { useEffect, useRef } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const barRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!barRef.current) return;
    const ctx = barRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Sep", "Oct", "Nov", "Dec"],
        datasets: [
          { label: "Revenue", data: [32, 35, 38, 42], backgroundColor: "rgba(54,162,235,.5)" },
          { label: "Expenses", data: [24, 25, 27, 29], backgroundColor: "rgba(255,99,132,.5)" }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: "top" as const } } }
    });

    return () => chart.destroy();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>Dashboard</h1>

      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginBottom: 16 }}>
        <Kpi label="MRR" value="$6,400" />
        <Kpi label="Active Clients" value="18" />
        <Kpi label="AR >30d" value="$2,910" />
        <Kpi label="Runway" value="6.2 mo" />
      </div>

      <section>
        <h3 style={{ margin: "8px 0" }}>Revenue vs Expenses</h3>
        <canvas ref={barRef} />
      </section>
    </main>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: "1px solid rgba(255,255,255,.12)", borderRadius: 12, padding: 14 }}>
      <div style={{ opacity: 0.7, fontSize: 12 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
    </div>
  );
}