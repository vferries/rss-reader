import type { Component, JSX, Signal } from "solid-js";

export const PageLink: Component = ({
  pageSignal,
  pageName,
  children,
}: {
  pageSignal: Signal<string>;
  pageName: string;
  children: JSX.Element;
}) => {
  const [page, setPage] = pageSignal;
  return (
    <a
      class={page() === pageName ? "active" : ""}
      onClick={() => setPage(pageName)}
    >
      {children}
    </a>
  );
};
