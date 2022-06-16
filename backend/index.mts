import xml from "xml2js";
import { promisify } from "util";
import { Article } from "shared/model/article";
import { client } from "./supabaseClient.mjs";

const result = await fetch("https://www.enveille.info/feed.xml");
const text = await result.text();

type Entry = {
  title: { _: string };
  link: { $: { href: string } };
  summary: { _: string };
  content: { _: string };
  published: string;
};
type Feed = { feed: { entry: Entry[] } };

const toArticle = (entry: Entry): Article => {
  return {
    title: entry.title._,
    link: entry.link.$.href,
    read: false,
    description: entry.summary?._ || entry.content?._,
    published: entry.published,
  };
};

if (result.ok) {
  const parser = new xml.Parser({
    explicitArray: false,
  });
  // TODO Use zod to verify typings
  const parseString = promisify<string, Feed>(parser.parseString);
  const doc = await parseString(text);
  console.log(doc.feed.entry[0].published);
  console.log(doc.feed.entry[0].link);
  const articles = doc.feed.entry.map(toArticle);
  console.log(articles[0]);
  let { error } = await client.from<Article>("article").insert(articles);
  if (error) {
    console.error(error);
  } else {
    console.log("Articles pushed to Supabase");
  }
} else {
  console.error(result.statusText, text);
}

export {};
