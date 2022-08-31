import type { Component, Signal } from "solid-js";
import { ArticlePage } from "../articles/ArticlePage";
import { FeedPage } from "../feeds/FeedPage";
import { PageLink } from "./PageLink";

export const Header: Component = (props: { pageSignal: Signal<string> }) => {
  return (
    <header>
      <nav class="nav">
        <div class="nav-left">
          <a class="brand" href="#">
            RSS Reader
          </a>
          <div class="tabs">
            <PageLink pageSignal={props.pageSignal} pageName={FeedPage.name}>
              Feeds
            </PageLink>
            <PageLink pageSignal={props.pageSignal} pageName={ArticlePage.name}>
              Articles
            </PageLink>
          </div>
        </div>
      </nav>
    </header>
  );
};
