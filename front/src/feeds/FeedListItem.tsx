import type { Feed } from "shared/model/feed";
import styles from "../articles/ArticleList.module.css";

export function FeedListItem({ feed }: { feed: Feed }) {
  return (
    <>
      <a href={feed.url} class={`${styles.title} ${styles.cell}`}>
        {feed.title}
      </a>
    </>
  );
}
