import client from "./internal/httpClient";

export function collectStatus(params: any) {
  return client.post(`/addons/Paper/api/v1/collection/status`, params);
}

export function collectionStatus(params: any) {
  return client.post(`/addons/Paper/api/v1/collection/status/multi`, params);
}

export function collect(params: any) {
  return client.post(`/addons/Paper/api/v1/collection/action`, params);
}

export function list(params: any) {
  return client.get("/addons/Paper/api/v1/practices", params);
}

export function detail(id: number) {
  return client.get("/addons/Paper/api/v1/practice/" + id, {});
}

export function createPracticeOrder(id: number, params: any) {
  return client.post("/addons/Paper/api/v1/practice/buy", params);
}

export function practiceDayPlay(id: number) {
  return client.get("/addons/Paper/api/v1/practice/" + id + "/day", {});
}

export function practicePlay(id: number, chapterId: number) {
  return client.get(
    "/addons/Paper/api/v1/practice/" + id + "/join/" + chapterId,
    {}
  );
}

export function practiceQuestion(id: number, questionId: number) {
  return client.get(
    "/addons/Paper/api/v1/practice/" + id + "/join/question/" + questionId,
    {}
  );
}
export function practiceQuestionAnswerFill(
  id: number,
  questionId: number,
  params: any
) {
  return client.post(
    "/addons/Paper/api/v1/practice/" +
      id +
      "/join/question/" +
      questionId +
      "/answer",
    params
  );
}
export function questionAnswerFill(id: number, params: any) {
  return client.post(`/addons/Paper/api/v2/question/${id}/answer`, params);
}
