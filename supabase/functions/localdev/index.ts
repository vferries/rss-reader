import { serveWithCorsAndHeaders } from "../_shared/serveWithCorsAndHeaders.ts";
import { handler as addFeed } from "../add-feed/handler.ts";
import { handler as refreshFeed } from "../refresh-feed/handler.ts";
import { handler as refreshAll } from "../refresh-all/handler.ts";

const paths: Record<string, (req: Request) => unknown> = {
  "add-feed": addFeed,
  "refresh-feed": refreshFeed,
  "refresh-all": refreshAll,
};

serveWithCorsAndHeaders((req) => {
  const path = new URL(req.url).pathname.substring(1); // remove leading slash
  console.log("Calling localdev function with path " + path);
  const handler = paths[path];
  if (!handler) {
    throw new Error("Unknown path");
  }
  return handler(req);
});

/*
 * To invoke:
 * curl -i --location --request POST 'http://localhost:54321/functions/v1/' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' --header 'Content-Type: application/json' --data '{"url":"https://www.enveille.info/feed.xml"}'
 */
