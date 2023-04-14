import client from "./internal/httpClient";

export function payments(params: any) {
  return client.get(`/api/v2/order/payments`, params);
}

export function promoCodeCheck(code: string) {
  return client.get("/api/v2/promoCode/" + code + "/check", {});
}
