/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-03 15:02:43
 * @modify date 2023-10-04 10:40:03
 * @desc This is concept room list page
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

import RoomCard from "@components/ConceptRoom/ConceptRoomList/RoomCard/RoomCard";
import Dropdown from "@components/ConceptRoom/Dropdown/Dropdown";
import useOutsideClick from "@hooks/useOutsideClick";
import api from "@utils/api/api";
import styles from "./ConceptRoomList.module.css";

const Banner = () => (
  <div className={styles.banner}>
    <Link to="/shop/product/shopping_home">
      <img
        className={styles.banner_image}
        src={`/images/concept-room/banner-brand.jpg`}
        alt="Banner"
      />
      <div className={styles.banner_content}>
        <h5 className={styles.content_subtitle}>스타일링 by 아망떼</h5>
        <h4 className={styles.content_title}>
          직접 꾸민 인테리어로 얻는 스타일링 TIP
        </h4>
      </div>
    </Link>
  </div>
);

const FilterStyleList = ({ filter, setFilter, data }) => {
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
    <div className={styles.filter_category}>
      {data?.map((style) => (
        <Dropdown
          refElement={filterRef}
          key={style.h_code}
          label={style.h_name}
          data={style.detailed}
          // icon={
          //   checkActive(style.h_code) ? style.file_nm_enb : style.file_nm_dis
          // }
          active={checkActive(style.h_code)}
          filter={filter}
          onActive={(e) => handleClick(e, style.h_code)}
          onChange={setFilter}
        />
      ))}
    </div>
  );
};

const Filter = ({ filter, setFilter }) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setShow(false);
  });

  const checkActive = (type) => {
    return filter.value === type;
  };

  const handleToggleShow = () => {
    setShow((prev) => !prev);
  };

  const handleClick = (data) => {
    setFilter(data);
  };

  return (
    <div className={styles.filter_block}>
      <div className={styles.filter_area}>
        <div className={styles.filter}>
          <div
            ref={ref}
            onClick={handleToggleShow}
            className={`
              ${styles.filter_label} 
              ${show ? styles.filter_label__active : ""}
            `}
          >
            <h4 className={styles.label_text}>{filter.name}</h4>
            <IoIosArrowDown size={18} />
          </div>
          {show && (
            <ul className={styles.filter_list}>
              <li
                className={`
                ${styles.filter_item} 
                ${checkActive("newest") ? styles.filter_item__active : ""}
              `}
                onClick={() => handleClick({ value: "newest", name: "인기순" })}
              >
                <h4 className={styles.item_name}>인기순</h4>
                <AiOutlineCheck className={styles.item_icon} size={18} />
              </li>
              <li
                className={`
                ${styles.filter_item} 
                ${checkActive("popular") ? styles.filter_item__active : ""}
              `}
                onClick={() =>
                  handleClick({ value: "popular", name: "최신순" })
                }
              >
                <h4 className={styles.item_name}>최신순</h4>
                <AiOutlineCheck className={styles.item_icon} size={18} />
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const RoomList = ({ data, count, refElement }) => {
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
            name={item.concept_room_nm}
            image={item.thumbnail_img}
            brand={item.brand}
            tag={item.style}
            subImage={item.product_main_file}
          />
        ))}
      </div>
    </>
  );
};

const ConceptRoomList = () => {
  const [dataFilter, setDataFilter] = useState([]);
  const [roomCount, setRoomCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [rowCount, setRowCount] = useState(6);
  const [styleList, setStyleList] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState({ value: "newest", name: "인기순" });

  const observer = useRef();

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
    const fetchData = async () => {
      try {
        const { data } = await api({
          url: `/room/concept/list`,
          method: "GET",
          params: {
            styles: encodeURIComponent(JSON.stringify(dataFilter)),
            row_count: rowCount,
            start_num: 1,
            filter: filter.value,
          },
        });
        setRooms(data.list);
        setRoomCount(data.total);
        setRowCount(Number(data.limit));
        setHasMore(data.list?.length > 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dataFilter, rowCount, filter]);

  return (
    <>
      <Helmet>
        <title>아망떼 ㅣ컨셉룸</title>
      </Helmet>

      <Banner />

      <div className={styles.container}>
        <FilterStyleList
          filter={dataFilter}
          setFilter={setDataFilter}
          data={styleList}
        />
      </div>
      <Filter filter={filter} setFilter={setFilter} />

      <div className={styles.container}>
        <RoomList data={rooms} count={roomCount} refElement={lastRef} />
      </div>
    </>
  );
};

export default ConceptRoomList;