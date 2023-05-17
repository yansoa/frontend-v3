import client from "./internal/httpClient";

export function list(params: any) {
  return client.get("/addons/MeeduTopics/api/v1/topics", params);
}

export function hotList() {
  return client.get("/addons/MeeduTopics/api/v1/config/pcListPageRec", {});
}

export function detail(id: number) {
  return client.get("/addons/MeeduTopics/api/v1/topic/" + id, {});
}

export function comments(id: number, params: any) {
  return client.get(`/addons/MeeduTopics/api/v2/topic/${id}/comments`, params);
}

export function allComments(id: number, params: any) {
  return client.get(`/addons/MeeduTopics/api/v2/topic/${id}/comments`, params);
}

export function releaseComments(id: number, params: any) {
  return client.post(`/addons/MeeduTopics/api/v1/topic/${id}/comment`, params);
}

export function vote(id: number, params: any) {
  return client.post(
    "/addons/MeeduTopics/api/v1/topic/" + id + "/vote",
    params
  );
}

export function collect(id: number, params: any) {
  return client.post(
    "/addons/MeeduTopics/api/v1/topic/" + id + "/collect",
    params
  );
}

export function submitComment(id: number, params: any) {
  return client.post( "/addons/MeeduTopics/api/v1/topic/" + id + "/comment", params);
}
