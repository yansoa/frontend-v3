import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";
import { random } from "../../utils/index";
import { snapshot } from "../../api/index";

interface PropInterface {
  id: number;
  resourceType: string;
  duration: number;
}

export const SnaoShotDialog: React.FC<PropInterface> = ({
  id,
  resourceType,
  duration,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return <>{open && <div className={styles["snapshot-box"]}></div>}</>;
};
