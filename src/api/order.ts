import client from "./internal/httpClient";

export function payments(params: any) {
  return client.get(`/api/v2/order/payments`, params);
}

export function promoCodeCheck(code: string) {
  return client.get("/api/v2/promoCode/" + code + "/check", {});
}

export function createCourseOrder(params: any) {
  return client.post("/api/v2/order/course", params);
}

export function createVideoOrder(params: any) {
  return client.post("/api/v2/order/video", params);
}

export function createRoleOrder(params: any) {
  return client.post("/api/v2/order/role", params);
}

export function createLiveOrder(id: number, params: any) {
  return client.post(`/addons/zhibo/api/v1/course/${id}/paid`, params);
}

export function createBookOrder(id: number, params: any) {
  return client.post("/addons/MeeduBooks/api/v1/book/" + id + "/buy", params);
}

export function createPaperOrder(id: number, params: any) {
  return client.post("/addons/Paper/api/v1/paper/buy", params);
}

export function createPracticeOrder(id: number, params: any) {
  return client.post("/addons/Paper/api/v1/practice/buy", params);
}

export function createMockpaperOrder(id: number, params: any) {
  return client.post("/addons/Paper/api/v1/mock_paper/buy", params);
}

export function createPathOrder(id: number, params: any) {
  return client.post("/addons/LearnPaths/api/v1/path/" + id + "/buy", params);
}

export function createTgOrder(id: number, params: any) {
  return client.post("/addons/TuanGou/api/v1/t/" + id + "/buy", params);
}

export function createMsOrder(id: number, params: any) {
  return client.post("/addons/MiaoSha/api/v1/m/order/" + id + "/buy", params);
}

export function createTopicOrder(id: number, params: any) {
  return client.post("/addons/MeeduTopics/api/v1/topic/" + id + "/buy", params);
}

export function createK12Order(id: number, params: any) {
  return client.post("/addons/ke/api/v1/course/" + id + "/paid", params);
}

export function checkOrderStatus(params: any) {
  return client.get(`/api/v2/order/status`, params);
}

export function payWechatScan(params: any) {
  return client.post("/api/v2/order/pay/wechatScan", params);
}

export function handPay(params: any) {
  return client.post("/api/v3/order/pay/handPay", params);
}
