import type { Component } from "solid-js";
import styles from "./App.module.css";
import { ArticlePage } from "./articles/ArticlePage";

const App: Component = () => {
  return (
    <div>
      <header class={styles.header}>RSS Reader</header>
      <main>
        <ArticlePage />
      </main>
    </div>
  );
};

export default App;
