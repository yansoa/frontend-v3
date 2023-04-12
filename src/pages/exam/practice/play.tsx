import React, { useState, useEffect } from "react";
import styles from "./play.module.scss";
import { Modal, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { practice } from "../../../api/index";
import backIcon from "../../../assets/img/commen/icon-back-h.png";
import collectIcon from "../../../assets/img/commen/icon-collect-h.png";
import noCollectIcon from "../../../assets/img/commen/icon-collect-n.png";
import {
  ChoiceComp,
  SelectComp,
  InputComp,
  JudgeComp,
  QaComp,
  CapComp,
} from "../../../components";

export const ExamPracticePlayPage = () => {
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>({});
  const [day, setDay] = useState(Number(result.get("day")) || 0);
  const [pid, setPid] = useState(Number(result.get("practiceId")) || 0);
  const [cid, setCid] = useState(Number(result.get("chapterId")) || 0);

  useEffect(() => {
    getData();
  }, [day, pid, cid]);

  const getData = () => {};

  const goBack = () => {
    navigate(-1);
  };
  const prevPage = () => {};

  const nextPage = () => {};

  return (
    <div className="full-container">
      <div className={styles["navheader"]}>
        <div className={styles["top"]}>
          <div className={styles["left-top"]} onClick={() => goBack()}>
            <img className={styles["icon-back"]} src={backIcon} />
            {list.name}
          </div>
          <div className={styles["right-top"]}>
            <div className={styles["prev-button"]} onClick={() => prevPage()}>
              上一题
            </div>
            <div className={styles["next-button"]} onClick={() => nextPage()}>
              下一题
            </div>
          </div>
        </div>
      </div>
      <div className={styles["project-box"]}>
        <div className={styles["left-box"]}>

        </div>
        <div className={styles["right-box"]}>
            
        </div>
      </div>
    </div>
  );
};
