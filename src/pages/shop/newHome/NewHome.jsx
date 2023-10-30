/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-09-25 15:17:36
 * @modify date 2023-10-03 12:29:34
 * @desc This is new home page for design at home
 */

import jwt_decode from "jwt-decode";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiFillWarning, AiOutlineSearch } from "react-icons/ai";
import { BiSolidUserRectangle } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import { MdManageSearch } from "react-icons/md";
import { RiHome5Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Helmet } from "react-helmet";

import Dropdown from "@components/ConceptRoom/Dropdown/Dropdown";
import RoomCard from "@components/ConceptRoom/NewHome/RoomCard/RoomCard";
import Footer from "@components/Footer";
import useOutsideClick from "@hooks/useOutsideClick"
import api from "@utils/api/api";
import { mainWebImageURL } from "@utils/constants";
import { getCookie, getDayAndMonth, removeHtmlTags } from "@utils/functions";
import styles from "./NewHome.module.css";

const tabData = [
  {
    name: "홈",
    icon: <RiHome5Fill size={22} />,
    path: "/shop/new_home",
  },
  {
    name: "카테고리",
    icon: <MdManageSearch size={22} />,
    path: "/shop/search_product/search_product_lists",
  },
  {
    name: "큐레이션",
    icon: <IoSunnyOutline size={22} />,
    path: "/shop/concept_room/concept_room_lists",
  },
  {
    name: "스토어",
    icon: <FaShoppingCart size={22} />,
    path: "/shop/cart/cart_lists",
  },
  {
    name: "마이페이지",
    icon: <BiSolidUserRectangle size={22} />,
    path: "/shop/mypage/account/mypage_index",
  },
];

