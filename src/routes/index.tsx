import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { LayoutPage } from "../pages";

// 懒加载
const LoginPage = lazy(() => import('../pages/login'))

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutPage />,
    children: [],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export default routes;
