import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Input, Modal, Button, Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../store/user/loginUserSlice";
import vipIcon from "../../assets/img/commen/icon-VIP.png";
import studyIcon from "../../assets/img/study/icon-mystudy.png";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;
const { Search } = Input;

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.loginUser.value.user);
  const isLogin = useSelector((state: any) => state.loginUser.value.isLogin);
  const config = useSelector((state: any) => state.systemConfig.value.config);
  const configFunc = useSelector(
    (state: any) => state.systemConfig.value.configFunc
  );

  const onSearch = (value: string) => {
    console.log(value);
    if (!value) {
      message.error("请输入关键字后再搜索");
      return;
    }
    navigate(`/search/${value}`);
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "login_out") {
      confirm({
        title: "操作确认",
        icon: <ExclamationCircleFilled />,
        content: "确认退出登录？",
        centered: true,
        okText: "确认",
        cancelText: "取消",
        onOk() {
          dispatch(logoutAction());
          navigate("/login");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } else if (key === "user_info") {
      navigate(`/member`);
    } else if (key === "user_messsage") {
      navigate(`/member/messages`);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "用户中心",
      key: "user_info",
      icon: <i className="iconfont icon-icon-12 c-red" />,
    },
    {
      label: "我的消息",
      key: "user_messsage",
      icon: <i className="iconfont icon-icon-password text-sm" />,
    },
    {
      label: "安全退出",
      key: "login_out",
      icon: <i className="iconfont icon-a-icon-logout text-sm" />,
    },
  ];

  const goStudy = () => {
    if (!isLogin) {
      goLogin();
      return;
    }
    navigate(`/study-center`);
  };

  const goLogin = () => {
    console.log(111);
  };

  const goRegister = () => {
    console.log(222);
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
          <div className={styles["user-box"]}>
            {configFunc.vip && (
              <Link to="/vip" className={styles["vip-icon"]}>
                <img
                  src={vipIcon}
                  width="20"
                  height="20"
                  style={{ margin: "0 auto" }}
                />
                <div className={styles["text"]}>VIP会员</div>
              </Link>
            )}
            <a onClick={() => goStudy()} className={styles["study-icon"]}>
              <img
                src={studyIcon}
                width="20"
                height="20"
                style={{ margin: "0 auto" }}
              />
              <div className={styles["text"]}>我的学习</div>
            </a>
            {!isLogin && (
              <>
                <a
                  onClick={() => goLogin()}
                  className="text-sm py-2 text-gray-500 hover:text-blue-600"
                >
                  登录
                </a>
                <span className="text-gray-300 mx-2">|</span>
                <a
                  onClick={() => goRegister()}
                  className="text-sm py-2 text-gray-500 hover:text-blue-600"
                >
                  注册
                </a>
              </>
            )}
            {isLogin && user && (
              <Button.Group className={styles["button-group"]}>
                <Dropdown menu={{ items, onClick }} placement="bottomRight">
                  <div className="d-flex" style={{ cursor: "pointer" }}>
                    <img
                      style={{ width: 36, height: 36, borderRadius: "50%" }}
                      src={user.avatar}
                    />
                    <span className="ml-8 c-admin">{user.name}</span>
                  </div>
                </Dropdown>
              </Button.Group>
            )}
          </div>
        </div>
        <div className={styles["bottom-header"]}></div>
      </div>
    </div>
  );
};
