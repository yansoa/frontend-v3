import React, { useState, useEffect } from "react";
import styles from "./detail.module.scss";
import { Row, Col, Modal, Spin, Button, Pagination } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { course as vod } from "../../api/index";
import { HistoryRecord } from "../../components";

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
          点播课
        </a>{" "}
        /<span>{course.title}</span>
      </div>
      <HistoryRecord id={course.id} title={course.title} type="vod" />
    </div>
  );
};
