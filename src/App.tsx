import type { Component } from "solid-js";
import styles from "./App.module.css";
import type { Article } from "./model/article";
import { articles } from "./model/mock";

const fr = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
});

const toFrenchLocale = (date: Date) => fr.format(date);

function ArticleDetail({ article }: { article: Article }) {
  return (
    <>
      <span>{article.title}</span>
      <span>{toFrenchLocale(article.published)}</span>
    </>
  );
}

function ArticleList() {
  return (
    <ul>
      {articles.map((article) => (
        <li>
          <ArticleDetail article={article} />
        </li>
      ))}
    </ul>
  );
}

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>RSS Reader</header>
      <main>
        <ArticleList />
      </main>
    </div>
  );
};

export default App;
