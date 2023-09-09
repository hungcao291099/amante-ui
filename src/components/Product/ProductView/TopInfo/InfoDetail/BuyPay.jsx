
const BuyPay = ({productView, productCheck}) => {
  
  return (
    <div className="buy_pay">
        <div className="restock_area mb_hidden">
          {productView.alram_list?.length > 0 && (
            <button className="btn_txt" onClick={() => commonUI.layer.open('.restock_layer', {bg: true, alert: true})}>
              <span>재입고알리미 신청</span>
            </button>
          )}
        </div>
            
        {/* NAVER checkout  */}
        <div id="NC_ID_1684570476536740" className="npay_storebtn_bx npay_type_A_2">
          <div id="NPAY_BUTTON_BOX_ID" className="npay_button_box ">
            <div className="npay_button">
              <div className="npay_text">
                <span className="npay_blind">
                  NAVER 네이버 ID로 간편구매 네이버페이
                </span>
              </div>{" "}
              <table className="npay_btn_list" cellSpacing={0} cellPadding={0}>
                <tbody>
                  <tr>
                    <td className="npay_btn_item" onClick={() => productCheck(productView.product_cd, 'NPAY')}>
                      <a
                        id="NPAY_BUY_LINK_IDNC_ID_1684570476536740"
                        href="#"
                        className="npay_btn_link npay_btn_pay btn_green"
                        style={{ boxSizing: "content-box" }}
                        title="새창"
                      >
                        <span className="npay_blind">네이버페이 구매하기</span>
                      </a>
                    </td>
                    <td className="npay_btn_item btn_width">
                      <a
                        id="NPAY_WISH_LINK_IDNC_ID_1684570476536740"
                        href="#"
                        className="npay_btn_link npay_btn_zzim "
                        style={{ boxSizing: "content-box" }}
                        title="새창"
                      >
                        <span className="npay_blind">찜하기</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="NPAY_EVENT_ID" className="npay_event">
              <a
                id="NPAY_PROMOTION_PREV_IDNC_ID_1684570476536740"
                href="#"
                className="npay_more npay_more_prev"
              >
                <span className="npay_blind">이전</span>
              </a>
              <p
                id="NPAY_PROMOTION_IDNC_ID_1684570476536740"
                className="npay_event_text"
              >
                <strong className="event_title">CU더블혜택</strong>
                <a
                  className="event_link"
                  href="https://m-campaign.naver.com/collect/v2/?code=2021120101_210201_008_inc_103101_20211201001_shopping_pay&target=https://m-campaign.naver.com/npay/cuplus_npay/"
                  target="_blank"
                  title="새창"
                >
                  최대 5%적립+최대5%할인
                </a>
              </p>
              <a
                id="NPAY_PROMOTION_NEXT_IDNC_ID_1684570476536740"
                href="#"
                className="npay_more npay_more_next"
              >
                <span className="npay_blind">다음</span>
              </a>
            </div>
          </div>
        </div>

        {/* KAKAO checkout */}
        <div className="kakao_type_A_2" onClick={() =>  productCheck(productView.product_cd, 'K')}>
          <picture style={{cursor: 'pointer'}}>
            <source srcSet="/asset/images/shop/product/kakao_m_C1.png" media="(min-width:768px)"/>
            <source srcSet="/asset/images/shop/product/kakao_m_C1.png" media="(max-width:767px)"/>
            <img src="/asset/images/shop/product/kakao_m_C1.png" alt=""/>
          </picture>
        </div>
      </div>
  )
}

export default BuyPay