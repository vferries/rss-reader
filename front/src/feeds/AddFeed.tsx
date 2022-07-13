import type { Feed } from "shared/model/feed";
import { createSignal } from "solid-js";
import { client } from "../utils/supabaseClient";

export function AddFeed() {
  const [url, setUrl] = createSignal("");

  const submit = (evt: Event) => {
    evt.preventDefault();
    const feedUrl = url();
    void client
      .from<Feed>("feed")
      .upsert({ url: feedUrl, title: feedUrl })
      .then(() => setUrl(""));
  };
  return (
    <form onSubmit={submit}>
      <input
        type="text"
        value={url()}
        onChange={(evt) => setUrl(evt.currentTarget.value)}
      />
      <button type="submit">Add feed</button>
    </form>
  );
}
