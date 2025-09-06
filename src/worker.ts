export interface Env {
  IH_SESSIONS: KVNamespace;
  PAGES_KV: KVNamespace;
  KV: KVNamespace;
  IH_TEMPLATES: R2Bucket;
  R2: R2Bucket;
  DB: D1Database;
  DB_STEPS: D1Database;
  AE: AnalyticsEngineDataset;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      const url = new URL(request.url);
      const path = url.pathname;

      // Health check
      if (path === "/health") {
        return new Response("OK", { status: 200 });
      }

      // Example API: Get session by id from KV
      if (path.startsWith("/api/session/")) {
        const sessionId = path.split("/").pop();
        if (!sessionId) {
          return new Response("Session ID required", { status: 400 });
        }
        const sessionData = await env.IH_SESSIONS.get(sessionId, { type: "json" });
        if (!sessionData) {
          return new Response("Session not found", { status: 404 });
        }
        return new Response(JSON.stringify(sessionData), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // Example API: Query analytics via AE binding (pseudo-code)
      if (path === "/api/analytics") {
        // Simulated query - customize with real queries to your Analytics Engine dataset
        const analyticsData = await env.AE.query("SELECT * FROM dataset LIMIT 10");
        return new Response(JSON.stringify(analyticsData), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // Static asset serving from R2 bucket
      if (path.startsWith("/templates/")) {
        const key = path.replace("/templates/", "");
        const object = await env.IH_TEMPLATES.get(key);
        if (!object) {
          return new Response("Template not found", { status: 404 });
        }
        return new Response(object.body, {
          headers: {
            "Content-Type": object.metadata?.contentType || "application/octet-stream"
          },
        });
      }

      // Default fallback
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message || "Server error" }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }
  },
};
