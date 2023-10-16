import { useNavigate } from "react-router";
import { formatNumber, likeProduct, removeHtmlTags } from "@utils/functions";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { conceptRoomImageURL } from "../../../../utils/constants";

const ProductCard = ({
  baseUrl,
  product,
  mainWebURL,
  custSeq,
  setShowFormOption,
  width,
  height,
  setShow3dProduct,
  product3d,
  outside,
}) => {
  const navigate = useNavigate();

  const data = (object) => {
    let imageUrl = "";
    let productName = "";
    let productPrice = "";
    let linkUrl = "";

    if (outside) {
      imageUrl = `${conceptRoomImageURL}/${object.out_thumbnail}`;
      productName = object.out_product_nm;
      productPrice = object.out_price;
      linkUrl = object.out_url;
    } else {
      imageUrl = `${baseUrl}/uploads/product/${object.file_nm}`;
      productName = parse(object.product_nm);
      productPrice = object.sale_price;
      linkUrl = null;
    }

    return { imageUrl, productName, productPrice, linkUrl };
  };

  return (
    <div style={{ width, height }} className="card-content d-flex">
      <div className="card-content-img">
        <img src={data(product).imageUrl} alt="" />
      </div>
      <div className="card-content-detail">
        <h4 className="detail-product-nm">
          {data(product).productName &&
            removeHtmlTags(data(product).productName)}
        </h4>

        <div className="detail-product-price d-flex align-items-center">
          {!outside && <span>{product?.fee_rate}%</span>}
          <h4>{formatNumber(data(product).productPrice)}원</h4>
        </div>

        <div className="d-flex gap-3 action-btn">
          <Link
            className="btn"
            target={outside ? "_blank" : ""}
            to={
              outside
                ? data(product).linkUrl
                : `/shop/product/product_view?product_cd=${product?.product_cd}`
            }
          >
            자세히보기
          </Link>
          {product3d && (
            <button onClick={() => setShow3dProduct(product3d)}>
              <img width={30} height={30} src="/images/cube.png" alt="" />
            </button>
          )}
        </div>

        {!outside && (
          <div className="d-flex justify-content-end">
            <div className="d-flex gap-2">
              <span
                className={`wish_product wish_${product?.product_cd} ${product?.wish_click_on}`}
                onClick={() => {
                  if (!custSeq) {
                    if (
                      confirm(
                        "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
                      )
                    ) {
                      navigate("/shop/login/login");
                    }
                  } else {
                    likeProduct(product?.product_cd, custSeq);
                  }
                }}
                alt="This is a like icon"
              />
              <img
                onClick={() =>
                  setShowFormOption({
                    state: true,
                    productCd: product?.product_cd,
                  })
                }
                src="/images/svg/pay-icon.svg"
                alt="This is a cart icon"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
