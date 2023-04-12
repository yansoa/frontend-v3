import client from "./internal/httpClient";

export function detail() {
  return client.get(`/addons/Paper/api/v1/wrongbook`, {});
}
export function orderMode(params: any) {
  return client.get(`/addons/Paper/api/v1/wrongbook`, params);
}
export function randomMode(params: any) {
  return client.get(`/addons/Paper/api/v1/wrongbook`, params);
}
export function removeQuestion(id: number) {
  return client.destroy("/addons/Paper/api/v1/wrongbook/" + id);
}
