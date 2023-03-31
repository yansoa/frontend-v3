import React, { useState, useEffect } from "react";
import styles from "./detail.module.scss";
import { Button, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { course as vod } from "../../api/index";
import { HistoryRecord, ThumbBar } from "../../components";
import collectIcon from "../../assets/img/commen/icon-collect-h.png";
import noCollectIcon from "../../assets/img/commen/icon-collect-n.png";

export const VodDetailPage = () => {
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState<boolean>(false);
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  const [cid, setCid] = useState(Number(result.get("id")));
  const [course, setCourse] = useState<any>({});
  const [attach, setAttach] = useState<any>([]);
  const [chapters, setChapters] = useState<any>([]);
  const [isBuy, setIsBuy] = useState<boolean>(false);
  const [isCollect, setIsCollect] = useState<boolean>(false);
  const [videos, setVideos] = useState<any>([]);
  const [buyVideos, setBuyVideos] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [commentUsers, setCommentUsers] = useState<any>([]);
  const configFunc = useSelector(
    (state: any) => state.systemConfig.value.configFunc
  );
  const isLogin = useSelector((state: any) => state.loginUser.value.isLogin);

  useEffect(() => {
    getDetail();
    getComments();
  }, [cid]);

  const getDetail = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    vod.detail(cid).then((res: any) => {
      document.title = res.data.course.title;
      setCourse(res.data.course);
      setAttach(res.data.attach);
      setChapters(res.data.chapters);
      setIsBuy(res.data.isBuy);
      setIsCollect(res.data.isCollect);
      setVideos(res.data.videos);
      setBuyVideos(res.data.buyVideos);

      //获取秒杀信息
      if (!res.data.isBuy && configFunc["miaosha"]) {
        getMsDetail();
      }

      //获取团购信息
      else if (!res.data.isBuy && configFunc["tuangou"]) {
        getTgDetail();
      }
      setLoading(false);
    });
  };

  const getComments = () => {
    if (commentLoading) {
      return;
    }
    setCommentLoading(true);
    vod.comments(cid).then((res: any) => {
      setComments(res.data.comments);
      setCommentUsers(res.data.users);
      setCommentLoading(false);
    });
  };

  const collectCourse = () => {
    if (isLogin) {
      vod
        .collect(cid)
        .then(() => {
          setIsCollect(!isCollect);
          if (isCollect) {
            message.success("已收藏");
          } else {
            message.success("取消收藏");
          }
        })
        .catch((e) => {
          message.error(e.message);
        });
    } else {
      goLogin();
    }
  };

  const goLogin = () => {};
  const getMsDetail = () => {};
  const getTgDetail = () => {};

  return (
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
            navigate("/courses");
          }}
        >
          录播课
        </a>{" "}
        /<span>{course.title}</span>
      </div>
      <HistoryRecord id={course.id} title={course.title} type="vod" />
      <div className={styles["course-info"]}>
        <div className={styles["course-info-box"]}>
          <div className={styles["course-thumb"]}>
            <ThumbBar
              value={course.thumb}
              width={320}
              height={240}
              border={null}
            />
          </div>
          <div className={styles["info"]}>
            <div className={styles["course-info-title"]}>{course.title}</div>
            {isCollect && (
              <img
                onClick={() => {
                  collectCourse();
                }}
                className={styles["collect-button"]}
                src={collectIcon}
              />
            )}
            {!isCollect && (
              <img
                onClick={() => {
                  collectCourse();
                }}
                className={styles["collect-button"]}
                src={noCollectIcon}
              />
            )}
            <p className={styles["desc"]}>{course.short_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
