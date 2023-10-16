/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-06 08:47:02
 * @modify date 2023-10-06 08:47:02
 * @desc This is a component of ConceptRoomView.jsx
 */

import useOutsideClick from "@hooks/useOutsideClick";
import { useRef, useState } from "react";
import { AiOutlineDownload, AiOutlineHeart } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import ScrollContainer from "react-indiana-drag-scroll";
import { useDispatch, useSelector } from "react-redux";
import { EffectCreative, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { fetchObject } from "@redux/conceptRoomView/features/objectSlice";
import { fetchOption } from "@redux/conceptRoomView/features/optionSlice";
import { conceptRoomImageURL, mainWebImageURL } from "@utils/constants";
import { MdPayment } from "react-icons/md";
import ImageSlide from "../ImageSlide/ImageSlide";
import styles from "./RoomContent.module.css";

const ObjectItem = ({ image, index, active }) => {
  
  const handleActive = () => {};

  return (
    <div
      onClick={handleActive}
      className={`
        ${styles.object_item} 
        ${active ? styles.object_item__active : ""}
      `}
    >
      <img
        className={styles.item_image}
        src={`${conceptRoomImageURL}/${image}`}
        alt="Object item"
      />
      <span className={styles.item_index}>{index}</span>
    </div>
  );
};

const OptionItem = ({ image, active }) => {
  const handleActive = () => {};

  return (
    <div
      className={`
        ${styles.option_item} 
        ${active ? styles.option_item__active : ""}
      `}
    >
      <img
        className={styles.item_image}
        src={`${conceptRoomImageURL}/${image}`}
        alt="Option item"
      />
    </div>
  );
};

const ProductCard = ({ id, image, name, outside, percent, price }) => {
  const handleRedirect = () => {};

  const handleToggleFavorite = (id) => {};

  const handleShowOption = () => {};

  return (
    <div className={styles.product_card}>
      <img
        className={styles.card_image}
        src={`${mainWebImageURL}/product/${image}`}
        alt="Card image"
      />
      <div className={styles.card_content}>
        <h4 className={styles.content_name}>{name}</h4>
        <div className={styles.content_price}>
          {!outside && <span className={styles.price_percent}>{percent}%</span>}
          <h4 className={styles.price_text}>{price}원</h4>
        </div>
        <button onClick={handleRedirect} className={styles.content_button}>
          자세히보기
        </button>

        {!outside && (
          <div className={styles.content_interact}>
            <button className={styles.interact_button}>
              <AiOutlineHeart
                onClick={() => handleToggleFavorite(id)}
                className={styles.button_icon}
                size={20}
              />
            </button>

            <button className={styles.interact_button}>
              <MdPayment
                onClick={handleShowOption}
                className={styles.button_icon}
                size={20}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const OptionAreaPC = () => {
  const { objectList, objectActiveId } = useSelector((state) => state.object);
  const { optionList, optionActiveId } = useSelector((state) => state.option);

  const handleResetSlide = () => {};

  return (
    <div className={styles.option_area__pc}>
      <div className={styles.area_top__pc}>
        <h4 className={styles.top_title__pc}>내 마음대로 방 꾸며보기</h4>
        <button className={styles.top_button__pc} onClick={handleResetSlide}>
          초기화
        </button>
      </div>

      <div className={styles.area_middle__pc}>
        <h5 className={styles.middle_title__pc}>제품선택</h5>
        {objectList?.length > 0 ? (
          <ScrollContainer
            grabCursor
            vertical
            className={styles.middle_objects__pc}
          >
            {objectList.map((object, index) => (
              <ObjectItem
                key={index}
                image={object.thumbnail_img}
                index={index + 1}
                active={object.object_seq === objectActiveId}
              />
            ))}
          </ScrollContainer>
        ) : (
          <h4 className={styles.objects_empty__pc}>등록된 제품이 없습니다.</h4>
        )}
      </div>

      <div className={styles.area_bottom__pc}>
        <h5 className={styles.bottom_title__pc}>
          해당제품의 컬러를 변경해보세요
        </h5>
        {optionList?.length > 0 ? (
          <ScrollContainer
            vertical
            grabCursor
            className={styles.bottom_options__pc}
          >
            {optionList.map((option) => (
              <OptionItem
                key={option.id}
                image={option.thumbnail_img}
                active={option.option_seq === optionActiveId}
              />
            ))}
          </ScrollContainer>
        ) : (
          <h4 className={styles.options_empty__pc}>등록된 색상이 없습니다.</h4>
        )}
      </div>
    </div>
  );
};

const OptionArea = () => {
  const {
    objectList,
    objectActiveId,
    optionList,
    optionActiveId,
    productCardList,
    productCardOutsideList,
  } = useSelector((state) => state.view);

  return (
    <div className={styles.option_area}>
      {objectList?.length > 0 ? (
        <ScrollContainer grabCursor horizontal className={styles.area_objects}>
          {objectList.map((object, index) => (
            <ObjectItem
              key={index}
              image={object.thumbnail_img}
              index={index + 1}
              active={object.id === objectActiveId}
            />
          ))}
        </ScrollContainer>
      ) : (
        <h4 className={styles.object_empty}>등록된 제품이 없습니다.</h4>
      )}

      <div className={styles.area_options}>
        {optionList?.length > 0 ? (
          <div grabCursor horizontal className={styles.option_list}>
            {optionList.map((option) => (
              <OptionItem
                key={option.id}
                image={option.thumbnail_img}
                active={option.id === optionActiveId}
              />
            ))}
          </div>
        ) : (
          <h4 className={styles.option_empty}>등록된 색상이 없습니다.</h4>
        )}

        <div className={styles.option_cards}>
          <h4 className={styles.cards_title}>제품 상세정보</h4>

          {productCardList?.length > 0 ? (
            <ScrollContainer vertical className={styles.card_list}>
              {productCardList.map((product, index) => (
                <ProductCard
                  key={index}
                  id={product.product_cd}
                  image={product.file_nm}
                  name={product.product_nm}
                  percent={product.fee_rate}
                  price={product.sale_price}
                />
              ))}
            </ScrollContainer>
          ) : (
            <h4>여기에는 상품이 없습니다.</h4>
          )}
        </div>
      </div>
    </div>
  );
};

const ContentTop = () => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setActiveDropdown((prev) => !prev);
  };

  useOutsideClick(dropdownRef, () => {
    setActiveDropdown(false);
  });

  const handleDownloadImage = async () => {};

  const handleShareSocial = () => {};
  return (
    <div className={styles.content_top}>
      <h4 className={styles.top_title}>한눈에 보는 룸투어</h4>
      <button
        ref={dropdownRef}
        onClick={handleToggleDropdown}
        className={styles.top_button}
      >
        <FiMoreHorizontal size={22} />
      </button>

      {activeDropdown && (
        <ul className={styles.top_list}>
          <li onClick={handleDownloadImage} className={styles.list_item}>
            <h4 className={styles.item_name}>이미지 다운로드</h4>
            <AiOutlineDownload size={26} />
          </li>
          <li onClick={handleShareSocial} className={styles.list_item}>
            <h4 className={styles.item_name}>이미지 공유하기</h4>
            <BsFillShareFill size={20} />
          </li>
        </ul>
      )}
    </div>
  );
};

const ContentMiddle = ({ viewList }) => {
  const [activePlayer360, setActivePlayer360] = useState(false);
  const dispatch = useDispatch();

  const fractionPaginationCheck = () => {
    return viewList?.length > 6;
  };

  const handleChangeSlide = (e) => {
    const activeIndex = e.activeIndex;

    // Change view
    dispatch(fetchObject(viewList[activeIndex].room_object));
    dispatch(fetchOption(viewList[activeIndex].room_object[0]?.options));

    // ResetView
  };

  const handleTogglePlayer = () => {
    setActivePlayer360((prev) => !prev);
  };

  return (
    <div className={styles.content_middle}>
      <Swiper
        onSlideChange={handleChangeSlide}
        className={styles.middle_slide}
        slidesPerView={1}
        grabCursor={true}
        effect="creative"
        navigation={!activePlayer360}
        modules={[Pagination, EffectCreative, Navigation]}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "custom_bullets__active",
          bulletClass: "custom_bullets",
          el: fractionPaginationCheck()
            ? `.pagination_fraction`
            : `.pagination_bullets`,
          type: fractionPaginationCheck() ? "custom" : "bullets",
          renderCustom: (swiper, current, total) => {
            return `${current} / ${total}`;
          },
          renderBullet: (index, className) => {
            return `<span class=${className}></span>`;
          },
        }}
      >
        {viewList?.map((view) => (
          <SwiperSlide key={view.view_seq}>
            <ImageSlide
              playerUrl={view.slide_url}
              objectList={view.room_object}
              activePlayer360={activePlayer360}
              onTogglePlayer360={handleTogglePlayer}
            />
          </SwiperSlide>
        ))}

        <div
          style={{ visibility: activePlayer360 ? "hidden" : "visible" }}
          className={
            fractionPaginationCheck()
              ? "pagination_fraction"
              : "pagination_bullets"
          }
        ></div>
      </Swiper>
      <div className={styles.middle_option}>
        <OptionAreaPC />
        <OptionArea />
      </div>
    </div>
  );
};

const ContentBottom = () => {
  return <div className={styles.content_bottom}></div>;
};

const RoomContent = ({ viewList }) => {
  return (
    <div className={styles.room_content}>
      <ContentTop />

      <ContentMiddle viewList={viewList} />

      <ContentBottom />
    </div>
  );
};

export default RoomContent;
