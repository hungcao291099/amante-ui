import { getRelationProductList, getView } from "@apis/community";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router";

import "swiper/css";
import CommuTab from "@components/CommuTab";
import { CdnContext } from "@contexts/cdnContext";

const SponsorshipView = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const event_seq = searchParams.get("event_seq") || null;
  const [getRelation, setRelationList] = useState();
  const [eventView, setEventView] = useState({});
  const { baseUrl } = useContext(CdnContext);

  useEffect(() => {
    const fetchData = async () => {
      setRelationList(await getRelationProductList(event_seq));
      setEventView(await getView(event_seq));
    };
    fetchData();
  }, []);

  return (
    <div>
      <CommuTab />

      <div className="content community sponsorship_view_page">
        <div className="inner">
          <div className="tit_con">
            <strong className="tit">{eventView.event_nm}</strong>
            <span className="date"></span>
          </div>
          <div className="con_wrap">
            <picture
              className="img"
              dangerouslySetInnerHTML={{ __html: eventView.content }}
            ></picture>
          </div>
          <div className="prd_list">
            <strong>협찬 상품</strong>
            <ul>
              {getRelation &&
                getRelation.map((item, idx) => (
                  <li key={item.product_cd} id={item.product_cd}>
                    <div className="box">
                                                <div className="img_area">
                                                    <div id="img_js_list_img" className="img js_list_img">
                                                        {item.product_main_list ? item.product_main_list.map((product_main, idx) => (
                                                            <a key={product_main.file_nm} data-val={item.group_cd} className="a_or_wish" data-group={item.group_yn}>
                                                                <picture>
                                                                    {/* <!--[if IE 9]><video style="display: none;"><![endif]--> */}
                                                                    {/* <!-- pc이미지 --> */}
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${product_main.file_nm}`} media="(min-width:768px)" />
                                                                    {/* <!-- mb이미지 --> */}
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${product_main.file_nm}`} media="(min-width:767px)" />
                                                                    {/* <!--[if IE 9]></video><![endif]--> */}
                                                                    {/* <!-- pc이미지 --> */}
                                                                    <img src={`${baseUrl}/uploads/product/285/${product_main.file_nm}`} />
                                                                </picture>
                                                            </a>
                                                        )) : (
                                                            <a key={item.product_cd} data-val={item.product_cd} className="a_or_wish" >
                                                                <picture>
                                                                    {/* <!--[if IE 9]><video style="display: none;"><![endif]--> */}
                                                                    {/* <!-- pc이미지 --> */}
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${product_main.file_nm}`} media="(min-width:768px)" />
                                                                    {/* <!-- mb이미지 --> */}
                                                                    <source srcSet={`${baseUrl}/uploads/product/285/${product_main.file_nm}`} media="(min-width:767px)" />
                                                                    {/* <!--[if IE 9]></video><![endif]--> */}
                                                                    {/* <!-- pc이미지 --> */}
                                                                    <img src={`${baseUrl}/uploads/product/285/${product_main.file_nm}`} />
                                                                </picture>
                                                            </a>
                                                        )}
                                                    </div>
                                                    <button type="button" className={`btn_wish ${item.wish_click_on ? item.wish_click_on : ""}  wish_${item.product_cd}`}>위시리스트 담기</button>
                                                </div>
                                                <a href={`/shop/product/product_view?product_cd=${item.product_cd}`} data-val={item.product_cd}>
                                                    <p className="tit" dangerouslySetInnerHTML={{ __html: item.product_nm }}></p>
                                                </a>
                                                <span className={`price ${item.product_state == "4" ? "sold_out" : ""}`}>
                                                    {item.supply_price != item.sale_price ? (
                                                        <>
                                                            <del>
                                                                {formatNumber(item.supply_price)}
                                                            </del>
                                                            <span className="ms-1">
                                                                {item.discount_gb !== "B" ?
                                                                    `${item.fee_rate}%`
                                                                    : `${Math.round(((item.supply_price - item.sale_price) / item.supply_price) * 100)}%`}
                                                            </span>
                                                            <ins>
                                                                {formatNumber(item.sale_price)}
                                                            </ins>
                                                        </>
                                                    ) : (
                                                        <ins>{formatNumber(item.sale_price)}</ins>
                                                    )}
                                                </span>
                                                {item.product_state == '4' && (
                                                    <picture>
                                                        <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(min-width:768px)" />
                                                        <source srcSet="/asset/images/shop/product/p_2106.jpg " media="(max-width:767px)" />
                                                        <img src="/asset/images/shop/product/p_2106.jpg " alt="재입고 알림신청" />
                                                    </picture>
                                                )}
                                                <p className="review">
                                                    {item.review_cnt > 0 ? (
                                                        <>{item.point}</>
                                                    ) : ""}
                                                    <span> 리뷰 {formatNumber(item.review_cnt)}</span>
                                                </p>
                                            </div>
                  </li>
                ))}
            </ul>
            <div className="btn_area">
              <button type="button" className="btn_txt">
                <span>목록보기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipView;
