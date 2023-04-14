import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { order } from "../../api/index";
import { Input } from "antd";
import { ThumbBar } from "../../components";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import defaultPaperIcon from "../../assets/img/commen/default-paper.png";
import defaultVipIcon from "../../assets/img/commen/default-vip.png";

export const OrderPage = () => {
  document.title = "收银台";
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState<boolean>(false);
  const [payment, setPayment] = useState<string>("");
  const [paymentScene, setPaymentScene] = useState<string>("pc");
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoCodeModel, setPromoCodeModel] = useState<any>(null);
  const [aliStatus, setAliStatus] = useState<boolean>(false);
  const [weStatus, setWeStatus] = useState<boolean>(false);
  const [handStatus, setHandStatus] = useState<boolean>(false);
  const [hasThumb, setHasThumb] = useState<boolean>(false);
  const [configTip, setConfigTip] = useState<number>(999);
  const [discount, setDiscount] = useState(0);
  const [goodsType, setGoodsType] = useState(result.get("goods_type"));
  const [goodsId, setGoodsId] = useState(Number(result.get("goods_id")));
  const [goodsThumb, setGoodsThumb] = useState<string>(
    String(result.get("goods_thumb"))
  );
  const [goodsName, setGoodsName] = useState(result.get("goods_name"));
  const [goodsLabel, setGoodsLabel] = useState(result.get("goods_label"));
  const [tgGid, setTgGid] = useState(Number(result.get("tg_gid")) || 0);
  const [courseId, setCourseId] = useState(Number(result.get("course_id")));
  const [goodsCharge, setGoodsCharge] = useState(
    Number(result.get("goods_charge"))
  );
  const [courseType, setCourseType] = useState(result.get("course_type"));
  const [total, setTotal] = useState(Number(result.get("goods_charge")));
  const configFunc = useSelector(
    (state: any) => state.systemConfig.value.configFunc
  );

  useEffect(() => {
    initData();
  }, [goodsType]);

  const initData = () => {
    if (goodsType === "role") {
      setHasThumb(true);
    } else if (goodsType === "vod") {
      setHasThumb(true);
    } else if (goodsType === "live") {
      setHasThumb(true);
    } else if (goodsType === "video") {
      setHasThumb(true);
    } else if (goodsType === "book") {
      setHasThumb(true);
    } else if (goodsType === "topic") {
      setHasThumb(true);
    } else if (goodsType === "path") {
      setHasThumb(true);
    } else if (goodsType === "tg") {
      setHasThumb(true);
    } else if (goodsType === "ms") {
      setHasThumb(true);
    } else if (goodsType === "k12") {
      setHasThumb(true);
    } else if (goodsType === "paper") {
      setHasThumb(true);
    } else if (goodsType === "mockpaper") {
      setHasThumb(true);
    } else if (goodsType === "practice") {
      setHasThumb(true);
    }
    params();
  };

  const params = () => {
    order
      .payments({
        scene: "pc",
      })
      .then((res: any) => {
        let payments = res.data;
        for (let i = 0; i < payments.length; i++) {
          setPayment(payments[0].sign);
          if (payments[i].sign === "alipay") {
            setAliStatus(true);
          } else if (payments[i].sign === "wechat") {
            setWeStatus(true);
          } else if (payments[i].sign === "handPay") {
            setHandStatus(true);
          }
        }
      });
  };

  const checkPromoCode = () => {
    if (loading) {
      return;
    }
    if (!promoCode) {
      return;
    }
    if (
      configFunc.share &&
      (promoCode.substr(0, 1) === "u" || promoCode.substr(0, 1) === "U")
    ) {
      setConfigTip(0);
      return;
    }
    setLoading(true);
    order
      .promoCodeCheck(promoCode)
      .then((res: any) => {
        if (res.data.can_use !== 1) {
          setConfigTip(0);
        } else {
          setConfigTip(1);
          setPromoCodeModel(res.data.promo_code);
          let value = parseInt(res.data.promo_code.invited_user_reward);
          setDiscount(value);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setConfigTip(999);
      });
  };

  return (
    <div className="container">
      <div className={styles["box"]}>
        <div className={styles["tit"]}>订阅信息</div>
        <div className={styles["goods-box"]}>
          {hasThumb && (
            <div className={styles["goods-thumb"]}>
              {goodsType === "book" ? (
                <ThumbBar
                  value={goodsThumb}
                  width={90}
                  height={120}
                  border={4}
                ></ThumbBar>
              ) : goodsType === "mockpaper" ||
                goodsType === "paper" ||
                goodsType === "practice" ? (
                <img
                  style={{ width: 160, height: 120, borderRadius: 4 }}
                  src={defaultPaperIcon}
                />
              ) : goodsType === "role" ? (
                <img
                  style={{ width: 160, height: 120, borderRadius: 4 }}
                  src={defaultVipIcon}
                />
              ) : (
                <ThumbBar
                  value={goodsThumb}
                  width={160}
                  height={120}
                  border={4}
                ></ThumbBar>
              )}
            </div>
          )}
          <div className={styles["goods-info"]}>
            <div className={styles["goods-name"]}>{goodsName}</div>
            <div className={styles["goods-label"]}>{goodsLabel}</div>
          </div>
          <div className={styles["goods-charge"]}>
            <span className={styles["small"]}>￥</span>
            {total}
          </div>
        </div>
        <div className={styles["tit"]}>优惠码</div>
        <div className={styles["promocode-box"]}>
          <Input
            className={styles["input"]}
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
            }}
          ></Input>
          <div
            className={styles["btn-confirm"]}
            onClick={() => checkPromoCode()}
          >
            验证
          </div>
          {configTip === 0 && (
            <div className={styles["tip"]}>此优惠码无效，请重新输入验证</div>
          )}
          {configTip === 1 && (
            <div className={styles["tip"]}>
              此优惠码有效，已减免{discount}元
            </div>
          )}
        </div>
        <div className={styles["tit"]}>支付方式</div>
      </div>
    </div>
  );
};
