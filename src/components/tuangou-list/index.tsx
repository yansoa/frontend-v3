import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CountDown } from "../count-down";
import defaultAvatar from "../../assets/img/commen/icon-member.png";

interface PropInterface {
  tgData: any;
}

export const TuangouList: React.FC<PropInterface> = ({ tgData }) => {
  const navigate = useNavigate();
  const isLogin = useSelector((state: any) => state.loginUser.value.isLogin);
  const getArr = (num: number) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(i + 1);
    }
    return arr;
  };

  const goLogin = () => {
    let url = encodeURIComponent(
      window.location.pathname + window.location.search
    );
    navigate("/login?redirect=" + url);
  };

  const copy = () => {
    if (!isLogin) {
      goLogin();
      return;
    }
    var input = document.createElement("input");
    input.value = window.location.href;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    document.body.removeChild(input);
    message.success("链接已复制，可分享邀请好友参团");
  };

  const goPay = (gid = 0) => {
    if (!isLogin) {
      goLogin();
      return;
    }
    navigate(
      "/order?course_id=" +
        tgData.goods.other_id +
        "&course_type=" +
        tgData.goods.goods_type +
        "&goods_type=tg&goods_charge=" +
        tgData.goods.charge +
        "&goods_label=团购&goods_name=" +
        tgData.goods.goods_title +
        "&goods_id=" +
        tgData.goods.id +
        "&goods_thumb=" +
        tgData.goods.goods_thumb +
        "&tg_gid=" +
        gid
    );
  };

  return (
    <>
      {tgData.goods && (
        <div className={styles["tg-comp"]}>
          <div className={styles["tg-content"]}>
            <div className={styles["sp-mask"]}></div>
            <div className={styles["sp-transform"]}></div>
            <div className={styles["tg-content-item"]}>
              <div className={styles["original-price"]}>
                原价￥{tgData.goods.original_charge}
              </div>
              <div className={styles["tip"]}>
                若拼团失败退款将原路返回，请耐心等待
              </div>
            </div>
            <div className={styles["tg-content-item"]}>
              <span className={styles["price"]}>
                限时拼团价￥<strong>{tgData.goods.charge}</strong>
              </span>
              <span className={styles["time"]}>
                {tgData.goods.people_num}人团 距活动结束剩余
                <CountDown timestamp={tgData.goods.ended_count_down} type="" />
              </span>
            </div>
          </div>
          {tgData.items && tgData.items.length > 0 && (
            <div className={styles["tg-list"]}>
              {tgData.items.map((item: any) => (
                <div key={item.id} className={styles["item"]}>
                  {item.create_user_id === 0 && (
                    <div className={styles["left-box"]}>
                      <img
                        className={styles["value"]}
                        src={item.create_user_avatar}
                      />
                      {item.users.map((it: any, index: number) => (
                        <img
                          key={index}
                          className={styles["value"]}
                          src={it.avatar}
                        />
                      ))}
                      {getArr(
                        tgData.goods.people_num - 1 - item.users.length
                      ).map((it: any) => (
                        <img
                          key={it + item.users.length + 1}
                          className={styles["value"]}
                          src={defaultAvatar}
                        />
                      ))}
                    </div>
                  )}
                  {item.create_user_id !== 0 && (
                    <div className={styles["left-box"]}>
                      {item.users.map((it: any, index: number) => (
                        <img
                          key={index}
                          className={styles["value"]}
                          src={it.avatar}
                        />
                      ))}
                      {getArr(tgData.goods.people_num - item.users.length).map(
                        (it: any) => (
                          <img
                            key={it + item.users.length + 1}
                            className={styles["value"]}
                            src={defaultAvatar}
                          />
                        )
                      )}
                    </div>
                  )}
                  <div className={styles["right-box"]}>
                    <div className={styles["date"]}>
                      差<span>{item.over_people_num}</span>人拼成 剩余
                      <CountDown
                        key={item.id}
                        timestamp={item.count_down}
                        type=""
                      />
                    </div>
                    {tgData.join_item && tgData.join_item.length !== 0 && (
                      <>
                        {tgData.join_item.id === item.id && (
                          <div
                            className={styles["button"]}
                            onClick={() => copy()}
                          >
                            拼团中，邀请好友参团
                          </div>
                        )}
                        {tgData.join_item.id !== item.id && (
                          <div className={styles["no-join-button"]}>
                            加入拼团
                          </div>
                        )}
                      </>
                    )}
                    {(!tgData.join_item || tgData.join_item.length === 0) && (
                      <div
                        className={styles["button"]}
                        onClick={() => goPay(item.id)}
                      >
                        加入拼团
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
