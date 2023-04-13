import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { message, Modal } from "antd";
import { login } from "../../../../api/index";
import { logoutAction } from "../../../../store/user/loginUserSlice";

interface PropInterface {
  open: boolean;
  onCancel: () => void;
}

export const DestroyUserDialog: React.FC<PropInterface> = ({
  open,
  onCancel,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const destroyUserValidate = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    login
      .destroyUser({})
      .then((res: any) => {
        setLoading(false);
        message.success("注销成功");
        dispatch(logoutAction());
        location.reload();
        onCancel();
      })
      .catch((e: any) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal
        title=""
        centered
        forceRender
        open={open}
        width={500}
        onCancel={() => {
          onCancel();
        }}
        onOk={() => {
          destroyUserValidate();
        }}
        maskClosable={false}
        okText="确认注销"
        cancelText="暂不注销"
      >
        <div className={styles["tabs"]}>
          <div className={styles["tab-active-item"]}>账号注销</div>
        </div>
        <div className={styles["box"]}>
          <div className={styles["input-item"]}>
            确认注销账号？确认之后账号将在7天后自动注销，期间内登录账号将会自动取消账号注销
          </div>
        </div>
      </Modal>
    </>
  );
};
