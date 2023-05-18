import React, { useEffect } from "react";
import { getToken, getFaceCheckKey, getBindMobileKey } from "../../utils/index";
import { useNavigate, Navigate } from "react-router-dom";

interface PropInterface {
  Component: any;
}

const PrivateRoute: React.FC<PropInterface> = ({ Component }) => {
  let url =
    "/login?redirect=" +
    encodeURIComponent(window.location.pathname + window.location.search);

  return getToken() ? (
    getBindMobileKey() === "ok" ? (
      <Navigate to={"/bindMobile"} replace />
    ) : getFaceCheckKey() === "ok" ? (
      <Navigate to={"/faceCheck"} replace />
    ) : (
      Component
    )
  ) : (
    <Navigate to={url} replace />
  );
};
export default PrivateRoute;
