import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const ProductRelatedSection = ({ productView, baseUrl, codes }) => {
  
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 780,
        settings: {
          arrows: false,
          slidesToShow: 3,
          variableWidth: true,
        },
      },
    ],
  };

  return (
    <div className="must_buy_this">
      {productView.relationList?.length > 0 && (
        <>
          <p className="tit">이런상품 어때요</p>
          <div className="prd_list">
            <ul>
              <Slider {...settings}>
                {productView.relationList.map((product, index) => (
                  <li key={index}>
                    <div className="box a_or_wish" data-val={product.relation_product_cd}>
                      <Link
                        to={`/shop/product/product_view?product_cd=${product.relation_product_cd}`}
                      >
                        <div className="img_area">
                          {product.product_main_list?.length > 0 &&
                            product.product_main_list.map(
                              (img, index) =>
                                index < 1 && (
                                  <picture key={index}>
                                    {/*[if IE 9]><video style="display: none;"><![endif]*/}
                                    <source
                                      srcSet={
                                        img.file_nm !== ''
                                          ? `${baseUrl}/uploads/product/200/${img.file_nm}`
                                          : '/asset/images/shop/product/pro_in_img.jpg'
                                      }
                                      media="(min-width:768px)"
                                    />
                                    {/* pc이미지 */}
                                    <source
                                      srcSet={
                                        img.file_nm !== ''
                                          ? `${baseUrl}/uploads/product/200/${img.file_nm}`
                                          : '/asset/images/shop/product/pro_in_img.jpg'
                                      }
                                      media="(max-width:767px)"
                                    />
                                    {/* mb이미지 */}
                                    {/*[if IE 9]></video><![endif]*/}
                                    <img
                                      src={
                                        img.file_nm !== ''
                                          ? `${baseUrl}/uploads/product/200/${img.file_nm}`
                                          : '/asset/images/shop/product/pro_in_img.jpg'
                                      }
                                      alt=""
                                    />
                                    {/* pc이미지 */}
                                  </picture>
                                )
                            )}
                          <button
                            type="button"
                            className={`btn_wish ${product.wish_click_on} wish_${product.relation_product_cd}`}
                          >
                            위시리스트 담기
                          </button>
                        </div>
                      </Link>
                      <Link
                        to={`/shop/product/product_view?product_cd=${product.relation_product_cd}`}
                      >
                        <p className="tit">{product.relation_product_nm}</p>
                      </Link>
                      <p className="price">
                        {product.relation_supply_price !== product.relation_sale_price ? (
                          <>
                            <span>{product.relation_fee_rate}%</span>
                            <ins>{formatNumber(product.relation_sale_price)}</ins>
                            <del>{formatNumber(product.relation_supply_price)}</del>
                          </>
                        ) : (
                          <ins>{formatNumber(product.relation_sale_price)}</ins>
                        )}
                      </p>
                      <p className="review">
                        {product.point} <span>리뷰 {product.comment_count}</span>
                      </p>
                      <p className="label_info">
                        {product?.relation_icon !== '' &&
                          codes?.map(
                            (code, index) =>
                              product.relation_icon?.includes(code.code_cd2) && (
                                <span key={index}>{code.code_nm2}</span>
                              )
                          )}
                      </p>
                    </div>
                  </li>
                ))}
              </Slider>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductRelatedSection;
