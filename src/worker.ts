interface Env {
  // Add bindings here (KV namespaces, Durable Objects, Secrets)
  // Example:
  // INSIGHT_KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname, searchParams } = new URL(request.url);

    // Simple router
    if (pathname === "/api/health") {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (pathname === "/api/forecast" && request.method === "GET") {
      // Placeholder forecasting response
      const forecastData = {
        message: "Forecast data endpoint is working",
         
      };
      return new Response(JSON.stringify(forecastData), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Default: serve a friendly text response
    return new Response("Insight Hunter Worker is up. Try /api/health", {
      headers: { "Content-Type": "text/plain" },
    });
  },
};
