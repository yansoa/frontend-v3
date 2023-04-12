import client from "./internal/httpClient";

export function stats(params: any) {
  return client.get(`/addons/Paper/api/v1/collection/stats`, params);
}

export function detail(params: any) {
  return client.get(`/addons/Paper/api/v1/collection/questions`, params);
}

export function practice(params: any) {
  return client.post(`/addons/Paper/api/v1/questions/practice`, params);
}

export function orderMode(params: any) {
  return client.get(`/addons/Paper/api/v2/collection/questions`, params);
}

export function newQuestion(id: number, params: any) {
  return client.get("/addons/Paper/api/v2/question/" + id, params);
}

export function questionAnswerFill(id: number, params: any) {
  return client.post(`/addons/Paper/api/v2/question/${id}/answer`, params);
}
