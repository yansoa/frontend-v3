import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Row, Col, Modal, Spin, Button, Pagination } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export const SharePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: any) => state.loginUser.value.user);

  return (
    <div className="container">
      <div className={styles["box"]}>
        <div className={styles["user-box"]}>
          <div className={styles["user"]}>
            <div className={styles["avatar"]}>
              <img src={user.avatar} />
            </div>
            <div className={styles["user-info"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
