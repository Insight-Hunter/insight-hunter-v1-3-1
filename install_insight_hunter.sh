#!/usr/bin/env bash
set -euo pipefail

# ========= Config =========
REPO_URL="https://github.com/Insight-Hunter/insight-hunter-v1-3-1.git"
APP_DIR="insight-hunter-v1-3-1"
APP_NAME="insight-hunter"
DOMAIN="insight.hunterturner.com"
ZONE_NAME="hunterturner.com"
CF_ACCOUNT_ID="18c8e61a3669253dcfd0c7eec6be36a3"   # jameshunterturner@gmail.com
ENTRY_FILE="src/worker.ts"
COMPAT_DATE="$(date +%Y-%m-%d)"

log()   { printf "\n\033[1;32m▶ %s\033[0m\n" "$*"; }
die()   { printf "\n\033[1;31m✖ %s\033[0m\n" "$*"; exit 1; }

# ========= Pre-flight =========
command -v git >/dev/null || die "Missing git"
command -v node >/dev/null || die "Missing node"
command -v npm  >/dev/null || die "Missing npm"
command -v npx  >/dev/null || die "Missing npx"

if ! npx --yes wrangler@^4 whoami >/dev/null 2>&1; then
  die "Not logged in to Cloudflare. Run: npx wrangler login"
fi

# ========= Clone fresh =========
rm -rf "$APP_DIR"
git clone "$REPO_URL" "$APP_DIR"
cd "$APP_DIR"

# ========= Install deps =========
log "Installing dependencies"
rm -rf node_modules package-lock.json
npm install
npm i -D @vitejs/plugin-react wrangler@^4
npm i hono

# ========= Wrangler config =========
log "Writing wrangler.toml"
cat > wrangler.toml <<TOML
name = "${APP_NAME}"
main = "${ENTRY_FILE}"
compatibility_date = "${COMPAT_DATE}"
account_id = "${CF_ACCOUNT_ID}"
workers_dev = true
minify = true
tsconfig = "tsconfig.json"

[assets]
directory = "./dist"
binding   = "ASSETS"

[env.production]
workers_dev = false
routes = [
  { pattern = "${DOMAIN}/*", zone_name = "${ZONE_NAME}" }
]
TOML

# ========= Worker entrypoint =========
mkdir -p src
cat > src/api.ts <<'TS'
import { Hono } from 'hono'

const app = new Hono()

app.get('/api/health', (c) =>
  c.json({ ok: true, service: 'insight-hunter', ts: new Date().toISOString() })
)

export default app
TS

cat > src/worker.ts <<'TS'
import { Hono } from 'hono'
import api from './api'

const app = new Hono()
app.route('/', api)

app.get('*', async (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
TS

# ========= Vite config =========
cat > vite.config.ts <<'TS'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], build: { outDir: 'dist' } })
TS

# ========= Build & Deploy =========
log "Building"
npm run build

log "Deploying (staging workers.dev)"
npx wrangler deploy

log "Deploying (production)"
CLOUDFLARE_ENV=production npx wrangler deploy

log "Done!"
echo "Live at: https://${DOMAIN}"