const Event = () => {
  const [event, setEvent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api({
          url: `/concept_room/banner`,
          method: "GET",
        });
        setEvent(data.result[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleRedirect = (path) => {
    navigate(path);
  };

  const rangeDate =
    getDayAndMonth(event.display_Sdate) +
    " - " +
    getDayAndMonth(event.display_Edate);

  return (
    <div className={styles.event}>
      <div className={styles.detail}>
        <img
          className={styles.image}
          src={`${mainWebImageURL}/banner/${event.file_nm2}`}
          alt="Event"
        />

        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <div className={styles.navbar}>
            <img src={`/images/svg/dah.svg`} alt="" />
            <div className={styles.right}>
              <AiOutlineSearch
                onClick={() =>
                  handleRedirect("/shop/search_product/search_product_lists")
                }
                size={22}
                className={styles.item}
              />
              <BsCart3
                onClick={() => handleRedirect("/shop/cart/cart_lists")}
                size={20}
                className={styles.item}
              />
            </div>
          </div>

          <div className={styles.info}>
            <h5 className={styles.range_date}>{rangeDate}</h5>
            <h2 className={styles.title}>{removeHtmlTags(event.banner_nm)}</h2>
            <h4 className={styles.subtitle}>
              {removeHtmlTags(event.content_text2)}
            </h4>
          </div>
        </div>
      </div>

      <Link to={event.link} className={styles.view_more}>
        <div className={styles.inner}>
          <h2 className={styles.title}>디자인앳홈 멤버십 REWARD</h2>
          <IoIosArrowForward size={24} className={styles.icon} />
        </div>
      </Link>
    </div>
  );
};

const FilterAndSearch = ({
  filter,
  keyword,
  onChange,
  onShowLayer,
  scrollToRef,
  onRemoveKeyword,
}) => {
  const [activeFilter, setActiveFilter] = useState(false);
  const [activeSearchBar, setActiveSearchBar] = useState(false);
  const [styleList, setStyleList] = useState([]);

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

  const handleActiveFilter = () => {
    setActiveFilter((prev) => !prev);
  };

  const handleFocusInput = () => {
    setActiveSearchBar(true);
  };

  const handleBlurInput = () => {
    setActiveSearchBar(false);
  };

  return (
    <>
      <div ref={scrollToRef} className={styles.filter_and_search}>
        <button
          onClick={handleActiveFilter}
          className={`${styles.filter} ${
            activeFilter ? styles.filter__active : ""
          }`}
        >
          <h4>필터</h4>
          {activeFilter ? (
            <IoIosArrowUp size={20} />
          ) : (
            <IoIosArrowDown size={20} />
          )}
        </button>

        <div
          onClick={onShowLayer}
          className={`${styles.search_bar} ${
            activeSearchBar ? styles.search_bar__active : ""
          }`}
        >
          <AiOutlineSearch className={styles.search_icon} size={24} />
          <input
            readOnly
            value={keyword}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            className={styles.search_input}
            type="text"
            placeholder="어떤 인테리어를 찾고 계신가요?"
          />

          {keyword && (
            <LiaTimesSolid
              onClick={onRemoveKeyword}
              className={styles.times_icon}
              size={20}
            />
          )}
        </div>
      </div>

      {activeFilter && (
        <FilterList filter={filter} setFilter={onChange} data={styleList} />
      )}
    </>
  );
};

// Component inside FilterAndSearch
const FilterList = ({ filter, setFilter, data }) => {
  const [active, setActive] = useState(null);
  const filterRef = useRef(null);

  const handleClick = (e, id) => {
    e.stopPropagation();

    setActive((prev) => (prev === id ? null : id));
  };

  const checkActive = useCallback(
    (id) => {
      return id === active;
    },
    [active]
  );

  useOutsideClick(filterRef, () => {
    setActive(null);
  });

  return (
    <div className={styles.filter_list}>
      {data?.map((style) => (
        <Dropdown
          refElement={filterRef}
          key={style.h_code}
          label={style.h_name}
          data={style.detailed}
          active={checkActive(style.h_code)}
          filter={filter}
          onActive={(e) => handleClick(e, style.h_code)}
          onChange={setFilter}
        />
      ))}
    </div>
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

const SearchLayer = ({
  active,
  onClick,
  scrollToRef,
  currentUser,
  refresh,
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
            placeholder="어떤 인테리어를 찾고 계신가요?"
          />
        </div>
        <button
          onClick={() => handleClick(keyword)}
          className={styles.search_button}
        >
          취소
        </button>
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
            popularFurnitureList.length === 0 ? styles.furniture_list__empty : ""
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

const NotificationLayer = () => {
  const [show, setShow] = useState(true);

  return (
    <div
      className={`${styles.notification_layer} ${
        show ? styles.notification_layer__active : ""
      }`}
    >
      <div className={styles.layer_box}>
        <div className={styles.box_close}>
          <LiaTimesSolid   
            onClick={() => setShow(false)}
            className={styles.icon}
            size={22}
          />
        </div>
        <div className={styles.box_title}>
          <h2 className={styles.title_name}>알림</h2>
          <AiFillWarning size={22} />
        </div>
        <h4 className={styles.box_description}>
          더 나은 경험을 위해 휴대폰 사이즈를 이용하여 방문해보세요!
        </h4>
      </div>
    </div>
  );
};

const NewHome = () => {
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
    if (!keyword) {
      setShowSearchLayer(true);
    }
  };

  return (
    <div className={styles.new_home}>
      <Helmet>
        <title>아망떼 ㅣ컨셉룸</title>
      </Helmet>
      <Event />
      <FilterAndSearch
        filter={dataFilter}
        keyword={keyword}
        onRemoveKeyword={handleRemoveKeyword}
        onChange={setDataFilter}
        onShowLayer={handleShowLayer}
        scrollToRef={scrollToRef}
      />
      <RoomList
        data={rooms}
        count={roomCount}
        refElement={lastRef}
        currentUser={currentUser}
      />
      <Footer dark />
      <TabBar />
      <SearchLayer
        active={showSearchLayer}
        onClick={handleSearch}
        scrollToRef={scrollToRef}
        currentUser={currentUser}
        refresh={refreshKeywordHistory}
      />
      <NotificationLayer />
    </div>
  );
};

export default NewHome;
