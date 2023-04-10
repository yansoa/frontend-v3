import client from "./internal/httpClient";

export function collectionStatus(params: any) {
  return client.post(`/addons/Paper/api/v1/collection/status/multi`, params);
}

export function collect(params: any) {
  return client.post(`/addons/Paper/api/v1/collection/action`, params);
}
