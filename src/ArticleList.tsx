import { ArticleDetail } from "./ArticleDetail";
import styles from "./ArticleList.module.css";
import { articles } from "./model/mock";

export function ArticleList() {
  return (
    <ul class={styles.ArticleList}>
      {articles.map((article) => (
        <li class={styles.li}>
          <ArticleDetail article={article} />
        </li>
      ))}
    </ul>
  );
}
