import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

const AddCartSuccess = ({
  keyword,
  api,
  custSeq,
  formatNumber,
  baseUrl,
  setShowFormOption,
  navigate,
  setShowCartSuccess,
  baseImageUrl
}) => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api({
          url: '/shop/product/get_product_by_keyword',
          method: 'GET',
          params: {
            keyword,
            cust_seq: custSeq,
          },
        });
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [keyword]);

  return (
    <>
      <div className="cart-success-title d-flex align-items-center justify-content-center">
        <h4>장바구니에 상품이 담겼습니다.</h4>
      </div>

      <div className='wrap-cart-success'>
        <div className="product-related">
          <h2>다른 고객이 함께 구매한 상품</h2>
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
                    src={`${baseUrl}/uploads/product/${product.file_nm}`}
                    alt=""
                  />
                  <img
                    className="heart-transparent"
                    src={`${baseImageUrl}/concept_room/ico/heart-transparent.png`}
                    alt=""
                  />
                </Link>
                <div className="keyword">{product.keywd}</div>
                <Link to={`/shop/product/product_view?product_cd=${product.product_cd}`}>
                <h4 style={{ marginBottom: 0 }}>{product.product_nm}</h4>
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
        
        <div className="d-flex align-items-center justify-content-between gap-3 cart-success-button">
          <button onClick={() => {
            setShowFormOption(prev => ({state: false, productCd: prev.productCd}))
            setShowCartSuccess(false)
          }}>쇼핑 계속하기</button>
          <button onClick={() => navigate('/shop/cart/cart_lists')}>장바구니로 이동하기</button>
        </div>
      </div>
    </>
  );
};

export default AddCartSuccess;
