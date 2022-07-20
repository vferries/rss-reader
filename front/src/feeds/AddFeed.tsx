import { createSignal } from "solid-js";
import { client } from "../utils/supabaseClient";

export function AddFeed() {
  const [url, setUrl] = createSignal("");

  const submit = (evt: Event) => {
    evt.preventDefault();
    const body = JSON.stringify({ url: url() });
    void client.functions.invoke("add-feed", { body });
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
