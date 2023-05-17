import client from "./internal/goHttpClient";

export function chatMsgSend(courseId: number, videoId: number, params: any) {
  return client.post(
    `/addons/zhibo/api/v1/course/${courseId}/video/${videoId}/chat/send`,
    params
  );
}

export function chatMsgPaginate(
  courseId: number,
  videoId: number,
  params: any
) {
  return client.get(
    `/addons/zhibo/api/v1/course/${courseId}/video/${videoId}/chat/msg`,
    params
  );
}

export function sign(courseId: number, videoId: number, id: number) {
  return client.post(
    `/addons/zhibo/api/v1/course/${courseId}/video/${videoId}/signIn/${id}`,
    {}
  );
}

export function liveWatchRecord(
  courseId: number,
  videoId: number,
  params: any
) {
  return client.post(
    `/addons/zhibo/api/v1/course/${courseId}/video/${videoId}/liveWatchRecord`,
    params
  );
}

export function vodWatchRecord(courseId: number, videoId: number, params: any) {
  return client.post(
    `/addons/zhibo/api/v1/course/${courseId}/video/${videoId}/vodWatchRecord`,
    params
  );
}

export function attachList(courseId: number, videoId: number, params: any) {
  return client.get(
    `/addons/zhibo/api/v1/course/${courseId}/video/${videoId}/attach/index`,
    params
  );
}
