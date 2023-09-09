import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { BsMoon, BsSun } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCreative, Pagination, Navigation } from 'swiper';

import Option from '@components/ConceptRoom/ConceptRoomView/MainContent/Option/Option';
import OptionMb from '@components/ConceptRoom/ConceptRoomView/MainContent/Option/OptionMB/OptionMb';
import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import Image from './Image/Image';

const ContentArea = ({ viewArr, custSeq, baseUrl }) => {
  const { resetChanges, setActiveView, setOptionData, optionData, closeModalHandler } =
    useConceptRoomContext();
  const [productInfo, setProductInfo] = useState([]);
  const [activeProduct, setActiveProduct] = useState({});
  const [productMarker, setProductMarker] = useState(null);
  const [hasMarker, setHasMarker] = useState(false);
  const [showPlayer360, setShowPlayer360] = useState(false);

  const objectRef = useRef();

  useEffect(() => {
    if (optionData.room_object) {
      setActiveProduct({
        id: optionData.room_object[0]?.id,
        product_cd: optionData.room_object[0]?.product_cd,
        view: optionData?.view_seq,
      });
    }
  }, [resetChanges, optionData]);

  const handleSlideChange = (e) => {
    const activeIndex = e.activeIndex;
    const viewSeq = Number(e.slides[activeIndex].getAttribute('data-view-seq'));
    setActiveView(viewSeq);
    setProductMarker(null);
    setHasMarker(false);
    closeModalHandler();
    document.querySelector('.product-info-slide').scrollTo(0, 0);

    viewArr.map((view) => {
      if (view.view_seq === viewSeq) {
        setOptionData(view);
      }
    });
  };

  return (
    <Row className="content-area">
      {/* <div className="pagination-custom">
          {viewArr?.map((view, index) => (
            <span className={index <= viewIndex ? 'active' : null} key={index}></span>
          ))}
        </div> */}
      <Swiper
        className="image-list"
        onSlideChange={handleSlideChange}
        slidesPerView={1}
        grabCursor={true}
        effect="creative"
        navigation={!showPlayer360}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: 'custom-active-bullet',
          bulletClass: 'custom-bullet',
          el: viewArr?.length > 6 ? '.pagination-fraction' : '.pagination-bullets',
          type: viewArr?.length > 6 ? 'custom' : 'bullets',
          renderCustom: function (swiper, current, total) {
            return `${current} / ${total}`;
          },
          renderBullet: (index, className) => {
            return `<span class=${className}></span>`;
          },
        }}
        modules={[Pagination, EffectCreative, Navigation]}
      >
        {viewArr?.map((view, index) => (
          <SwiperSlide key={index} data-view-seq={view.view_seq}>
            <Image
              view={view}
              setActiveProduct={setActiveProduct}
              activeProduct={activeProduct}
              productMarker={productMarker}
              hasMarker={hasMarker}
              setHasMarker={setHasMarker}
              objectRef={objectRef}
              productInfo={productInfo}
              setProductMarker={setProductMarker}
              baseUrl={baseUrl}
              custSeq={custSeq}
              showPlayer360={showPlayer360}
              setShowPlayer360={setShowPlayer360}
            />
          </SwiperSlide>
        ))}

        <div style={{
          visibility: showPlayer360 ? 'hidden' : 'visible'
        }} className={viewArr?.length > 6 ? 'pagination-fraction' : 'pagination-bullets'}></div>
      </Swiper>

      <Option
        setActiveProduct={setActiveProduct}
        activeProduct={activeProduct}
        setProductInfo={setProductInfo}
        setProductMarker={setProductMarker}
        setHasMarker={setHasMarker}
      />
      <OptionMb
        setActiveProduct={setActiveProduct}
        activeProduct={activeProduct}
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        setProductMarker={setProductMarker}
        setHasMarker={setHasMarker}
        objectRef={objectRef}
        custSeq={custSeq}
        baseUrl={baseUrl}
      />
    </Row>
  );
};

export default ContentArea;
