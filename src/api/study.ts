import client from "./internal/httpClient";

export function courses(params: any) {
  return client.get("/api/v3/member/courses/learned", params);
}

export function coursesDetail(courseId: number, params: any) {
  return client.get(`/api/v3/member/learned/course/${courseId}`, params);
}

export function live(params: any) {
  return client.get("/addons/zhibo/api/v1/member/courses/learned", params);
}

export function topic(params: any) {
  return client.get("/addons/MeeduTopics/api/v2/member/topics/view", params);
}

export function book(params: any) {
  return client.get("/addons/MeeduBooks/api/v2/member/book/view", params);
}

export function likeCourses(params: any) {
  return client.get("/addons/templateOne/api/v1/like/courses", params);
}

export function topicLikeCourses(params: any) {
    return client.get("/addons/MeeduTopics/api/v1/user/collect", params);
  }
