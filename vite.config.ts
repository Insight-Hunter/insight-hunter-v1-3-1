import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 900, // just raise the warning threshold
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          chartjs: ["chart.js"],
          capture: ["html2canvas"]
        }
      }
    }
  }
});
