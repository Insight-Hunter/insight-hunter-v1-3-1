#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Insight Hunter upgrade helper"
echo " - cleans node_modules"
echo " - updates wrangler & vite"
echo " - reconciles lockfile drift"

if ! command -v npm >/dev/null 2>&1; then
  echo "❌ npm is required."
  exit 1
fi

rm -rf node_modules package-lock.json

npm pkg set devDependencies.wrangler='^4.0.0'
npm pkg set devDependencies.vite='^5.4.10'
npm pkg set devDependencies['@vitejs/plugin-react']='^4.3.2'
npm pkg set engines.node='>=20'

npm install
npm run build

echo "✅ Upgrade complete."
