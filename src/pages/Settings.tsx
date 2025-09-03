export default function Settings() {
  return (
    <main style={{ padding: 24, maxWidth: 680 }}>
      <h1>Settings</h1>
      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <label>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Workspace Name</div>
          <input placeholder="Insight Hunter Demo" style={inputStyle} />
        </label>
        <label>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Currency</div>
          <select style={inputStyle}>
            <option>USD</option><option>EUR</option><option>GBP</option>
          </select>
        </label>
        <button style={{ padding: "10px 14px", borderRadius: 8, width: 160 }}>Save</button>
      </div>
    </main>
  );
}
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,.15)", background: "transparent", color: "inherit" };