import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { user as member } from "../../../../../api/index";
import { setNewAddress } from "../../../../../store/user/loginUserSlice";
import backIcon from "../../../../../assets/img/back@2x.png";

interface PropInterface {
  open: boolean;
  id: number;
  isV: number;
  onCancel: () => void;
}

export const GoodsDetailComp: React.FC<PropInterface> = ({
  open,
  id,
  isV,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [goods, setGoods] = useState<any>([]);
  const [address, setAddress] = useState<string>("");
  const [addressId, setAddressId] = useState(0);
  const addressForm = useSelector(
    (state: any) => state.loginUser.value.addressForm
  );

  useEffect(() => {
    if (open) {
      getDetail();
    }
  }, [open, id, isV]);

  const getDetail = () => {
    if (id === 0) {
      return;
    }
    member.creditMallDetail(id).then((res: any) => {
      setGoods(res.data.data);
      if (isV === 0) {
        getAddress();
      }
    });
  };

  const getAddress = () => {
    member.creditMallAddress().then((res: any) => {
      let address = res.data;
      if (
        addressForm &&
        addressForm.name &&
        addressForm.mobile &&
        addressForm.province &&
        addressForm.city &&
        addressForm.area &&
        addressForm.street
      ) {
        let value =
          addressForm.name +
          " " +
          addressForm.mobile +
          " " +
          addressForm.province +
          " " +
          addressForm.city +
          " " +
          addressForm.area +
          " " +
          addressForm.street;
        setAddress(value);
        setAddressId(0);
      } else if (
        address[0] &&
        address[0].name !== "" &&
        address[0].mobile !== "" &&
        address[0].province !== "" &&
        address[0].city !== "" &&
        address[0].area !== "" &&
        address[0].street != ""
      ) {
        let value =
          address[0].name +
          " " +
          address[0].mobile +
          " " +
          address[0].province +
          " " +
          address[0].city +
          " " +
          address[0].area +
          " " +
          address[0].street;
        setAddress(value);
        dispatch(setNewAddress(address[0]));
        setAddressId(address[0].id);
      } else {
        setAddressId(0);
        setAddress("请输入地址");
      }
    });
  };

  const exchange = () => {};
  const changeAddress = () => {};

  return (
    <>
      {open && (
        <div className={styles["goodsDetail-box"]}>
          <div className={styles["btn-title"]} onClick={() => onCancel()}>
            <img className={styles["back"]} src={backIcon} />
            <span>更多商品</span>
          </div>
          <div className={styles["body"]}>
            <div
              className={styles["goods-thumb"]}
              style={{ backgroundImage: "url(" + goods.thumb + ")" }}
            ></div>
            <div className={styles["right"]}>
              <div className={styles["goods-title"]}>{goods.title}</div>
              <div className={styles["goods-content"]}>
                <div className={styles["goods-value"]}>{goods.charge}积分</div>
                <div className={styles["goods-type"]}>
                  {isV === 0 && <span>商品类型:发实物</span>}
                  {isV === 1 && (
                    <>
                      {(goods.v_type === "vod" ||
                        goods.v_type === "live" ||
                        goods.v_type === "book") && (
                        <span>商品类型:换课程</span>
                      )}
                      {goods.v_type === "vip" && <span>商品类型:换会员</span>}
                    </>
                  )}
                </div>
              </div>
              <div className={styles["goods-info"]}>
                <div
                  className={styles["goods-button"]}
                  onClick={() => exchange()}
                >
                  立即兑换
                </div>
                {isV === 0 && (
                  <div className={styles["address-bar"]}>
                    <div className={styles["address-item"]}>
                      <div className={styles["address-name"]}>收货人信息</div>
                      <div
                        className={styles["address-button"]}
                        onClick={() => changeAddress()}
                      >
                        编辑地址
                      </div>
                    </div>
                    <div className={styles["address-value"]}>{address}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles["bottom"]}>
            <div className={styles["name"]}>
              <i></i>
              商品介绍
            </div>
            <div
              className={styles["desc"]}
              dangerouslySetInnerHTML={{ __html: goods.desc }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};
