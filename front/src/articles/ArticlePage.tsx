import type { Article } from "shared/model/article";
import { createResource, createSignal, For, Show } from "solid-js";
import { client } from "../utils/supabaseClient";
import { ArticleDetail } from "./ArticleDetail";
import { ArticleList } from "./ArticleList";

const getArticles = async () => {
  const { data } = await client.from<Article>("article").select();
  return data;
};

export function ArticlePage({
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
        <ArticleList articles={data() || []} setSelected={setSelected} />
      )}
    </Show>
  );
}
