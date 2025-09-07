export default {
  async fetch(request: Request): Promise<Response> {
    // Basic response for all requests
    return new Response('Insight Hunter Worker is running!', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};


