import { describe, expect, test } from "vitest";

import { render } from "solid-testing-library";

import App from "./App";

describe("<App />", () => {
  test("it will render the App title", () => {
    const { getByText, unmount } = render(() => <App />);
    expect(getByText("RSS Reader")).toBeInTheDocument();
    unmount();
  });
});
