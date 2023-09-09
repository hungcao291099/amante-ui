import { useCallback, useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import { CdnContext } from "@contexts/cdnContext";

import { getPromitionList, getBanner } from "@apis/promotion";

const PromotionList = () => {
  const { baseUrl } = useContext(CdnContext);
  const [promotionList1, setPromotionList] = useState(undefined);
  const [promotionBanner, setPromotionBanner] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPromitionList();
      setPromotionList(result.data);
      const banner = await getBanner();
      setPromotionBanner(banner.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="content event promotion_lists_page clear">
      {promotionBanner &&
            promotionBanner.map((item, idx) => (
                <div className="event_banner">
                  <picture>
                    <a
                      key={item.file_nm}
                      data-val={item.group_cd}
                      className="a_or_wish"
                      data-group={item.group_yn}
                    >
                      <source
                        srcSet={`${baseUrl}/uploads/event/${item.file_nm1}`}
                        media="(min-width:768px)"
                      />
                      <source
                        srcSet={`${baseUrl}/uploads/event/${item.file_nm1}`}
                        media="(max-width:767px)"
                      />
                      <img
                        src={`${baseUrl}/uploads/event/${item.file_nm1}`}
                      />
                    </a>
                  </picture>
                </div>
            ))}
       

        <ul className="promotion_lists clear">
          {promotionList1 &&
            promotionList1.map((item, idx) => (
              <li key={idx} class="promotion_list">
                <picture>
                  {(() => {
                    if (item.link_url) {
                      return (
                        <>
                          <a href={`${item.link_url}`}>
                            <source
                              srcSet={`${baseUrl}/uploads/event/${item.file_nm1}`}
                              media="(min-width:768px)"
                            />
                            <source
                              srcSet={`${baseUrl}/uploads/event/${item.file_nm1}`}
                              media="(max-width:767px)"
                            />
                            <img
                              src={`${baseUrl}/uploads/event/${item.file_nm1}`}
                              alt=""
                            />
                          </a>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <a
                            href={`/shop/event/promotion_view?no=${item.event_seq}`}
                          >
                            <source
                              srcSet={`${baseUrl}/uploads/event/${item.file_nm1}`}
                              media="(min-width:768px)"
                            />
                            <source
                              srcSet={`${baseUrl}/uploads/event/${item.file_nm1}`}
                              media="(max-width:767px)"
                            />
                            <img
                              src={`${baseUrl}/uploads/event/${item.file_nm1}`}
                              alt=""
                            />
                          </a>
                        </>
                      );
                    }
                  })()}
                  <div className="promotion_con">
                    <p className="tit">
                      {(() => {
                        if (item.link_url) {
                          return (
                            <>
                              <a href={`${item.link_url}`}>{item.event_nm}</a>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <a
                                href={`/shop/event/promotion_view?no=${item.event_seq}`}
                              >
                                {item.event_nm}
                              </a>
                            </>
                          );
                        }
                      })()}
                    </p>
                    <p className="txt">{item.event_con}</p>
                    <p className="date">{item.event_type}</p>
                    {(() => {
                      if (item.link_url !== "" && item.link_url !== null) {
                        return (
                          <>
                            <p className="date">{item.e_date}</p>
                            <a href={`${item.link_url}`} class="view_link">
                              더 보기
                            </a>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <p className="date">{item.s_date}</p>
                            <a
                              href={`/shop/event/promotion_view?no=${item.event_seq}`}
                              className="view_link">
                              더 보기
                            </a>
                          </>
                        );
                      }
                    })()}
                  </div>
                </picture>
              </li>
            ))}
        </ul>
        <div className="page_num">
          <div className="btn_area">
            <button type="button" className="btn_txt btn_arrow" id="more_btn">
              <span>더 보기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionList;
