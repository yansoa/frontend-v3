import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <Layout.Footer
      style={{
        width: "100%",
        backgroundColor: "#333333",
        height: 90,
        textAlign: "center",
        marginTop: 80,
      }}
    >
      <Link to="https://playedu.xyz/" target="_blank">
        <i
          style={{ fontSize: 30, color: "#cccccc" }}
          className="iconfont icon-waterprint"
        ></i>
      </Link>
    </Layout.Footer>
  );
};
