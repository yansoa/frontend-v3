import client from "./internal/httpClient";

export function list() {
  return client.get("/addons/Paper/api/v2/stats/index", {});
}
