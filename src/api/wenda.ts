import client from "./internal/httpClient";

export function list(params: any) {
  return client.get("/addons/Wenda/api/v1/questions", params);
}

export function create() {
  return client.get("/addons/Wenda/api/v1/question/create", {});
}

export function detail(id: number) {
  return client.get("/addons/Wenda/api/v1/question/" + id + "/detail", {});
}

export function config() {
  return client.get("/addons/Wenda/api/v1/other/config", {});
}

export function store(params: any) {
  return client.post("/addons/Wenda/api/v1/question/create", params);
}

export function edit(id: number) {
  return client.get("/addons/Wenda/api/v1/question/" + id + "/edit", {});
}

export function update(id: number, params: any) {
  return client.put("/addons/Wenda/api/v1/question/" + id + "/edit", params);
}

export function choiceAnswer(id: number, params: any) {
  return client.post(
    "/addons/Wenda/api/v1/question/" + id + "/correct",
    params
  );
}

export function submitAnswer(id: number, params: any) {
  return client.post("/addons/Wenda/api/v1/question/" + id + "/answer", params);
}

export function vote(params: any) {
  return client.post("/addons/Wenda/api/v1/vote", params);
}

export function answerComments(id: number, params: any) {
  return client.get(
    "/addons/Wenda/api/v1/question/answer/" + id + "/comments",
    params
  );
}

export function submitComment(id: number, params: any) {
  return client.post(
    "/addons/Wenda/api/v1/question/answer/" + id + "/comment",
    params
  );
}
