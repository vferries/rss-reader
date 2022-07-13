import type { Feed } from "shared/model/feed";
import { For } from "solid-js";
import styles from "../articles/ArticleList.module.css";
import { FeedListItem } from "./FeedListItem";

export function FeedList({ feeds }: { feeds: Feed[] }) {
  return (
    <ul class={styles.ArticleList}>
      <For each={feeds}>
        {(feed) => (
          <li class={styles.li}>
            <FeedListItem feed={feed} />
          </li>
        )}
      </For>
    </ul>
  );
}
