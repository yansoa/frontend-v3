import client from "./internal/httpClient";

export function passwordLogin(params: any) {
  return client.post("/api/v2/login/password", params);
}
export function smsLogin(params: any) {
  return client.post("/api/v2/login/mobile", params);
}

export function smsRegister(params: any) {
  return client.post(`/api/v2/register/sms`, params);
}

export function logout() {
  return client.post("/api/v2/logout", {});
}

export function codeLogin(params: any) {
  return client.post(`/api/v3/auth/login/code`, params);
}
