import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { message, Input, Row, Col, Spin, Skeleton, Pagination } from "antd";
import { search as searchApi } from "../../api/index";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Empty } from "../../components";

export const SearchPage = () => {
  document.title = "全站搜索";
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [type, setType] = useState(0);
  const [total, setTotal] = useState(0);
  const [keywords, setKeywords] = useState<string>(
    String(result.get("keywords"))
  );
  const [content, setContent] = useState<string>(
    String(result.get("keywords"))
  );
  const configFunc = useSelector(
    (state: any) => state.systemConfig.value.configFunc
  );

  useEffect(() => {
    getData();
  }, [page, size, refresh, keywords]);

  useEffect(() => {
    let box = [
      {
        key: 0,
        name: "全部",
      },
      {
        key: "vod",
        name: "录播课",
      },
      {
        key: "video",
        name: "录播视频",
      },
    ];
    if (configFunc["live"]) {
      box.push({
        key: "live",
        name: "直播课",
      });
    }
    if (configFunc["book"]) {
      box.push({
        key: "book",
        name: "电子书",
      });
    }
    if (configFunc["topic"]) {
      box.push({
        key: "topic",
        name: "图文",
      });
    }
    if (configFunc["paper"]) {
      box.push({
        key: "paper",
        name: "试卷",
      });
    }
    if (configFunc["mockPaper"]) {
      box.push({
        key: "mock_paper",
        name: "模拟试卷",
      });
    }
    if (configFunc["practice"]) {
      box.push({
        key: "practice",
        name: "练习",
      });
    }
    setTypes(box);
  }, [configFunc]);

  const resetData = () => {
    setPage(1);
    setList([]);
    setRefresh(!refresh);
  };

  const getData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    searchApi
      .list({
        page: page,
        size: size,
        type: type,
        keywords: keywords,
      })
      .then((res: any) => {
        setList(res.data.data);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const search = () => {
    if (!content) {
      message.error("请输入关键字后再搜索");
      return;
    }
    navigate(`/search?keywords=${content}`);
    setKeywords(content);
    setPage(1);
    setList([]);
  };

  const change = (val: string) => {
    if (val === "video") {
      return "录播视频";
    } else if (val === "vod") {
      return "录播课";
    } else if (val === "live") {
      return "直播课";
    } else if (val === "topic") {
      return "图文";
    } else if (val === "book") {
      return "电子书";
    } else if (val === "paper") {
      return "试卷";
    } else if (val === "mock_paper") {
      return "模拟试卷";
    } else if (val === "practice") {
      return "练习";
    } else {
      return "其它";
    }
  };

  const renderDom = (name: string) => {
    if (keywords.length && name.indexOf(keywords) > -1 && keywords !== name) {
      const temp = name.split(keywords);
      const dom = [];
      for (let i = 0; i < temp.length - 0.5; i += 0.5) {
        if (Math.floor(i) !== i) {
          dom.push(
            <span key={i} style={{ color: "#ff4d4f" }}>
              {keywords}
            </span>
          );
        } else if (temp[i].length) {
          dom.push(<span key={i}>{temp[i]}</span>);
        }
      }
      return dom;
    } else {
      return (
        <span style={{ color: keywords === name ? "#ff4d4f" : "#666666" }}>
          {name}
        </span>
      );
    }
  };

  const goDetail = (val: string, id: number) => {
    if (val === "video") {
      navigate("/courses/video?id=" + id);
    } else if (val === "vod") {
      navigate("/courses/detail?id=" + id);
    } else if (val === "live") {
      navigate("/live/detail?id=" + id);
    } else if (val === "topic") {
      navigate("/topic/detail?id=" + id);
    } else if (val === "book") {
      navigate("/book/detail?id=" + id);
    } else if (val === "paper") {
      navigate("/exam/papers/detail?id=" + id);
    } else if (val === "mock_paper") {
      navigate("/exam/mockpaper/detail?id=" + id);
    } else if (val === "practice") {
      navigate("/exam/practice/detail?id=" + id);
    } else {
      return;
    }
  };

  return (
    <div className="full-container">
      <div className={styles["top-content"]}>
        <div className={styles["input-box"]}>
          <Input
            className={styles["input"]}
            value={content}
            placeholder="请输入关键字"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            onPressEnter={() => search()}
          ></Input>
          <div className={styles["submit"]} onClick={() => search()}>
            搜索
          </div>
        </div>
        <div className={styles["type-box"]}>
          {types.map((item: any) => (
            <div
              key={item.key}
              className={
                type === item.key ? styles["activeitem"] : styles["item"]
              }
              onClick={() => {
                setType(item.key);
                resetData();
              }}
            >
              {item.name}
              {type === item.key && <div className={styles["actline"]}></div>}
            </div>
          ))}
        </div>
      </div>
      <div className={styles["contanier"]}>
        <div className={styles["search-box"]}>
          {loading && (
            <Row>
              <div className={styles["left-contanier"]}>
                <Skeleton.Button
                  active
                  style={{
                    width: 800,
                    height: 18,
                    marginTop: 50,
                  }}
                ></Skeleton.Button>
                <Skeleton.Button
                  active
                  style={{
                    width: 800,
                    height: 18,
                    marginTop: 60,
                  }}
                ></Skeleton.Button>
                <Skeleton.Button
                  active
                  style={{
                    width: 800,
                    height: 18,
                    marginTop: 60,
                  }}
                ></Skeleton.Button>
                <Skeleton.Button
                  active
                  style={{
                    width: 800,
                    height: 18,
                    marginTop: 60,
                  }}
                ></Skeleton.Button>
              </div>
            </Row>
          )}
          {!loading && list.length === 0 && (
            <Col span={24}>
              <Empty></Empty>
            </Col>
          )}
          {!loading && list.length > 0 && (
            <div className={styles["left-contanier"]}>
              {list.map((item: any) => (
                <ul
                  key={item.id}
                  className={styles["search-item"]}
                  style={{ padding: 0 }}
                  onClick={() => goDetail(item.resource_type, item.resource_id)}
                >
                  <li className={styles["item-top"]}>
                    {renderDom(
                      "【" + change(item.resource_type) + "】" + item.title
                    )}
                  </li>
                  {item.p && (
                    <li className={styles["item-content"]}>
                      {renderDom(item.p)}
                    </li>
                  )}
                </ul>
              ))}
            </div>
          )}
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
                  window.scrollTo(0, 0);
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
  );
};
