import styles from "./index.module.scss";
import React from "react";
import { Image } from "antd";
import empty from "../../assets/img/commen/img-placeholder.png";

export const Empty: React.FC = () => {
  return (
    <div className={styles["img-box"]}>
      <Image src={empty} width={150} height={150} preview={false} />
    </div>
  );
};
