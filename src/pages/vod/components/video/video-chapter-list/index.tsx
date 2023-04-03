import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import lockIcon from "../../../../../assets/img/commen/icon-lock.png";

interface PropInterface {
  videos: any;
  course: any;
  video: any;
  chapters: any[];
  isBuy: boolean;
  buyVideos: any[];
  switchVideo: (item: any) => void;
}

export const VideoChapterListComp: React.FC<PropInterface> = ({
  chapters,
  course,
  video,
  videos,
  isBuy,
  buyVideos,
  switchVideo,
}) => {
  return (
    <div>
      {chapters.map((chapter: any) => (
        <div key={chapter.id} className={styles["chapter-item"]}>
          <div className={styles["chapter-name"]}>{chapter.title}</div>
          <div className={styles["chapter-videos-box"]}>
            {videos[chapter.id] &&
              videos[chapter.id].length > 0 &&
              videos[chapter.id].map((item: any) => (
                <div
                  key={item.id}
                  className={styles["video-item"]}
                  onClick={() => {
                    if (video.id === item.id) {
                      return;
                    }
                    switchVideo(item);
                  }}
                >
                  {!isBuy && course.is_free !== 1 && (
                    <img className={styles["play-icon"]} src={lockIcon} />
                  )}
                  <div className={styles["video-title"]}>
                    <div
                      className={
                        item.id === video.id
                          ? styles["active-text"]
                          : styles["text"]
                      }
                    >
                      {item.title}
                    </div>
                    {isBuy === false &&
                      course.is_free !== 1 &&
                      item.free_seconds > 0 && (
                        <div className={styles["free"]}>试看</div>
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
                onClick={() => {
                  if (video.id === item.id) {
                    return;
                  }
                  switchVideo(item);
                }}
              >
                {!isBuy && course.is_free !== 1 && (
                  <img className={styles["play-icon"]} src={lockIcon} />
                )}
                <div className={styles["video-title"]}>
                  <div
                    className={
                      item.id === video.id
                        ? styles["active-text"]
                        : styles["text"]
                    }
                  >
                    {item.title}
                  </div>
                  {isBuy === false &&
                    course.is_free !== 1 &&
                    item.free_seconds > 0 && (
                      <div className={styles["free"]}>试看</div>
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
