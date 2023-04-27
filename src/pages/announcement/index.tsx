import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Row, Col, Spin, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { home } from "../../api/index";
import { changeTime } from "../../utils/index";

export const AnnouncementPage = () => {
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [notice, setNotice] = useState<any>({});
  const [list, setList] = useState<any>([]);
  const [id, setId] = useState(Number(result.get("id")));

  useEffect(() => {
    setId(Number(result.get("id")));
  }, [result.get("id")]);

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    getList();
  }, []);

  const getData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    home.announcementDetail(id).then((res: any) => {
      document.title = "公告：" + res.data.title;
      setNotice(res.data);
      setLoading(false);
    });
  };

  const getList = () => {
    if (loading2) {
      return;
    }
    setLoading2(true);
    home.announcementList().then((res: any) => {
      setList(res.data.data);
      setLoading2(false);
    });
  };

  const goDetail = (id: number) => {
    navigate("/announcement?id=" + id, { replace: true });
  };

  return (
    <div className={styles["content"]}>
      <div className={styles["contanier"]}>
        <div className={styles["announcement-box"]}>
          {loading && (
            <Row>
              <div className="float-left d-j-flex mt-50">
                <Spin size="large" />
              </div>
            </Row>
          )}
          {!loading && (
            <div className={styles["notice"]}>
              <div className={styles["title"]}>{notice.title}</div>
              <div className={styles["stat"]}>
                <span className={styles["div-times"]}>
                  {changeTime(notice.created_at)}
                </span>
                <span className={styles["div-times"]}>
                  {notice.view_times}次阅读
                </span>
              </div>
              <div className={styles["line"]}></div>
              <div
                className="u-content md-content"
                dangerouslySetInnerHTML={{ __html: notice.announcement }}
              ></div>
            </div>
          )}
        </div>
        <div className={styles["announcement-list"]}>
          <div className={styles["tit"]}>历史公告</div>
          {loading2 && (
            <Row>
              <div className="float-left d-j-flex mt-50">
                <Spin size="large" />
              </div>
            </Row>
          )}
          {!loading2 &&
            list.length > 0 &&
            list.map((item: any) => (
              <div
                key={item.id}
                className={
                  item.id === notice.id
                    ? styles["act-announcement-item"]
                    : styles["announcement-item"]
                }
                onClick={() => goDetail(item.id)}
              >
                <div className={styles["item-title"]}>{item.title}</div>
                <div className={styles["item-info"]}>
                  <div className={styles["item-time"]}>
                    {changeTime(item.created_at)}
                  </div>
                  <div className={styles["item-time"]}>
                    {item.view_times}次阅读
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
