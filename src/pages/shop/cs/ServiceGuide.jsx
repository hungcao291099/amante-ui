import { Helmet } from "react-helmet"

const ServiceGuide = () => {
  return (
    <>
      <Helmet>
        <title>아망떼 ㅣ이용안내</title>
      </Helmet>

      <div className="content cs service_guide_page">
        <div className="inner">
          <h2 className="tit">이용안내</h2>
          <div className="service_con">
            <strong className="sub_tit">관련문의</strong>
            <ul className="service_info">
              <li>
                <p>본사</p>
                <span>대구광역시 달서구 성서로71</span>
              </li>
              <li>
                <p>서울사업소</p>
                <span>서울시 강서구 마곡동로 31</span>
              </li>
              <li>
                <p>전화</p>
                <span>1588-2933</span>
              </li>
              <li>
                <p>메일</p>
                <span>webmaster@ono.co.kr</span>
              </li>
            </ul>
          </div>
          <div className="service_con">
            <strong className="sub_tit">배송안내</strong>
            <ul>
              <li>
                <p>배송 방법은 택배 입니다.</p>
              </li>
              <li>
                <p>주문하신 날로부터 1~4일 안에 받을 수 있습니다.</p>
              </li>
              <li>
                <i>
                  - 온라인 입금 시 입금 확인 후 1 ~ 4일
                  <br />- 신용카드 결제 시 주문 후 1 ~ 4일
                </i>
              </li>
            </ul>
          </div>
          <div className="service_con">
            <strong className="sub_tit">반품안내</strong>
            <ul>
              <li>
                <p>고객 변심에 의한 교환 및 반품 배송비는 소비자 부담입니다.</p>
              </li>
              <li>
                <p>상품 이상에 의한 교환 및 반품 배송비는 판매자 부담입니다.</p>
              </li>
              <li>
                <i>*자세한 내용은 PC사이트의 이용안내를 참고하세요.</i>
              </li>
            </ul>
          </div>
          <div className="service_con">
            <strong className="sub_tit">개인정보처리방침</strong>
            <a href="" className="law">
              약관보기
            </a>
            <ul className="law_info">
              <li>
                <p>담당</p>
                <span>정주환</span>
              </li>
              <li>
                <p>전화</p>
                <span>1588 - 2933</span>
              </li>
              <li>
                <p>메일</p>
                <span>jjh@ono.co.kr</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceGuide