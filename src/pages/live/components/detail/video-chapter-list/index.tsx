import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DurationText } from "../../../../../components";
import lockIcon from "../../../../../assets/img/commen/icon-lock.png";
import unLockIcon from "../../../../../assets/img/commen/icon-unlock.png";
import { dateFormat } from "../../../../../utils/index";

interface PropInterface {
  videos: any;
  course: any;
  chapters: any[];
  isBuy: boolean;
  switchVideo: (item: any) => void;
}

export const VideoChapterListComp: React.FC<PropInterface> = ({
  chapters,
  course,
  videos,
  isBuy,
  switchVideo,
}) => {
  return (
    <div>
      {chapters.map((chapter: any) => (
        <div key={chapter.id} className={styles["chapter-item"]}>
          <div className={styles["chapter-name"]}>{chapter.name}</div>
          <div className={styles["chapter-videos-box"]}>
            {videos[chapter.id] &&
              videos[chapter.id].length > 0 &&
              videos[chapter.id].map((item: any) => (
                <div
                  key={item.id}
                  className={styles["video-item"]}
                  onClick={() => switchVideo(item)}
                >
                  {isBuy && (
                    <img className={styles["play-icon"]} src={unLockIcon} />
                  )}
                  {!isBuy && (
                    <img className={styles["play-icon"]} src={lockIcon} />
                  )}
                  <div className={styles["video-title"]}>
                    <div className={styles["text"]}>{item.title}</div>
                  </div>
                  <div className={styles["video-info"]}>
                    {item.status === 0 && (
                      <span style={{ color: "#3ca7fa" }}>
                        {dateFormat(item.published_at)}
                      </span>
                    )}
                    {item.status === 1 && (
                      <span style={{ color: "#04c877" }}>直播中</span>
                    )}
                    {item.status === 2 && (
                      <>
                        <span>已结束 </span>
                        <DurationText seconds={item.duration} />
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      {videos[0] && videos[0].length > 0 && (
        <div className={styles["chapter-item"]}>
          <div className={styles["chapter-name"]}>无章节内容</div>
          <div className={styles["chapter-videos-box"]}>
            {videos[0].map((item: any) => (
              <div
                key={item.id}
                className={styles["video-item"]}
                onClick={() => switchVideo(item)}
              >
                {isBuy && (
                  <img className={styles["play-icon"]} src={unLockIcon} />
                )}
                {!isBuy && (
                  <img className={styles["play-icon"]} src={lockIcon} />
                )}
                <div className={styles["video-title"]}>
                  <div className={styles["text"]}>{item.title}</div>
                </div>
                <div className={styles["video-info"]}>
                  {item.status === 0 && (
                    <span style={{ color: "#3ca7fa" }}>
                      {dateFormat(item.published_at)}
                    </span>
                  )}
                  {item.status === 1 && (
                    <span style={{ color: "#04c877" }}>直播中</span>
                  )}
                  {item.status === 2 && (
                    <>
                      <span>已结束 </span>
                      <DurationText seconds={item.duration} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
