import React from "react";
import styles from "./index.module.scss";

interface PropInterface {
  border: any;
  value: string;
  width: number;
  height: number;
}

export const ThumbBar: React.FC<PropInterface> = ({
  border,
  value,
  width,
  height,
}) => {
  return (
    <div className={styles["content-box"]}>
      <div className="flex justify-center" style={{ width: "100%" }}>
        <div
          style={{
            borderRadius: border ? border + "px" : "none",
            backgroundImage: "url(" + value + ")",
            width: width + "px",
            height: height + "px",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
};
