import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { exam } from "../../../api/index";
import { useSelector } from "react-redux";

export const ExamPaperPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const isLogin = useSelector((state: any) => state.loginUser.value.isLogin);

  useEffect(() => {
    getList();
  }, []);

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
    exam.list().then((res: any) => {
      setList(res.data);
      setLoading(false);
    });
  };

  const goLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="bread-nav">
        <a
          onClick={() => {
            navigate("/");
          }}
        >
          考试练习
        </a>{" "}
        /<span>在线考试</span>
      </div>
    </div>
  );
};
