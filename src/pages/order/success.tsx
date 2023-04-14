import React, { useState } from "react";
import styles from "./success.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import successIcon from "../../assets/img/commen/icon-adopt.png";

export const OrderSuccessPage = () => {
  document.title = "支付成功";
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [totalAmount, setTotalAmount] = useState(
    Number(result.get("total_amount")) || 0
  );

  return (
    <div className="contanier">
      <div className={styles["pay-success-box"]}>
        <div className={styles["success-info"]}>
          <img src={successIcon} />
          支付成功！
        </div>
        <div className={styles["price"]}>
          实付款：
          <span className={styles["value"]}>
            ￥<strong>{totalAmount}</strong>
          </span>
        </div>
        <div className={styles["btn-box"]}>
          <div className={styles["button"]} onClick={() => navigate("/")}>
            返回首页
          </div>
          <div
            className={styles["find-button"]}
            onClick={() => navigate("/member/orders")}
          >
            查看订单
          </div>
        </div>
      </div>
    </div>
  );
};
