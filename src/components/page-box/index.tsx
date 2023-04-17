import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { saveUnread } from "../../store/user/loginUserSlice";
import { user as member } from "../../api/index";

interface PropInterface {
  page: number;
  over: boolean;
  currentChange: (page: number) => void;
}

export const PageBox: React.FC<PropInterface> = ({
  page,
  over,
  currentChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  useEffect(() => {
    currentChange(currentPage);
  }, [currentPage]);

  const prePage = () => {
    let current = currentPage;
    if (current > 1) {
      current--;
      setCurrentPage(current);
    }
  };

  const nextPage = () => {
    if (over) {
      // message.error("没有更多了");
    } else {
      let current = currentPage;
      current++;
      setCurrentPage(current);
    }
  };

  return (
    <div className="page-wrapper clearfix">
      <div className="page-tab fl clearfix">
        <span className="fl h50">第{currentPage}页</span>
        {currentPage !== 1 && (
          <button
            style={{ backgroundColor: "#ffffff" }}
            className="fl h50 cursor"
            onClick={() => prePage()}
          >
            <span>上一页</span>
          </button>
        )}
        <button
          style={{ backgroundColor: "#ffffff" }}
          className={over ? "fl h50 cursor canNot" : "fl h50 cursor"}
          onClick={() => nextPage()}
        >
          <span>下一页</span>
        </button>
      </div>
    </div>
  );
};
