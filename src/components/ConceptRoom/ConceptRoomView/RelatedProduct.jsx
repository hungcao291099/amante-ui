import { Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';

import { baseImageUrl, mainWebImageURL } from '@utils/constants';
import { formatNumber } from '@utils/functions';
import { Link } from 'react-router-dom';

const RelatedProduct = ({ products }) => {
  return (
    <>
      <Row>
        <div className="product-related">
          <h2>함께 비교하면 좋을 상품</h2>
          <Swiper slidesPerView="auto" spaceBetween={10}>
            {/* --------------- PRODUCT related render -------------- */}
            {products?.map((product, index) => (
              <SwiperSlide className="product-item" key={index}>
                <Link
                  to={`/shop/product/product_view?product_cd=${product.product_cd}`}
                  className="product-related-img"
                >
                  <img
                    className="product-img"
                    src={`${mainWebImageURL}/product/${product.file_nm}`}
                    alt=""
                  />
                  <img
                    className="heart-transparent"
                    src={`${baseImageUrl}/concept_room/ico/heart-transparent.png`}
                    alt=""
                  />
                </Link>
                <div className="keyword">{product.keywd}</div>
                <Link
                  to={`/shop/product/product_view?product_cd=${product.product_cd}`}
                >
                  <h4 style={{marginBottom: 0}}>{product.product_nm}</h4>
                </Link>
                <div className="percentage">
                  <h4>{product.fee_rate}%</h4>
                  <h4>{formatNumber(product.sale_price)}원</h4>
                </div>
                <div className="rating">
                  <div className="star">
                    <img src={`${baseImageUrl}/concept_room/ico/star.png`} alt="" />
                    <span>{product.review_avg_point}</span>
                  </div>
                  <div className="review">
                    <span>리뷰</span>
                    <span>{product.review_cnt}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Row>

      <div className="content-line"></div>
    </>
  );
};

export default RelatedProduct;
