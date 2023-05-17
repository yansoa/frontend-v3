import React from "react";
import styles from "./index.module.scss";
import { CountDown } from "../count-down";

interface PropInterface {
  msData: any;
}

export const MiaoshaList: React.FC<PropInterface> = ({ msData }) => {
  return (
    <>
      {msData.data && (
        <div className={styles["ms-comp"]}>
          <div className={styles["ms-content"]}>
            <div className={styles["sp-mask"]}></div>
            <div className={styles["sp-transform"]}></div>
            <div className={styles["original_charge"]}>
              原价￥{msData.data.original_charge}
            </div>
            <div className={styles["charge"]}>
              <span className={styles["ms-text"]}>限时秒杀价:</span>
              <span className={styles["charge-text"]}>
                <span className={styles["unit"]}>￥</span>
                {msData.data.charge}
              </span>
            </div>
            {msData.data.is_over && (
              <div className={styles["price"]}>
                <div className={styles["end"]}>已售罄</div>
              </div>
            )}
            {msData.data.is_start && (
              <div className={styles["price"]}>
                <div className={styles["ms-time"]}>
                  距秒杀结束剩余
                  <CountDown timestamp={msData.data.expired_seconds} type="" />
                </div>
                <i className={styles["line"]}></i>
                <div className={styles["ms-time"]}>
                  库存剩余{msData.data.over_num}件
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
