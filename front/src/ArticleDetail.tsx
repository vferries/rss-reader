import type { Article } from "shared/model/article";
import styles from "./ArticleList.module.css";

const fr = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
});

const toFrenchLocale = (date: string) => fr.format(new Date(date));

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
