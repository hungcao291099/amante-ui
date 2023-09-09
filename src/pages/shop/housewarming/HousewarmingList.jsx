import { useCallback, useEffect, useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import { CdnContext } from "@contexts/cdnContext";

import { getHousewarmingList } from "@apis/housewarming";
import CommuTab from "@components/CommuTab";


const HousewarmingList = () => {
  const { baseUrl } = useContext(CdnContext);
  const [houseWarmingList, setHouseWarmingList] = useState(undefined);
  const [totalCount, setTotal] = useState(undefined);
  const [orderBy, setOrderBy] = useState("A");

  const [rowCount, setRowCount] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  function OrderBy(seq) {
    setOrderBy(seq);
  }

  useEffect(() => {
    const fetchData = async () => {
      debugger
      const result = await getHousewarmingList(orderBy,rowCount);
      setHouseWarmingList(result.data);
      setTotal(result.total);
      setRowCount(Number(result.pageCnt));
      
      setHasMore(result.data.length > 0);
    };

    fetchData();
  }, [orderBy,rowCount]);

  
// Phuoc Loi
const lastRef = useCallback(
  (node) => {
    
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      
      if (entries[0].isIntersecting && hasMore) {
        setRowCount((prev) => prev + 10);
        debugger
      }
    });
    if (node) observer.current.observe(node);
  },
  [hasMore]
);
// End

  return (
    <div>
      <CommuTab />
      <div className="content hw_tip housewarming housewarming_lists_page">
        <div className="wrap">
          <div className="top_bn">
            <picture>
              <source
                srcSet="/asset/images/shop/housewarming/similar_thumb.png"
                media="(min-width:768px)"
              />
              <source
                srcSet="/asset/images/shop/housewarming/similar_thumb.png"
                media="(max-width:767px)"
              />
              <img
                src="/asset/images/shop/housewarming/similar_thumb.png"
                alt=""
              />
            </picture>
            <div className="tbl_box">
              <div className="tbl_cell">
                <p>참여만 하면 2,000원 할인 쿠폰 증정!</p>
                <p className="tit">아망떼 집들이 - 오늘의 사진</p>
                <a href="/shop/housewarming/housewarming_write">참여하기</a>
              </div>
            </div>
          </div>

          <div className="top_prd">
            <div className="box">
              총 <em>{totalCount ? formatNumber(totalCount) : 0}</em>개
            </div>
            <div className="box btn">
              <button
                type="button"
                onClick={() => OrderBy("A")}
                className={`btn_new ${orderBy == "A" ? "on" : ""}`}
                id="sort_a"
              >
                최신순
              </button>
              <button
                type="button"
                onClick={() => OrderBy("D")}
                className={`btn_popular ${orderBy == "D" ? "on" : ""}`}
                id="sort_d"
              >
                인기순
              </button>
            </div>
          </div>
          <ul className="hw_list" id="house_ul">
            {houseWarmingList &&
              houseWarmingList.map((item, idx) => (
                <li key={idx} ref={lastRef}>
                  <a
                    href={`/shop/housewarming/housewarming_view?event_seq=${item.event_seq} `}
                  >
                    <picture>
                      <source
                        srcSet={`${baseUrl}/uploads/housewarming/${item.file_nm1}`}
                        media="(min-width:768px)"
                      />
                      <img
                        src={`${baseUrl}/uploads/housewarming/${item.file_nm1}`}
                        alt=""
                      />
                    </picture>
                  </a>
                  <div className="txt_con">
                    <p className="tit">
                      <a
                        href={`/shop/housewarming/housewarming_view?event_seq=${item.event_seq} `} dangerouslySetInnerHTML={{ __html: item.event_nm }}
                      >
                        {/* {item.event_nm} */}
                      </a>
                    </p>
                    <p className="user_id">{item.user_id}</p>
                    <div className="info">
                      <p className="ico_comment">{item.comm_cnt}</p>
                      <p className="ico_like">{item.like_cnt}</p>
                      <p className="ico_hit">{item.hit}</p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HousewarmingList;
