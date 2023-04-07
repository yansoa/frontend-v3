import React, { useState, useRef, useEffect } from "react";
import styles from "./video.module.scss";
import { Button, message, Input } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { SignDialog } from "./components/sign-dialog";
import { AttachDialog } from "./components/attach-dialog";
import { useSelector } from "react-redux";
import { live, goMeedu } from "../../api/index";
import backIcon from "../../assets/img/commen/icon-back-h.png";

declare const window: any;
var livePlayer: any = null;
var vodPlayer: any = null;
export const LiveVideoPage = () => {
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState(Number(result.get("id")));
  const [course, setCourse] = useState<any>({});
  const [video, setVideo] = useState<any>({});
  const [chat, setChat] = useState<any>({});
  const [curStartTime, setCurStartTime] = useState<string>("");
  const [playUrl, setPlayUrl] = useState<string>("");
  const [record_exists, setRecordExists] = useState<number>(0);
  const [record_duration, setRecordDuration] = useState<number>(0);
  const [webrtc_play_url, setWebrtcPlayUrl] = useState<string>("");
  const [roomDisabled, setRoomDisabled] = useState<boolean>(false);
  const [userDisabled, setUserDisabled] = useState<boolean>(false);
  const [messageDisabled, setMessageDisabled] = useState<boolean>(false);
  const [waitTeacher, setWaitTeacher] = useState<boolean>(false);
  const [noTeacher, setNoTeacher] = useState<boolean>(false);
  const [vodPlayerStatus, setVodPlayerStatus] = useState<boolean>(false);
  const [signStatus, setSignStatus] = useState<boolean>(false);
  const [signRecords, setSignRecords] = useState<any>(null);
  const [day, setDay] = useState<string | number>("0");
  const [hour, setHour] = useState<string | number>("00");
  const [min, setMin] = useState<string | number>("00");
  const [second, setSecond] = useState<string | number>("00");
  const [timeValue, setTimeValue] = useState(0);
  const [curDuration, setCurDuration] = useState(0);
  const [currentTab, setCurrentTab] = useState(1);
  const [content, setContent] = useState<string>("");
  const user = useSelector((state: any) => state.loginUser.value.user);
  const config = useSelector((state: any) => state.systemConfig.value.config);
  const isLogin = useSelector((state: any) => state.loginUser.value.isLogin);
  const myRef = useRef(0);
  const tabs = [
    {
      name: "聊天",
      id: 1,
    },
    {
      name: "课件",
      id: 2,
    },
  ];

  useEffect(() => {
    myRef.current = timeValue;
  }, [timeValue]);

  useEffect(() => {
    myRef.current = curDuration;
  }, [curDuration]);

  useEffect(() => {
    getData();
    return () => {
      livePlayer && livePlayer.destroy(true);
      vodPlayer && vodPlayer.destroy();
    };
  }, [id]);

  const getData = () => {
    live.play(id).then((res: any) => {
      let resData = res.data;
      document.title = resData.video.title;
      setCurStartTime(resData.video.published_at);
      setCourse(resData.course);
      setVideo(resData.video);
      setPlayUrl(resData.play_url);
      setRecordExists(resData.record_exists);
      setRecordDuration(resData.record_duration);
      setWebrtcPlayUrl(resData.web_rtc_play_url);
      if (resData.room_is_ban === 1) {
        setRoomDisabled(true);
      } else {
        setRoomDisabled(false);
      }
      if (resData.user_is_ban === 1) {
        setUserDisabled(true);
      } else {
        setUserDisabled(false);
      }
      if (resData.room_is_ban === 1 || resData.user_is_ban === 1) {
        setMessageDisabled(true);
      } else {
        setMessageDisabled(false);
      }
      // 倒计时
      if (resData.video.status === 0) {
        setWaitTeacher(false);
        countTime();
      }
      //签到相关
      let sign_in_record = resData.sign_in_record;
      if (sign_in_record && sign_in_record.length !== 0) {
        setSignStatus(true);
        setSignRecords(sign_in_record);
      } else {
        setSignStatus(false);
        setSignRecords(null);
      }
    });
  };

  const countTime = () => {
    let date = new Date();
    let now = date.getTime();
    let endDate = new Date(curStartTime);
    let end = endDate.getTime();
    let leftTime = end - now;
    if (leftTime >= 0) {
      // 天
      let day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      setDay(day);
      // 时
      let h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
      let hour = h < 10 ? "0" + h : h;
      setHour(hour);
      // 分
      let m = Math.floor((leftTime / 1000 / 60) % 60);
      let min = m < 10 ? "0" + m : m;
      setMin(min);
      // 秒
      let s = Math.floor((leftTime / 1000) % 60);
      let second = s < 10 ? "0" + s : s;
      setSecond(second);
    } else {
      setDay(0);
      setHour("00");
      setMin("00");
      setSecond("00");
    }
    if (
      Number(hour) === 0 &&
      Number(day) === 0 &&
      Number(min) === 0 &&
      Number(second) === 0
    ) {
      setWaitTeacher(true);
      return;
    } else {
      setTimeout(countTime, 1000);
    }
  };

  const goDetail = () => {
    navigate("/live/detail?id=" + course.id + "&tab=3");
  };

  const tabChange = (id: number) => {
    setCurrentTab(id);
  };

  const openSignDialog = (data: any) => {
    if (livePlayer) {
      exitFullscreen();
    }
    if (vodPlayer) {
      vodPlayer.pause();
      vodPlayer.fullScreen.cancel();
    }
    setSignRecords(data);
    setSignStatus(true);
  };

  const exitFullscreen = () => {
    let de: any;
    de = document;
    if (de.exitFullscreen) {
      de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
      de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
      de.webkitCancelFullScreen();
    }
  };

  const showVodPlayer = () => {
    if (record_exists === 1 && playUrl.length > 0) {
      setVodPlayerStatus(true);
      initVodPlayer(playUrl, course.poster);
    } else {
      setVodPlayerStatus(false);
      message.error("暂无回放");
    }
  };

  const reloadPlayer = () => {
    setCourse({});
    setVideo({});
    setPlayUrl("");
    setWebrtcPlayUrl("");
    getData();
  };

  const closeSignDialog = () => {
    setSignStatus(false);
    setSignRecords(null);
  };

  const initVodPlayer = (url: any, poster: string) => {
    let dplayerUrls: any = [];
    url.forEach((item: any) => {
      dplayerUrls.push({
        name: item.name,
        url: item.url,
      });
    });
    // 初始化播放器
    let bulletSecretFontSize = !config.player.bullet_secret.size
      ? 14
      : config.player.bullet_secret.size;
    vodPlayer = new window.DPlayer({
      container: document.getElementById("meedu-vod-player"),
      autoplay: false,
      video: {
        quality: dplayerUrls,
        defaultQuality: 0,
        pic: poster || config.player.cover,
      },
      bulletSecret: {
        enabled: parseInt(config.player.enabled_bullet_secret) === 1,
        text: config.player.bullet_secret.text
          .replace("${user.mobile}", user.mobile)
          .replace("${mobile}", user.mobile)
          .replace("${user.id}", user.id),
        size: bulletSecretFontSize + "px",
        color: !config.player.bullet_secret.color
          ? "red"
          : config.player.bullet_secret.color,
        opacity: config.player.bullet_secret.opacity,
      },
    });
    vodPlayer.on("timeupdate", () => {
      playRecord(parseInt(vodPlayer.video.currentTime), false);
    });
    vodPlayer.on("ended", () => {
      playRecord(parseInt(vodPlayer.video.currentTime), true);
    });
  };

  const playRecord = (duration: number, isEnd: boolean) => {
    if (duration - myRef.current >= 10 || isEnd === true) {
      setTimeValue(duration);
      goMeedu
        .vodWatchRecord(video.course_id, id, {
          duration: duration,
        })
        .then((res: any) => {});
    }
  };

  const submitMessage = () => {
    if (content === "") {
      return;
    }
    if (messageDisabled) {
      return;
    }
    saveChat(content);
  };

  const saveChat = (content: string) => {
    goMeedu
      .vodWatchRecord(video.course_id, id, {
        content: content,
        duration: curDuration,
      })
      .then((res: any) => {
        setContent("");
      });
  };

  const resetAttachDialog = () => {
    setCurrentTab(0);
    setTimeout(() => {
      setCurrentTab(2);
    }, 150);
  };

  return (
    <>
      <div className={styles["content"]}>
        <div className={styles["navheader"]}>
          <div className={styles["top"]}>
            <div className="d-flex">
              <img
                onClick={() => goDetail()}
                className={styles["icon-back"]}
                src={backIcon}
              />
              <span onClick={() => goDetail()}>{video.title}</span>
            </div>
          </div>
        </div>
        <div className={styles["live-banner"]}>
          {isLogin && video && (
            <div className={styles["live-box"]}>
              <div className={styles["live-item"]}>
                {video.status === 1 && signStatus && signRecords && (
                  <SignDialog
                    cid={course.id}
                    vid={id}
                    records={signRecords}
                    onCancel={() => closeSignDialog()}
                  />
                )}
                <div className={styles["live-item-title"]}>
                  <span className={styles["name"]}>{video.title}</span>
                  <span className={styles["time"]}>
                    {video.status === 0 && <>开播时间 {video.published_at}</>}
                    {video.status === 1 && <>直播中</>}
                    {video.status === 2 && <>已结束</>}
                  </span>
                </div>
                <div
                  className={styles["live-item-video"]}
                  style={{
                    backgroundImage: "url(" + course.poster + ")",
                    backgroundSize: "100% 100%",
                  }}
                >
                  {video.status === 1 && (
                    <>
                      {noTeacher && (
                        <>
                          <div className={styles["alert-message"]}>
                            <div className={styles["message"]}>
                              讲师暂时离开直播间，稍后请刷新！
                              <a onClick={() => reloadPlayer()}>点击刷新</a>
                            </div>
                          </div>
                          <div className={styles["play"]}>
                            <div
                              id="meedu-live-player"
                              style={{ width: "100%", height: "100%" }}
                            ></div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {video.status === 0 && (
                    <div className={styles["alert-message"]}>
                      {waitTeacher && (
                        <div className={styles["message"]}>
                          待讲师开播，
                          <a onClick={() => reloadPlayer()}>点击刷新</a>
                        </div>
                      )}
                      {!waitTeacher && (
                        <div className={styles["message"]}>
                          直播倒计时：{day}天{hour}小时{min}分{second}秒
                        </div>
                      )}
                    </div>
                  )}
                  {video.status === 2 && (
                    <>
                      <div className={styles["play"]}>
                        {record_exists === 1 && !vodPlayerStatus && (
                          <div className={styles["alert-message"]}>
                            <div className={styles["message"]}>
                              直播已结束，
                              <a onClick={() => showVodPlayer()}>点击回看</a>
                            </div>
                          </div>
                        )}
                        {record_exists === 1 && vodPlayerStatus && (
                          <div
                            id="meedu-vod-player"
                            style={{ width: "100%", height: "100%" }}
                          ></div>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div className={styles["replybox"]}>
                  {currentTab === 1 && video.status !== 2 && (
                    <>
                      <Input
                        className={styles["reply-content"]}
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value);
                        }}
                        disabled={messageDisabled}
                        placeholder={
                          messageDisabled
                            ? "禁言状态下无法发布消息"
                            : "按回车键可直接发送"
                        }
                        onPressEnter={() => submitMessage()}
                      ></Input>
                      <div
                        className={
                          messageDisabled
                            ? styles["submit-disabled"]
                            : styles["submit"]
                        }
                        onClick={() => submitMessage()}
                      >
                        发布
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className={styles["chat-item"]}>
                <div className={styles["tabs"]}>
                  {tabs.map((item: any) => (
                    <div
                      key={item.id}
                      className={
                        currentTab === item.id
                          ? styles["active-item-tab"]
                          : styles["item-tab"]
                      }
                      onClick={() => tabChange(item.id)}
                    >
                      {item.name}
                      {currentTab === item.id && (
                        <div className={styles["actline"]}></div>
                      )}
                    </div>
                  ))}
                </div>
                {/* {currentTab === 1&&(
                  <ChatBox chat={chat} enabledChat={enabledChat} />
                )} */}
                {currentTab === 2 && (
                  <AttachDialog
                    cid={course.id}
                    vid={id}
                    onCancel={() => resetAttachDialog()}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
