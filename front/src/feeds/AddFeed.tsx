import { createSignal } from "solid-js";
import { client } from "../utils/supabaseClient";
import styles from "./AddFeed.module.css";

export function AddFeed() {
  const [url, setUrl] = createSignal("");

  const submit = (evt: Event) => {
    evt.preventDefault();
    const body = JSON.stringify({ url: url() });
    void client.functions.invoke("add-feed", { body });
  };
  return (
    <div class="card">
      <form class={styles.form} onSubmit={submit}>
        <input
          class={styles.input}
          type="text"
          value={url()}
          onChange={(evt) => setUrl(evt.currentTarget.value)}
        />
        <button type="submit">Add feed</button>
      </form>
    </div>
  );
}
