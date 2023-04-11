import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";
import { ThumbBar } from "../thumb-bar";
import backIcon from "../../assets/img/icon-back-n.png";

interface PropInterface {
  question: any;
  reply: any;
  isCorrect: boolean;
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
  const optionTypeTextMap = {
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
    </div>
  );
};
