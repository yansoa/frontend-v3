import { Spin } from "antd";
import styles from "./index.module.scss";

const LoadingPage = () => {
  return (
    <>
      <div className={styles["loading-box"]}>
        <Spin size="large" />
      </div>
    </>
  );
};

export default LoadingPage;
