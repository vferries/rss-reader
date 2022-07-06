import type { Article } from "shared/model/article";
import { For } from "solid-js";
import styles from "./ArticleList.module.css";
import { ArticleListItem } from "./ArticleListItem";

export function ArticleList({
  articles,
  setSelected,
}: {
  articles: Article[];
  setSelected: (selected: Article | undefined) => void;
}) {
  return (
    <ul class={styles.ArticleList}>
      <For each={articles}>
        {(article) => (
          <li class={styles.li}>
            <ArticleListItem
              article={article}
              onClick={() => setSelected(article)}
            />
          </li>
        )}
      </For>
    </ul>
  );
}
