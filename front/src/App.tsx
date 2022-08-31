import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import styles from "./App.module.css";
import { ArticlePage } from "./articles/ArticlePage";
import { FeedPage } from "./feeds/FeedPage";

const pages: Record<string, Component> = {
  ArticlePage,
  FeedPage,
};

const App: Component = () => {
  const [page, setPage] = createSignal(FeedPage.name);
  return (
    <div>
      <header class={styles.header}>RSS Reader</header>
      <main class={styles.main}>
        <div>
          <button onClick={() => setPage(FeedPage.name)}>Feeds</button>
          <button onClick={() => setPage(ArticlePage.name)}>Articles</button>
        </div>
        <Dynamic component={pages[page()]} />
      </main>
    </div>
  );
};

export default App;
