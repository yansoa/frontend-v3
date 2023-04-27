import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Skeleton, Input, Button, Dropdown, message, Menu } from "antd";
import type { MenuProps } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, saveUnread } from "../../store/user/loginUserSlice";
import vipIcon from "../../assets/img/commen/icon-VIP.png";
import studyIcon from "../../assets/img/study/icon-mystudy.png";
import { LoginDialog } from "../login-dailog";
import { RegisterDialog } from "../register-dialog";
import { WeixinLoginDialog } from "../weixin-login-dailog";
import { WexinBindMobileDialog } from "../weixin-bind-mobile-dialog";
import { ForgetPasswordDialog } from "../forget-password-dialog";
import { login, home, user as member } from "../../api/index";
import { clearToken } from "../../utils/index";
import searchIcon from "../../assets/img/commen/icon-search.png";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const user = useSelector((state: any) => state.loginUser.value.user);
  const isLogin = useSelector((state: any) => state.loginUser.value.isLogin);
  const freshUnread = useSelector(
    (state: any) => state.loginUser.value.freshUnread
  );
  const config = useSelector((state: any) => state.systemConfig.value.config);
  const configFunc = useSelector(
    (state: any) => state.systemConfig.value.configFunc
  );
  const pathname = useLocation().pathname;
  const [loading, setLoading] = useState<boolean>(false);
  const [navLoading, setNavLoading] = useState<boolean>(true);
  const [visiale, setVisiale] = useState<boolean>(false);
  const [registerVisiale, setRegisterVisiale] = useState<boolean>(false);
  const [weixinVisiale, setWeixinVisiale] = useState<boolean>(false);
  const [weixinBindMobileVisiale, setWeixinBindMobileVisiale] =
    useState<boolean>(false);
  const [hasMessage, setHasMessage] = useState<boolean>(false);
  const [forgetVisiale, setForgetVisiale] = useState<boolean>(false);
  const [list, setList] = useState<MenuProps["items"]>([]);
  const [current, setCurrent] = useState(pathname);

  useEffect(() => {
    setCurrent(pathname);
    getHeaderNav();
  }, [pathname]);

  useEffect(() => {
    if (isLogin && freshUnread) {
      getUnread();
    }
  }, [freshUnread, isLogin]);

  const getHeaderNav = () => {
    home.headerNav().then((res: any) => {
      let list = res.data;
      const arr: MenuProps["items"] = [];
      list.map((item: any) => {
        if (
          item.url !== "/" &&
          pathname !== "/" &&
          pathname.indexOf(item.url) !== -1
        ) {
          setCurrent(item.url);
        }

        if (item.children.length > 0) {
          arr.push({
            label: item.name,
            key: item.url,
            children: checkArr(item.children),
          });
        } else {
          arr.push({
            label: item.name,
            key: item.url,
          });
        }
      });
      setList(arr);
      setNavLoading(false);
    });
  };

  const checkArr = (children: any) => {
    const arr: MenuProps["items"] = [];
    children.map((item: any) => {
      arr.push({
        label: item.name,
        key: item.url,
      });
    });
    return arr;
  };

  const getUnread = () => {
    member.unReadNum().then((res: any) => {
      let num = res.data;
      if (num === 0) {
        setHasMessage(false);
      } else {
        setHasMessage(true);
      }
      saveUnread(false);
    });
  };

  const onSearch = (value: string) => {
    if (!value) {
      message.error("请输入关键字后再搜索");
      return;
    }
    setContent("");
    navigate(`/search?keywords=${value}`);
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "login_out") {
      if (loading) {
        return;
      }
      setLoading(true);
      login.logout().then((res: any) => {
        message.success("安全退出成功");
        dispatch(logoutAction());
        setLoading(false);
        location.reload();
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
    },
    {
      label: "我的消息",
      key: "user_messsage",
      icon: hasMessage ? <i className="messagePoint"></i> : "",
    },
    {
      label: "安全退出",
      key: "login_out",
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
    setVisiale(true);
  };

  const goRegister = () => {
    setRegisterVisiale(true);
  };

  const goForget = () => {
    setForgetVisiale(true);
  };

  const goWeixinLogin = () => {
    setWeixinVisiale(true);
  };

  const bindMobile = () => {
    setWeixinBindMobileVisiale(true);
  };

  const checkNav: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <div className={styles["app-header"]}>
      <LoginDialog
        open={visiale}
        onCancel={() => {
          setVisiale(false);
        }}
        changeRegister={() => {
          setVisiale(false);
          goRegister();
        }}
        changeForget={() => {
          setVisiale(false);
          goForget();
        }}
        changeWeixin={() => {
          setVisiale(false);
          goWeixinLogin();
        }}
      />
      <RegisterDialog
        open={registerVisiale}
        onCancel={() => {
          setRegisterVisiale(false);
        }}
        changeLogin={() => {
          setRegisterVisiale(false);
          setVisiale(true);
        }}
      />
      <WeixinLoginDialog
        open={weixinVisiale}
        onCancel={() => {
          setWeixinVisiale(false);
        }}
        changeLogin={() => {
          setWeixinVisiale(false);
          setVisiale(true);
        }}
        bindMobile={() => {
          setWeixinVisiale(false);
          bindMobile();
        }}
      />
      <WexinBindMobileDialog
        open={weixinBindMobileVisiale}
        onCancel={() => {
          setWeixinBindMobileVisiale(false);
        }}
      />
      <ForgetPasswordDialog
        open={forgetVisiale}
        changeLogin={() => {
          setForgetVisiale(false);
          setVisiale(true);
        }}
        onCancel={() => {
          setForgetVisiale(false);
        }}
      />
      <div className={styles["main-header"]}>
        <div className={styles["top-header"]}>
          <Link to="/" className={styles["App-logo"]}>
            <img src={config.logo.logo} />
          </Link>
          <div className={styles["content-box"]}>
            <div className={styles["search-box"]}>
              <Input
                placeholder="请输入关键字"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                value={content}
                className={styles["search-input"]}
                onPressEnter={() => onSearch(content)}
              />
              <img
                className={styles["btn-search"]}
                onClick={() => onSearch(content)}
                src={searchIcon}
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
                      style={{ width: 40, height: 40, borderRadius: "50%" }}
                      src={user.avatar}
                    />
                    <span className="ml-8 c-admin">{user.name}</span>
                  </div>
                </Dropdown>
              </Button.Group>
            )}
          </div>
        </div>
        <div className="header-menu">
          {navLoading && (
            <Skeleton.Button
              style={{
                width: 600,
                height: 21,
                marginTop: 12,
                marginBottom: 12,
              }}
              active
            />
          )}
          {!navLoading && (
            <Menu
              onClick={checkNav}
              selectedKeys={[current]}
              mode="horizontal"
              items={list}
            />
          )}
        </div>
      </div>
    </div>
  );
};
