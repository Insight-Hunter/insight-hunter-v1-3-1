export default function Reports() {
  const rows = [
    { id: "R-001", name: "P&L – Aug", status: "Ready", size: "126 KB" },
    { id: "R-002", name: "Cash Flow – Aug", status: "Ready", size: "98 KB" },
    { id: "R-003", name: "AR Aging – Aug", status: "Draft", size: "—" }
  ];

  const exportPdf = () => {
    alert("PDF export stub — hook up jsPDF later.");
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Reports</h1>

      <div style={{ margin: "12px 0 16px" }}>
        <button onClick={exportPdf} style={{ padding: "10px 14px", borderRadius: 8 }}>
          Export Current View (PDF)
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Size</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
                <Td>{r.id}</Td>
                <Td>{r.name}</Td>
                <Td>{r.status}</Td>
                <Td>{r.size}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600 }}>{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "10px 8px" }}>{children}</td>;
}