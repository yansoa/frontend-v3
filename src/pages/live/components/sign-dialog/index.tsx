import React, { useState, useRef, useEffect } from "react";
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
  const [count, setCount] = useState<number>(0);
  const [num, setNum] = useState<number>(0);
  const myRef = useRef(0);

  useEffect(() => {
    getCount();
    return () => {
      timer && clearInterval(timer);
      timer = null;
      setCount(0);
    };
  }, [cid, vid, records]);

  useEffect(() => {
    myRef.current = count;
  }, [count]);

  const getCount = () => {
    let end_at = records.end_at;
    const today: any = new Date();
    let value = (Date.parse(end_at) - today) / 1000;
    if (Number(value) > 0) {
      countDown(Number(value));
    }
  };

  const countDown = (duration: number) => {
    const TIME_COUNT = Math.floor(duration);
    if (!timer) {
      setCount(TIME_COUNT);
      timer = setInterval(() => {
        let num = myRef.current;
        if (num > 0 && num <= TIME_COUNT) {
          num--;
          setCount(num);
        } else {
          setCount(0);
          timer && clearInterval(timer);
          timer = null;
          onCancel();
        }
      }, 1000);
    }
  };

  const onConfirm = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    goMeedu
      .sign(cid, vid, records.id)
      .then(() => {
        setCount(0);
        timer && clearInterval(timer);
        timer = null;
        setLoading(false);
        message.success("签到成功");
        onCancel();
      })
      .catch((e: any) => {
        setLoading(false);
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
            <div className={styles["button"]} onClick={() => onConfirm()}>
              点击签到
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
