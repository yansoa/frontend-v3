import { useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { Outlet } from "react-router-dom";
// import styles from "./index.module.scss";
import { loginAction } from "../../store/user/loginUserSlice";
import {
  saveConfigAction,
  saveConfigFuncAction,
} from "../../store/system/systemConfigSlice";
import { Header, Footer } from "../../components";
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
  // const [faceCheckVisible, setFaceCheckVisible] = useState<boolean>(false);

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
  //强制实名认证
  // if (
  //   props.config &&
  //   props.loginData &&
  //   props.loginData.is_face_verify === false &&
  //   props.config.member.enabled_face_verify === true
  // ) {
  //   console.log("实名认证");
  //   setFaceCheckVisible(true);
  // }

  return (
    <>
      {pathname !== "/login" && <Header></Header>}
      <Outlet />
      {pathname !== "/login" && <Footer status={true}></Footer>}
    </>
  );
};
