import { client } from "../_shared/supabaseClient.ts";
import { serveWithCorsAndHeaders } from "../_shared/serveWithCorsAndHeaders.ts";
import { refreshFeed } from "../_shared/feed.ts";
import { Feed } from "../_shared/model/feed.ts";

async function listFeedUrls() {
  const { error, data } = await client.from<Pick<Feed, "url">>("feed").select(
    "url",
  );
  if (error) {
    throw error;
  } else {
    return data.map((f) => f.url);
  }
}

serveWithCorsAndHeaders(async () => {
  const urls = await listFeedUrls();
  return await Promise.all(urls.map(refreshFeed));
});

/*
 * To invoke:
 * curl -i --location --request POST 'http://localhost:54321/functions/v1/' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' --header 'Content-Type: application/json' --data '{"url":"https://www.enveille.info/feed.xml"}'
 */
