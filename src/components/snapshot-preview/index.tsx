import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import deleteIcon from "../../assets/img/commen/icon-delete.png";

interface PropInterface {
  url: string;
  close: () => void;
  del: () => void;
}

export const SnaoShotPreview: React.FC<PropInterface> = ({
  url,
  close,
  del,
}) => {
  return (
    <div className={styles["image-preview-shadow-box"]} onClick={() => close()}>
      <img className={styles["del"]} onClick={() => del()} src={deleteIcon} />
      <img className={styles["img"]} src={url} />
    </div>
  );
};
