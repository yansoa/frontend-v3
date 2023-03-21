import { RouteObject } from "react-router-dom";

import { LoginPage, LayoutPage } from "../pages";

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
