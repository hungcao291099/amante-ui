import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useLocation } from "react-router-dom";
import { checkDevice } from "@utils/functions";

function Footer({ dark }) {
  const pathName = useLocation().pathname;
  const noNavMB = ["/shop/product/product_view", "/shop/new_home"];

  const shareHandler = () => {
    var shareTitle = "공유하기 기능 테스트";
    var shareText = "공유하기 기능 입니다.";
    var contentURL = "/share/shareUrl";
    var URLPreFix = "";
    URLPreFix = URLPreFix + "//" + location.host;
    var shareURL = URLPreFix + contentURL;
    alert("공유하기");

    var shareTitle = document.title;
    var shareText = document.title;
    var shareURL = location.href;

    if (navigator.share) {
      navigator
        .share({
          title: shareTitle,
          text: shareText,
          url: shareURL,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  return (
    <>
      <div
        style={{
          display: dark || pathName.startsWith("/shop/concept_room/concept_room_view") ? "none" : "block",
        }}
        className={noNavMB.includes(pathName) ? "quick prd_view" : "quick"}
      >
        <>
          <button
            type="button"
            className="quick_btn refresh_btn"
            onClick={() => window.location.reload()}
          >
            새로고침
          </button>
          <a href="https://pf.kakao.com/_mEdPxd/chat" target="_blank" className="quick_btn kakao">
            카카오톡문의
          </a>
          <button
            type="button"
            className="quick_btn naver"
            onClick={() => (window.location.href = "https://talk.naver.com/WC376H")}
          >
            네이버톡톡문의
          </button>
          <button
            type="button"
            className="js_top_btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            위로 가기
          </button>
        </>
      </div>

      <footer>
        <div className="footer-top">
          <Container>
            <Row>
              <Col>
                <ul>
                  <li>
                    <Link to={`/shop/company/company`}>회사소개</Link>
                  </li>
                  <li>
                    <Link to={`/shop/cs/service_guide`}>이용안내</Link>
                  </li>
                  <li>
                    <Link to={`/shop/join/law_con`}>이용약관</Link>
                  </li>
                  <li>
                    <Link to={`/shop/join/privacy_con`}>개인정보처리방침</Link>
                  </li>
                  <li>
                    <Link to={`/shop/cs_index/cs_index`}>고객센터</Link>
                  </li>
                  <li>
                    <Link to={`/shop/community/inquiry/inquiry`}>대량구매/제휴/입점문의</Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="footer-bottom">
          <div className="wrap">
            <div className="company-info-area" lg={4}>
              <p>(주)평안 &nbsp;&nbsp;&nbsp;대표: 오희택</p>
              <br />
              <p>
                본사: 대구광역시 달서구 성서로71<span>&nbsp;/ </span>
              </p>
              <p>서울사업소: 서울시 강서구 마곡동로31</p>
              <br />
              <p>
                사업자등록번호: 514-81-16510<span>&nbsp;/ </span>
              </p>
              <p>통신판매업신고번호: 대구시42호</p>
              <br />
              <p>개인정보보호책임자: 정주환(webmaster@ono.co.kr)</p>
              <br />
              <p>Copyright © 아망떼 All Rights Reserved.</p>
            </div>

            <div className="center-info-area" lg={8}>
              <div className="customer-center">
                <p className="tit">CUSTOMER CENTER</p>
                <p className="info">
                  <strong>1588-2933</strong>
                  평일 10시~17시
                  <br />
                  점심시간 12시~13시
                  <br />
                  주말 및 공휴일은 휴무입니다.
                </p>
              </div>

              <div className="bank-info">
                <p className="tit">BANK INFO</p>
                <p className="info">
                  농협 245-01-001182
                  <br />
                  예금주 (주)평안
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer
        className="footer-mb"
        style={{
          marginBottom: dark ? '20px' : 0,
          display:  checkDevice() !== "desktop" && "block",
        }}
      >
        <div className="center-info-area">
          <div className="customer-center">
            <p className="tit">CUSTOMER CENTER</p>
            <p className="info">
              <strong>1588-2933</strong>
              평일 10시~17시
              <br />
              점심시간 12시~13시
              <br />
              주말 및 공휴일은 휴무입니다.
            </p>
          </div>
          <div className="bank-info">
            <p className="tit">BANK INFO</p>
            <p className="info">
              농협 245-01-001182
              <br />
              예금주 (주)평안
            </p>
            <Link to={`/shop/cs_index/cs_index`}>고객센터</Link>
          </div>
        </div>

        <ul className="footer-link">
          <li>
            <Link to={`/shop/company/company`}>회사소개</Link>
          </li>
          <li>
            <Link to={`/shop/service/service_guide`}>이용안내</Link>
          </li>
          <li>
            <Link to={`/shop/join/law_con`}>이용약관</Link>
          </li>
          <li>
            <Link to={`/shop/join/privacy_con`}>개인정보처리방침</Link>
          </li>
        </ul>

        <div className="company-info-area">
          <p>(주)평안 &nbsp;&nbsp;&nbsp;대표: 오희택</p>
          <p>
            본사: 대구광역시 달서구 성서로71<span className="mb_hidden">&nbsp;/ </span>
          </p>
          <p>서울사업소: 서울시 강서구 마곡동로31</p>
          <p>
            사업자등록번호: 514-81-16510<span className="mb_hidden">&nbsp;/</span>
          </p>
          <p>통신판매업신고번호: 대구시42호</p>
          <p>개인정보보호책임자: 정주환(webmaster@ono.co.kr)</p>
          <p>Copyright © 아망떼 All Rights Reserved.</p>
        </div>

        {noNavMB.includes(pathName) ? null : (
          <nav className="nav-mb">
            <ul>
              <li className="ico_home">
                <Link to={`/shop/main?v=1`}>
                  <img src="/images/concept-room/icon/ico_home.png" alt="" />
                  <span>홈</span>
                </Link>
              </li>
              <li className="ico_mypage">
                <Link to={`/shop/mypage/account/mypage_index`}>
                  <img src="/images/concept-room/icon/ico_mypage.png" alt="" />
                  <span>마이페이지</span>
                </Link>
              </li>
              <li className="ico_share">
                <Link to="#none" className="open" id="ico_share_btn" onClick={shareHandler}>
                  <img src="/images/concept-room/icon/ico_share.png" alt="" />
                  <span>공유하기</span>
                </Link>
                {/* <div className="share_area">
                                <div className="share_layer">
                                    <button type="button" className="facebook" onclick="share_sns_h('F');">페이스북으로 공유하기</button>
                                    <button type="button" className="kakao" onclick="share_sns_h('K');">카카오톡으로 공유하기</button>
                                    <button type="button" className="story" onclick="share_sns_h('S');">카카오스토리로 공유하기</button>
                                    <button type="button" className="line" onclick="share_sns_h('L');">라인으로 공유하기</button>
                                    <button type="button" className="band" onclick="share_sns_h('B');">밴드로 공유하기</button>
                                    <button type="button" className="url" onclick="share_sns_h('U');">URL로 공유하기</button>
                                    <button type="button" className="close">공유하기 레이어 닫기</button>
                                </div>
                            </div> */}
              </li>
              <li className="ico_wish">
                <Link to={`/shop/mypage/wish/wish_lists`}>
                  <img src="/images/concept-room/icon/ico_wish.png" alt="" />
                  <span>찜한상품</span>
                </Link>
              </li>
              {/* <li className="ico_push"><Link to="/shop/mypage/push/push_lists">알림내역<em></em></Link></li> */}
              <li className="ico_logo">
                <Link to="https://apps.apple.com/kr/app/%EC%95%84%EB%A7%9D%EB%96%BC-amante/id1234917909">
                  <span>logo</span>
                  <span>앱설치</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </footer>
    </>
  );
}

export default Footer;
