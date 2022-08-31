import type { Feed } from "shared/model/feed";
import styles from "../articles/ArticleList.module.css";
import { client } from "../utils/supabaseClient";

export function FeedListItem({ feed }: { feed: Feed }) {
  const refreshFeed = () => {
    const body = JSON.stringify({ url: feed.url });
    void client.functions.invoke("refresh-feed", { body });
  };
  return (
    <>
      <a href={feed.url} class={`${styles.title} ${styles.cell}`}>
        {feed.title}
      </a>
      <button class="button secondary" type="button" onClick={refreshFeed}>
        Refresh feed
      </button>
    </>
  );
}
