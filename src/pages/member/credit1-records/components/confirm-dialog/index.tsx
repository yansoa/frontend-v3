import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message, Button, Space, Image } from "antd";
import styles from "./index.module.scss";
import closeIcon from "../../../../../assets/img/commen/icon-close.png";
import { user as member, system } from "../../../../../api/index";

interface PropInterface {
  open: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<PropInterface> = ({
  open,
  onSubmit,
  onCancel,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {open && (
        <div className={styles["mask"]}>
          <div className={styles["dialog-box"]}>
            <div className={styles["dialog-tabs"]}>
              <div className={styles["item-tab"]}>确认信息</div>
              <img
                className={styles["btn-close"]}
                onClick={() => onCancel()}
                src={closeIcon}
              />
            </div>
            <div className={styles["info"]}>确认要兑换吗？</div>
            <div className={styles["btn-box"]}>
              <div className={styles["btn-submit"]} onClick={() => onSubmit()}>
                确认
              </div>

              <div className={styles["btn-cancel"]} onClick={() => onCancel()}>
                取消
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
