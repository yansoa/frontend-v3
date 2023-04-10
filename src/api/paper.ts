import client from "./internal/httpClient";

export function list(params: any) {
  return client.get("/addons/Paper/api/v1/papers", params);
}

export function paperDetail(id: number, params: any) {
  return client.get("/addons/Paper/api/v1/paper/" + id, params);
}
