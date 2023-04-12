import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

interface PropInterface {
  activeNum: number;
  qidArr: any[];
  hasPracticeIds: any;
  change: (val: number) => void;
}

export const NumberSheet: React.FC<PropInterface> = ({
  activeNum,
  qidArr,
  hasPracticeIds,
  change,
}) => {
  const goDetail = (num: number) => {
    change(num);
  };

  return (
    <div className={styles["box"]}>
      {qidArr.length < 1000 && (
        <div className={styles["number-box"]}>
          {qidArr.map((item: any, index: number) => (
            <div
              key={index}
              className={
                index + 1 === activeNum
                  ? styles["active-num"]
                  : hasPracticeIds[item]
                  ? styles["completed-num"]
                  : styles["num"]
              }
              onClick={() => goDetail(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      )}
      {qidArr.length >= 1000 && (
        <div className={styles["number-box2"]}>
          {qidArr.map((item: any, index: number) => (
            <div
              key={index}
              className={
                index + 1 === activeNum
                  ? styles["active-num"]
                  : hasPracticeIds[item]
                  ? styles["completed-num"]
                  : styles["num"]
              }
              onClick={() => goDetail(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
