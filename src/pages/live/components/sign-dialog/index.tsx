import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  Form,
  Input,
  message,
  Button,
  Space,
  Image,
  Checkbox,
} from "antd";

import styles from "./index.module.scss";
import { system, goMeedu } from "../../../../api/index";

interface PropInterface {
  cid: number;
  vid: number;
  records: any;
  onCancel: () => void;
}

var timer: any = null;

export const SignDialog: React.FC<PropInterface> = ({
  cid,
  vid,
  records,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const config = useSelector((state: any) => state.systemConfig.value.config);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<any>("");
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    getCount();
    return () => {
      timer && clearInterval(timer);
      timer = null;
      setCount("");
    };
  }, [cid, vid, records]);

  const getCount = () => {
    let end_at = records.end_at;
    const today: any = new Date();
    let value = (Date.parse(end_at) - today) / 1000;
    if (Number(value) > 0) {
      countDown(Number(value));
    }
  };

  const countDown = (duration: number) => {
    const TIME_COUNT = duration;
    if (!timer) {
      setCount(TIME_COUNT);
      timer = setInterval(() => {
        let num = count;
        if (num > 0 && num <= TIME_COUNT) {
          num--;
          setCount(num);
        } else {
          setCount("");
          timer && clearInterval(timer);
          timer = null;
          onCancel();
        }
      }, 1000);
    }
  };

  const confirm = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    goMeedu
      .sign(cid, vid, records.id)
      .then(() => {
        setCount("");
        timer && clearInterval(timer);
        timer = null;
        setLoading(false);
        message.success("签到成功");
        onCancel();
      })
      .catch((e: any) => {
        setLoading(false);
        message.error(e.message);
      });
  };

  return (
    <>
      <div className={styles["mask"]}>
        <div className={styles["dialog-box"]}>
          <div className={styles["dialog-header"]}>
            <span>大家快来签到啦！</span>
          </div>
          <div className={styles["dialog-body"]}>
            <div className={styles["count"]}>{count}</div>
            <div className={styles["button"]} onClick={() => confirm}>
              点击签到
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
