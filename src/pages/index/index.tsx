import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Modal, Button } from "antd";
import { sign } from "../../api/index";
import { SignComp } from "../../components";

const IndexPage = () => {
  const [signStatus, setSignStatus] = useState<boolean>(false);

  useEffect(() => {
    getSignStatus();
  }, []);

  const getSignStatus = () => {
    sign.user().then((res: any) => {
      let is_submit = res.data.is_submit;
      if (is_submit === 0) {
        setSignStatus(true);
      } else {
        setSignStatus(false);
      }
    });
  };
  return (
    <div className="container">
      <SignComp
        open={signStatus}
        success={() => setSignStatus(false)}
      ></SignComp>
      <div>我是首页</div>
    </div>
  );
};

export default IndexPage;
