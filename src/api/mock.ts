import client from "./internal/httpClient";

export function list(params: any) {
  return client.get("/addons/Paper/api/v1/mock_papers", params);
}

export function detail(id: number) {
  return client.get("/addons/Paper/api/v1/mock_paper/" + id, {});
}

export function join(id: number) {
  return client.post("/addons/Paper/api/v1/mock_paper/" + id, {});
}

export function joinDetail(recordId: number) {
  return client.get("/addons/Paper/api/v1/mock_paper/record/" + recordId, {});
}

export function records(id: number, params: any) {
  return client.get(
    "/addons/Paper/api/v1/mock_paper/" + id + "/records",
    params
  );
}

export function submitSingle(id: number, params: any) {
  return client.post(
    "/addons/Paper/api/v1/mock_paper/record/" + id + "/submit/single",
    params
  );
}

export function submitAll(id: number, params: any) {
  return client.post(
    "/addons/Paper/api/v1/mock_paper/record/" + id + "/submit",
    params
  );
}

export function createPracticeOrder(id: number, params: any) {
  return client.post("/addons/Paper/api/v1/mock_paper/buy", params);
}
