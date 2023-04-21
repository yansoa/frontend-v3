import client from "./internal/httpClient";

export function list(params: any) {
  return client.get("/addons/MeeduBooks/api/v1/books", params);
}

export function hotList() {
  return client.get("/addons/MeeduBooks/api/v1/config/pcListPageRec", {});
}

export function detail(id: number) {
  return client.get("/addons/MeeduBooks/api/v1/book/" + id, {});
}

export function likeStatus(params: any) {
  return client.get(`/addons/templateOne/api/v1/like/status`, params);
}

export function likeHit(params: any) {
  return client.get(`/addons/templateOne/api/v1/like/hit`, params);
}

export function bookComments(id: number, params: any) {
  return client.get(
    "/addons/MeeduBooks/api/v1/book/" + id + "/comments",
    params
  );
}

export function submitBookComment(id: number, params: any) {
  return client.post(
    "/addons/MeeduBooks/api/v1/book/" + id + "/comment",
    params
  );
}

export function comments(id: number, params: any) {
  return client.get(
    `/addons/MeeduBooks/api/v2/book/article/${id}/comments`,
    params
  );
}

export function submitComment(id: number, params: any) {
  return client.post(
    `/addons/MeeduBooks/api/v1/book/article/${id}/comment`,
    params
  );
}

export function answerComments(id: number, params: any) {
  return client.get(
    `/addons/MeeduBooks/api/v2/book/article/${id}/comments`,
    params
  );
}

export function articleRead(id: number) {
  return client.get("/addons/MeeduBooks/api/v1/book/" + id + "/read", {});
}
