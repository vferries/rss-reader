import type { Article } from "shared/model/article";
import { createResource, createSignal, For, Show } from "solid-js";
import { ArticleDetail } from "./ArticleDetail";
import styles from "./ArticleList.module.css";
import { ArticleListItem } from "./ArticleListItem";
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
  const [selected, setSelected] = createSignal<Article>();
  return (
    <Show when={!data.loading} fallback={<>Loading articles...</>}>
      {selected() ? (
        <ArticleDetail article={selected()!} onClose={() => setSelected()} />
      ) : (
        <ul class={styles.ArticleList}>
          <For each={data()}>
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
      )}
    </Show>
  );
}
