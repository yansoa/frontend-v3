import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Input, Modal, Button, Dropdown, message } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const { Search } = Input;

export const Header = () => {
  const user = useSelector((state: any) => state.loginUser.value.user);
  const config = useSelector((state: any) => state.systemConfig.value.config);
  console.log(config);

  const onSearch = (value: string) => {
    console.log(value);
    if (!value) {
      message.error("请输入关键字后再搜索");
      return;
    }
  };

  return (
    <div className={styles["app-header"]}>
      <div className={styles["main-header"]}>
        <div className={styles["top-header"]}>
          <Link to="/" className={styles["App-logo"]}>
            <img src={config.logo.logo} />
          </Link>
          <div className={styles["content-box"]}>
            <div className={styles["search-box"]}>
              <Search
                placeholder="请输入关键字"
                allowClear
                onSearch={onSearch}
                size="large"
                style={{
                  width: 250,
                  borderRadius: 20,
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles["bottom-header"]}></div>
      </div>
    </div>
  );
};
