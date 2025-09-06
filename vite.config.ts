import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    outDir: 'public',
    sourcemap: true,
    rollupOptions: {
      input: 'src/worker.ts', // or 'src/worker.js' if JS
      output: {
        entryFileNames: 'worker.mjs',
        format: 'es',
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          chartjs: ['chart.js'],
          capture: ['html2canvas']
        }
      }
    }
  }
});
