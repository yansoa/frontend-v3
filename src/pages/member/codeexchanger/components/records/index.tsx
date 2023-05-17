import React, { useState } from "react";
import styles from "./index.module.scss";
import closeIcon from "../../../../../assets/img/commen/icon-close.png";

interface PropInterface {
  open: boolean;
  relateData: any;
  onCancel: () => void;
}

export const RecordsDialog: React.FC<PropInterface> = ({
  open,
  relateData,
  onCancel,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      {open && (
        <div className={styles["mask"]}>
          <div className={styles["dialog-box"]}>
            <div className={styles["dialog-tabs"]}>
              <div className={styles["item-tab"]}>兑换记录</div>
              <img
                className={styles["btn-close"]}
                onClick={() => onCancel()}
                src={closeIcon}
              />
            </div>
            <div className={styles["info"]}>
              <div className={styles["project-box"]}>
                {relateData &&
                  relateData.length > 0 &&
                  relateData.map((actItem: any) => (
                    <div className={styles["project-item"]} key={actItem.id}>
                      <div className={styles["title"]}>
                        {actItem.sign === "vod" && (
                          <span>录播-{actItem.name}</span>
                        )}
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
                        {actItem.sign === "vip" && (
                          <span>VIP-{actItem.name}</span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
