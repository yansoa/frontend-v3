import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { system } from "../../api/index";

interface PropInterface {
  id: number;
  title: string;
  type: string;
}

export const HistoryRecord: React.FC<PropInterface> = ({ id, title, type }) => {
  const configFunc = useSelector(
    (state: any) => state.systemConfig.value.configFunc
  );
  useEffect(() => {
    divHistoryRecord();
  }, [id, title, type]);

  const divHistoryRecord = () => {
    if (type && configFunc.history) {
      system.historyRecord(type, id, title).then((res: any) => {});
    }
  };

  return <></>;
};
