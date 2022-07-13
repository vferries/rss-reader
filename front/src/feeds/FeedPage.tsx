import type { Feed } from "shared/model/feed";
import { createResource, Show } from "solid-js";
import { client } from "../utils/supabaseClient";
import { AddFeed } from "./AddFeed";
import { FeedList } from "./FeedList";

const getFeeds = async () => {
  const { data } = await client.from<Feed>("feed").select();
  return data;
};

export function FeedPage({
  fetcher = getFeeds,
}: {
  fetcher?: () => Promise<Feed[] | null>;
}) {
  const [data] = createResource(fetcher);
  return (
    <Show when={!data.loading} fallback={<>Loading feeds...</>}>
      <AddFeed />
      <FeedList feeds={data() || []} />
    </Show>
  );
}
