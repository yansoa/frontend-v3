import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message, Button, Space, Image } from "antd";
import styles from "./index.module.scss";
import closeIcon from "../../../../../assets/img/commen/icon-close.png";
import { user as member, system } from "../../../../../api/index";

interface PropInterface {
  open: boolean;
  status: boolean;
  exchangeCode: string;
  checkSuccess: (data: any, value: boolean) => void;
  onSuccess: () => void;
  onCancel: () => void;
}

export const VerifyDialog: React.FC<PropInterface> = ({
  open,
  status,
  exchangeCode,
  onSuccess,
  checkSuccess,
  onCancel,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [captcha, setCaptcha] = useState<any>({ key: null, img: null });

  useEffect(() => {
    setContent("");
    if (open) {
      getCaptcha();
    }
  }, [open]);

  const getCaptcha = () => {
    system.imageCaptcha().then((res: any) => {
      setCaptcha(res.data);
    });
  };

  const exchangeConfirm = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    member
      .exchange({
        code: exchangeCode,
        image_captcha: content,
        image_key: captcha.key,
      })
      .then((res: any) => {
        message.success("兑换成功");
        setLoading(false);
        onSuccess();
      })
      .catch((e) => {
        getCaptcha();
        setLoading(false);
      });
  };

  const withdraw = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    member
      .query({
        code: exchangeCode,
        image_captcha: content,
        image_key: captcha.key,
      })
      .then((res: any) => {
        let data = res.data.activity.relate_courses;
        let buttonStatus = false;
        for (let i = 0; i < data.length; i++) {
          if (!data[i].is_subscribe) {
            buttonStatus = true;
          }
        }
        checkSuccess(res.data.activity, buttonStatus);
        setLoading(false);
      })
      .catch((e) => {
        getCaptcha();
        setLoading(false);
      });
  };

  return (
    <>
      {open && (
        <div className={styles["mask"]}>
          <div className={styles["dialog-box"]}>
            <div className={styles["dialog-tabs"]}>
              <div className={styles["item-tab"]}>操作验证</div>
              <img
                className={styles["btn-close"]}
                onClick={() => onCancel()}
                src={closeIcon}
              />
            </div>
            <div className={styles["info"]}>
              <div className={styles["input-item"]}>
                <Input
                  className={styles["input-short"]}
                  autoComplete="off"
                  placeholder="请输入图形验证码"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
                <Image
                  onClick={() => getCaptcha()}
                  src={captcha.img}
                  width={110}
                  height={39}
                  preview={false}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <div className={styles["btn-box"]}>
              {status && (
                <div
                  className={styles["btn-submit"]}
                  onClick={() => exchangeConfirm()}
                >
                  确认
                </div>
              )}
              {!status && (
                <Button
                  loading={loading}
                  type="primary"
                  className={styles["btn-submit"]}
                  onClick={() => withdraw()}
                >
                  确认
                </Button>
              )}
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
