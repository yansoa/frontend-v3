import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
// import styles from "./index.module.scss";
import { loginAction } from "../../store/user/loginUserSlice";
import { Header } from "../../components";
import { useLocation } from "react-router-dom";

interface Props {
  loginData: any;
}

export const InitPage = (props: Props) => {
  const dispatch = useDispatch();
  if (props.loginData) {
    dispatch(loginAction(props.loginData));
  }

  const pathname = useLocation().pathname;

  return (
    <>
      <div>
        {pathname !== "/login" && <Header></Header>}
        <Outlet />
      </div>
    </>
  );
};
