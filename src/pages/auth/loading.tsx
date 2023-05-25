import { useState } from "react";
import { Spin } from "antd";
import { useLocation } from "react-router-dom";

export const AuthLoadingPage = () => {
  document.title = "加载中";
  const result = new URLSearchParams(useLocation().search);
  const [redirect, setRedirect] = useState<string>(
    String(result.get("redirect")) || "/"
  );

  return (
    <div
      style={{
        width: "100%",
        minHeight: 600,
        textAlign: "center",
        boxSizing: "border-box",
        paddingTop: 150,
      }}
    >
      <Spin />
    </div>
  );
};
