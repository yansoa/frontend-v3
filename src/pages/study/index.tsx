import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Row, Col, Spin, Pagination, Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { user as member } from "../../api/index";
import { Empty, ThumbBar } from "../../components";
import { useSelector } from "react-redux";
import studyIcon from "../../assets/img/study/icon-mystudy.png";

export const StudyCenterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState("vod");
  const [tabs, setTabs] = useState<any>([]);
  const [currentStatus, setCurrentStatus] = useState<any>(1);
  const [list, setList] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const configFunc = useSelector(
    (state: any) => state.systemConfig.value.configFunc
  );

  useEffect(() => {
    let types = [
      {
        name: "录播课",
        value: "vod",
      },
    ];

    if (configFunc["live"]) {
      types.push({
        name: "直播课",
        value: "live",
      });
    }

    if (configFunc["book"]) {
      types.push({
        name: "电子书",
        value: "book",
      });
    }

    if (configFunc["topic"]) {
      types.push({
        name: "图文",
        value: "topic",
      });
    }
    setTabs(types);
  }, [configFunc]);

  const onChange = (e: RadioChangeEvent) => {
    setCurrentStatus(e.target.value);
  };

  return (
    <>
      <div className={styles["content"]}>
        <div className={styles["container"]}>
          <div className={styles["top-box"]}>
            <div className={styles["top-title"]}>
              <img className={styles["icon"]} src={studyIcon} />
              我的学习
            </div>
            <div className={styles["top-tabs"]}>
              {tabs.map((tab: any, index: number) => (
                <div
                  key={index}
                  className={
                    current === tab.value
                      ? styles["active-tab-item"]
                      : styles["tab-item"]
                  }
                  onClick={() => setCurrent(tab.value)}
                >
                  {tab.name}
                </div>
              ))}
            </div>
            <div className={styles["top-status"]}>
              <Radio.Group onChange={onChange} value={currentStatus}>
                <Radio value={1} style={{ marginRight: 40 }}>
                  在学
                </Radio>
                <Radio value={2} style={{ marginRight: 40 }}>
                  订阅
                </Radio>
                <Radio value={3}>收藏</Radio>
              </Radio.Group>
            </div>
          </div>
          <div className={styles["list-box"]}>
            {loading && (
              <Row>
                <div className="float-left d-j-flex mt-50">
                  <Spin size="large" />
                </div>
              </Row>
            )}
            {!loading && list.length === 0 && (
              <Col span={24}>
                <Empty></Empty>
              </Col>
            )}
            {!loading && list.length > 0 && <></>}
            {!loading && list.length > 0 && size < total && (
              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 50,
                }}
              >
                <Pagination
                  onChange={(currentPage) => {
                    setPage(currentPage);
                  }}
                  pageSize={size}
                  defaultCurrent={page}
                  total={total}
                />
              </Col>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
