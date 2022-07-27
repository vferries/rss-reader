import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { corsHeaders } from "./cors.ts";
import { headers } from "./headers.ts";

export function serveWithCorsAndHeaders(fn: (req: Request) => unknown) {
  serve(async (req) => {
    // This is needed if you're planning to invoke your function from a browser.
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    const data = await fn(req);

    return new Response(JSON.stringify(data), {
      headers,
    });
  });
}
