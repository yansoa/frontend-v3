import client from "./internal/httpClient";

export function detail(params: any) {
  return client.get(`/addons/Paper/api/v1/wrongbook`, params);
}

export function orderMode(params: any) {
  return client.get(`/addons/Paper/api/v2/wrongbook/questions`, params);
}

export function randomMode(params: any) {
  return client.get(`/addons/Paper/api/v1/wrongbook/random`, params);
}

export function removeQuestion(id: number) {
  return client.destroy("/addons/Paper/api/v1/wrongbook/" + id);
}

export function newQuestion(id: number, params: any) {
  return client.get("/addons/Paper/api/v2/question/" + id, params);
}

export function questionAnswerFill(id: number, params: any) {
  return client.post(`/addons/Paper/api/v2/question/${id}/answer`, params);
}
