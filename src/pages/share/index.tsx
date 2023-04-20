import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import {
  Input,
  message,
  Row,
  Col,
  Modal,
  Spin,
  Button,
  Pagination,
} from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { multiLevelShare } from "../../api/index";
import { getShareHost } from "../../utils/index";

export const SharePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogStatus, setDialogStatus] = useState<boolean>(false);
  const [inviteUrl, setInviteUrl] = useState<string>("");
  const [count, setCount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [projectType, setProjectType] = useState(1);
  const [rules, setRules] = useState<string>("");
  const user = useSelector((state: any) => state.loginUser.value.user);
  const tabs = [
    {
      name: "分销课程",
      id: 1,
    },
    {
      name: "资金明细",
      id: 2,
    },
  ];

  useEffect(() => {
    getInviteInfo();
    getShareConfig();
  }, [user]);

  const getInviteInfo = () => {
    multiLevelShare.user().then((res: any) => {
      setCount(res.data.invite_count);
      setBalance(res.data.invite_balance);
      let url = getShareHost() + "?msv=" + user.id;
      setInviteUrl(url);
    });
  };

  const getShareConfig = () => {
    multiLevelShare.config().then((res: any) => {
      setRules(res.data.rules);
    });
  };

  const copy = () => {
    var input = document.createElement("input");
    input.value = inviteUrl;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    document.body.removeChild(input);
    message.success("复制成功");
  };

  return (
    <div className="container">
      <div className={styles["box"]}>
        <div className={styles["user-box"]}>
          <div className={styles["user"]}>
            <div className={styles["avatar"]}>
              <img src={user.avatar} />
            </div>
            <div className={styles["user-info"]}>
              <div className={styles["user-name"]}>{user.nick_name}</div>
              <div className={styles["share-box"]}>
                <Input
                  value={inviteUrl}
                  onChange={(e) => {
                    setInviteUrl(e.target.value);
                  }}
                  className={styles["input"]}
                ></Input>
                <Button className={styles["btn-copy"]} onClick={() => copy()}>
                  复制邀请链接
                </Button>
              </div>
            </div>
          </div>
          <div className={styles["item-box"]}>
            <div className={styles["value"]}>{count}</div>
            <div className={styles["tit"]}>邀请人数</div>
          </div>
          <div className={styles["item-box"]}>
            <div className={styles["value"]}>
              <span>{balance}</span>
            </div>
            <div className={styles["tit"]}>邀请余额</div>
          </div>
          <div
            className={styles["withdraw-button"]}
            onClick={() => {
              if (balance === 0) {
                message.error("余额为0时不可提现");
                return;
              }
              setDialogStatus(true);
            }}
          >
            提现
          </div>
        </div>
        <div className={styles["bottom-box"]}>
          <div className={styles["project-box"]}>
            <div className={styles["btns"]}>
              {tabs.map((item: any) => (
                <div
                  key={item.id}
                  className={
                    projectType === item.id
                      ? styles["active-btn-title"]
                      : styles["btn-title"]
                  }
                  onClick={() => setProjectType(item.id)}
                >
                  {item.name}
                  {projectType === item.id && (
                    <div className={styles["baseline"]}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles["info-box"]}>
            <div className={styles["tit"]}>分销课程说明</div>
            <div className={styles["line"]}></div>
            <div
              className={styles["desc"]}
              dangerouslySetInnerHTML={{ __html: rules }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
