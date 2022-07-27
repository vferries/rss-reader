import { client } from "../_shared/supabaseClient.ts";
import { Feed } from "../_shared/model/feed.ts";
import { refreshFeed } from "../_shared/feed.ts";

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

export async function handler(req: Request) {
  const urls = await listFeedUrls();
  return await Promise.all(urls.map(refreshFeed));
}
