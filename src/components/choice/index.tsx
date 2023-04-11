import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";
import { ThumbBar } from "../thumb-bar";
import backIcon from "../../assets/img/icon-back-n.png";
import rightIcon from "../../assets/img/exam/icon-right.png";
import wrongIcon from "../../assets/img/exam/icon-Wrong.png";
import foldIcon from "../../assets/img/exam/fold.png";
import unfoldIcon from "../../assets/img/exam/unfold.png";

interface PropInterface {
  question: any;
  reply: any;
  isCorrect: number;
  isOver: boolean;
  score: number;
  wrongBook: boolean;
  num: number;
  update: (id: string, value: string, thumbs: string) => void;
}

export const ChoiceComp: React.FC<PropInterface> = ({
  question,
  reply,
  isCorrect,
  isOver,
  score,
  wrongBook,
  num,
  update,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const [thumb, setThumb] = useState<string>("");
  const [remarkStatus, setRemarkStatus] = useState<boolean>(false);
  const optionTypeTextMap: any = {
    option1: "A",
    option2: "B",
    option3: "C",
    option4: "D",
    option5: "E",
    option6: "F",
    option7: "G",
    option8: "H",
    option9: "I",
    option10: "J",
  };

  useEffect(() => {
    setActive(reply);
    if (wrongBook) {
      setRemarkStatus(true);
    } else {
      setRemarkStatus(false);
    }
  }, [reply, wrongBook]);

  const newPreviewImage = (item: string) => {
    setThumb(item);
    setPreviewImage(true);
  };

  const change = (index: any) => {
    if (isOver) {
      return;
    }
    let value = "option" + index;
    setActive(value);
    update(question.id, value, "");
  };

  const getArr = (num: number) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(i + 1);
    }
    return arr;
  };

  const PreviewImage = (event: any) => {
    if (event.target.src) {
      event.stopPropagation();
      setThumb(event.target.src);
      setPreviewImage(true);
    }
  };

  return (
    <div className={styles["choice-item"]}>
      {previewImage && (
        <div className={styles["preview-image"]}>
          <img
            src={backIcon}
            className={styles["back-detail"]}
            onClick={() => setPreviewImage(false)}
          />
          <div className={styles["pic-item"]}>
            <div
              className={styles["pic"]}
              style={{ backgroundImage: "url(" + thumb + ")" }}
            ></div>
          </div>
        </div>
      )}
      <div className={styles["info"]}>
        <span className={styles["tit"]}>
          {num}.{question.type_text}（{question.score}分）
        </span>
      </div>
      <div className={styles["question-content"]}>
        <div className={styles["content-render"]}>
          {question.content_transform.text}
        </div>
        {(question.content_transform.images.length > 0 ||
          question.content_transform.iframes.length > 0) && (
          <div className={styles["images-render"]}>
            {question.content_transform.images.length > 0 && (
              <>
                {question.content_transform.images.map(
                  (item: any, index: number) => (
                    <div
                      key={index + "thumb"}
                      className={styles["thumb-bar"]}
                      onClick={() => newPreviewImage(item)}
                    >
                      <ThumbBar
                        value={item}
                        width={200}
                        height={200}
                        border={8}
                      ></ThumbBar>
                    </div>
                  )
                )}
              </>
            )}
            {question.content_transform.iframes.length > 0 && (
              <>
                {question.content_transform.iframes.map(
                  (iframe: any, index: number) => (
                    <div
                      key={index + "iframe"}
                      className={styles["iframe-bar"]}
                      dangerouslySetInnerHTML={{ __html: iframe }}
                    ></div>
                  )
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className={styles["choice-box"]}>
        {getArr(10).map((item: any) => (
          <div key={item + "choice" + question.question_id}>
            {question["option" + item] && (
              <div
                className={
                  "option" + item === active
                    ? styles["choice-active-item"]
                    : styles["choice-tap-item"]
                }
                onClick={() => change(item)}
              >
                {isOver && (
                  <>
                    {question.answer === "option" + item && (
                      <div className={styles["answer-index"]}>
                        <img src={rightIcon} className={styles["icon"]} />
                      </div>
                    )}
                    {question.answer !== "option" + item &&
                      "option" + item === active && (
                        <div className={styles["answer-index"]}>
                          <img src={wrongIcon} className={styles["icon"]} />
                        </div>
                      )}
                    {"option" + item !== active &&
                      question.answer !== "option" + item && (
                        <div className={styles["index"]}>
                          {optionTypeTextMap["option" + item]}
                        </div>
                      )}
                    <div className={styles["content"]}>
                      <div
                        className={styles["content-render"]}
                        onClick={(event) => PreviewImage(event)}
                        dangerouslySetInnerHTML={{
                          __html: question["option" + item],
                        }}
                      ></div>
                    </div>
                  </>
                )}
                {!isOver && (
                  <>
                    <div className={styles["index"]}>
                      {optionTypeTextMap["option" + item]}
                    </div>
                    <div className={styles["content"]}>
                      <div
                        className={styles["content-render"]}
                        onClick={(event) => PreviewImage(event)}
                        dangerouslySetInnerHTML={{
                          __html: question["option" + item],
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {isOver && (
        <div className="analysis-box">
          <div className="answer-box">
            <div className="content">
              <div className="answer">
                <i></i>答案：{optionTypeTextMap[question.answer]}
              </div>
              {!wrongBook && isCorrect !== 1 && (
                <div className="my-answer">
                  <i></i>我的答案：{optionTypeTextMap[active] || "--"}
                </div>
              )}
              {!wrongBook && (
                <div className="score">
                  <i></i>得分：{score}
                </div>
              )}
            </div>
            {question.remark && question.remark !== "" && (
              <div
                className="button"
                onClick={() => setRemarkStatus(!remarkStatus)}
              >
                {remarkStatus && (
                  <>
                    <span>折叠解析</span>
                    <img src={foldIcon} className="icon" />
                  </>
                )}
                {!remarkStatus && (
                  <>
                    <span>展开解析</span>
                    <img src={unfoldIcon} className="icon" />
                  </>
                )}
              </div>
            )}
          </div>
          {remarkStatus && question.remark && question.remark !== "" && (
            <div className="remark-box">
              <div className="left-remark">
                <div className="tit">
                  <i></i>解析：
                </div>
              </div>
              <div className="remark">
                <div className="content-render">
                  {question.remark_transform.text}
                </div>
                {(question.remark_transform.images.length > 0 ||
                  question.remark_transform.iframes.length > 0) && (
                  <div className="images-render">
                    {question.remark_transform.images.length > 0 && (
                      <>
                        {question.remark_transform.images.map(
                          (item: any, index: number) => (
                            <div
                              key={index + "thumb"}
                              className="thumb-bar"
                              onClick={() => newPreviewImage(item)}
                            >
                              <ThumbBar
                                value={item}
                                width={200}
                                height={200}
                                border={8}
                              ></ThumbBar>
                            </div>
                          )
                        )}
                      </>
                    )}
                    {question.remark_transform.iframes.length > 0 && (
                      <>
                        {question.remark_transform.iframes.map(
                          (iframe: any, index: number) => (
                            <div
                              key={index + "iframe"}
                              className="iframe-bar"
                              dangerouslySetInnerHTML={{ __html: iframe }}
                            ></div>
                          )
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
