import { parseFeed } from "../_shared/feed.ts";

export async function handler(req: Request) {
  const { url } = await req.json();
  return await parseFeed(url);
}
