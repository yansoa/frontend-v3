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
import { share } from "../../api/index";
import { getMsv, clearMsv } from "../../utils/index";

interface Props {
  loginData: any;
  config: any;
  configFunc: any;
}

export const InitPage = (props: Props) => {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();

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
    dispatch(loginAction(props.loginData));
    if (props.loginData.isLogin) {
      msvBind();
    }
  }
  if (props.config) {
    dispatch(saveConfigAction(props.config));
  }
  if (props.configFunc) {
    dispatch(saveConfigFuncAction(props.configFunc));
  }

  return (
    <>
      {pathname !== "/login" && <Header></Header>}
      <Outlet />
      {pathname !== "/login" && <Footer status={true}></Footer>}
    </>
  );
};
