import xml from "https://esm.sh/xml2js@^0.4.23";
import { Article } from "./model/article.ts";
import { client } from "./supabaseClient.ts";
import { Feed } from "./model/feed.ts";

export type TextContent = { _: string } | string;

export type AtomEntry = {
  title: TextContent;
  link: { $: { href: string } };
  summary: TextContent;
  content: TextContent;
  published: TextContent;
};
export type RSSEntry = {
  title: TextContent;
  link: TextContent;
  description: TextContent;
  pubDate: TextContent;
};
export type AtomFeed = { feed: { entry: AtomEntry[]; title: TextContent } };
export type RSSFeed = {
  rss: { channel: { item: RSSEntry[]; title: TextContent } };
};

async function upsertArticles(articles: Article[]) {
  const { error } = await client.from<Article>("article").upsert(articles);
  if (error) {
    console.error(error);
  } else {
    console.log("Articles pushed to Supabase");
  }
}

async function upsertFeed(feed: Feed) {
  const { error } = await client.from<Feed>("feed").upsert(feed);
  if (error) {
    console.error(error);
  } else {
    console.log("Feed pushed to Supabase");
  }
}

const parser = new xml.Parser({
  explicitArray: false,
});

function getTextContent(text: TextContent) {
  return typeof text === "object" ? text._ : text;
}

export const atomToArticle = (entry: AtomEntry): Article => {
  return {
    title: getTextContent(entry.title),
    link: entry.link.$.href,
    read: false,
    description: getTextContent(entry.summary) || getTextContent(entry.content),
    published: getTextContent(entry.published),
  };
};

export const rssToArticle = (entry: RSSEntry): Article => {
  return {
    title: getTextContent(entry.title),
    link: getTextContent(entry.link),
    read: false,
    description: getTextContent(entry.description),
    published: getTextContent(entry.pubDate),
  };
};

export const refreshFeed = async (url: string) => {
  const result = await fetch(url);
  const text = await result.text();

  if (result.ok) {
    const doc: AtomFeed | RSSFeed = await parser.parseStringPromise(text);
    const articles = "rss" in doc
      ? doc.rss.channel.item.map(rssToArticle)
      : doc.feed.entry.map(atomToArticle);
    await upsertArticles(articles);
  } else {
    console.error(result.statusText, text);
  }
};

export const parseFeed = async (url: string): Promise<Feed> => {
  const result = await fetch(url);
  const text = await result.text();
  const feed = { url, title: "" };

  if (result.ok) {
    const doc: AtomFeed | RSSFeed = await parser.parseStringPromise(text);
    const articles = "rss" in doc
      ? doc.rss.channel.item.map(rssToArticle)
      : doc.feed.entry.map(atomToArticle);
    feed.title = getTextContent(
      "rss" in doc ? doc.rss.channel.title : doc.feed.title,
    );

    await upsertFeed(feed);
    await upsertArticles(articles);
  } else {
    console.error(result.statusText, text);
  }
  return feed;
};
