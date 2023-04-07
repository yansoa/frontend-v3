import React, { useState, useEffect } from "react";
import styles from "./video.module.scss";
import { Button, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { live } from "../../api/index";
export const LiveVideoPage = () => {
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState<boolean>(false);

  return <>直播间</>;
};
