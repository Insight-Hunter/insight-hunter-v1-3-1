#!/usr/bin/env bash
set -euo pipefail

# --- sanity ---
command -v node >/dev/null || { echo "Need Node"; exit 1; }
command -v npm  >/dev/null || { echo "Need npm"; exit 1; }
command -v npx  >/dev/null || { echo "Need npx"; exit 1; }

# --- deps ---
npm pkg set scripts.dev="vite" scripts.build="vite build" scripts.preview="vite preview" >/dev/null
npm i -D @vitejs/plugin-react@latest >/dev/null
npm i hono@latest >/dev/null

# --- Vite config (idempotent) ---
[ -f vite.config.ts ] || cat > vite.config.ts <<'TS'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], build: { outDir: 'dist' } })
TS

# --- Workers entry (keeps your current if present) ---
mkdir -p workers
if [ ! -f workers/index.ts ]; then
  cat > workers/index.ts <<'TS'
import { Hono } from 'hono'

// Simple API (expand later)
const api = new Hono()
api.get('/api/health', c => c.json({ ok: true, service: 'insight-hunter', ts: new Date().toISOString() }))
api.get('/api/summary', c => c.json({
  kpis: [
    { label: 'MRR', value: '$6,400' },
    { label: 'Active Clients', value: '18' },
    { label: 'Reports / wk', value: '183' }
  ]
}))
api.get('/api/forecast', c => c.json([
  { month: 'Sep', cashIn: 28000, cashOut: 21000, netCash: 7000, eomBalance: 42000 },
  { month: 'Oct', cashIn: 29500, cashOut: 21900, netCash: 7600, eomBalance: 49600 },
  { month: 'Nov', cashIn: 31000, cashOut: 22500, netCash: 8500, eomBalance: 58100 }
]))

// App shell
const app = new Hono()
app.route('/', api)
// Serve built SPA from assets binding produced by Cloudflare Vite plugin or Wrangler assets
app.get('*', c => c.env.ASSETS ? c.env.ASSETS.fetch(c.req.raw) : fetch(c.req.raw))
export default app
TS
fi

# --- React Router app structure ---
mkdir -p app/routes app/components app/styles

# Layout with mobile tabbar
cat > app/components/Layout.tsx <<'TSX'
import * as React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'

export default function Layout() {
  const { pathname } = useLocation()
  const showTabs = pathname !== '/'

  return (
    <main className="ih-layout" style={{display:'flex',flexDirection:'column',minHeight:'100vh',background:'#050809',color:'#e8f1ef'}}>
      <div style={{flex:1,overflowY:'auto',padding:'16px'}}>
        <Outlet />
      </div>
      {showTabs && (
        <nav className="ih-tabbar" style={{display:'flex',height:56,borderTop:'1px solid rgba(255,255,255,0.1)',background:'#0f1a1a',alignItems:'center',justifyContent:'space-around'}}>
          {[
            {to:'/dashboard',label:'Dashboard'},
            {to:'/forecast',label:'Forecast'},
            {to:'/reports',label:'Reports'},
            {to:'/analytics',label:'Analytics'},
            {to:'/settings',label:'Settings'},
          ].map(item => (
            <NavLink key={item.to} to={item.to}
              style={({isActive})=>({flex:1,textAlign:'center',padding:'8px 0',textDecoration:'none',color:isActive?'#1fd1b5':'#a8b8b5',fontWeight:isActive?600:400})}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </main>
  )
}
TSX

# Welcome (landing)
cat > app/routes/_index.tsx <<'TSX'
import * as React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <section style={{maxWidth:780,margin:'40px auto'}}>
      <h1 style={{fontSize:36,marginBottom:8}}>Insight Hunter</h1>
      <p style={{opacity:.85,marginBottom:16}}>
        AI-powered Auto-CFO for freelancers, small firms, and CFOs — reporting, forecasting, cash flow, and insights.
      </p>
      <div style={{display:'grid',gap:12,gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',marginTop:24}}>
        <Link to="/dashboard" style={btn()}>Open Dashboard</Link>
        <Link to="/upload" style={btn()}>Upload CSV</Link>
        <Link to="/portal" style={btn()}>Client Portal</Link>
      </div>
      <p style={{marginTop:16,opacity:.7}}>Demo API: <code>/api/health</code>, <code>/api/summary</code>, <code>/api/forecast</code></p>
    </section>
  )
  function btn(){return {display:'inline-block',padding:'12px 14px',background:'#1fd1b5',color:'#001310',borderRadius:10,fontWeight:600,textDecoration:'none',textAlign:'center'}}
}
TSX

# Core feature stubs
cat > app/routes/dashboard.tsx <<'TSX'
export default function Dashboard(){
  return (
    <section>
      <h2>Dashboard</h2>
      <p>KPIs, trends, recent activity. (Stub)</p>
    </section>
  )
}
TSX

cat > app/routes/forecast.tsx <<'TSX'
export default function Forecast(){
  return (
    <section>
      <h2>Forecast</h2>
      <p>Cashflow predictor with charts & scenarios. (Stub)</p>
    </section>
  )
}
TSX

cat > app/routes/reports.tsx <<'TSX'
export default function Reports(){
  return (
    <section>
      <h2>Reports</h2>
      <p>P&L, Balance Sheet, and downloadable PDFs. (Stub)</p>
    </section>
  )
}
TSX

cat > app/routes/analytics.tsx <<'TSX'
export default function Analytics(){
  return (
    <section>
      <h2>Analytics & Trends</h2>
      <p>Insights like “invoice risk increased 12% last month”. (Stub)</p>
    </section>
  )
}
TSX

cat > app/routes/upload.tsx <<'TSX'
export default function UploadCSV(){
  return (
    <section>
      <h2>Upload CSV</h2>
      <p>Drag-and-drop or browse to upload transactions. (Stub)</p>
    </section>
  )
}
TSX

cat > app/routes/portal.tsx <<'TSX'
export default function ClientPortal(){
  return (
    <section>
      <h2>Client Portal</h2>
      <p>Shareable dashboards & reports for clients. (Stub)</p>
    </section>
  )
}
TSX

cat > app/routes/settings.tsx <<'TSX'
export default function Settings(){
  return (
    <section>
      <h2>Settings</h2>
      <ul>
        <li>Business profile</li>
        <li>Integrations (QB/Xero stub)</li>
        <li>Notifications</li>
      </ul>
    </section>
  )
}
TSX

mkdir -p app/routes/auth
cat > app/routes/auth/signin.tsx <<'TSX'
export default function SignIn(){
  return (
    <section>
      <h2>Sign In</h2>
      <p>(Stub) Email + password form.</p>
    </section>
  )
}
TSX

cat > app/routes/auth/signup.tsx <<'TSX'
export default function SignUp(){
  return (
    <section>
      <h2>Create Account</h2>
      <p>(Stub) Name, email, password.</p>
    </section>
  )
}
TSX

# Not found
cat > app/routes/$.tsx <<'TSX'
export default function NotFound(){
  return (
    <section>
      <h2>Not Found</h2>
      <p>Route not found. Use the tab bar to navigate.</p>
    </section>
  )
}
TSX

# Root route wraps everything with Layout
cat > app/routes/_layout.tsx <<'TSX'
import Layout from '../components/Layout'
export default Layout
TSX

# --- minimal styles (optional) ---
cat > app/styles/global.css <<'CSS'
/* reserved for future Tailwind or custom CSS */
CSS

# --- build & deploy ---
npm run build
# In redirected-config mode, do NOT pass --env; the plugin flattens the config.
npx wrangler deploy

echo "Upgrade complete."
