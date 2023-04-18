import React, { useState, useEffect } from "react";
import styles from "./detail.module.scss";
import { Row, Col, Spin, Pagination } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { topic as topicApi } from "../../api/index";
import { useSelector } from "react-redux";
import { HistoryRecord, ShareComp } from "../../components";
import { changeTime } from "../../utils/index";
import voteIcon from "../../assets/img/commen/icon-vote-h.png";
import noVoteIcon from "../../assets/img/commen/icon-vote-n.png";
import likeIcon from "../../assets/img/commen/icon-collect-h.png";
import noLikeIcon from "../../assets/img/commen/icon-collect-n.png";

export const TopicDetailPage = () => {
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState<boolean>(false);
  const [topic, setTopic] = useState<any>({});
  const [isBuy, setIsBuy] = useState<boolean>(false);
  const [isVote, setIsVote] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [id, setId] = useState(Number(result.get("id")));
  const configFunc = useSelector(
    (state: any) => state.systemConfig.value.configFunc
  );
  const isLogin = useSelector((state: any) => state.loginUser.value.isLogin);

  useEffect(() => {
    getDetail();
  }, [id]);

  const getDetail = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    topicApi.detail(id).then((res: any) => {
      document.title = res.data.topic.title;
      setTopic(res.data.topic);
      setIsBuy(res.data.is_buy);
      setIsLike(res.data.is_collect);
      setIsVote(res.data.is_vote);
    });
  };

  const vote = () => {};

  const likeHit = () => {};

  const goLogin = () => {
    navigate("/login");
  };

  const buyVip = () => {
    navigate("/vip");
  };

  const buy = () => {
    if (!isLogin) {
      goLogin();
      return;
    }
    navigate(
      "/order?goods_id=" +
        topic.id +
        "&goods_type=topic&goods_charge=" +
        topic.charge +
        "&goods_label=文章&goods_name=" +
        topic.title +
        "&goods_thumb=" +
        topic.thumb
    );
  };

  return (
    <>
      <div className="container">
        <div className="bread-nav">
          <a
            onClick={() => {
              navigate("/");
            }}
          >
            首页
          </a>{" "}
          /
          <a
            onClick={() => {
              navigate("/topic");
            }}
          >
            图文
          </a>{" "}
          /<span>{topic.title}</span>
        </div>
        <div className={styles["box"]}>
          <div className={styles["topic-box"]}>
            <div className={styles["topic"]}>
              <HistoryRecord id={topic.id} title={topic.title} type="topic" />
              <div className={styles["topic-title"]}>{topic.title}</div>
              <div className={styles["topic-stat"]}>
                <span className={styles["div-times"]}>
                  {changeTime(topic.created_at)}
                </span>
                <span className={styles["div-times"]}>
                  {topic.view_times}次阅读
                </span>
                <span className={styles["div-times"]}>
                  {topic.vote_count}人赞过
                </span>
              </div>
              <div className={styles["line"]}></div>
              <div className={styles["topic-content"]}>
                {isBuy && (
                  <div className="u-content md-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: topic.render_content,
                      }}
                    ></div>
                  </div>
                )}
                {!isBuy && (
                  <>
                    <div className="free-content u-content md-content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: topic.free_content_render,
                        }}
                      ></div>
                    </div>
                    <div className={styles["buttons"]}>
                      {!isLogin && (
                        <div
                          className={styles["login-button"]}
                          onClick={() => goLogin()}
                        >
                          请登录后查看
                        </div>
                      )}
                      {isLogin && (
                        <>
                          {topic.is_vip_free === 1 && (
                            <div
                              className={styles["vip-buy-button"]}
                              onClick={() => buyVip()}
                            >
                              会员免费看
                            </div>
                          )}
                          {topic.charge > 0 && (
                            <div
                              className={styles["buy-button"]}
                              onClick={() => buy()}
                            >
                              解锁全文￥{topic.charge}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {topic && (
            <div className={styles["share-box"]}>
              <ShareComp
                cid={topic.id}
                title={topic.title}
                thumb={topic.thumb}
              ></ShareComp>
              {isVote && (
                <div
                  className={styles["active-vote-button"]}
                  onClick={() => vote()}
                >
                  <img
                    className={styles["vote-icon"]}
                    style={{ width: 40, height: 40 }}
                    src={voteIcon}
                  />
                  <span>已点赞</span>
                </div>
              )}
              {!isVote && (
                <div className={styles["vote-button"]} onClick={() => vote()}>
                  <img
                    className={styles["vote-icon"]}
                    style={{ width: 40, height: 40 }}
                    src={noVoteIcon}
                  />
                  <span>点赞</span>
                </div>
              )}
              {isLike && (
                <div
                  className={styles["active-like-button"]}
                  onClick={() => vote()}
                >
                  <img
                    className={styles["like-icon"]}
                    style={{ width: 40, height: 40 }}
                    src={likeIcon}
                  />
                  <span>已点赞</span>
                </div>
              )}
              {!isLike && (
                <div
                  className={styles["like-button"]}
                  onClick={() => likeHit()}
                >
                  <img
                    className={styles["like-icon"]}
                    style={{ width: 40, height: 40 }}
                    src={noLikeIcon}
                  />
                  <span>点赞</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
