import client from "./internal/httpClient";

export function list(params: any) {
  return client.get("/addons/MeeduTopics/api/v1/topics", params);
}

export function hotList() {
  return client.get("/addons/MeeduTopics/api/v1/config/pcListPageRec", {});
}
