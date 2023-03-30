import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
// import styles from "./index.module.scss";
import { loginAction } from "../../store/user/loginUserSlice";
import {
  saveConfigAction,
  saveConfigFuncAction,
} from "../../store/system/systemConfigSlice";
import { Header , Footer} from "../../components";
import { useLocation } from "react-router-dom";

interface Props {
  loginData: any;
  config: any;
  configFunc: any;
}

export const InitPage = (props: Props) => {
  const dispatch = useDispatch();
  if (props.loginData) {
    dispatch(loginAction(props.loginData));
  }
  if (props.config) {
    dispatch(saveConfigAction(props.config));
  }
  if (props.configFunc) {
    dispatch(saveConfigFuncAction(props.configFunc));
  }
  const pathname = useLocation().pathname;

  return (
    <>
      {pathname !== "/login" && <Header></Header>}
      <Outlet />
      {pathname !== "/login" && <Footer></Footer>}
    </>
  );
};
