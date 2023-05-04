import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, message, Upload } from "antd";
import type { UploadProps } from "antd";
import styles from "./index.module.scss";
import { SnaoShotPreview } from "../snapshot-preview";
import { random, getToken } from "../../utils/index";
import { snapshot } from "../../api/index";
import tabIcon from "../../assets/img/commen/icon-camera.png";
const APP_URL = import.meta.env.VITE_APP_URL || "";

interface PropInterface {
  id: number;
  resourceType: string;
  duration: number;
}

var intervalId: any = null;
declare const window: any;
export const SnaoShotDialog: React.FC<PropInterface> = ({
  id,
  resourceType,
  duration,
}) => {
  const video_ref = useRef(null);
  const capture_video_ref = useRef(null);
  const canvasRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [changeBox, setChangeBox] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(false);
  const [previewStatus, setPreviewStatus] = useState<boolean>(false);
  const [previewThumb, setPreviewThumb] = useState<string>("");
  const [sel, setSel] = useState<number>(0);
  const [thumbId, setThumbId] = useState<number>(0);
  const [imagesList, setImagesList] = useState<any>([]);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [saveConfig, setSaveConfig] = useState<any>({});

  useEffect(() => {
    getCount();
    getConfig();
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  const getConfig = () => {
    snapshot.config().then((res: any) => {
      setSaveConfig(res.data);
      let status = res.data.status[resourceType] === 1;
      setOpen(status);
    });
  };

  const getCamera = () => {
    let video: any = video_ref.current;
    let captureVideo: any = capture_video_ref.current;
    if (
      window.navigator.mediaDevices &&
      window.navigator.mediaDevices.getUserMedia
    ) {
      window.navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
            width: 290,
            height: 164,
          },
        })
        .then((mediaStream: any) => {
          window.snapShortMediaStream = mediaStream;
          console.log(video)
          if (video) {
            video.srcObject = mediaStream;
            video.onloadedmetadata = () => {
              video.play();
            };
          }

          if (captureVideo) {
            captureVideo.srcObject = mediaStream;
            captureVideo.onloadedmetadata = () => {
              captureVideo.play();
            };
          }

          // 开启定时任务
          startTask();
        })
        .catch((err: any) => {
          console.log("err:" + err);
          setOpenCamera(false);
        });
    }
  };

  const closeMedia = () => {
    const video: any = video_ref.current;
    const stream = video.srcObject;
    if ("getTracks" in stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track: any) => {
        track.stop();
      });
    }
  };

  const startTask = () => {
    intervalId = setInterval(taskHandler, saveConfig.cycle_time * 1000);
  };

  const taskHandler = () => {
    console.info("开始拍照啦...");
    let randomInt = random(0, 100);
    if (randomInt <= saveConfig.rate && count < saveConfig.max_times) {
      uploadShotImage();
    }

    if (count >= saveConfig.max_times) {
      // 超过最大次数
      intervalId && clearInterval(intervalId);
    }
  };

  const delThumb = () => {
    if (thumbId === 0) {
      return;
    }
    snapshot.destroyImages(thumbId).then((res) => {
      message.success("删除成功");
      getList();
    });
  };

  const uploadShotImage = () => {
    let canvas: any = canvasRef.current;
    let captureVideo: any = capture_video_ref.current;
    if (canvas) {
      canvas.getContext("2d").drawImage(captureVideo, 0, 0, 1920, 1440);
      canvas.toBlob((blob: any) => {
        let formData = new FormData();
        formData.append("file", blob);
        formData.append("duration", String(duration));
        formData.append("resource_id", String(id));
        formData.append("resource_type", resourceType);
        snapshot
          .uploadImages(formData)
          .then(() => {
            let num = count;
            num++;
            setCount(num);
          })
          .catch((e) => {
            message.error(e.message || "上传错误");
          });
      });
    }
  };

  const getList = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setChangeBox(true);
    snapshot
      .imagesList({
        resource_id: id,
        resource_type: resourceType,
      })
      .then((res: any) => {
        setLoading(false);
        setImagesList(res.data.data);
      });
  };

  const showPreviewImage = (index: number, item: string, tid: number) => {
    setSel(index);
    setPreviewThumb(item);
    setThumbId(tid);
    setPreviewStatus(true);
  };

  const getCount = () => {
    snapshot
      .query({
        resource_type: resourceType,
        resource_id: id,
      })
      .then((res: any) => {
        setCount(res.data.count);
      });
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    method: "POST",
    action:
      APP_URL +
      "/addons/Snapshot/api/v1/upload/image?duration=" +
      duration +
      "&resource_id=" +
      id +
      "&resource_type=" +
      resourceType,
    headers: {
      Accept: "application/json",
      authorization: "Bearer " + getToken(),
    },
    beforeUpload: (file) => {
      const isPNG =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg";
      if (!isPNG) {
        message.error(`${file.name}不是图片文件`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange(info: any) {
      const { status, response } = info.file;
      if (status === "done") {
        if (response.code === 0) {
          message.success("上传成功");
          getList();
        } else {
          message.error(response.msg);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  return (
    <>
      {open && (
        <div className={styles["snapshot-box"]}>
          {previewStatus && (
            <SnaoShotPreview
              url={previewThumb}
              close={() => {
                setSel(0);
                setPreviewStatus(false);
              }}
              del={() => delThumb()}
            />
          )}
          {!showList && (
            <div
              className={styles["tabIcon"]}
              onClick={() => {
                setShowList(true);
                if (open) {
                  setOpenCamera(true);
                  getCamera();
                }
              }}
            >
              <img src={tabIcon} />
            </div>
          )}
          {showList && (
            <div className={styles["list-box"]}>
              <div className={styles["list-top"]}>
                {changeBox && (
                  <>
                    <div className={styles["left"]}>照片管理</div>
                    <div
                      className={styles["right"]}
                      onClick={() => {
                        setChangeBox(false);
                        setPreviewStatus(false);
                      }}
                    >
                      返回
                    </div>
                  </>
                )}
                {!changeBox && (
                  <>
                    <div className={styles["left"]}>学习拍照</div>
                    <div
                      className={styles["right"]}
                      onClick={() => {
                        setShowList(false);
                        setPreviewStatus(false);
                      }}
                    >
                      最小化窗口
                    </div>
                  </>
                )}
              </div>
              {changeBox && (
                <div className={styles["thumb-box"]}>
                  {imagesList.length > 0 &&
                    imagesList.map((item: any, index: number) => (
                      <div
                        key={index}
                        className={
                          sel === index
                            ? styles["thumb-active-item"]
                            : styles["thumb-item"]
                        }
                        onClick={() => {
                          showPreviewImage(index, item.thumb, item.id);
                        }}
                      >
                        {item.thumb && (
                          <div
                            className={styles["image-view"]}
                            style={{
                              backgroundImage: "url(" + item.thumb + ")",
                            }}
                          ></div>
                        )}
                      </div>
                    ))}
                </div>
              )}
              {!changeBox && (
                <div className={styles["camera-box"]}>
                  {openCamera && (
                    <>
                      <div className={styles["content"]} id="contentHolder">
                        {false && (
                          <>
                            <canvas
                              ref={canvasRef}
                              width="1920"
                              height="1440"
                              id="canvas"
                            ></canvas>
                            <video
                              width={1920}
                              height={1440}
                              autoPlay={true}
                              ref={capture_video_ref}
                            ></video>
                          </>
                        )}
                        <video
                          width={290}
                          height={164}
                          autoPlay={true}
                          ref={video_ref}
                        ></video>
                      </div>
                      {!openCamera && (
                        <span className={styles["tip"]}>
                          摄像头未捕捉到画面
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}
              {changeBox && (
                <Upload {...props}>
                  <div className={styles["upload-image-snapshot"]}>
                    手动上传学习照片
                  </div>
                </Upload>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
