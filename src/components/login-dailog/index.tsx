import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Modal, Form, Input, message, Button, Space, Image } from "antd";
import styles from "./index.module.scss";
import { login, system, user } from "../../api/index";
import { setToken, getMsv, getAppUrl } from "../../utils/index";
import { loginAction } from "../../store/user/loginUserSlice";
import iconQQ from "../../assets/img/commen/icon-qq.png";
import iconWeixin from "../../assets/img/commen/icon-weixin.png";

interface PropInterface {
  open: boolean;
  onCancel: () => void;
  changeRegister: () => void;
  changeForget: () => void;
  changeWeixin: () => void;
}

var interval: any = null;

export const LoginDialog: React.FC<PropInterface> = ({
  open,
  onCancel,
  changeRegister,
  changeForget,
  changeWeixin,
}) => {
  const params = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const config = useSelector((state: any) => state.systemConfig.value.config);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabKey, setTabKey] = useState(0);
  const [captcha, setCaptcha] = useState<any>({ key: null, img: null });
  const [current, setCurrent] = useState<number>(0);
  const [smsLoading, setSmsLoading] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({
      mobile: "",
      password: "",
      captcha: "",
      sms: "",
    });
    setTabKey(0);
    setSmsLoading(false);
    setCurrent(120);
    if (open) {
      getCaptcha();
    }
  }, [form, open]);

  const getCaptcha = () => {
    system.imageCaptcha().then((res: any) => {
      setCaptcha(res.data);
    });
  };

  const sendSms = () => {
    if (smsLoading) {
      return;
    }
    system
      .sendSms({
        mobile: form.getFieldValue("mobile"),
        image_key: captcha.key,
        image_captcha: form.getFieldValue("captcha"),
        scene: "login",
      })
      .then((res: any) => {
        setSmsLoading(!smsLoading);
        let time = 120;
        interval = setInterval(() => {
          time--;
          setCurrent(time);
          if (time === 0) {
            interval && clearInterval(interval);
            setCurrent(0);
            setSmsLoading(false);
          }
        }, 1000);
      })
      .catch((e: any) => {
        getCaptcha();
        message.error(e.message);
      });
  };

  const onFinish = (values: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (tabKey === 0) {
      login
        .passwordLogin({ mobile: values.mobile, password: values.password })
        .then((res: any) => {
          setLoading(false);
          let token = res.data.token;
          setToken(token);
          user.detail().then((res: any) => {
            let loginData = res.data;
            dispatch(loginAction(loginData));
            redirectHandler();
          });
        })
        .catch((e: any) => {
          setLoading(false);
          message.error(e.message);
        });
    } else if (tabKey === 1) {
      login
        .smsLogin({
          mobile: values.mobile,
          mobile_code: values.sms,
          msv: getMsv(),
        })
        .then((res: any) => {
          setLoading(false);
          let token = res.data.token;
          setToken(token);
          user.detail().then((res: any) => {
            let loginData = res.data;
            dispatch(loginAction(loginData));
            redirectHandler();
          });
        })
        .catch((e: any) => {
          setLoading(false);
          message.error(e.message);
        });
    }
  };

  const redirectHandler = () => {
    interval && clearInterval(interval);
    onCancel();
    if (pathname === "/login") {
      if (params.redirect) {
        navigate(params.redirect);
      } else {
        navigate("/");
      }
    } else {
      location.reload();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const items = [
    {
      key: 0,
      label: `密码登录`,
    },
    {
      key: 1,
      label: `短信登录`,
    },
  ];

  const onChange = (key: number) => {
    setTabKey(key);
  };

  const changeQQ = () => {
    let successRedirectUrl = window.document.location.href;
    if (pathname === "/login") {
      let appUrl = getAppUrl();
      if (params.redirect) {
        successRedirectUrl = appUrl + params.redirect;
      } else {
        successRedirectUrl = appUrl;
      }
    }
    window.location.href =
      config.url +
      "/api/v3/auth/login/socialite/qq?s_url=" +
      encodeURIComponent(successRedirectUrl) +
      "&f_url=" +
      encodeURIComponent(getAppUrl() + "/error") +
      "&action=login";
  };

  return (
    <>
      <Modal
        title=""
        centered
        forceRender
        open={open}
        width={500}
        footer={null}
        onCancel={() => {
          interval && clearInterval(interval);
          onCancel();
        }}
        maskClosable={false}
      >
        <div className={styles["tabs"]}>
          {items.map((item: any) => (
            <div
              key={item.key}
              className={
                item.key === tabKey
                  ? styles["tab-active-item"]
                  : styles["tab-item"]
              }
              onClick={() => {
                onChange(item.key);
              }}
            >
              <div className={styles["tit"]}>{item.label}</div>
              {item.key === tabKey && <div className={styles["actline"]}></div>}
            </div>
          ))}
          <a
            className={styles["linkTab"]}
            onClick={() => {
              interval && clearInterval(interval);
              changeRegister();
            }}
          >
            新用户注册&gt;&gt;
          </a>
        </div>
        <Form
          form={form}
          name="login-dialog"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ marginTop: 30 }}
        >
          <Form.Item
            name="mobile"
            rules={[{ required: true, message: "请输入手机号!" }]}
          >
            <Input
              style={{ width: 440, height: 54 }}
              autoComplete="off"
              placeholder="请输入手机号"
            />
          </Form.Item>
          {tabKey == 0 && (
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password
                style={{ width: 440, height: 54 }}
                autoComplete="off"
                placeholder="请输入密码"
              />
            </Form.Item>
          )}
          {tabKey == 1 && (
            <>
              <Form.Item>
                <Space align="baseline" style={{ height: 54 }}>
                  <Form.Item
                    name="captcha"
                    rules={[{ required: true, message: "请输入图形验证码!" }]}
                  >
                    <Input
                      style={{ width: 310, height: 54, marginRight: 10 }}
                      autoComplete="off"
                      placeholder="请输入图形验证码"
                    />
                  </Form.Item>
                  <Image
                    onClick={() => getCaptcha()}
                    src={captcha.img}
                    width={110}
                    height={39}
                    preview={false}
                    style={{ cursor: "pointer" }}
                  />
                </Space>
              </Form.Item>

              <Form.Item>
                <Space align="baseline" style={{ height: 54 }}>
                  <Form.Item
                    name="sms"
                    rules={[{ required: true, message: "请输入手机验证码!" }]}
                  >
                    <Input
                      style={{ width: 310, height: 54, marginRight: 30 }}
                      autoComplete="off"
                      placeholder="请输入手机验证码"
                    />
                  </Form.Item>
                  <div className={styles["buttons"]}>
                    {smsLoading && (
                      <div className={styles["send-sms-button"]}>
                        {current}s
                      </div>
                    )}
                    {!smsLoading && (
                      <div
                        className={styles["send-sms-button"]}
                        onClick={() => sendSms()}
                      >
                        获取验证码
                      </div>
                    )}
                  </div>
                </Space>
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button
              style={{ width: 440, height: 54, outline: "none" }}
              type="primary"
              onClick={() => form.submit()}
              loading={loading}
            >
              立即登录
            </Button>
          </Form.Item>
          {tabKey == 0 && (
            <div className="flex items-center">
              <div className="flex-1 flex items-start"></div>
              <div className="flex-shrink-0 text-right">
                <a
                  className="text-gray-normal text-sm hover:text-blue-600"
                  onClick={() => changeForget()}
                >
                  忘记密码
                </a>
              </div>
            </div>
          )}
          {(config.socialites.qq === 1 ||
            config.socialites.wechat_scan === 1) && (
            <div className={styles["others"]}>
              <div className={styles["tit"]}>第三方快捷登录</div>
              <div className={styles["tab-icon"]}>
                {config.socialites.qq === 1 && (
                  <img
                    onClick={() => {
                      interval && clearInterval(interval);
                      changeQQ();
                    }}
                    className={styles["btn-others"]}
                    src={iconQQ}
                  />
                )}
                {config.socialites.wechat_scan === 1 && (
                  <img
                    onClick={() => {
                      interval && clearInterval(interval);
                      changeWeixin();
                    }}
                    className={styles["btn-others"]}
                    src={iconWeixin}
                  />
                )}
              </div>
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
};
