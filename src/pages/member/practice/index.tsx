import React, { useState, useEffect } from "react";
import { Row, Col, Spin, Pagination, message } from "antd";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavMember, Empty, PageBox } from "../../../components";
import { user as member } from "../../../api/index";
import paperIcon from "../../../assets/img/member/practice.png";

export const MemberPracticePage = () => {
  document.title = "我的练习";
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [over, setOver] = useState(false);

  useEffect(() => {
    getList();
  }, [page, size, refresh]);

  const resetList = () => {
    setPage(1);
    setList([]);
    setRefresh(!refresh);
  };

  const getList = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    member
      .userPractice({
        page: page,
        size: size,
      })
      .then((res: any) => {
        if (res.data.data.length === 0) {
          let currentPage = page;
          if (currentPage > 1) {
            message.error("没有更多了");
            currentPage--;
            setPage(currentPage);
          }
          setOver(true);
        } else {
          setList(res.data.data);
          if (res.data.data.length < size) {
            setOver(true);
          } else {
            setOver(false);
          }
        }
        setLoading(false);
      });
  };

  const goDetail = (id: number) => {
    navigate("/exam/practice/detail?id=" + id);
  };

  return (
    <div className="container">
      <div className={styles["box"]}>
        <NavMember cid={10} refresh={true}></NavMember>
        <div className={styles["project-box"]}>
          <div className={styles["btn-title"]}>我的练习</div>
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
          {!loading && list.length > 0 && (
            <>
              {list.map((item: any, index: number) => (
                <div className={styles["paper-item"]} key={index}>
                  {item.practice && (
                    <div
                      className={styles["paper-item-comp"]}
                      onClick={() => goDetail(item.pid)}
                    >
                      <div className={styles["title"]}>
                        <img className={styles["icon"]} src={paperIcon} />
                        <div className={styles["name"]}>
                          {item.practice.name}
                        </div>
                      </div>
                      <div className={styles["info"]}>
                        <span style={{ color: "#F4A429" }}>
                          已练习 {item.submit_count}/
                          {item.practice_question_count}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
          {!loading && list.length > 0 && (
            <div id="page">
              <PageBox
                key={page}
                over={over}
                page={page}
                currentChange={(page: number) => {
                  setPage(page);
                  window.scrollTo(0, 0);
                }}
              ></PageBox>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
