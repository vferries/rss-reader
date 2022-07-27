import { client } from "../utils/supabaseClient";

export function RefreshAll() {
  const refreshAllFeeds = () => {
    void client.functions.invoke("refresh-all");
  };

  return (
    <button type="button" onClick={refreshAllFeeds}>
      Refresh All
    </button>
  );
}
