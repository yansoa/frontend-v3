import React, { useState, useEffect } from "react";
import styles from "./detail.module.scss";
import { Row, Col, Spin, Pagination, Input, Button, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { wenda } from "../../api/index";
import { ImagePreview } from "../../components";
import { changeTime } from "../../utils/index";
import questionIcon from "../../assets/img/commen/icon-question.png";

export const WendaDetailPage = () => {
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<any>({});
  const [answers, setAnswers] = useState<any>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isVote, setIsVote] = useState<boolean>(false);
  const [preVisiable, setPreVisiable] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [id, setId] = useState(Number(result.get("id")));

  useEffect(() => {
    getData();
  }, [id]);

  const getData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    wenda.detail(id).then((res: any) => {
      document.title = res.data.question.title;
      setQuestion(res.data.question);
      setAnswers(res.data.answers);
      setIsAdmin(res.data.is_admin);
      setIsVote(res.data.is_vote);
      setLoading(false);
    });
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
              navigate("/wenda");
            }}
          >
            问答社区
          </a>{" "}
          /<span>{question.title}</span>
        </div>
        {preVisiable && (
          <ImagePreview
            url={imgSrc}
            close={() => setPreVisiable(false)}
          ></ImagePreview>
        )}
        <div className={styles["question-body"]}>
          {question.credit1 > 0 && (
            <div className={styles["credit"]}>悬赏：{question.credit1}积分</div>
          )}
          <div className={styles["title"]}>
            <div className={styles["icon"]}>
              <img src={questionIcon} />
            </div>
            <div className={styles["tit"]}>{question.title}</div>
          </div>
          <div className={styles["question-content"]}>
            <div
              dangerouslySetInnerHTML={{ __html: question.render_content }}
            ></div>
          </div>
          {question.images_list && question.images_list.length > 0 && (
            <div className={styles["thumbs-box"]}>
              {question.images_list.map((imgItem: any, index: number) => (
                <div key={index} className={styles["thumb-item"]}>
                  <div
                    className={styles["image-view"]}
                    style={{ backgroundImage: "url(" + imgItem + ")" }}
                    onClick={() => {
                      setImgSrc(imgItem);
                      setPreVisiable(true);
                    }}
                  ></div>
                </div>
              ))}
            </div>
          )}
          <div className={styles["stat"]}>
            <span className={styles["datetime"]}>
              {changeTime(question.created_at)}
            </span>
            <span className={styles["view-times"]}>
              {question.view_times}次浏览
            </span>
            <span className={styles["answer-count"]}>
              {question.answer_count}回答
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
