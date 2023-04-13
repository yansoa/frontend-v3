import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { TencentFaceCheck } from "../../../../components";
import { user as member } from "../../../../api/index";
import { loginAction } from "../../../../store/user/loginUserSlice";
import faceSuccessIcon from "../../../../assets/img/commen/faceSuccess.png";
import noFacecheckIcon from "../../../../assets/img/commen/no-facecheck.png";

export const ProfileComp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [init, setInit] = useState<boolean>(false);
  const [faceCheckVisible, setFaceCheckVisible] = useState<boolean>(false);
  const user = useSelector((state: any) => state.loginUser.value.user);

  const getData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setInit(false);
    member.detail().then((res: any) => {
      let loginData = res.data;
      dispatch(loginAction(loginData));
      setLoading(false);
      setInit(true);
    });
  };

  const showFaceCheck = () => {
    setFaceCheckVisible(true);
  };

  const faceChecksuccess = () => {
    setFaceCheckVisible(false);
    getData();
  };

  return (
    <div className={styles["pro-box"]}>
      <TencentFaceCheck
        open={faceCheckVisible}
        active={true}
        onCancel={() => setFaceCheckVisible(false)}
        success={() => faceChecksuccess()}
      />
      <div className={styles["result"]}>
        {user.is_face_verify && (
          <img className={styles["thumb"]} src={faceSuccessIcon} />
        )}
        {!user.is_face_verify && (
          <img className={styles["thumb"]} src={noFacecheckIcon} />
        )}
      </div>
      {user.is_face_verify && (
        <div className={styles["profile"]}>
          <div className={styles["profile-item"]}>
            <span className={styles["label"]}>姓名</span>
            <span>{user.profile_real_name}</span>
          </div>
          <div className={styles["profile-item"]}>
            <span className={styles["label"]}>身份证号</span>
            <span>{user.profile_id_number}</span>
          </div>
        </div>
      )}
      {!user.is_face_verify && (
        <div className={styles["btn-box"]}>
          <div
            className={styles["button-submit"]}
            onClick={() => showFaceCheck()}
          >
            开始认证
          </div>
        </div>
      )}
    </div>
  );
};
