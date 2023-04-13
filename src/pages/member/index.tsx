import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Modal, message, Upload } from "antd";
import type { UploadProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { user as member } from "../../api/index";
import { NavMember } from "../../components";
import config from "../../js/config";
import { getToken } from "../../utils/index";
import { loginAction } from "../../store/user/loginUserSlice";

export const MemberPage = () => {
  document.title = "用户中心";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState<boolean>(false);
  const [editNickStatus, setEditNickStatus] = useState<boolean>(false);
  const user = useSelector((state: any) => state.loginUser.value.user);
  const [currentTab, setCurrentTab] = useState(1);
  const loginCode = result.get("login_code");
  const action = result.get("action");
  const errMsg = result.get("login_err_msg");
  const tabs = [
    {
      name: "基本信息",
      id: 1,
    },
    {
      name: "实名认证",
      id: 2,
    },
  ];

  useEffect(() => {
    if (loginCode && action === "bind") {
      codeBind(loginCode);
    }
    if (errMsg) {
      message.error(errMsg);
    }
  }, [loginCode, action, errMsg]);

  const codeBind = (loginCode: string) => {};

  const destroyUser = () => {};

  const tabChange = (id: number) => {
    setCurrentTab(id);
  };

  const resetData = () => {
    setEditNickStatus(false);
    member.detail().then((res: any) => {
      let loginData = res.data;
      dispatch(loginAction(loginData));
    });
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    method: "POST",
    action: config.app_url + "/api/v2/member/detail/avatar",
    headers: {
      Accept: "application/json",
      authorization: "Bearer " + getToken(),
    },
    beforeUpload: (file) => {
      const isPNG =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg";

      if (!isPNG) {
        message.error(`${file.name}不是图片文件`);
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("图片大小不超过2M");
      }
      return (isPNG && isLt2M) || Upload.LIST_IGNORE;
    },
    onChange(info: any) {
      const { status, response } = info.file;
      if (status === "done") {
        if (response.code === 0) {
          message.success("上传头像成功");
          resetData();
        } else {
          message.error(response.msg);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  return (
    <div className="container">
      <div className={styles["box"]}>
        <NavMember cid={0}></NavMember>
        <div className={styles["project-box"]}>
          <div className={styles["user-box"]}>
            <div className={styles["avatar"]}>
              <img src={user.avatar} />
            </div>
            <div className={styles["user-info"]}>
              <div className={styles["user-top"]}>
                <div className={styles["nickname"]}>{user.nick_name}</div>
                {user.role_id !== 0 && user.role && (
                  <div className={styles["role"]}>VIP</div>
                )}
              </div>
              {user.role_id !== 0 && user.role_expired_at && (
                <div className={styles["expiration-time"]}>
                  会员有效期至{user.role_expired_at}
                </div>
              )}
            </div>
            <div className={styles["value-box"]}>
              <div className={styles["item"]}>
                <div className={styles["value"]}>{user.credit1}</div>
                <div className={styles["name"]}>我的积分</div>
              </div>
              <div className={styles["item"]}>
                <div className={styles["value"]}>
                  {user.invite_people_count}
                </div>
                <div className={styles["name"]}>成功邀请(人)</div>
              </div>
              <div className={styles["item"]}>
                <div className={styles["value"]}>{user.invite_balance}</div>
                <div className={styles["name"]}>邀请余额(元)</div>
              </div>
            </div>
          </div>
          <div className={styles["user-profile"]}>
            <div className={styles["del-user"]} onClick={() => destroyUser()}>
              注销账号
            </div>
            <div className="member-tabs">
              {tabs.map((item: any) => (
                <div
                  key={item.id}
                  className={
                    currentTab === item.id ? "active item-tab" : "item-tab"
                  }
                  onClick={() => tabChange(item.id)}
                >
                  {item.name}
                  {currentTab === item.id && <div className="actline"></div>}
                </div>
              ))}
            </div>
            {currentTab === 1 && (
              <div className={styles["project-content"]}>
                <div className={styles["item-line"]}>
                  <div className={styles["item-left"]}>
                    <div className={styles["item-name"]}>我的头像</div>
                    <div className={styles["item-avatar"]}>
                      <Upload
                        className={styles["avatar"]}
                        {...props}
                        showUploadList={false}
                      >
                        <img className={styles["avatar"]} src={user.avatar} />
                      </Upload>
                    </div>
                  </div>
                  <div className={styles["item-right"]}>
                    <div className={styles["tip"]}>点击图片修改</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
