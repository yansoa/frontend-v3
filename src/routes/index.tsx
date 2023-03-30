import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { system, user } from "../api";
import { getToken } from "../utils/index";

// 页面加载
import { InitPage } from "../pages/init";
import LoginPage from "../pages/login";
import IndexPage from "../pages/index";

let RootPage: any = null;
if (getToken()) {
  RootPage = lazy(async () => {
    return new Promise<any>((resolve) => {
      let userLoginToken = getToken();
      if (!userLoginToken) {
        resolve({
          default: <InitPage loginData={null} />,
        });
        return;
      }
      user.detail().then((res: any) => {
        resolve({
          default: <InitPage loginData={res.data} />,
        });
      });
    });
  });
} else {
  RootPage = <InitPage loginData={null} />;
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
