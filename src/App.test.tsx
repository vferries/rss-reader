import { describe, expect, test } from "vitest";

import { render } from "solid-testing-library";

import App from "./App";

describe("<App />", () => {
  test("it will render the App title", () => {
    const { getByText, unmount } = render(() => <App />);
    expect(getByText("RSS Reader")).toBeInTheDocument();
    unmount();
  });

  test("titles should be displayed", () => {
    const { getByText, unmount } = render(() => <App />);
    expect(getByText("Death at a Funeral")).toBeInTheDocument();
    expect(getByText("Duplex")).toBeInTheDocument();
    unmount();
  });

  test("dates should be displayed formatted in french", () => {
    const { getByText, unmount } = render(() => <App />);
    expect(getByText("15 septembre 2021 à 11:39")).toBeInTheDocument();
    expect(getByText("24 novembre 2021 à 16:24")).toBeInTheDocument();
    unmount();
  });
});
