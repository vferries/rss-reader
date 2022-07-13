import type { Component } from "solid-js";
import styles from "./App.module.css";
import { ArticlePage } from "./articles/ArticlePage";
import { FeedPage } from "./feeds/FeedPage";

const App: Component = () => {
  return (
    <div>
      <header class={styles.header}>RSS Reader</header>
      <main>
        <FeedPage />
        <ArticlePage />
      </main>
    </div>
  );
};

export default App;
