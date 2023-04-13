import client from "./internal/httpClient";

export function user() {
  return client.get("/addons/DaySignIn/api/v1/user", {});
}

export function signIn(params: any) {
  return client.post("/addons/DaySignIn/api/v1/signIn", params);
}
