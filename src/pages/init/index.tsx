import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
// import styles from "./index.module.scss";
import { loginAction } from "../../store/user/loginUserSlice";
import {
  saveConfigAction,
  saveConfigFuncAction,
} from "../../store/system/systemConfigSlice";
import { Header, Footer } from "../../components";
import { useLocation } from "react-router-dom";

interface Props {
  loginData: any;
  config: any;
  configFunc: any;
}

export const InitPage = (props: Props) => {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const [faceCheckVisible, setFaceCheckVisible] = useState<boolean>(false);

  if (props.loginData) {
    console.log("自动登录");
    dispatch(loginAction(props.loginData));
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
