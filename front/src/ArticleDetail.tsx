import type { Article } from "shared/model/article";
import styles from "./ArticleList.module.css";
import { toFrenchLocale } from "./utils";

export function ArticleDetail({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  return (
    <>
      <button onClick={onClose}>Close</button>
      <h1 class={`${styles.title} ${styles.cell}`}>{article.title}</h1>
      <span class={`${styles.date} ${styles.cell}`}>
        {toFrenchLocale(article.published)}
      </span>
      <div
        class={`${styles.description} ${styles.cell}`}
        innerHTML={article.description}
      />
      <a href={article.link} target="_blank">
        View article
      </a>
    </>
  );
}
