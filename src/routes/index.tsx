import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { system, user } from "../api";
import { getToken } from "../utils/index";

// 页面加载
import { InitPage } from "../pages/init";
import LoginPage from "../pages/login";
import IndexPage from "../pages/index";
import VodPage from "../pages/vod/index";
import { VodDetailPage } from "../pages/vod/detail";
import { VodPlayPage } from "../pages/vod/video";
import { LivePage } from "../pages/live/index";
import { LiveDetailPage } from "../pages/live/detail";
import { LiveVideoPage } from "../pages/live/video";
import { ExamPage } from "../pages/exam/index";
import { ExamPaperPage } from "../pages/exam/paper/index";
import { ExamPaperDetailPage } from "../pages/exam/paper/detail";
import { ExamPaperPlayPage } from "../pages/exam/paper/play";
import { ExamMockPaperPage } from "../pages/exam/mock/index";
import { ExamMockPaperDetailPage } from "../pages/exam/mock/detail";
import { ExamMockPaperPlayPage } from "../pages/exam/mock/play";
import { ExamPracticePage } from "../pages/exam/practice/index";
import { ExamPracticeDetailPage } from "../pages/exam/practice/detail";
import { ExamPracticePlayPage } from "../pages/exam/practice/play";
import { ExamWrongbookPage } from "../pages/exam/wrongbook/index";
import { ExamWrongbookPlayPage } from "../pages/exam/wrongbook/play";
import { ExamCollectionPage } from "../pages/exam/collection/index";
import { ExamCollectionPlayPage } from "../pages/exam/collection/play";
import { MemberPage } from "../pages/member/index";
import { MemberMessagesPage } from "../pages/member/messages";
import { MemberOrdersPage } from "../pages/member/orders";
import { MemberPaperPage } from "../pages/member/paper";
import { MemberMockPaperPage } from "../pages/member/mock-paper";
import { MemberPracticePage } from "../pages/member/practice";
import { MemberQuestionsPage } from "../pages/member/questions";
import { MemberExchangerPage } from "../pages/member/codeexchanger";
import { MemberCredit1FreePage } from "../pages/member/credit1-free";
import { MemberCredit1RecordsPage } from "../pages/member/credit1-records";
import { MemberCertsPage } from "../pages/member/certs";
import { RolePage } from "../pages/role";
import { OrderPage } from "../pages/order/index";
import { OrderPayPage } from "../pages/order/pay";
import { OrderSuccessPage } from "../pages/order/success";
import { SearchPage } from "../pages/search";
import { TopicPage } from "../pages/topic/index";
import { TopicDetailPage } from "../pages/topic/detail";
import { BookPage } from "../pages/book/index";
import { BookDetailPage } from "../pages/book/detail";
import { BookReadPage } from "../pages/book/read";
import { LearnPathPage } from "../pages/learnPath/index";
import { LearnPathDetailPage } from "../pages/learnPath/detail";
import { ErrorPage } from "../pages/error/index";
import { WendaPage } from "../pages/wenda/index";
import { SharePage } from "../pages/share";

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
      { path: "/courses", element: <VodPage /> },
      { path: "/courses/detail", element: <VodDetailPage /> },
      { path: "/courses/video", element: <VodPlayPage /> },
      { path: "/live", element: <LivePage /> },
      { path: "/live/detail", element: <LiveDetailPage /> },
      { path: "/live/video", element: <LiveVideoPage /> },
      { path: "/exam", element: <ExamPage /> },
      { path: "/exam/papers", element: <ExamPaperPage /> },
      { path: "/exam/papers/detail", element: <ExamPaperDetailPage /> },
      { path: "/exam/papers/play", element: <ExamPaperPlayPage /> },
      { path: "/exam/mockpaper", element: <ExamMockPaperPage /> },
      { path: "/exam/mockpaper/detail", element: <ExamMockPaperDetailPage /> },
      { path: "/exam/mockpaper/play", element: <ExamMockPaperPlayPage /> },
      { path: "/exam/practice", element: <ExamPracticePage /> },
      { path: "/exam/practice/detail", element: <ExamPracticeDetailPage /> },
      { path: "/exam/practice/play", element: <ExamPracticePlayPage /> },
      { path: "/exam/wrongbook", element: <ExamWrongbookPage /> },
      { path: "/exam/wrongbook/play", element: <ExamWrongbookPlayPage /> },
      { path: "/exam/collection", element: <ExamCollectionPage /> },
      { path: "/exam/collection/play", element: <ExamCollectionPlayPage /> },
      { path: "/member", element: <MemberPage /> },
      { path: "/member/messages", element: <MemberMessagesPage /> },
      { path: "/member/orders", element: <MemberOrdersPage /> },
      { path: "/member/paper", element: <MemberPaperPage /> },
      { path: "/member/mockpaper", element: <MemberMockPaperPage /> },
      { path: "/member/practice", element: <MemberPracticePage /> },
      { path: "/member/questions", element: <MemberQuestionsPage /> },
      { path: "/member/codeexchanger", element: <MemberExchangerPage /> },
      { path: "/member/credit1_free", element: <MemberCredit1FreePage /> },
      {
        path: "/member/credit1_records",
        element: <MemberCredit1RecordsPage />,
      },
      { path: "/member/certs", element: <MemberCertsPage /> },
      { path: "/vip", element: <RolePage /> },
      { path: "/order", element: <OrderPage /> },
      { path: "/order/pay", element: <OrderPayPage /> },
      { path: "/order/success", element: <OrderSuccessPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/topic", element: <TopicPage /> },
      { path: "/topic/detail", element: <TopicDetailPage /> },
      { path: "/book", element: <BookPage /> },
      { path: "/book/detail", element: <BookDetailPage /> },
      { path: "/book/read", element: <BookReadPage /> },
      { path: "/learnPath", element: <LearnPathPage /> },
      { path: "/learnPath/detail", element: <LearnPathDetailPage /> },
      { path: "/error", element: <ErrorPage /> },
      { path: "/wenda", element: <WendaPage /> },
      { path: "/share", element: <SharePage /> },
    ],
  },
];

export default routes;
