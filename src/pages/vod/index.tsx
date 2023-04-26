import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Row, Col, Modal, Spin, Button, Pagination } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { course } from "../../api/index";
import {
  Empty,
  VodCourseItem,
  FilterScenes,
  FilterCategories,
} from "../../components";

const VodPage = () => {
  document.title = "录播课";
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(16);
  const [total, setTotal] = useState(0);
  const result = new URLSearchParams(useLocation().search);
  const [scene, setScene] = useState(result.get("scene") || "");
  const [cid, setCid] = useState(Number(result.get("cid")) || 0);
  const [child, setChild] = useState(Number(result.get("child")) || 0);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getList();
  }, [refresh, page, size]);

  const resetList = () => {
    setPage(1);
    setList([]);
    setRefresh(!refresh);
  };

  const scenes = [
    {
      id: "",
      name: "全部",
    },
    {
      id: "free",
      name: "免费",
    },
    {
      id: "sub",
      name: "热门",
    },
  ];

  const getCategories = () => {
    course.categories().then((res: any) => {
      setCategories(res.data);
    });
  };

  const getList = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    let category_id = 0;
    if (child === 0 || cid == 0) {
      category_id = cid;
    } else {
      category_id = child;
    }
    course
      .list({
        page: page,
        size: size,
        scene: scene,
        category_id: category_id,
      })
      .then((res: any) => {
        setList(res.data.data);
        setTotal(res.data.total);
        setLoading(false);
      });
  };
  return (
    <>
      <FilterCategories
        categories={categories}
        defaultKey={cid}
        defaultChild={child}
        onSelected={(id: number, child: number) => {
          setCid(id);
          setChild(child);
          if (id === 0) {
            navigate("/courses?scene=" + scene);
          } else {
            navigate(
              "/courses?cid=" + cid + "&child=" + child + "&scene=" + scene
            );
          }
          resetList();
        }}
      />
      <div className="container">
        <FilterScenes
          scenes={scenes}
          defaultKey={""}
          onSelected={(id: string) => {
            setScene(id);
            if (cid === 0) {
              navigate("/courses?scene=" + id);
            } else {
              navigate(
                "/courses?cid=" + cid + "&child=" + child + "&scene=" + id
              );
            }
            resetList();
          }}
        />
        {loading && (
          <Row style={{ width: 1200 }}>
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
          <div className={styles["list-box"]}>
            {list.map((item: any) => (
              <VodCourseItem
                key={item.id}
                cid={item.id}
                videosCount={item.videos_count}
                thumb={item.thumb}
                category={item.category}
                title={item.title}
                charge={item.charge}
                isFree={item.is_free}
                userCount={item.user_count}
              ></VodCourseItem>
            ))}
          </div>
        )}
        {!loading && list.length > 0 && size < total && (
          <Col
            span={24}
            style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
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
    </>
  );
};

export default VodPage;
