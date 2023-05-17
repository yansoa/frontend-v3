import client from "./internal/httpClient";

export function list(params: any) {
  return client.get("/addons/LearnPaths/api/v1/all", params);
}

export function create(params: any) {
  return client.get("/addons/LearnPaths/api/v1/categories", params);
}

export function detail(id: number) {
  return client.get(`/addons/LearnPaths/api/v1/path/${id}`, {});
}
