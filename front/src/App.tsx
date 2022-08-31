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
      <header>
        <nav class="nav">
          <div class="nav-left">
            <a class="brand" href="#">
              RSS Reader
            </a>
            <div class="tabs">
              <a
                class={page() === FeedPage.name ? "active" : ""}
                onClick={() => setPage(FeedPage.name)}
              >
                Feeds
              </a>
              <a
                class={page() === ArticlePage.name ? "active" : ""}
                onClick={() => setPage(ArticlePage.name)}
              >
                Articles
              </a>
            </div>
          </div>
        </nav>
      </header>
      <main class={styles.main}>
        <Dynamic component={pages[page()]} />
      </main>
    </div>
  );
};

export default App;
