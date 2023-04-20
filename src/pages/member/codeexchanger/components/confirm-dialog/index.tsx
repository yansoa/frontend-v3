import React, { useState } from "react";
import styles from "./index.module.scss";
import closeIcon from "../../../../../assets/img/commen/icon-close.png";

interface PropInterface {
  open: boolean;
  buttonStatus: boolean;
  data: any;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<PropInterface> = ({
  open,
  buttonStatus,
  data,
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
              <div className={styles["item-tab"]}>验证成功，可兑换以下内容</div>
              <img
                className={styles["btn-close"]}
                onClick={() => onCancel()}
                src={closeIcon}
              />
            </div>
            <div className={styles["info"]}>
              {data &&
                data.relate_courses.length > 0 &&
                data.relate_courses.map((actItem: any) => (
                  <div className={styles["list-item"]} key={actItem.id}>
                    {actItem.sign === "vod" && <span>录播-{actItem.name}</span>}
                    {actItem.sign === "live" && (
                      <span>直播-{actItem.name}</span>
                    )}
                    {actItem.sign === "book" && (
                      <span>电子书-{actItem.name}</span>
                    )}
                    {actItem.sign === "paper" && (
                      <span>考试-{actItem.name}</span>
                    )}
                    {actItem.sign === "mock_paper" && (
                      <span>模拟-{actItem.name}</span>
                    )}
                    {actItem.sign === "practice" && (
                      <span>练习-{actItem.name}</span>
                    )}
                    {actItem.sign === "vip" && <span>VIP-{actItem.name}</span>}
                    {actItem.is_subscribe && (
                      <span className={styles["red-status"]}>已订阅</span>
                    )}
                    {!actItem.is_subscribe && (
                      <span className={styles["status"]}>未订阅</span>
                    )}
                  </div>
                ))}
            </div>
            <div className={styles["btn-box"]}>
              {buttonStatus && (
                <div
                  className={styles["btn-submit"]}
                  onClick={() => onSubmit()}
                >
                  确认兑换
                </div>
              )}
              {!buttonStatus && (
                <div className={styles["disabled"]}>确认兑换</div>
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
