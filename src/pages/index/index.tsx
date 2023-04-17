import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { sign, viewBlock, home } from "../../api/index";
import { SignComp } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { message, Row, Col, Spin, Carousel } from "antd";

const IndexPage = () => {
  document.title = "首页";
  const navigate = useNavigate();
  const [signStatus, setSignStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [blocksLoading, setBlocksLoading] = useState<boolean>(false);
  const [sliders, setSliders] = useState<any>([]);
  const [blocks, setBlocks] = useState<any>([]);
  const [notice, setNotice] = useState<any>({});

  useEffect(() => {
    getSignStatus();
    getSliders();
    getPageBlocks();
    getNotice();
  }, []);

  const getSignStatus = () => {
    sign.user().then((res: any) => {
      let is_submit = res.data.is_submit;
      if (is_submit === 0) {
        setSignStatus(true);
      } else {
        setSignStatus(false);
      }
    });
  };

  const getSliders = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    viewBlock.sliders({ platform: "PC" }).then((res: any) => {
      setSliders(res.data);
      setLoading(false);
    });
  };

  const getPageBlocks = () => {
    if (blocksLoading) {
      return;
    }
    setBlocksLoading(true);
    viewBlock
      .pageBlocks({
        platform: "pc",
        page_name: "pc-page-index",
      })
      .then((res: any) => {
        setBlocks(res.data);
        setBlocksLoading(false);
      });
  };

  const getNotice = () => {
    home.announcement().then((res: any) => {
      setNotice(res.data);
    });
  };

  const sliderClcik = (url: string) => {
    if (url.match("https:") || url.match("http:") || url.match("www")) {
      window.location.href = url;
    } else {
      navigate(url);
    }
  };

  const contentStyle: React.CSSProperties = {
    height: "400px",
    textAlign: "center",
    borderRadius: "16px 16px 0 0",
  };

  return (
    <div className="container" style={{ paddingTop: 30 }}>
      <SignComp
        open={signStatus}
        success={() => setSignStatus(false)}
      ></SignComp>
      {loading && (
        <Row>
          <div className="float-left d-j-flex mt-50">
            <Spin size="large" />
          </div>
        </Row>
      )}
      {!loading && sliders && sliders.length > 0 && (
        <Carousel autoplay>
          {sliders.map((item: any) => (
            <div key={item.sort} onClick={() => sliderClcik(item.url)}>
              <img src={item.thumb} style={contentStyle} />
            </div>
          ))}
        </Carousel>
      )}
      {!loading && notice && (
        <a
          onClick={() => navigate("/announcement?id=" + notice.id)}
          className={styles["announcement"]}
        >
          公告：{notice.title}
        </a>
      )}
    </div>
  );
};

export default IndexPage;
