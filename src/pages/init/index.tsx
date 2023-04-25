import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { Outlet } from "react-router-dom";
// import styles from "./index.module.scss";
import { loginAction } from "../../store/user/loginUserSlice";
import {
  saveConfigAction,
  saveConfigFuncAction,
} from "../../store/system/systemConfigSlice";
import { Header, Footer, BackTop, TencentFaceCheck } from "../../components";
import { BindNewMobileDialog } from "../member/components/bind-new-mobile";
import { useLocation } from "react-router-dom";
import { user, share, login } from "../../api";
import {
  saveMsv,
  getMsv,
  clearMsv,
  saveSessionLoginCode,
  getSessionLoginCode,
  setToken,
  saveLoginCode,
} from "../../utils/index";

interface Props {
  loginData: any;
  config: any;
  configFunc: any;
}

export const InitPage = (props: Props) => {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const [backTopStatus, setBackTopStatus] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [showFooter, setShowFooter] = useState<boolean>(true);
  const [faceCheckVisible, setFaceCheckVisible] = useState<boolean>(false);
  const [bindNewMobileVisible, setBindNewMobileVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      pathname === "/live/video" ||
      pathname === "/exam/papers/play" ||
      pathname === "/exam/mockpaper/play" ||
      pathname === "/exam/practice/play" ||
      pathname === "/exam/wrongbook/play" ||
      pathname === "/exam/collection/play" ||
      pathname === "/error"
    ) {
      setShowHeader(false);
      setShowFooter(false);
    }
    if (pathname === "/book/read") {
      setShowHeader(false);
      setShowFooter(true);
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", getHeight, true);
    return () => {
      window.removeEventListener("scroll", getHeight, true);
    };
  }, []);

  const codeLogin = (code: string) => {
    if (getSessionLoginCode(code)) {
      return;
    }
    saveSessionLoginCode(code);
    login
      .codeLogin({ code: code, msv: getMsv() })
      .then((res: any) => {
        if (res.data.success === 1) {
          setToken(res.data.token);
          user.detail().then((res: any) => {
            let loginData = res.data;
            dispatch(loginAction(loginData));
            location.reload();
          });
        } else {
          if (res.data.action === "bind_mobile") {
            saveLoginCode(code);
            console.log("bind_mobile");
          }
        }
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  const result = new URLSearchParams(useLocation().search);
  if (result) {
    // msv分销id记录
    let msv = result.get("msv");
    if (msv) {
      saveMsv(msv);
    }
    // 社交登录回调处理
    let loginCode = result.get("login_code");
    let action = result.get("action");
    if (loginCode && action === "login") {
      codeLogin(loginCode);
    }
  }

  const msvBind = () => {
    let msv = getMsv();
    if (!msv) {
      return;
    }
    share
      .bind({ msv: msv })
      .then((res) => {
        clearMsv();
      })
      .catch((e) => {
        console.log(e.message);
        clearMsv();
      });
  };

  if (props.loginData) {
    console.log("自动登录");
    dispatch(loginAction(props.loginData));
    msvBind();
  }
  if (props.config) {
    dispatch(saveConfigAction(props.config));
  }
  if (props.configFunc) {
    dispatch(saveConfigFuncAction(props.configFunc));
  }

  useEffect(() => {
    // 强制绑定手机号
    if (
      props.config &&
      props.loginData &&
      props.loginData.is_bind_mobile === 0 &&
      props.config.member.enabled_mobile_bind_alert === 1
    ) {
      setBindNewMobileVisible(true);
      return;
    }
    //强制实名认证
    if (
      props.config &&
      props.loginData &&
      props.loginData.is_face_verify === false &&
      props.config.member.enabled_face_verify === true
    ) {
      console.log("实名认证");
      setFaceCheckVisible(true);
    }
  }, [props.loginData, props.config]);

  const getHeight = () => {
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (scrollTop >= 2000) {
      setBackTopStatus(true);
    } else {
      setBackTopStatus(false);
    }
  };

  const getUser = () => {
    user.detail().then((res: any) => {
      let loginData = res.data;
      dispatch(loginAction(loginData));
      //强制实名认证
      if (
        props.config &&
        loginData.is_face_verify === false &&
        props.config.member.enabled_face_verify === true
      ) {
        console.log("实名认证");
        setFaceCheckVisible(true);
      }
    });
  };

  return (
    <>
      <BindNewMobileDialog
        scene="mobile_bind"
        open={bindNewMobileVisible}
        active={false}
        onCancel={() => setBindNewMobileVisible(false)}
        success={() => {
          setBindNewMobileVisible(false);
          getUser();
        }}
      ></BindNewMobileDialog>
      <TencentFaceCheck
        open={faceCheckVisible}
        active={false}
        onCancel={() => setFaceCheckVisible(false)}
        success={() => {
          setFaceCheckVisible(false);
          getUser();
        }}
      />
      {showHeader && <Header></Header>}
      <Outlet />
      {showFooter && <Footer status={true}></Footer>}
      {backTopStatus && <BackTop></BackTop>}
    </>
  );
};
