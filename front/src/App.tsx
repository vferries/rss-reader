import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import styles from "./App.module.css";
import { ArticlePage } from "./articles/ArticlePage";
import { FeedPage } from "./feeds/FeedPage";
import { Header } from "./header/Header";

const pages: Record<string, Component> = {
  ArticlePage,
  FeedPage,
};

const App: Component = () => {
  const pageSignal = createSignal(FeedPage.name);
  const page = pageSignal[0];
  return (
    <div>
      <Header pageSignal={pageSignal} />
      <main class={styles.main}>
        <Dynamic component={pages[page()]} />
      </main>
    </div>
  );
};

export default App;
