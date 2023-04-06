import client from "./internal/httpClient";

export function config() {
  return client.get("/addons/Snapshot/api/v1/config", {});
}

export function imagesList(params: any) {
  return client.get("/addons/Snapshot/api/v1/resource/images", params);
}

export function query(params: any) {
  return client.get("/addons/Snapshot/api/v1/resource/query", params);
}

export function destroyImages(id: number) {
  return client.destroy(`/addons/Snapshot/api/v1/resource/image/${id}`);
}

export function uploadImages(params: any) {
  return client.post("/addons/Snapshot/api/v1/upload/image", params);
}
