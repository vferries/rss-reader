import { describe, expect, test } from "vitest";

import { articles } from "./model/mock";
import { render, waitFor } from "solid-testing-library";

import App from "./App";
import { ArticleList } from "./ArticleList";

const fetchMockData = () => Promise.resolve(articles);

describe("<App />", () => {
  test("it will render the App title", () => {
    const { getByText, unmount } = render(() => <App />);
    expect(getByText("RSS Reader")).toBeInTheDocument();
    unmount();
  });

  test("titles should be displayed", async () => {
    const { getByText, unmount } = render(() => (
      <ArticleList fetcher={fetchMockData} />
    ));
    await waitFor(() => {
      expect(getByText("Death at a Funeral")).toBeInTheDocument();
      expect(getByText("Duplex")).toBeInTheDocument();
    });
    unmount();
  });

  test("dates should be displayed formatted in french", async () => {
    const { getByText, unmount } = render(() => (
      <ArticleList fetcher={fetchMockData} />
    ));
    await waitFor(() => {
      expect(getByText("15 septembre 2021 à 11:39")).toBeInTheDocument();
      expect(getByText("24 novembre 2021 à 16:24")).toBeInTheDocument();
    });
    unmount();
  });
});
