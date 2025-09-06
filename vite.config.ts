build: {
  outDir: 'dist',
  sourcemap: true,
  rollupOptions: {
    input: 'src/worker.js', // adjust path as needed
    output: {
      entryFileNames: 'worker.mjs',
      format: 'es',
    },
    manualChunks: {
      react: ["react", "react-dom", "react-router-dom"],
      chartjs: ["chart.js"],
      capture: ["html2canvas"]
    }
  }
}
