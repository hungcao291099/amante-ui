import { useNavigate } from 'react-router';
import { formatNumber, likeProduct } from '@utils/functions';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

const ProductCard = ({ baseUrl, product, mainWebURL, custSeq, setShowFormOption, width, height, setShow3dProduct, product3d }) => {
  const navigate = useNavigate();

  return (
    <div style={{width, height}} className="card-content d-flex">
      <div className="card-content-img">
        <img src={`${baseUrl}/uploads/product/${product?.file_nm}`} alt="" />
      </div>
      <div className="card-content-detail">
        <h4
          href={`${mainWebURL}/product/product_view?product_cd=${product?.product_cd}`}
          className="detail-product-nm"
        >
          {product?.product_nm && parse(product.product_nm)}
        </h4>

        <div className="detail-product-price d-flex align-items-center">
          <span>{product?.fee_rate}%</span>
          <h4>{formatNumber(product?.sale_price)}원</h4>
        </div>

        <div className="d-flex gap-3 action-btn">
          <Link className="btn" to={`/shop/product/product_view?product_cd=${product?.product_cd}`}>
            자세히보기
          </Link>
          {product3d && (
            <button onClick={() => setShow3dProduct(product3d)}>
              <img width={30} height={30} src="/images/cube.png" alt="" />
            </button>
          )}
        </div>

        <div className="d-flex justify-content-end">
          <div className="d-flex gap-2">
            <span
              className={`wish_product wish_${product?.product_cd} ${product?.wish_click_on}`}
              onClick={() => {
                if (!custSeq) {
                  if (confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?')) {
                    navigate('/shop/login/login');
                  }
                } else {
                  likeProduct(product?.product_cd, custSeq);
                }
              }}
              alt="This is a like icon"
            />
            <img
              onClick={() => setShowFormOption({ state: true, productCd: product?.product_cd })}
              src="/images/svg/pay-icon.svg"
              alt="This is a cart icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
