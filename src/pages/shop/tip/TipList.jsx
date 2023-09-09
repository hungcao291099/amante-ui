import {useCallback, useEffect, useState, useContext, useRef } from "react";
import "swiper/css";
import { getTipList } from "@apis/tipApi";
import { CdnContext } from "@contexts/cdnContext";
import CommuTab from '@components/CommuTab';

const TipList = () => {
  const { baseUrl } = useContext(CdnContext);
  const [getTip, setTipList] = useState({});

  const [rowCount, setRowCount] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
 
  useEffect(() => {
    const fetchData = async () => {
   
      const result = await getTipList(rowCount);
      
      setTipList(result.data);
      setRowCount(Number(result.data.pageCnt));
      
      setHasMore(result.data.tip_list.length > 0);
    };
    fetchData();
  }, [rowCount]);

  // Phuoc Loi
const lastRef = useCallback(
  (node) => {
    
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      
      if (entries[0].isIntersecting && hasMore) {
        setRowCount((prev) => prev + 6);
        
      }
    });
    if (node) observer.current.observe(node);
  },
  [hasMore]
);
// End
  return (
    <div>
      <CommuTab/>
      <div className="content hw_tip tip tip_lists_page">
      <div className="wrap">
        <div className="top_prd">
          <h3>구매가이드</h3>
        </div>
        <ul className="hw_list" id="tip_ul">
          {getTip.tip_list &&
            getTip.tip_list.map((item, idx) => (
              <li key={idx} ref={lastRef}>
                <a href={`/shop/tip/tip_view?event_seq=${item.event_seq} `}>
                  <picture>
                    <source
                      srcSet={`${baseUrl}/uploads/tip/${item.file_nm1}`}
                      media="(min-width:768px)"
                    />
                    <source
                      srcSet={`${baseUrl}/uploads/tip/${item.file_nm1}`}
                      media="(max-width:767px)"
                    />

                    <img
                      src={`${baseUrl}/uploads/tip/${item.file_nm1}`}
                      alt=""
                    />
                  </picture>
                </a>
                {/* <div className="txt_con">
                  <p className="tit">
                    <a href={`/shop/tip/tip_view?event_seq=${item.event_seq} `}>
                      {item.event_nm}
                    </a>
                  </p>
                  <p className="user_id"></p>
                  <div className="info">
                    <p className="ico_comment">{item.comm_cnt}</p>
                    <p className="ico_like">{item.like_cnt}</p>
                    <p className="ico_hit">{item.hit}</p>
                  </div>
                </div> */}
              </li>
            ))}
        </ul>
      </div>
    </div>
    </div>
    
  );
};

export default TipList;
