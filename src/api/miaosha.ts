import client from "./internal/httpClient";

export function list(params: any) {
  return client.get("/addons/MiaoSha/api/v1/m", params);
}
export function detail(id: number, params: any) {
  return client.get("/addons/MiaoSha/api/v1/m/" + id, params);
}
export function join(id: number, params: any) {
  return client.post("/addons/MiaoSha/api/v1/m/" + id + "/join", params);
}
export function createOrder(id: number, params: any) {
  return client.post("/addons/MiaoSha/api/v1/m/order/" + id + "/buy", params);
}
