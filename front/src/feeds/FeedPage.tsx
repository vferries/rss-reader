import type { Feed } from "shared/model/feed";
import { createResource, onCleanup, Show } from "solid-js";
import { client } from "../utils/supabaseClient";
import { AddFeed } from "./AddFeed";
import { FeedList } from "./FeedList";
import { RefreshAll } from "./RefreshAll";

const getFeeds = async () => {
  const { data } = await client.from<Feed>("feed").select();
  return data;
};

export function FeedPage({
  fetcher = getFeeds,
}: {
  fetcher?: () => Promise<Feed[] | null>;
}) {
  const [data, { refetch }] = createResource(fetcher);
  const subscription = client
    .from<Feed>("feed")
    .on("INSERT", () => {
      void refetch();
    })
    .subscribe();
  onCleanup(() => subscription.unsubscribe());
  return (
    <Show when={!data.loading} fallback={<>Loading feeds...</>}>
      <AddFeed />
      <RefreshAll />
      <FeedList feeds={data() || []} />
    </Show>
  );
}
