import client from "./internal/httpClient";

export function list(params: any) {
  return client.get("/addons/TuanGou/api/v1/t", params);
}
export function detail(id: number, params: any) {
  return client.get("/addons/TuanGou/api/v1/t/" + id, params);
}
export function createOrder(id: number, params: any) {
  return client.post("/addons/TuanGou/api/v1/t/" + id + "/buy", params);
}
