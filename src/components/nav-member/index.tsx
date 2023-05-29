import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { saveUnread } from "../../store/user/loginUserSlice";
import { user as member } from "../../api/index";

interface PropInterface {
  cid: number;
  refresh: boolean;
}

export const NavMember: React.FC<PropInterface> = ({ cid, refresh }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState(cid);
  const [menus, setMenus] = useState<any>([]);
  const [hasMessage, setHasMessage] = useState<boolean>(false);
  const configFunc = useSelector(
    (state: any) => state.systemConfig.value.configFunc
  );
  const isLogin = useSelector((state: any) => state.loginUser.value.isLogin);
  const freshUnread = useSelector(
    (state: any) => state.loginUser.value.freshUnread
  );

  useEffect(() => {
    if (configFunc) {
      let menus = [
        {
          name: "用户",
          status: true,
          childrens: [
            {
              name: "所有订单",
              id: 6,
              path: "/member/orders",
              status: true,
            },
            {
              name: "我的消息",
              id: 7,
              path: "/member/messages",
              status: true,
            },
            {
              name: "我的证书",
              id: 20,
              path: "/member/certs",
              status: configFunc["cert"],
            },
          ],
        },
        {
          name: "试题",
          status: configFunc["paper"],
          childrens: [
            {
              name: "我的考试",
              id: 9,
              path: "/member/paper",
              status: configFunc["paper"],
            },
            {
              name: "我的模考",
              id: 11,
              path: "/member/mockpaper",
              status: configFunc["mockPaper"],
            },
            {
              name: "试题错题",
              id: 12,
              path: "/exam/wrongbook",
              status: configFunc["wrongBook"],
            },
            {
              name: "我的练习",
              id: 10,
              path: "/member/practice",
              status: configFunc["practice"],
            },
            {
              name: "收藏习题",
              id: 17,
              path: "/exam/collection",
              status: configFunc["practice"],
            },
          ],
        },
        {
          name: "其他",
          status: true,
          childrens: [
            {
              name: "我的问答",
              id: 13,
              path: "/member/questions",
              status: configFunc["wenda"],
            },
            {
              name: "邀请推广",
              id: 14,
              path: "/share",
              status: configFunc["share"],
            },
            {
              name: "兑换课程",
              id: 15,
              path: "/member/code-exchanger",
              status: configFunc["codeExchanger"],
            },
            {
              name: "积分商城",
              id: 16,
              path: "/member/credit1-records",
              status: configFunc["credit1Mall"],
            },
            {
              name: "我的积分",
              id: 18,
              path: "/member/credit1-free",
              status: !configFunc["credit1Mall"],
            },
          ],
        },
      ];
      setMenus(menus);
    }
  }, [configFunc]);

  useEffect(() => {
    if (isLogin) {
      getUnread();
    }
  }, [isLogin, refresh]);

  const setScene = (val: any) => {
    navigate(val);
  };

  const getUnread = () => {
    member.unReadNum().then((res: any) => {
      let num = res.data;
      if (num === 0) {
        setHasMessage(false);
        dispatch(saveUnread(false));
      } else {
        setHasMessage(true);
      }
    });
  };

  return (
    <div className={styles["nav-box"]}>
      <div
        className={id === 0 ? styles["active-spItem"] : styles["spItem"]}
        onClick={() => navigate("/member")}
      >
        用户中心
      </div>
      {menus.map((item: any, index: number) => (
        <div key={index}>
          {item.status && (
            <div className={styles["menus-item"]}>
              <div className={styles["item"]}>
                <span className={styles["title"]}>{item.name}</span>
                <div className={styles["children"]}>
                  {item.childrens.length > 0 &&
                    item.childrens.map((child: any) => (
                      <div key={child.id}>
                        {child.status && (
                          <div
                            className={
                              id === child.id
                                ? styles["active-item-children"]
                                : styles["item-children"]
                            }
                            onClick={() => setScene(child.path)}
                          >
                            {child.name}
                            {hasMessage && child.id === 7 && (
                              <div className={styles["point"]}></div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
