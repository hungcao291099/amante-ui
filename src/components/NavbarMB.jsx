import parse from 'html-react-parser';
import React, { useContext } from 'react';

import { CdnContext } from '@contexts/cdnContext';
import { Link } from 'react-router-dom';

const NavbarMB = ({ data, state }) => {
  const { baseUrl } = useContext(CdnContext);
  const { categories } = data;
  const { setShowNav } = state;

  const hideNavbar = () => {
    setShowNav(false);
  };

  return (
    <section className="nav-container-mb">
      <div className="wrap">
        <div className="btn-close-nav">
          <img
            src="/images/concept-room/icon/mobile_menu_close.png"
            alt=""
            onClick={() => setShowNav(false)}
          />
        </div>

        <div className="nav-top">
          <Link onClick={hideNavbar} to={`/shop/main?v=1`}>
            <img src="/images/concept-room/icon/mb_logo.png" />
          </Link>

          <div className="download">
            <h5>앱 다운로드</h5>
            <button
              type="button"
              onClick={() =>
                (location.href =
                  'https://play.google.com/store/apps/details?id=com.makeshop.powerapp.pyungan&amp;hl=ko&amp;gl=US')
              }
              fdprocessedid="edj17d"
            >
              <img src="/images/concept-room/icon/android_icon.png" />
            </button>
            <button
              type="button"
              onClick={() =>
                (location.href =
                  'https://apps.apple.com/kr/app/%EC%95%84%EB%A7%9D%EB%96%BC-amante/id1234917909')
              }
              fdprocessedid="yrzkl"
            >
              <img src="/images/concept-room/icon/apple_icon.png" />
            </button>
          </div>
        </div>

        <div className="nav-top-1">
          <Link onClick={hideNavbar} to={`/shop/login/login`}>
            로그인
          </Link>
          <Link onClick={hideNavbar} to={`/shop/join/index`}>
            회원가입
          </Link>
        </div>
      </div>

      <ul className="nav-top-2">
        <li>
          <Link onClick={hideNavbar} to={`/shop/cart/cart_lists`}>
            <img src="/images/concept-room/icon/mm_icon_cart.png" alt="" />
            <span>장바구니</span>
          </Link>
        </li>
        <li>
          <Link onClick={hideNavbar} to={`/shop/mypage/order/order_lists`}>
            <img src="/images/concept-room/icon/mm_icon_deliver.png" alt="" />
            <span>주문/배송</span>
          </Link>
        </li>
        <li>
          <Link onClick={hideNavbar} to={`/shop/login/login`}>
            <img src="/images/concept-room/icon/mm_icon_user.png" alt="" />
            <span>마이페이지</span>
          </Link>
        </li>
        <li>
          <Link onClick={hideNavbar} to={`/shop/cs_index/cs_index`}>
            <img src="/images/concept-room/icon/mm_icon_cs.png" alt="" />
            <span>고객센터</span>
          </Link>
        </li>
      </ul>

      <ul className="nav-middle">
        <li>
          <Link onClick={hideNavbar} to={`/shop/sale/sale_product_lists`}>
            <div>
              <img src="/images/concept-room/icon/mb_ico_gnb_sale.png" alt="" />
              <span style={{ color: '#C8877A' }}>SALE</span>
            </div>{' '}
            <img className="arrow" src="/images/concept-room/icon/mb_ico_gnb_arrow.png" alt="" />
          </Link>
        </li>
        <li>
          <Link onClick={hideNavbar} to={`/shop/pet/pet_product_lists`}>
            <div className="pet">
              <img src="/images/concept-room/icon/mb_ico_gnb_pet.png" alt="" />
              <span>PET</span>
            </div>{' '}
            <img className="arrow" src="/images/concept-room/icon/mb_ico_gnb_arrow.png" alt="" />
          </Link>
        </li>
        <li>
          <Link onClick={hideNavbar} to={`/shop/shop/concept_room/concept_room_lists`}>
            <div>
              <img src="/images/concept-room/icon/mb_ico_gnb_concept.png" alt="" />
              <span>컨셉룸</span>
            </div>{' '}
            <img className="arrow" src="/images/concept-room/icon/mb_ico_gnb_arrow.png" alt="" />
          </Link>
        </li>
        <li>
          <Link onClick={hideNavbar} to={`/shop/product/product_lists?group_cd=1001`}>
            <div>
              <img src="/images/concept-room/icon/mb_ico_gnb_new.png" alt="" />
              <span>신상품</span>
            </div>{' '}
            <img className="arrow" src="/images/concept-room/icon/mb_ico_gnb_arrow.png" alt="" />
          </Link>
        </li>
        <li>
          <Link onClick={hideNavbar} to={`/shop/product/best_product_lists`}>
            <div>
              <img src="/images/concept-room/icon/mb_ico_gnb_best.png" alt="" />
              <span>베스트</span>
            </div>{' '}
            <img className="arrow" src="/images/concept-room/icon/mb_ico_gnb_arrow.png" alt="" />
          </Link>
        </li>
      </ul>

      <div className="nav-middle-1">
        <h4>카테고리</h4>
        <ul>
          {categories?.map((cate, index) => {
            const cateCd = Number(cate.category_cd);
            if (cateCd !== 150) {
              return (
                <li key={index}>
                  <Link
                    onClick={hideNavbar}
                    to={`/shop/product/product_lists?sh_category1_cd=${cate.category_cd}`}
                  >
                    <img src={`${baseUrl}/uploads/category/${cate.file_nm1}`} alt="" />
                    <span>
                      {cate.CAT_NAME?.includes('<') ? parse(cate.CAT_NAME) : cate.CAT_NAME}
                    </span>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>

      <ul className="nav-bottom">
        <li>
          <Link onClick={hideNavbar} to={`/shop/sale/sale_product_lists`}>
            <img src="/images/concept-room/icon/mb_ico_gnb_special.png" alt="" />
            <span>기획전</span>
          </Link>
        </li>
        <li>
          <Link onClick={hideNavbar} to={`/shop/review/review_lists`}>
            <img src="/images/concept-room/icon/mb_ico_gnb_community.png" alt="" />
            <span>커뮤니티</span>
          </Link>
        </li>
        <li>
          <Link onClick={hideNavbar} to={`/shop/mypage/push/push_lists`}>
            <img src="/images/concept-room/icon/ico_push.png" alt="" />
            <span>알림내역</span>
          </Link>
        </li>
        <li>
          <Link onClick={hideNavbar} to={`/shop/mypage/push/push_setting`}>
            <img src="/images/concept-room/icon/ico_setting.png" alt="" />
            <span>알림설정</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default NavbarMB;
