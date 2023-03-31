import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { system, user, share } from "../api";
import { getToken, getMsv, clearMsv } from "../utils/index";

// 页面加载
import { InitPage } from "../pages/init";
import LoginPage from "../pages/login";
import IndexPage from "../pages/index";
let RootPage: any = null;
let configFunc = {
  vip: true,
  live: false,
  book: false,
  topic: false,
  paper: false,
  practice: false,
  mockPaper: false,
  wrongBook: false,
  wenda: false,
  share: false,
  codeExchanger: false,
  snapshort: false,
  ke: false,
  promoCode: false,
  daySignIn: false,
  credit1Mall: false,
  tuangou: false,
  miaosha: false,
  cert: false,
};

const msvBind = () => {
  let msv = getMsv();
  if (!msv) {
    return;
  }
  share
    .bind({ msv: msv })
    .then((res) => {
      clearMsv();
    })
    .catch((e) => {
      console.log(e.message);
      clearMsv();
    });
};
if (getToken()) {
  RootPage = lazy(async () => {
    return new Promise<any>((resolve) => {
      let userLoginToken = getToken();
      if (!userLoginToken) {
        system.config().then((res: any) => {
          let config = res.data;
          configFunc.live = config.enabled_addons.indexOf("Zhibo") !== -1;
          configFunc.book = config.enabled_addons.indexOf("MeeduBooks") !== -1;
          configFunc.topic =
            config.enabled_addons.indexOf("MeeduTopics") !== -1;
          configFunc.paper = config.enabled_addons.indexOf("Paper") !== -1;
          configFunc.mockPaper = config.enabled_addons.indexOf("Paper") !== -1;
          configFunc.wrongBook = config.enabled_addons.indexOf("Paper") !== -1;
          configFunc.practice = config.enabled_addons.indexOf("Paper") !== -1;
          configFunc.wenda = config.enabled_addons.indexOf("Wenda") !== -1;
          configFunc.share =
            config.enabled_addons.indexOf("MultiLevelShare") !== -1;
          configFunc.codeExchanger =
            config.enabled_addons.indexOf("CodeExchanger") !== -1;
          configFunc.snapshort =
            config.enabled_addons.indexOf("Snapshot") !== -1;
          configFunc.ke = config.enabled_addons.indexOf("XiaoBanKe") !== -1;
          configFunc.promoCode =
            config.enabled_addons.indexOf("MultiLevelShar") !== -1;
          configFunc.daySignIn =
            config.enabled_addons.indexOf("DaySignIn") !== -1;
          configFunc.credit1Mall =
            config.enabled_addons.indexOf("Credit1Mall") !== -1;
          configFunc.tuangou = config.enabled_addons.indexOf("TuanGou") !== -1;
          configFunc.miaosha = config.enabled_addons.indexOf("MiaoSha") !== -1;
          configFunc.cert = config.enabled_addons.indexOf("Cert") !== -1;

          resolve({
            default: (
              <InitPage
                loginData={null}
                config={config}
                configFunc={configFunc}
              />
            ),
          });
        });
        return;
      }
      user.detail().then((res: any) => {
        let loginData = res.data;
        system.config().then((res: any) => {
          let config = res.data;
          configFunc.live = config.enabled_addons.indexOf("Zhibo") !== -1;
          configFunc.book = config.enabled_addons.indexOf("MeeduBooks") !== -1;
          configFunc.topic =
            config.enabled_addons.indexOf("MeeduTopics") !== -1;
          configFunc.paper = config.enabled_addons.indexOf("Paper") !== -1;
          configFunc.mockPaper = config.enabled_addons.indexOf("Paper") !== -1;
          configFunc.wrongBook = config.enabled_addons.indexOf("Paper") !== -1;
          configFunc.practice = config.enabled_addons.indexOf("Paper") !== -1;
          configFunc.wenda = config.enabled_addons.indexOf("Wenda") !== -1;
          configFunc.share =
            config.enabled_addons.indexOf("MultiLevelShare") !== -1;
          configFunc.codeExchanger =
            config.enabled_addons.indexOf("CodeExchanger") !== -1;
          configFunc.snapshort =
            config.enabled_addons.indexOf("Snapshot") !== -1;
          configFunc.ke = config.enabled_addons.indexOf("XiaoBanKe") !== -1;
          configFunc.promoCode =
            config.enabled_addons.indexOf("MultiLevelShar") !== -1;
          configFunc.daySignIn =
            config.enabled_addons.indexOf("DaySignIn") !== -1;
          configFunc.credit1Mall =
            config.enabled_addons.indexOf("Credit1Mall") !== -1;
          configFunc.tuangou = config.enabled_addons.indexOf("TuanGou") !== -1;
          configFunc.miaosha = config.enabled_addons.indexOf("MiaoSha") !== -1;
          configFunc.cert = config.enabled_addons.indexOf("Cert") !== -1;

          resolve({
            default: (
              <InitPage
                loginData={loginData}
                config={config}
                configFunc={configFunc}
              />
            ),
          });
        });
        msvBind();
      });
    });
  });
} else {
  RootPage = lazy(async () => {
    return new Promise<any>((resolve) => {
      system
        .config()
        .then((res: any) => {
          let config = res.data;
          configFunc.live = config.enabled_addons.indexOf("Zhibo") !== -1;
          configFunc.book = config.enabled_addons.indexOf("MeeduBooks") !== -1;
          configFunc.topic =
            config.enabled_addons.indexOf("MeeduTopics") !== -1;
          configFunc.paper = config.enabled_addons.indexOf("Paper") !== -1;
          configFunc.mockPaper = config.enabled_addons.indexOf("Paper") !== -1;
          configFunc.wrongBook = config.enabled_addons.indexOf("Paper") !== -1;
          configFunc.practice = config.enabled_addons.indexOf("Paper") !== -1;
          configFunc.wenda = config.enabled_addons.indexOf("Wenda") !== -1;
          configFunc.share =
            config.enabled_addons.indexOf("MultiLevelShare") !== -1;
          configFunc.codeExchanger =
            config.enabled_addons.indexOf("CodeExchanger") !== -1;
          configFunc.snapshort =
            config.enabled_addons.indexOf("Snapshot") !== -1;
          configFunc.ke = config.enabled_addons.indexOf("XiaoBanKe") !== -1;
          configFunc.promoCode =
            config.enabled_addons.indexOf("MultiLevelShar") !== -1;
          configFunc.daySignIn =
            config.enabled_addons.indexOf("DaySignIn") !== -1;
          configFunc.credit1Mall =
            config.enabled_addons.indexOf("Credit1Mall") !== -1;
          configFunc.tuangou = config.enabled_addons.indexOf("TuanGou") !== -1;
          configFunc.miaosha = config.enabled_addons.indexOf("MiaoSha") !== -1;
          configFunc.cert = config.enabled_addons.indexOf("Cert") !== -1;
          resolve({
            default: (
              <InitPage
                loginData={null}
                config={config}
                configFunc={configFunc}
              />
            ),
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  });
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: RootPage,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
];

export default routes;
