import xml from "xml2js";
import { promisify } from "util";
import { Article } from "shared/model/article";
import { Feed } from "shared/model/feed";
import { client } from "./supabaseClient.mjs";

type AtomEntry = {
  title: { _: string } | string;
  link: { $: { href: string } };
  summary: { _: string };
  content: { _: string };
  published: string;
};
type RSSEntry = {
  title: { _: string } | string;
  link: string;
  description: string;
  pubDate: string;
};
type AtomFeed = { feed: { entry: AtomEntry[] } };
type RSSFeed = { rss: { channel: { item: RSSEntry[] } } };

async function getAllFeeds() {
  const response = await client.from<Feed>("feed").select();
  if (response.data === null) {
    throw new Error("Unable to get feeds from database");
  }
  return response.data;
}

async function upsertArticles(articles: Article[]) {
  let { error } = await client.from<Article>("article").upsert(articles);
  if (error) {
    console.error(error);
  } else {
    console.log("Articles pushed to Supabase");
  }
}

const parser = new xml.Parser({
  explicitArray: false,
});

const atomToArticle = (entry: AtomEntry): Article => {
  return {
    title: typeof entry.title === "object" ? entry.title._ : entry.title,
    link: entry.link.$.href,
    read: false,
    description: entry.summary?._ || entry.content?._,
    published: entry.published,
  };
};

const rssToArticle = (entry: RSSEntry): Article => {
  return {
    title: typeof entry.title === "object" ? entry.title._ : entry.title,
    link: entry.link,
    read: false,
    description: entry.description,
    published: entry.pubDate,
  };
};

const feeds = await getAllFeeds();
for (let source of feeds.map((f) => f.url)) {
  const result = await fetch(source);
  const text = await result.text();

  if (result.ok) {
    const parseString = promisify<string, AtomFeed | RSSFeed>(
      parser.parseString
    );
    const doc = await parseString(text);
    const articles =
      "rss" in doc
        ? doc.rss.channel.item.map(rssToArticle)
        : doc.feed.entry.map(atomToArticle);

    await upsertArticles(articles);
  } else {
    console.error(result.statusText, text);
  }
}

export {};
