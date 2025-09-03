#!/usr/bin/env bash
set -euo pipefail

echo "▶ Insight Hunter setup — installing dependencies..."
if ! command -v npm >/dev/null 2>&1; then
  echo "❌ npm is required. Install Node.js 20+ first."
  exit 1
fi

npm install

echo "▶ Creating initial git repo (if missing)..."
if [ ! -d .git ]; then
  git init -q
  git add .
  git commit -m "chore: init Insight Hunter v1.3.1 (dynamic KPIs)" -q || true
fi

echo "▶ Building app..."
npm run build

cat <<'EONOTE'

✅ Install complete.
• Dev:     npm run dev
• Build:   npm run build
• Preview: npm run preview
• Pages dev (with Functions): npm run pages:dev

EONOTE
