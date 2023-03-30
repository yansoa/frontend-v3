import moment from "moment";

export function getToken(): string {
  return window.localStorage.getItem("meedu-user-token") || "";
}

export function setToken(token: string) {
  window.localStorage.setItem("meedu-user-token", token);
}

export function clearToken() {
  window.localStorage.removeItem("meedu-user-token");
}

export function getPlayId(): string {
  return window.localStorage.getItem("meedu-play-id") || "";
}

export function savePlayId(id: string) {
  window.localStorage.setItem("meedu-play-id", id);
}

export function clearPlayId() {
  window.localStorage.removeItem("meedu-play-id");
}

export function getMsv(): string {
  return window.localStorage.getItem("meedu-msv") || "";
}

export function saveMsv(msv: string) {
  window.localStorage.setItem("meedu-msv", msv);
}

export function clearMsv() {
  window.localStorage.removeItem("meedu-msv");
}

export function dateFormat(dateStr: string) {
  return moment(dateStr).format("YYYY-MM-DD HH:mm");
}

export function generateUUID(): string {
  let guid = "";
  for (let i = 1; i <= 32; i++) {
    let n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    if (i === 8 || i === 12 || i === 16 || i === 20) guid += "-";
  }
  return guid;
}

export function transformBase64ToBlob(
  base64: string,
  mime: string,
  filename: string
): File {
  const arr = base64.split(",");
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function getHost() {
  return window.location.protocol + "//" + window.location.host + "/";
}

export function inStrArray(array: string[], value: string): boolean {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
}

export function getAppUrl() {
  let host = window.location.protocol + "//" + window.location.host;
  let pathname = window.location.pathname;
  if (pathname && pathname !== "/") {
    host += pathname;
  }
  return host + "/#";
}
