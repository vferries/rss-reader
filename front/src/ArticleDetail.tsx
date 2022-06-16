import styles from "./ArticleList.module.css";
import type { Article } from "./model/article";

const fr = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
});

const toFrenchLocale = (date: Date) => fr.format(date);

export function ArticleDetail({ article }: { article: Article }) {
  return (
    <>
      <span class={`${styles.read} ${styles.cell}`}></span>
      <span class={`${styles.title} ${styles.cell}`}>{article.title}</span>
      <span class={`${styles.description} ${styles.cell}`}>
        {article.description}
      </span>
      <span class={`${styles.date} ${styles.cell}`}>
        {toFrenchLocale(article.published)}
      </span>
    </>
  );
}
