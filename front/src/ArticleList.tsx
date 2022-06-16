import type { Article } from "shared/model/article";
import { createResource, For, Show } from "solid-js";
import { ArticleDetail } from "./ArticleDetail";
import styles from "./ArticleList.module.css";
import { client } from "./supabaseClient";

const getArticles = async () => {
  const { data } = await client.from<Article>("article").select("*");
  return data;
};

export function ArticleList({
  fetcher = getArticles,
}: {
  fetcher?: () => Promise<Article[] | null>;
}) {
  const [data] = createResource(fetcher);
  return (
    <Show when={!data.loading} fallback={<>Loading articles...</>}>
      <ul class={styles.ArticleList}>
        <For each={data()}>
          {(article) => (
            <li class={styles.li}>
              <ArticleDetail article={article} />
            </li>
          )}
        </For>
      </ul>
    </Show>
  );
}
