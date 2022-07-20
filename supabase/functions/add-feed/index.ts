import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import xml from "https://esm.sh/xml2js@^0.4.23";
import { Article } from "../_shared/model/article.ts";
import { Feed } from "../_shared/model/feed.ts";
import { client } from "../_shared/supabaseClient.ts";

type TextContent = { _: string } | string;

type AtomEntry = {
  title: TextContent;
  link: { $: { href: string } };
  summary: TextContent;
  content: TextContent;
  published: TextContent;
};
type RSSEntry = {
  title: TextContent;
  link: TextContent;
  description: TextContent;
  pubDate: TextContent;
};
type AtomFeed = { feed: { entry: AtomEntry[]; title: TextContent } };
type RSSFeed = { rss: { channel: { item: RSSEntry[]; title: TextContent } } };

async function upsertFeed(feed: Feed) {
  let { error } = await client.from<Feed>("feed").upsert(feed);
  if (error) {
    console.error(error);
  } else {
    console.log("Feed pushed to Supabase");
  }
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

function getTextContent(text: TextContent) {
  return typeof text === "object" ? text._ : text;
}

const atomToArticle = (entry: AtomEntry): Article => {
  return {
    title: getTextContent(entry.title),
    link: entry.link.$.href,
    read: false,
    description: getTextContent(entry.summary) || getTextContent(entry.content),
    published: getTextContent(entry.published),
  };
};

const rssToArticle = (entry: RSSEntry): Article => {
  return {
    title: getTextContent(entry.title),
    link: getTextContent(entry.link),
    read: false,
    description: getTextContent(entry.description),
    published: getTextContent(entry.pubDate),
  };
};

const parseFeed = async (url: string): Promise<Feed> => {
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

serve(async (req) => {
  const { url } = await req.json();
  const data = await parseFeed(url);

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});

/*
 * To invoke:
 * curl -i --location --request POST 'http://localhost:54321/functions/v1/' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' --header 'Content-Type: application/json' --data '{"url":"https://www.enveille.info/feed.xml"}'
 */
