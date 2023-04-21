import { useState, useEffect } from "react";
import styles from "./read.module.scss";
import { Row, Col, Spin, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { book as bookApi } from "../../api/index";
import backIcon from "../../assets/img/commen/icon-back-h.png";

export const BookReadPage = () => {
  const navigate = useNavigate();
  const result = new URLSearchParams(useLocation().search);
  const [id, setId] = useState(Number(result.get("id")));
  const [book, setBook] = useState<any>({});
  const [list, setList] = useState<any>({});
  const [chapters, setChapters] = useState<any>([]);
  const [articles, setArticles] = useState<any>({});
  const [isBuy, setIsBuy] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [canSee, setCanSee] = useState<boolean>(false);
  const [indexText, setIndexText] = useState<string>("展开目录");
  const [indexStaus, setIndexStaus] = useState<boolean>(false);
  const [prevId, setPrevId] = useState<number>(0);
  const [nextId, setNextId] = useState<number>(0);
  const [comments, setComments] = useState<any>([]);
  const [commentUsers, setCommentUsers] = useState<any>({});
  const [commentLoading, setCommentLoading] = useState<boolean>(false);

  useEffect(() => {
    getData();
    getComments();
  }, [id]);

  const getData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    bookApi.articleRead(id).then((res: any) => {
      document.title = res.data.article.title;
      setBook(res.data.book);
      setList(res.data.article);
      let chaps = res.data.chapters;
      let arts = res.data.articles;
      if (chaps.length > 0 && arts[0] && arts[0].length > 0) {
        chaps.push({
          id: 0,
          name: "无章节内容",
          sort: 10000,
        });
      }
      setChapters(chaps);
      setArticles(arts);
      setIsBuy(res.data.can_see);
      setCanSee(res.data.can_see);
      let pid = parseInt(res.data.prev_id);
      setPrevId(pid);
      let nid = parseInt(res.data.next_id);
      setNextId(nid);
      setLoading(false);
    });
  };

  const getComments = () => {
    if (commentLoading) {
      return;
    }
    setCommentLoading(true);
    bookApi
      .comments(id, {
        page: 1,
        size: 10000,
      })
      .then((res: any) => {
        setComments(res.data.data.data);
        setCommentUsers(res.data.users);
        setCommentLoading(false);
      });
  };

  const resetComments = () => {
    setCommentLoading(false);
    setComments([]);
    setCommentUsers({});
  };

  const goDetail = () => {
    navigate("/book/detail?id=" + book.id + "&tab=3");
  };

  const showIndex = () => {
    if (!indexStaus) {
      setIndexText("收起目录");
    } else {
      setIndexText("展开目录");
    }
    setIndexStaus(!indexStaus);
  };

  const switchArticle = (articleId: number) => {
    if (articleId === id) {
      return;
    }
    if (prevId === 0) {
      message.error("没有上一节");
      return;
    }
    navigate("/book/read?id=" + articleId);
    setId(articleId);
    resetComments();
    getComments();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const switchArticle2 = (articleId: number) => {
    if (articleId === id) {
      return;
    }
    if (nextId === 0) {
      message.error("没有下一节");
      return;
    }
    navigate("/book/read?id=" + articleId);
    setId(articleId);
    resetComments();
    getComments();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const goRead = (item: any) => {
    if (item.id === list.id) {
      return;
    }
    navigate("/book/read?id=" + item.id);
    setId(item.id);
    resetComments();
    getComments();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const goRole = () => {
    navigate("/vip");
  };

  const buyBook = () => {
    navigate(
      "/order?goods_id=" +
        book.id +
        "&goods_type=book&goods_charge=" +
        book.charge +
        "&goods_label=电子书&goods_name=" +
        book.name +
        "&goods_thumb=" +
        book.thumb
    );
  };

  return (
    <>
      <div className={styles["content"]}>
        <div className={styles["navheader"]}>
          <div className={styles["top"]}>
            <div className={styles["top-left"]}>
              <img
                onClick={() => goDetail()}
                className={styles["icon-back"]}
                src={backIcon}
              />
              <span onClick={() => goDetail()}>{book.name}</span>
            </div>
            <div className={styles["top-right"]}>
              <div className={styles["button"]} onClick={() => showIndex()}>
                {indexText}
              </div>
              {prevId !== 0 && (
                <div
                  className={styles["button"]}
                  onClick={() => switchArticle(prevId)}
                >
                  上一节
                </div>
              )}
              {nextId !== 0 && (
                <div
                  className={styles["button"]}
                  onClick={() => switchArticle2(nextId)}
                >
                  下一节
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles["read-box"]}>
          {indexStaus && (
            <div className={styles["left-box"]}>
              <div className={styles["chapter-list-box"]}>
                {chapters.length > 0 &&
                  chapters.map((chapterItem: any) => (
                    <div className={styles["chapter"]} key={chapterItem.id}>
                      <div className={styles["title"]}>{chapterItem.name}</div>
                      {articles[chapterItem.id] &&
                        articles[chapterItem.id].length > 0 && (
                          <div className={styles["chapter-articles-box"]}>
                            {articles[chapterItem.id].map(
                              (articleItem: any) => (
                                <div
                                  key={articleItem.id}
                                  className={
                                    list.id === articleItem.id
                                      ? styles["act-article-item"]
                                      : styles["article-item"]
                                  }
                                  onClick={() => goRead(articleItem)}
                                >
                                  <div className={styles["video-title"]}>
                                    <div className={styles["text"]}>
                                      {articleItem.title}
                                    </div>
                                    {!isBuy &&
                                      book.charge > 0 &&
                                      articleItem.charge === 0 && (
                                        <div className={styles["free"]}>
                                          试读
                                        </div>
                                      )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  ))}
                {chapters.length === 0 &&
                  articles[0] &&
                  articles[0].length > 0 && (
                    <div className={styles["chapter"]}>
                      <div className={styles["chapter-articles-box"]}>
                        {articles[0].map((articleItem: any) => (
                          <div
                            key={articleItem.id}
                            className={
                              list.id === articleItem.id
                                ? styles["act-article-item"]
                                : styles["article-item"]
                            }
                            onClick={() => goRead(articleItem)}
                          >
                            <div className={styles["video-title"]}>
                              <div className={styles["text"]}>
                                {articleItem.title}
                              </div>
                              {!isBuy &&
                                book.charge > 0 &&
                                articleItem.charge === 0 && (
                                  <div className={styles["free"]}>试读</div>
                                )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
          <div className={styles["right-box"]}>
            {loading && (
              <Row>
                <div className="float-left d-j-flex mt-50">
                  <Spin size="large" />
                </div>
              </Row>
            )}
            {!loading && canSee && (
              <div className={styles["read"]}>
                <div className={styles["title"]}>{list.title}</div>
                <div className={styles["line"]}></div>
                <div
                  className="u-content md-content"
                  dangerouslySetInnerHTML={{ __html: list.render_content }}
                ></div>
              </div>
            )}
            {!loading && !canSee && isBuy === false && (
              <>
                <div className={styles["title"]}>{list.title}</div>
                {book.charge > 0 && (
                  <div
                    className={styles["buy-button"]}
                    onClick={() => buyBook()}
                  >
                    订阅电子书￥{book.charge}
                  </div>
                )}
                {book.charge > 0 && book.is_vip_free === 1 && (
                  <div
                    className={styles["buy-button"]}
                    onClick={() => goRole()}
                  >
                    会员免费看
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles["book-comments-box"]}> </div>
      </div>
    </>
  );
};
