import type { Component } from "solid-js";
import styles from "./App.module.css";
import { ArticleList } from "./ArticleList";

const App: Component = () => {
  return (
    <div>
      <header class={styles.header}>RSS Reader</header>
      <main>
        <ArticleList />
      </main>
    </div>
  );
};

export default App;
