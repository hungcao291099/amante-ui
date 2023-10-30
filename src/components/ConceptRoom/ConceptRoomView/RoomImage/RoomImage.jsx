/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-06 08:47:02
 * @modify date 2023-10-26 14:01:30
 * @desc This is a component of ConceptRoomView.jsx
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductItem from "../ProductItem/ProductItem";
import { conceptRoomImageURL } from "@utils/constants";
import { isValidUrl, checkDevice } from "@utils/functions";
import styles from "./RoomImage.module.css";
import TagContent from "../TagContent/TagContent";

const MainImage = ({
  image,
  panorama,
  products,
  isPanorama,
  isMobile,
  productSelectId,
  onTogglePanorama,
  onGetProductId,
  onRemoveProductId,
  onScrollToProduct,
}) => {
  const [showTags, setShowTags] = useState(false);
  const [dimensionsImage, setDimensionsImage] = useState({
    width: 0,
    height: 0,
  });

  const imageRef = useRef(null);
  const tagRef = useRef(null);
  const validPanorama = isValidUrl(panorama);

  const handleShowTags = () => {
    setShowTags(true);
  };

  const handleHideTags = () => {
    setShowTags(false);
    onRemoveProductId();
  };

  const handleFocusTag = (id, index) => {
    onGetProductId(id);
    onScrollToProduct(index, "index");
    handleShowTags();
  };

  const handleClickTag = (id, index) => {
    if (isMobile) {
      handleFocusTag(id, index);
    }
  };

  const handleLoadImage = () => {
    if (imageRef.current) {
      setDimensionsImage({
        width: imageRef.current.offsetWidth,
        height: imageRef.current.offsetHeight,
      });
    }
  };

  const checkVisibleTags = (tagId) => {
    if (isMobile || showTags) {
      return true;
    } else if (productSelectId === tagId) {
      return true;
    }
  };

  return (
    <div ref={imageRef} className={styles.main_image}>
      {isPanorama && validPanorama ? (
        // - Panorama
        <iframe
          style={dimensionsImage}
          className={styles.panorama_player}
          allow="xr-spatial-tracking; vr; gyroscope; accelerometer; fullscreen"
          allowFullScreen
          src={panorama}
        />
      ) : (
        // - Image
        <>
          <img
            onLoad={handleLoadImage}
            onMouseEnter={handleShowTags}
            onMouseLeave={handleHideTags}
            className={styles.image_item}
            src={`${conceptRoomImageURL}/${image}`}
            alt="Room image"
          />

          {/* + Tags */}
          {products.length > 0 &&
            products.map((tag, index) => {
              const isVisible = checkVisibleTags(tag.object_seq);
              const isActive = productSelectId === tag.object_seq;

              return (
                <div
                  key={index}
                  onMouseEnter={() => handleFocusTag(tag.object_seq, index)}
                  onClick={() => handleClickTag(tag.object_seq, index)}
                  style={{
                    left: `${tag.coord_x}%`,
                    top: `${tag.coord_y}%`,
                  }}
                  className={`
                    ${styles.tag_wrap}
                    ${isVisible ? "" : styles.tag_wrap__hidden}
                    ${isActive ? styles.tag_wrap__active : ""}
                  `}
                >
                  <span ref={tagRef} className={styles.tag_item}>
                    <AiOutlinePlus size={12} />
                  </span>

                  <AnimatePresence>
                    {productSelectId === tag.object_seq && (
                      <TagContent
                        id={tag.object_seq}
                        image={tag.product.thumbnail}
                        name={tag.product.product_nm}
                        price={tag.product.price}
                        link={tag.product.url}
                        tagRef={tagRef}
                        isCompany={tag.product.is_company_product}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
        </>
      )}

      {/* -- Button show panorama -- */}
      {validPanorama && (
        <button
          onClick={onTogglePanorama}
          className={`
            ${styles.panorama_btn}
            ${isPanorama ? styles.panorama_btn__active : ""}
          `}
        >
          {isPanorama ? (
            <AiFillHome size={24} />
          ) : (
            <img src="/images/svg/360-degrees.svg" alt="Icon 360" />
          )}
        </button>
      )}
    </div>
  );
};

const MainProducts = ({
  id,
  productsRef,
  products,
  disabled,
  productSelectId,
  isMobile,
  onFocus,
  onRemoveProductId,
  onScrollToProduct,
}) => {
  const [hideControls, setHideControls] = useState({
    prev: false,
    next: false,
  });
  const [showControls, setShowControls] = useState(false);

  const hideArrowPrev = !showControls || hideControls.prev;
  const hideArrowNext = !showControls || hideControls.next;

  useEffect(() => {
    handleHideControl();
  }, []);

  const handlePrev = () => {
    onScrollToProduct(2, "prev");
    handleHideControl("prev");
  };

  const handleNext = () => {
    onScrollToProduct(2, "next");
    handleHideControl("next");
  };

  const toggleShowControl = () => {
    setShowControls((prev) => !prev);
  };

  const handleHideControl = useCallback(
    (state) => {
      const productsElement = productsRef.current;
      const productsSwiper = productsElement.swiper;

      if (!productsElement && !productsSwiper) return;

      const isStart = productsElement && productsSwiper.isBeginning;
      const isEnd = productsElement && productsSwiper.isEnd;

      if (state === "prev") {
        setHideControls({ prev: isStart, next: false });
      } else if (state === "next") {
        setHideControls({ prev: false, next: isEnd });
      } else {
        setHideControls({ prev: isStart, next: isEnd });
      }
    },

    [id]
  );

  return (
    <div
      onMouseEnter={toggleShowControl}
      onMouseLeave={toggleShowControl}
      className={styles.main_products}
    >
      <Swiper
        ref={productsRef}
        slidesPerView="auto"
        spaceBetween={8}
        allowTouchMove={isMobile ? true : false}
        style={{ cursor: disabled ? "not-allowed" : "auto" }}
        className={styles.product_list}
      >
        {products.length > 0 &&
          products.map((item, index) => {
            const image = item.product.thumbnail;
            const isCompany = item.product.is_company_product;

            return (
              <SwiperSlide key={index} className={styles.product_block}>
                <ProductItem
                  image={image}
                  active={productSelectId === item.object_seq}
                  disabled={disabled}
                  isCompany={isCompany}
                  isMobile={isMobile}
                  onMouseEnter={() => onFocus(item.object_seq)}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>

      <button
        onMouseEnter={onRemoveProductId}
        onClick={handlePrev}
        className={`
          ${styles.products_arrow} 
          ${styles.products_arrow__left}
          ${hideArrowPrev ? styles.products_arrow__hide : ""}
        `}
      >
        <IoIosArrowBack size={24} />
      </button>

      <button
        onMouseEnter={onRemoveProductId}
        onClick={handleNext}
        className={`
          ${styles.products_arrow} 
          ${styles.products_arrow__right}
          ${hideArrowNext ? styles.products_arrow__hide : ""}
        `}
      >
        <IoIosArrowForward size={24} />
      </button>
    </div>
  );
};

const RoomImage = ({ id, image, panorama, products }) => {
  const [productSelectId, setProductSelectId] = useState(null);
  const [isPanorama, setIsPanorama] = useState(false);

  const productsRef = useRef(null);
  const isMobile = checkDevice() === "mobile";

  const handleFocusProduct = (id) => {
    handleGetProductId(id);
  };

  const handleGetProductId = (id) => {
    setProductSelectId(id);
  };

  const handleRemoveProductId = () => {
    setProductSelectId(null);
  };

  const togglePanorama = () => {
    setIsPanorama((prev) => !prev);
  };

  const scrollToProduct = useCallback(
    (index, state) => {
      const productsElement = productsRef.current;
      const currentIndex = productsElement.swiper.activeIndex;
      const isStart = productsElement.swiper.isBeginning;
      const isEnd = productsElement.swiper.isEnd;

      if (!productsElement && !productsElement.swiper) return;

      if (state === "prev" && !isStart) {
        productsElement.swiper.slideTo(currentIndex - index, 800);
      } else if (state === "next" && !isEnd) {
        productsElement.swiper.slideTo(currentIndex + index, 800);
      } else {
        productsElement.swiper.slideTo(index, 800);
      }
    },
    [id]
  );

  return (
    <div className={styles.room_image}>
      <MainImage
        image={image}
        panorama={panorama}
        products={products}
        productSelectId={productSelectId}
        isPanorama={isPanorama}
        isMobile={isMobile}
        onTogglePanorama={togglePanorama}
        onGetProductId={handleGetProductId}
        onRemoveProductId={handleRemoveProductId}
        onScrollToProduct={scrollToProduct}
      />

      <MainProducts
        id={id}
        productsRef={productsRef}
        products={products}
        disabled={isPanorama}
        productSelectId={productSelectId}
        isMobile={isMobile}
        onFocus={handleFocusProduct}
        onRemoveProductId={handleRemoveProductId}
        onScrollToProduct={scrollToProduct}
      />
    </div>
  );
};

export default RoomImage;
