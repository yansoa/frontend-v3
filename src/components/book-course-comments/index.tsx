import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Input, Button, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Empty } from "../../components";
import { book } from "../../api/index";
import { getCommentTime } from "../../utils/index";

interface PropInterface {
  bid: number;
  comments: any[];
  commentUsers: any;
  isBuy: boolean;
  success: () => void;
}

export const BookCourseComments: React.FC<PropInterface> = ({
  bid,
  isBuy,
  comments,
  commentUsers,
  success,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.loginUser.value.user);
  const isLogin = useSelector((state: any) => state.loginUser.value.isLogin);
  const [content, setContent] = useState<string>("");

  const submitComment = () => {
    if (content === "") {
      return;
    }
    book
      .submitBookComment(bid, { content: content })
      .then(() => {
        message.success("成功");
        setContent("");
        success();
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  return (
    <div className={styles["course-comments-box"]}>
      <div className={styles["comment-divider"]}>全部评论</div>
      <div className={styles["line"]}></div>
      <div className={styles["replybox"]}>
        {isLogin && isBuy && (
          <div className={styles["reply"]}>
            <img className={styles["user-avatar"]} src={user.avatar} />
            <Input
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              style={{ width: 960, height: 48, marginRight: 30, fontSize: 16 }}
              placeholder="此处填写你的评论"
            ></Input>
            <Button
              type="primary"
              disabled={content.length === 0}
              style={{ width: 72, height: 48, fontSize: 16 }}
              onClick={() => {
                submitComment();
              }}
            >
              评论
            </Button>
          </div>
        )}
        {!isLogin && (
          <div className={styles["text"]} onClick={() => navigate("/login")}>
            未登录，请登录后再评论
          </div>
        )}
      </div>
      <div className={styles["comment-top"]}>
        {comments.length === 0 && <Empty></Empty>}
        {comments.length > 0 &&
          comments.map((item: any) => (
            <div key={item.id} className={styles["comment-item"]}>
              <div className={styles["user-avatar"]}>
                <img src={commentUsers[item.user_id].avatar} />
              </div>
              <div className={styles["comment-content"]}>
                <div className={styles["comment-info"]}>
                  <div className={styles["nickname"]}>
                    {commentUsers[item.user_id].nick_name}
                  </div>
                  <div className={styles["comment-time"]}>
                    {getCommentTime(item.created_at)}
                  </div>
                </div>
                <div className={styles["comment-text"]}>{item.content}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
