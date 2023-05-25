import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

interface PropInterface {
  categories: any[];
  defaultKey: number;
  defaultChild: number;
  scenes: any[];
  scene: string;
  onSelected: (cid: number, child: number, sceneId: string) => void;
}

export const FilterExamCategories: React.FC<PropInterface> = ({
  categories,
  defaultKey,
  defaultChild,
  scenes,
  scene,
  onSelected,
}) => {
  const [cid, setCid] = useState(defaultKey);
  const [child, setChild] = useState(defaultChild);
  const [sceneId, setSceneId] = useState(scene);
  const [cateIndex, setCateIndex] = useState(0);

  useEffect(() => {
    let index = 0;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === cid) {
        index = i;
      }
    }
    setCateIndex(index);
  }, [cid]);
  return (
    <div className={styles["meedu-filter-box"]}>
      <div className={styles["category2-box"]}>
        <div className={styles["category2"]}>
          <div className={styles["box"]}>
            <div className={styles["label"]}>分类：</div>
            <div className={styles["item-box"]}>
              {categories.map((item: any) => (
                <div
                  key={item.id}
                  className={
                    item.name.indexOf("(0)") !== -1
                      ? styles["disabled-item"]
                      : cid === item.id
                      ? styles["active-item"]
                      : styles["item"]
                  }
                  onClick={() => {
                    if (item.name.indexOf("(0)") !== -1) {
                      return;
                    }
                    setCid(item.id);
                    setChild(0);
                    onSelected(item.id, 0, sceneId);
                  }}
                >
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          {categories[cateIndex] &&
            categories[cateIndex].children &&
            categories[cateIndex].children.length > 0 && (
              <div className={styles["box2"]}>
                <div className={styles["label"]}>标签：</div>
                <div className={styles["item-box"]}>
                  {categories[cateIndex].children.map((item: any) => (
                    <div
                      key={item.id}
                      className={
                        item.name.indexOf("(0)") !== -1
                          ? styles["disabled-item"]
                          : child === item.id
                          ? styles["active-item"]
                          : styles["item"]
                      }
                      onClick={() => {
                        if (item.name.indexOf("(0)") !== -1) {
                          return;
                        }
                        setChild(item.id);
                        onSelected(cid, item.id, sceneId);
                      }}
                    >
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
      {scenes.length > 0 && (
        <div className={styles["category1-box"]}>
          <div className={styles["box"]}>
            <div className={styles["item"]}>
              {scenes.map((item: any, index: number) => (
                <div
                  key={index}
                  className={
                    sceneId === item.id ? styles["active-item"] : styles["item"]
                  }
                  onClick={() => {
                    setSceneId(item.id);
                    onSelected(cid, child, item.id);
                  }}
                >
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
