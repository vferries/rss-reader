import type { Article } from "shared/model/article";
import { toFrenchLocale } from "../utils/utils";
import styles from "./ArticleList.module.css";

export function ArticleListItem({
  article,
  onClick,
}: {
  article: Article;
  onClick: () => void;
}) {
  return (
    <>
      <span class={`${styles.read} ${styles.cell}`}></span>
      <span onClick={onClick} class={`${styles.title} ${styles.cell}`}>
        {article.title}
      </span>
      <span class={`${styles.date} ${styles.cell}`}>
        {toFrenchLocale(article.published)}
      </span>
    </>
  );
}
