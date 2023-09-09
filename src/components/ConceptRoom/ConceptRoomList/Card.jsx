import { Col } from 'react-bootstrap';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/scrollbar';

import { conceptRoomImageURL } from '@utils/constants';
import ProductItem from './ProductItem';

const Card = ({ data }) => {
  const { room, lastRef } = data;

  return (
    <Col lg={4} className="room-card" ref={lastRef}>
      <div className="mb-3">
        <Link to={`/shop/concept_room/concept_room_view?concept_room_seq=${room.concept_room_seq}`}>
          <h3>
            [스타일링 by {room.brand}] {room.concept_room_nm}
          </h3>
        </Link>
        <ScrollContainer className="room-style d-flex gap-2">
          {room.style.split('#').map((item, index) => index !== 0 && <h6 key={index}>{item}</h6>)}
        </ScrollContainer>
      </div>
      <Link to={`/shop/concept_room/concept_room_view?concept_room_seq=${room.concept_room_seq}`}>
        <img src={`${conceptRoomImageURL}/${room.thumbnail_img}`} alt="" />
      </Link>
      <ScrollContainer className="product-list d-flex">
        {/* ------------ PRODUCT item render -------------- */}
        {room.product_main_file?.map((product, index) => (
          <li className="image-item" key={index}>
            <ProductItem data={{ product }} />
          </li>
        ))}
      </ScrollContainer>
    </Col>
  );
};

export default Card;
