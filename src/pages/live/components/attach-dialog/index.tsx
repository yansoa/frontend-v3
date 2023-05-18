import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { Empty } from "../../../../components";
import { getToken } from "../../../../utils/index";
import { goMeedu } from "../../../../api/index";

interface PropInterface {
  cid: number;
  vid: number;
  status: number;
  onCancel: () => void;
}

export const AttachDialog: React.FC<PropInterface> = ({
  cid,
  vid,
  status,
  onCancel,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const config = useSelector((state: any) => state.systemConfig.value.config);

  useEffect(() => {
    getData();
  }, [cid]);

  const getData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    goMeedu
      .attachList(cid, vid, {
        page: 1,
        size: 100000,
      })
      .then((res: any) => {
        setList(res.data.data);
        setLoading(false);
      });
  };

  const download = (cid: number, vid: number, id: number) => {
    let url =
      config.url +
      `/addons/zhibo/api/v1/course/${cid}/video/${vid}/attach/${id}/download?token=` +
      getToken();
    window.open(url);
  };

  return (
    <div className={styles["live-attach-box"]}>
      {status !== 2 && (
        <div className={styles["reload"]}>
          <a onClick={() => onCancel()}>点击刷新课件列表</a>
        </div>
      )}
      {list.length === 0 && <Empty></Empty>}
      {list.length > 0 && (
        <div className={styles["list-box"]}>
          {list.map((item: any) => (
            <div key={item.id} className={styles["item-comp"]}>
              <div className={styles["title"]}>{item.name}</div>
              <div className={styles["link"]}>
                <a
                  onClick={() =>
                    download(item.course_id, item.video_id, item.id)
                  }
                >
                  下载
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
