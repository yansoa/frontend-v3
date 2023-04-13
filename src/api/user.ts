import client from "./internal/httpClient";

export function detail() {
  return client.get("/api/v2/member/detail", {});
}

// 修改密码
export function password(oldPassword: string, newPassword: string) {
  return client.put("/api/v1/user/avatar", {
    old_password: oldPassword,
    new_password: newPassword,
  });
}

// 学员课程
export function courses(depId: number) {
  return client.get("/api/v1/user/courses", {
    dep_id: depId,
  });
}

//微信登录二维码获取
export function wechatLogin() {
  return client.get("/api/v3/auth/login/wechat/scan", {});
}

//检测微信二维码登录
export function checkWechatLogin(params: any) {
  return client.get("/api/v3/auth/login/wechat/scan/query", params);
}

//微信登登录后绑定手机号
export function wechatCodeBindMobile(params: any) {
  return client.post("/api/v3/auth/register/withWechatScan", params);
}
//未读消息
export function unReadNum() {
  return client.get("/api/v2/member/unreadNotificationCount", {});
}
//腾讯实人认证
export function tecentFaceVerify(params: any) {
  return client.post("/api/v3/member/tencent/faceVerify", params);
}
//查询腾讯实人认证结果
export function tecentFaceVerifyQuery(params: any) {
  return client.get("/api/v3/member/tencent/faceVerify", params);
}

export function nicknameChange(params: any) {
  return client.post("/api/v2/member/detail/nickname", params);
}

export function mobileVerify(params: any) {
  return client.post("/api/v2/member/verify", params);
}

export function mobileChange(params: any) {
  return client.put("/api/v2/member/mobile", params);
}

export function newMobile(params: any) {
  return client.post("/api/v2/member/detail/mobile", params);
}
