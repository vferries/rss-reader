import { describe, expect, test } from "vitest";

import { articles } from "../mocks/mock";
import { render, waitFor } from "solid-testing-library";
import { ArticleList } from "./ArticleList";

describe("<App />", () => {
  test("titles should be displayed", async () => {
    const { getByText, unmount } = render(() => (
      <ArticleList articles={articles} setSelected={() => {}} />
    ));
    await waitFor(() => {
      expect(getByText("Death at a Funeral")).toBeInTheDocument();
      expect(getByText("Duplex")).toBeInTheDocument();
    });
    unmount();
  });

  test("dates should be displayed formatted in french", async () => {
    const { getByText, unmount } = render(() => (
      <ArticleList articles={articles} setSelected={() => {}} />
    ));
    await waitFor(() => {
      expect(getByText("15 septembre 2021 à 11:39")).toBeInTheDocument();
      expect(getByText("24 novembre 2021 à 16:24")).toBeInTheDocument();
    });
    unmount();
  });
});
