import { corsHeaders } from "./cors.ts";

export const headers = {
  ...corsHeaders,
  "Content-Type": "application/json",
};
