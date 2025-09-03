import { useEffect, useRef } from "react";
import {
  Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend,
} from "chart.js";
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

export default function Forecast() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Sep", "Oct", "Nov", "Dec"],
        datasets: [
          { label: "Cash In", data: [28000, 29500, 31000, 33000], borderColor: "#36a2eb", backgroundColor: "rgba(54,162,235,.2)", tension: 0.3 },
          { label: "Cash Out", data: [21000, 21900, 24000, 26000], borderColor: "#ff6384", backgroundColor: "rgba(255,99,132,.2)", tension: 0.3 }
        ]
      },
      options: { responsive: true, plugins: { title: { display: true, text: "Cash Flow Forecast" }, legend: { position: "top" as const } } }
    });

    return () => chart.destroy();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Forecast</h1>
      <canvas ref={canvasRef} />
    </main>
  );
}