import client from "./internal/httpClient";

export function list(params: any) {
  return client.get("/addons/zhibo/api/v1/courses", params);
}

export function detail(id: number) {
  return client.get(`/addons/zhibo/api/v1/course/${id}`, {});
}

export function comments(id: number, params: any) {
  return client.get(`/addons/zhibo/api/v1/course/${id}/comments`, params);
}

export function submitComment(id: number, params: any) {
  return client.post(`/addons/zhibo/api/v1/course/${id}/comment`, params);
}

export function play(id: number) {
  return client.get(`/addons/zhibo/api/v1/course/${id}/play`, {});
}

export function attachList(course_id: number, video_id: number, params: any) {
  return client.get(
    `/addons/zhibo/api/v1/course/${course_id}/video/${video_id}/attach/index`,
    params
  );
}

export function record(course_id: number, video_id: number, params: any) {
  return client.get(
    `/addons/zhibo/api/v1/course/${course_id}/video/${video_id}/watch/record`,
    params
  );
}

export function createOrder(id: number, params: any) {
  return client.post(`/addons/zhibo/api/v1/course/${id}/paid`, params);
}

export function user(params: any) {
  return client.get("/addons/zhibo/api/v1/member/courses", params);
}

export function chatRecords(course_id: number, video_id: number, params: any) {
  return client.get(
    `/addons/zhibo/api/v1/course/${course_id}/video/${video_id}/chat/records`,
    params
  );
}

export function sendMessage(course_id: number, video_id: number, params: any) {
  return client.get(
    `/addons/zhibo/api/v1/course/${course_id}/video/${video_id}/chat/send`,
    params
  );
}

export function likeStatus(params: any) {
  return client.get(`/addons/templateOne/api/v1/like/status`, params);
}

export function likeHit(params: any) {
  return client.get(`/addons/templateOne/api/v1/like/hit`, params);
}
