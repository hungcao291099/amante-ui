import { Col } from 'react-bootstrap';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import OptionBottomMB from '../../MB/OptionBottomMB';
import ProductItem from '../ProductItem';

const OptionMb = ({
  setActiveProduct,
  activeProduct,
  productInfo,
  setProductInfo,
  setProductMarker,
  setHasMarker,
  objectRef,
  custSeq,
  baseUrl
}) => {
  const {
    optionData,
    setShow3dProduct,
    setShowFormOption
  } = useConceptRoomContext();

  return (
    <Col className="options-mb">

      {optionData.room_object?.length > 0 ? (
        <Swiper
          ref={objectRef}
          slidesPerView="auto"
          spaceBetween={10}
          className="options-center-mb d-flex"
        >
          {optionData.room_object?.map((product, productIndex) => (
            <SwiperSlide
              style={{
                width: '92px',
                height: '92px',
              }}
              key={productIndex}
            >
              <ProductItem
                item={{
                  product,
                  activeProduct,
                  setActiveProduct,
                  setProductMarker,
                  setHasMarker,
                  productIndex,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        null
      )}

      <OptionBottomMB
        optionData={optionData}
        activeProduct={activeProduct}
        productInfo={productInfo}
        custSeq={custSeq}
        setProductInfo={setProductInfo}
        baseUrl={baseUrl}
        setShowFormOption={setShowFormOption}
        setShow3dProduct={setShow3dProduct}
      />
    </Col>
  );
};

export default OptionMb;
