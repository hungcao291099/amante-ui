import { cartNum } from '@apis/cart';
import api from '@utils/api/api';
import parse from 'html-react-parser';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { checkDevice, getCookie } from '@utils/functions';
import Cookies from 'universal-cookie';
import useScrollDirection from '../hooks/useScrollDirection';
import NavbarMB from './NavbarMB';
import SearchMB from './SearchMB';

function Header() {
  const [showNav, setShowNav] = useState(false);
  const [showSearchMB, setShowSearchMB] = useState(false);
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('member_access_token');
  const [cartCount, setCartCount] = useState(0);
  const [keywords, setKeywords] = useState([]);
  const [refreshKeyword, setRefreshKeyword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useLocation();

  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const fetchData = async () => {
      const result = await cartNum(getCookie('session_id'));
      setCartCount(result.cartCount);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api({
          url: '/shop/product/keyword_list',
          method: 'GET',
          params: { session_id: getCookie('session_id') },
        });
        setKeywords(data.keyword);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refreshKeyword]);

  $(document).ready(function () {
    $('.sub-menu li').hover(
      function () {
        $(this).find('.cate-depth-1').addClass('active');
      },
      function () {
        $(this).find('.cate-depth-1').removeClass('active');
      }
    );

    $('.cate-depth-1 li').hover(
      function () {
        $(this).find('.cate-depth-2').addClass('active');
      },
      function () {
        $(this).find('.cate-depth-2').removeClass('active');
      }
    );

    $('.search_lists_wrap').hide();
    $('.search_lists_wrap.mb').show();

    $('html').click(function (e) {
      if ($(e.target).hasClass('srch_close_event')) {
        $('.search_lists_wrap').show();
      } else {
        $('.search_lists_wrap').hide();
      }
    });
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api({
          url: `/shop/product/category/list`,
          method: 'GET',
        });
        setCategories(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const searchProductHandler = () => {
    const searchText = $('.search-text').val();
    keywordProc(null, 'ADD', searchText);
    navigate(`/shop/search_product/search_product_lists?keyword=${searchText}`);
    $('.search-text').val('');
    $('.search_lists_wrap').hide();
  };

  const enterSearchHandler = (e) => {
    if (e.keyCode === 13) {
      searchProductHandler();
    }
  };

  const removeList = () => {
    $('.cate-depth-1').removeClass('active');
  };

  const keywordProc = async (keywordSeq, mode, keyword) => {
    try {
      await api.post(
        `/shop/product/keyword_proc`,
        {
          mode: mode ? mode : 'DEL_ALL',
          keyword_seq: keywordSeq,
          keyword,
          session_id: getCookie('session_id'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefreshKeyword((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = cookies.get('member_access_token');
    if (token && token !== '' && token !== null && token !== undefined && token !== 'undefined') {
      setIsLogin(true);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    alert('로그아웃되었습니다.');
    const token = cookies.get('member_access_token');
    if (token && token !== '' && token !== null && token !== undefined && token !== 'undefined') {
      cookies.set('member_access_token', '', { maxAge: 0, path: '/', sameSite: 'strict' });
      window.localStorage.removeItem('auto_login');
      window.localStorage.removeItem('save_id');
      window.localStorage.removeItem('userdata');
      setIsLogin(false);
    }
  };

  return (
    <>
      <div
        className={`header-pc ${
          scrollDirection === 'down' && !pathname.endsWith('product_view') ? 'hidden' : ''
        }`}
      >
        <div className="wrap-header">
          <div className="main-menu">
            <div className="logo">
              <Link to={`/shop/main?v=1`}>
                <img src="/images/concept-room/icon/pc_logo.png" alt="" />
              </Link>
            </div>
            <div className="top_menu">
              <ul>
                <li>
                  <Link to={`/shop/product/shopping_home`}>쇼핑홈</Link>
                </li>
                <li>
                  <Link to={`/shop/special/special_product_lists`}>기획전</Link>
                </li>
                <li>
                  <Link to="/shop/concept_room/concept_room_lists" style={{ color: '#17A279' }}>
                    컨셉룸
                  </Link>
                </li>
                <li>
                  <Link to={`/shop/sale/sale_product_lists`} style={{ color: '#f10100' }}>
                    SALE
                  </Link>
                </li>
                <li className="pet">
                  <Link to={`/shop/pet/pet_product_lists`}>
                    <img src="/images/concept-room/icon/pet_icon.jpg" alt="" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="util-menu">
              <div className="form-search">
                <img
                  onClick={searchProductHandler}
                  src="/images/concept-room/icon/search-icon.png"
                  alt=""
                />
                <input
                  className="search-text srch_close_event"
                  type="text"
                  placeholder="검색어를 입력해주세요"
                  onKeyDown={(e) => enterSearchHandler(e)}
                />
                {keywords?.length > 0 && (
                  <div className="search_lists_wrap">
                    <div className="d-flex mb-3 justify-content-between wrap-button">
                      <button type="button">최근검색어</button>
                      <button
                        type="button"
                        className="search_del_btn"
                        onClick={() => keywordProc()}
                      >
                        전체삭제
                      </button>
                    </div>
                    <ul className="search_lists">
                      {keywords?.map((keyword, index) => (
                        <li key={index} className="d-flex align-items-center">
                          <Link
                            to={`/shop/search_product/search_product_lists?keyword=${keyword.keyword}`}
                          >
                            {keyword.keyword}
                          </Link>
                          <button
                            type="button"
                            onClick={() => keywordProc(keyword.keyword_seq, 'DEL')}
                          >
                            삭제
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <ul className="another-menu">
                <li>
                  <Link to={`/shop/cart/cart_lists`}>
                    <img src="/images/concept-room/icon/icon_cart.png" alt="" />
                    {cartCount > 0 && <em>{cartCount}</em>}
                  </Link>
                </li>
                <li>
                  {isLogin ? (
                    <a href="#" onClick={handleLogout}>
                      로그아웃
                    </a>
                  ) : (
                    <Link to={`/shop/join/join`}>회원가입</Link>
                  )}
                </li>
                <li>
                  {isLogin ? (
                    <Link to={`/shop/mypage/account/mypage_index`}>마이페이지</Link>
                  ) : (
                    <Link to={`/shop/login/login`}>로그인</Link>
                  )}
                </li>
                <li>
                  <Link to={`/shop/cs_index/cs_index`}>고객센터</Link>
                </li>
              </ul>
            </div>
          </div>

          <ul className="sub-menu">
            {categories?.map((cate, index) => {
              let cateCd = Number(cate.category_cd);

              if (cateCd !== 500 && cateCd !== 14 && cateCd !== 150 && cateCd !== 12) {
                return (
                  <li
                    key={index}
                    onClick={removeList}
                    style={{ padding: cateCd === 3 || cateCd === 13 ? '0 16px' : '15px 16px' }}
                  >
                    <Link
                      className={`category-${cateCd}`}
                      to={`/shop/product/product_lists?sh_category1_cd=${cateCd}`}
                    >
                      {cate.category_nm.includes('br')
                        ? parse(cate.category_nm.replace('<br>', ''))
                        : cate.category_nm.includes('<')
                        ? parse(cate.category_nm)
                        : parse(cate.category_nm)}
                    </Link>

                    {cate.cate_list_2?.length > 0 ? (
                      <ul className="cate-depth-1">
                        {cate.cate_list_2?.map((cate2, index) => (
                          <li key={index} onClick={removeList}>
                            <Link
                              className="cate2"
                              to={`/shop/product/product_lists?sh_category1_cd=${cateCd}&sh_category2_cd=${cate2.category_cd}`}
                            >
                              {cate2.category_nm && parse(cate2.category_nm)}
                            </Link>

                            {cate2.cate_list_3.length > 0 ? (
                              <ul className="cate-depth-2">
                                {cate2.cate_list_3?.map((cate3, index) => (
                                  <li onClick={removeList} key={index}>
                                    <Link
                                      to={`/shop/product/product_lists?sh_category1_cd=${cateCd}&sh_category2_cd=${cate2.category_cd}&sh_category3_cd=${cate3.category_cd}`}
                                    >
                                      {cate3.category_nm && parse(cate3.category_nm)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>

      <div
        className={`header-mb ${
          scrollDirection === 'down' && !pathname.endsWith('product_view') ? 'hidden' : ''
        }`}
        style={{
          display: pathname.endsWith('concept_room_view')
            ? 'none'
            : checkDevice() !== 'desktop' && 'flex',
        }}
      >
        {showNav ? (
          <NavbarMB data={{ categories }} state={{ setShowNav }} />
        ) : showSearchMB ? (
          <SearchMB
            state={{ setShowSearchMB }}
            keywords={keywords}
            keywordProc={keywordProc}
            navigate={navigate}
          />
        ) : (
          <>
            <ul className="header-top">
              <li className="menu-box">
                <button className="back-button" onClick={() => history.back()}>
                  <img src="/images/concept-room/icon/ico_back.png" alt="" />
                </button>
                <button className="menu-btn" onClick={() => setShowNav(true)}>
                  <img src="/images/concept-room/icon/icon_mb_menu.png" alt="" />
                </button>
              </li>
              <li className="logo">
                <Link to={`/shop/main?v=1`}>
                  <img src="/images/concept-room/icon/pc_logo.png" />
                </Link>
              </li>
              <li className="util-menu-mb">
                <button onClick={() => setShowSearchMB(true)}>
                  <img src="/images/concept-room/icon/search-icon.png" alt="" />
                </button>
                <Link to={`/shop/cart/cart_lists`}>
                  <img src="/images/concept-room/icon/icon_cart.png" alt="" />
                  {cartCount > 0 && <em>{cartCount}</em>}
                </Link>
              </li>
            </ul>

            <ul className="header-bottom">
              <li className={pathname.endsWith('shopping_home') ? 'active' : ''}>
                <Link to={`/shop/product/shopping_home`}>쇼핑홈</Link>
              </li>
              <li className={pathname.endsWith('special_product_lists') ? 'active' : ''}>
                <Link to={`/shop/special/special_product_lists`}>기획전</Link>
              </li>
              <li className={pathname.endsWith('concept_room_lists') ? 'active' : ''}>
                <Link to="/shop/concept_room/concept_room_lists" style={{ color: '#17A279' }}>
                  컨셉룸
                </Link>
              </li>
              <li className={pathname.endsWith('sale_product_lists') ? 'active' : ''}>
                <Link to={`/shop/sale/sale_product_lists`} style={{ color: '#f10100' }}>
                  SALE
                </Link>
              </li>
              <li className={pathname.endsWith('pet_product_lists') ? 'active' : ''}>
                <Link to={`/shop/pet/pet_product_lists`}>
                  <img src="/images/concept-room/icon/pet_icon.jpg" alt="" />
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default Header;