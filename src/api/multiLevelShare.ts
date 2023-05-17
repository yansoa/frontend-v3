import client from "./internal/httpClient";

export function config() {
  return client.get("/addons/MultiLevelShare/api/v1/config", {});
}

export function posterList() {
  return client.get("/addons/MultiLevelShare/api/v1/poster/list", {});
}

export function user() {
  return client.get("/addons/MultiLevelShare/api/v1/user", {});
}

export function goods(params: any) {
  return client.get("/addons/MultiLevelShare/api/v1/user/goods", params);
}

export function inviteBalanceRecords(params: any) {
  return client.get(
    "/addons/MultiLevelShare/api/v1/user/balanceRecords",
    params
  );
}

export function withdraw(params: any) {
  return client.post("/addons/MultiLevelShare/api/v1/user/withdraw", params);
}
