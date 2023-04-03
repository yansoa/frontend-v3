import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Form, Input, message, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login, user } from "../../api/index";
import { setToken } from "../../utils/index";
import { loginAction } from "../../store/user/loginUserSlice";
import { TencentFaceCheck } from "../../components";
import banner from "../../assets/img/commen/login-banner.png";

const LoginPage = () => {
  const params = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const config = useSelector((state: any) => state.systemConfig.value.config);
  const [loading, setLoading] = useState<boolean>(false);
  const [faceCheckVisible, setFaceCheckVisible] = useState<boolean>(false);
  const loginState = useSelector((state: any) => {
    return state.loginUser.value;
  });

  const getUser = () => {
    user.detail().then((res: any) => {
      let loginData = res.data;
      dispatch(loginAction(loginData));
      redirectHandler();
    });
  };

  const onFinish = (values: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    login
      .passwordLogin({ mobile: values.mobile, password: values.password })
      .then((res: any) => {
        setLoading(false);
        let token = res.data.token;
        setToken(token);
        //强制实名认证
        user.detail().then((res: any) => {
          let loginData = res.data;
          dispatch(loginAction(loginData));
          if (
            res.data.is_face_verify === false &&
            config.member.enabled_face_verify === true
          ) {
            setFaceCheckVisible(true);
          } else if (params.redirect) {
            navigate(params.redirect);
          } else {
            navigate("/");
          }
        });
      })
      .catch((e: any) => {
        setLoading(false);
      });
  };
  const redirectHandler = () => {
    if (params.redirect) {
      navigate(params.redirect);
    } else {
      navigate("/");
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles["content"]}>
      <TencentFaceCheck
        open={faceCheckVisible}
        active={false}
        onCancel={() => setFaceCheckVisible(false)}
        success={() => {
          setFaceCheckVisible(false);
          getUser();
        }}
      />
      <div className={styles["left"]}>
        <img className={styles["banner"]} src={banner} />
      </div>
      <div className={styles["right"]}>
        <div className={styles["tabs"]}>
          <div className={styles["item-tab"]}>
            密码登录
            <div className={styles["actline"]}></div>
          </div>
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
          style={{ marginTop: 50 }}
        >
          <Form.Item
            name="mobile"
            rules={[{ required: true, message: "请输入手机号!" }]}
          >
            <Input
              style={{ width: 440, height: 54, fontSize: 16 }}
              autoComplete="off"
              placeholder="请输入手机号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password
              style={{ width: 440, height: 54, fontSize: 16, marginTop: 30 }}
              autoComplete="off"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                width: 440,
                height: 54,
                outline: "none",
                marginTop: 30,
                fontSize: 16,
              }}
              type="primary"
              onClick={() => form.submit()}
              loading={loading}
            >
              立即登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
