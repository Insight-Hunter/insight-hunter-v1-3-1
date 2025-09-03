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
