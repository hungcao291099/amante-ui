import styles from "./NewConceptRoom.module.css";
import { Helmet } from "react-helmet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import api from "@utils/api/api";
import Cookies from "universal-cookie";

import RoomCard from "@components/ConceptRoom/NewHome/RoomCard/RoomCard";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { conceptRoomImageURL } from "@utils/constants";
import { getCookie, getDayAndMonth, removeHtmlTags } from "@utils/functions";

import { AiOutlineLeft, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import {
  RxChevronDown,
  RxChevronLeft,
  RxChevronRight,
  RxChevronUp,
} from "react-icons/rx";

import { BsXCircle } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { RiHome5Line } from "react-icons/ri";
import { MdManageSearch } from "react-icons/md";
import { BiLoader } from "react-icons/bi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { PiUserSquareThin } from "react-icons/pi";
import { LiaTimesSolid } from "react-icons/lia";

import { Link, useLocation, useNavigate } from "react-router-dom";

const tabData = [
  {
    name: "홈",
    icon: <RiHome5Line size={22} />,
    path: "/shop/new_home",
  },
  {
    name: "카테고리",
    icon: <MdManageSearch size={22} />,
    path: "/shop/search_product/search_product_lists",
  },
  {
    name: "큐레이션",
    icon: <BiLoader size={22} />,
    path: "/shop/concept_room/concept_room_lists",
  },
  {
    name: "스토어",
    icon: <HiOutlineShoppingCart size={22} />,
    path: "/shop/cart/cart_lists",
  },
  {
    name: "마이페이지",
    icon: <PiUserSquareThin size={22} />,
    path: "/shop/mypage/account/mypage_index",
  },
];

const TitleLabel = () => {
  return (
    <div className={styles.label_Menu}>
      <div className={styles.arows}>{<AiOutlineLeft size={20} />}</div>
      <div className={styles.label}>
        <h1>카테고리</h1>
      </div>
    </div>
  );
};

const SearchBox = ({
  filter,
  keyword,
  onChange,
  onShowLayer,
  scrollToRef,
  onRemoveKeyword,
}) => {
  const [activeFilter, setActiveFilter] = useState(false);
  const [activeSearchBar, setActiveSearchBar] = useState(false);



  const handleFocusInput = () => {
    setActiveSearchBar(true);
  };

  const handleBlurInput = () => {
    setActiveSearchBar(false);
  };



  return (
    <div className={styles.search_area}>
      <div className={styles.search_Box}>
        <div
          onClick={onShowLayer}
          className={`${styles.search_Input} ${
            activeSearchBar ? styles.search_bar__active : ""
          }`}
        >
          <input
            type="text"
            placeholder="찾으시는 공간이나 제품을 입력해주세요"
            readOnly
            className={styles.search_input}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            value={keyword}
          />
          

          {keyword ? 
          <div className={styles.search_Icon}>
            <LiaTimesSolid
              onClick={onRemoveKeyword}
              className={styles.times_icon}
              size={20}
            />
            </div>
            :
            <div className={styles.search_Icon}>
              <AiOutlineSearch size={26} />
            </div>
          }
        </div>
      </div>

      {/* {activeFilter && (
        <FilterList filter={filter} setFilter={onChange} data={styleList} />
      )} */}
    </div>
  );
};

const BtnFilter = () => {
  const [action, setAction] = useState(true);
  const [styleList, setStyleList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const listLetter = [
    // "ㄱ",
    // "ㄴ",
    // "ㄷ",
    // "ㄹ",
    // "ㅁ",
    // "ㅂ",
    // "ㅅ",
    // "ㅇ",
    // "ㅈ",
    // "ㅊ",
    // "ㅋ",
    // "ㅌ",
    // "ㅍ",
    // "ㅎ",
    // "A",
    // "B",
    // "C",
  ];
  useEffect(() => {
    const fetchStyle = async () => {
      try {
        const { data } = await api({
          url: "/room/concept/styles/list",
          method: "GET",
        });
        setStyleList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStyle();
  }, []);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const { data } = await api({
          url: "shop/code2/list?code1=900",
          method: "GET",
        });
        setBrandList(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBrand();
  }, []);

  const handleDetailAction = (value) => {
    $(`#detail-${value}`).slideToggle("fast");
    $(`#icon-${value}`).toggleClass("rotate");

    if ($(`#icon-${value}`).css("transform") === "none") {
      $(`#icon-${value}`).css("transform", "rotate(180deg)");
    } else {
      $(`#icon-${value}`).css("transform", "none");
    }
  };

  const handleFilterBarnd = (value) => {
    
  }

  return (
    <React.Fragment>
      <div className={styles.BtnFilter}>
        <div
          className={`${styles.brand} ${action ? styles.brand__action : ""}`}
          onClick={() => {
            setAction(true);
          }}
        >
          <h1>브랜드</h1>
        </div>
        <div
          className={`${styles.concept} ${
            action == false ? styles.concept__action : ""
          }`}
          onClick={() => {
            setAction(false);
          }}
        >
          <h1>룸투어</h1>
        </div>
      </div>

      {action ? (
        <div className={styles.list_brand_container}>
          <div className={styles.list_brand}>
            {brandList?.map((brand) => {
              return (
                <div className={styles.list_img} 
                    key= {brand.code_cd2}
                    onClick={() => { handleFilterBarnd(brand.code_cd2) }}
                >
                  <img
                    className={styles.image}
                    src="/asset/images/shop/product/Group 22588.png"
                    alt="Brand image"
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.list_letter}>
            {listLetter?.map((letter, index) => {
              return (
                <div className={styles.letter} key={index}>
                  {letter}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        styleList?.map((header) => {
          console.log(styleList);

          return (
            <div className={styles.content_Container} key={header.h_code}>
              <div className={styles.content_Concept}>
                <div className={styles.header_Concept}>{header.h_name}</div>
                <div
                  id={`icon-${header.h_code}`}
                  onClick={() => {
                    handleDetailAction(header.h_code);
                  }}
                >
                  {<RxChevronDown size={20} />}
                </div>
              </div>
              <div id={`detail-${header.h_code}`} style={{ display: "none" }}>
                <div className={styles.room_list}>
                  {header.detailed?.map((detail) => {
                    return (
                      <div
                        key={detail.d_code}
                        className={styles.detail_Concept}
                      >
                        <div className={styles.detail_img}>
                          <img
                            className={styles.image}
                            // src = {`${conceptRoomImageURL}/${conceptRoomImageURL}`}
                            src="/asset/images/shop/product/mb_review_widget_thumb01.png"
                            alt="Furniture image"
                          />
                        </div>
                        <div className={styles.detail_name}>
                          {detail.d_name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })
      )}
    </React.Fragment>
  );
};



const RoomList = ({ data, count, refElement, currentUser }) => {
  const hasInfinityScroll = (index) => {
    return index + 1 === data.length && data.length !== count;
  };

  if (data.length === 0) {
    return (
      <div className={styles.empty_room}>
        <h4 className={styles.text}>항목이 없습니다</h4>
      </div>
    );
  }

  return (
    <>
      <div className={styles.room_count}>
        총 <span className={styles.number}>{count}</span>개
      </div>
      <div className={styles.room_list}>
        {data.map((item, index) => (
          <RoomCard
            key={index}
            refElement={hasInfinityScroll(index) ? refElement : null}
            id={item.concept_room_seq}
            image={item.thumbnail_img}
            name={item.concept_room_nm}
            tag={item.style}
            viewCount={item.vw_cnt}
            likeCount={item.like_cnt}
            mark={item.bookmark_click_on === "on"}
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
};










const SearchLayer = ({
  active,
  onClick,
  scrollToRef,
  currentUser,
  refresh,
  onRemoveKeyword,
}) => {
  const [keywordRecommendList, setKeywordRecommendList] = useState([]);
  const [keywordTrendingList, setKeywordTrendingList] = useState([]);
  const [popularFurnitureList, setPopularFurnitureList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [keywordHistoryList, setKeywordHistoryList] = useState([]);

  const sessionId = getCookie("session_id");
  const userId = currentUser?.cust_seq;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/concept_room/keyword/list", {
          params: {
            session_id: sessionId,
            cust_seq: userId,
          },
        });
        setKeywordHistoryList(data.list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keywordRecommendApi = "/room/keyword/recommend";
        const keywordTrendingApi = "/room/keyword/trending";
        const popularFurnitureApi = "/styles/popular/list";

        const response = await Promise.allSettled([
          api.get(keywordRecommendApi),
          api.get(keywordTrendingApi),
          api.get(popularFurnitureApi),
        ]);

        setKeywordRecommendList(response[0].value.data.list);
        setKeywordTrendingList(response[1].value.data.list);
        setPopularFurnitureList(response[2].value.data.list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (keyword) => {
    if (keyword) {
      onClick(keyword);
      setKeyword("");
      scrollToRef.current?.scrollIntoView();
    }
  };

  const handleKeyDown = (event, keyword) => {
    if (event.key === "Enter" && keyword) {
      onClick(keyword);
      setKeyword("");
      scrollToRef.current?.scrollIntoView();
    }
  };

  const handleRemoveKeywordHistory = async (keywordId) => {
    try {
      api.post("/concept_room/keyword/delete", {
        seq: keywordId,
      });

      setKeywordHistoryList((prev) =>
        prev.filter((keyword) => keyword.seq !== keywordId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const searchArea = (
    <div className={styles.search_area}>
      <div className={styles.search_bar}>
        <div className={styles.search_input}>
          <AiOutlineSearch size={26} />
          <input
            value={keyword}
            onKeyDown={(e) => handleKeyDown(e, keyword)}
            onChange={(e) => setKeyword(e.target.value)}
            className={styles.input}
            type="text"
            placeholder="찾으시는 공간이나 제품을 입력해주세요"
          />
        </div>
        {keyword?
        <button
          onClick={() => handleClick(keyword)}
          className={styles.search_button}
        >
          취소
        </button> 
        : 
        <BsXCircle size={22}
        onClick={onRemoveKeyword}
        />
        }
      </div>

      <div className={styles.keyword_history}>
        {keywordHistoryList.length > 0 ? (
          keywordHistoryList.map((keywordHistory) => (
            <div key={keywordHistory.seq} className={styles.keyword_item}>
              <h4
                onClick={() => handleClick(keywordHistory.keyword)}
                className={styles.keyword_name}
              >
                {keywordHistory.keyword}
              </h4>
              <LiaTimesSolid
                onClick={() => handleRemoveKeywordHistory(keywordHistory.seq)}
                className={styles.icon}
                size={18}
              />
            </div>
          ))
        ) : (
          <h4 className={styles.empty_keyword}>빈 키워드</h4>
        )}
      </div>
    </div>
  );

  const keywordArea = (
    <div className={styles.keyword_area}>
      <div className={styles.keyword_block}>
        <h2 className={styles.keyword_title}>추천 검색어</h2>
        <div className={styles.keyword_list}>
          {keywordRecommendList.length > 0 ? (
            keywordRecommendList.map((keywordRecommend, index) => (
              <h4
                onClick={() => handleClick(keywordRecommend.keyword)}
                key={index}
                className={styles.keyword_item}
              >
                {keywordRecommend.keyword}
              </h4>
            ))
          ) : (
            <h4 className={styles.empty_keyword}>빈 키워드</h4>
          )}
        </div>
      </div>

      <div className={styles.keyword_block}>
        <h2 className={styles.keyword_title}>트렌드 키워드</h2>
        <div className={styles.keyword_list}>
          {keywordTrendingList.length > 0 ? (
            keywordTrendingList.map((keywordTrending, index) => (
              <h4
                onClick={() => handleClick(keywordTrending.keyword)}
                key={index}
                className={styles.keyword_item}
              >
                {keywordTrending.keyword}
              </h4>
            ))
          ) : (
            <h4 className={styles.empty_keyword}>빈 키워드</h4>
          )}
        </div>
      </div>

      <div className={styles.popular_furniture}>
        <h2 className={styles.title}>인기 인테리어 스타일</h2>
        <div
          className={`${styles.furniture_list} ${
            popularFurnitureList.length === 0
              ? styles.furniture_list__empty
              : ""
          }`}
        >
          {popularFurnitureList.length > 0 ? (
            popularFurnitureList.map((popularFurniture, index) => (
              <div key={index} className={styles.furniture_item}>
                <div className={styles.furniture_image}>
                  <img
                    className={styles.image}
                    src="/asset/images/shop/product/pro_in_img.jpg"
                    alt="Furniture image"
                  />
                </div>
                <h5 className={styles.furniture_name}>
                  {popularFurniture.h_name}
                </h5>
              </div>
            ))
          ) : (
            <h4 className={styles.empty_keyword}>빈 키워드</h4>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`${styles.search_layer} ${
        active ? styles.search_layer__visible : ""
      }`}
    >
      {searchArea}
      <div className={styles.divider}></div>
      {keywordArea}
    </div>
  );
};

const TabBar = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const activeTab = (path) => {
    return pathname.endsWith(path);
  };

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.tab_bar}>
      {tabData?.map((tab) => (
        <div
          key={tab.name}
          onClick={() => handleClick(tab.path)}
          className={`${styles.tab_item} ${
            activeTab(tab.path) ? styles.tab_item__active : ""
          }`}
        >
          {tab.icon}
          <h4 className={styles.tab_name}>{tab.name}</h4>
        </div>
      ))}
    </div>
  );
};

const NewConceptRoom = () => {
  const [dataFilter, setDataFilter] = useState([]);
  const [roomCount, setRoomCount] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [rowCount, setRowCount] = useState(12);
  const [showSearchLayer, setShowSearchLayer] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [refreshKeywordHistory, setRefreshKeywordHistory] = useState(false);

  const cookies = new Cookies();
  const observer = useRef();
  const scrollToRef = useRef();

  const token = cookies.get("member_access_token");
  const currentUser = token ? jwt_decode(token) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api({
          url: `/room/concept/list`,
          method: "GET",
          params: {
            styles: encodeURIComponent(JSON.stringify(dataFilter)),
            row_count: rowCount,
            start_num: 1,
            keyword: keyword,
            session_id: getCookie("session_id"),
            cust_seq: currentUser?.cust_seq,
          },
        });
        setRooms(data.list);
        setRoomCount(data.total);
        setRowCount(Number(data.limit));
        setHasMore(data.list?.length > 0);
        setRefreshKeywordHistory((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dataFilter, rowCount, keyword]);

  const lastRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setRowCount((prev) => prev + 12);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const handleSearch = (keyword) => {
    setShowSearchLayer(false);
    setKeyword(keyword);
  };

  const handleRemoveKeyword = () => {
    setShowSearchLayer(false);
    setKeyword("");
  };

  const handleShowLayer = () => {
    // if (!keyword) {
      setShowSearchLayer(true);
    // }
  };


  return (
    <div className={styles.new_Concept_Room}>
      {/* <Header/> */}
      <Helmet>
        <title>아망떼 ㅣ컨셉룸</title>
      </Helmet>
      
      <TitleLabel />
      <SearchBox 
                filter={dataFilter}
                keyword={keyword}
                onRemoveKeyword={handleRemoveKeyword}
                onChange={setDataFilter}
                onShowLayer={handleShowLayer}
                scrollToRef={scrollToRef}
      />
      <BtnFilter/>

      <RoomList
        data={rooms}
        count={roomCount}
        refElement={lastRef}
        currentUser={currentUser}
      />

      <div className={styles.line_page}> </div>

      <Footer dark />

      <TabBar />

      <SearchLayer
        active={showSearchLayer}
        onClick={handleSearch}
        scrollToRef={scrollToRef}
        currentUser={currentUser}
        refresh={refreshKeywordHistory}
        onRemoveKeyword={handleRemoveKeyword}
      />
    </div>
  );
};

export default NewConceptRoom;
