export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;

      // Health check endpoint
      if (path === "/health") {
        return new Response("OK", { status: 200 });
      }

      // Get session by ID from KV
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

      // Query example for D1 database usage (adjust table/name accordingly)
      if (path.startsWith("/api/db/")) {
        const id = path.split("/").pop();
        if (!id) {
          return new Response("ID required", { status: 400 });
        }
        const queryResult = await env.DB.prepare("SELECT * FROM my_table WHERE id = ?").bind(id).all();
        return new Response(JSON.stringify(queryResult.results), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // Analytics Engine pseudo-query endpoint
      if (path === "/api/analytics") {
        // Placeholder; replace with actual AE query logic
        const analyticsData = await env.AE.query("SELECT * FROM dataset LIMIT 10");
        return new Response(JSON.stringify(analyticsData), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // Serve static files from R2 bucket
      if (path.startsWith("/templates/")) {
        const key = path.replace("/templates/", "");
        const object = await env.IH_TEMPLATES.get(key);
        if (!object) {
          return new Response("Template not found", { status: 404 });
        }
        return new Response(object.body, {
          headers: {
            "Content-Type": object.metadata?.contentType || "application/octet-stream",
          },
        });
      }

      // Default: Not found
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
