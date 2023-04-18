import client from "./internal/httpClient";

export function list(params: any) {
  return client.get("/addons/MeeduBooks/api/v1/books", params);
}

export function hotList() {
  return client.get("/addons/MeeduBooks/api/v1/config/pcListPageRec", {});
}

export function Detail(id: number) {
  return client.get("/addons/MeeduBooks/api/v1/book/" + id, {});
}

export function BookComments(id: number, params: any) {
  return client.get(
    "/addons/MeeduBooks/api/v1/book/" + id + "/comments",
    params
  );
}

export function SubmitBookComment(id: number, params: any) {
  return client.post(
    "/addons/MeeduBooks/api/v1/book/" + id + "/comment",
    params
  );
}

export function Comments(id: number, params: any) {
  return client.get(
    `/addons/MeeduBooks/api/v2/book/article/${id}/comments`,
    params
  );
}

export function SubmitComment(id: number, params: any) {
  return client.post(
    `/addons/MeeduBooks/api/v1/book/article/${id}/comment`,
    params
  );
}

export function AnswerComments(id: number, params: any) {
  return client.get(
    `/addons/MeeduBooks/api/v2/book/article/${id}/comments`,
    params
  );
}
