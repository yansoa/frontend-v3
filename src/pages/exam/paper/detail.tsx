import React, { useState, useEffect } from "react";
import styles from "./detail.module.scss";
import { Row, Col, Spin, Pagination } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { paper } from "../../../api/index";

export const ExamPaperDetailPage = () => {
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState<boolean>(false);
  const isLogin = useSelector((state: any) => state.loginUser.value.isLogin);

  return <>111</>;
};
