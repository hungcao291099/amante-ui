import { motion } from "framer-motion";
import $ from "jquery";
import { useContext, useState } from "react";
import parse from "html-react-parser";

import { mainWebImageURL, conceptRoomImageURL } from "@utils/constants";
import { formatNumber } from "@utils/functions";
import { Link, useNavigate } from "react-router-dom";
import { CdnContext } from "@contexts/cdnContext";

const ProductModalMB = ({
  object,
  objectId,
  isMobile,
  product3d,
  setShow3dProduct,
  hasProductOutside,
  detect,
  detectOutside,
}) => {
  const gapPC = "16px";
  const gapMB = "14px";
  const vertical = `calc(100% + ${isMobile ? gapMB : gapPC})`;
  const horizontal = `${isMobile ? -6 : -16}px`;
  const center = isMobile ? "-76px" : "-128px";
  const [inset, setInset] = useState(`${vertical} auto auto ${center}`);
  const navigate = useNavigate();
  const { baseUrl } = useContext(CdnContext);

  /* Check product modal is overflowed
    * set INSET
    - overflowed right: calc(100% + 16px) auto auto -16px
    - overflowed left: calc(100% + 16px) -16px auto auto
    - overflowed bottom: auto auto calc(100% + 16px) -128px
    - overflowed left bottom: auto auto calc(100% + 16px) -16px
    - overflowed right bottom: auto -16px calc(100% + 16px) auto
    - no overflowed: calc(100% + 16px) auto auto -128px
    * px will be different when appear of mobile
  */

  $(document).ready(function () {
    if (object && Object.keys(object)?.length > 0) {
      const childEl = $(`.product-modal-mb.${objectId}`);
      const parentEl = $(`.product-modal-mb.${objectId}`).parent().parent();
      if (childEl && parentEl) {
        const { left: childOffsetLeft, top: childOffsetTop } = childEl.offset();
        const { left: parentOffsetLeft, top: parentOffsetTop } =
          parentEl.offset();
        const childOffsetRight = childOffsetLeft + childEl.outerWidth();
        const chillOffsetBottom = childOffsetTop + childEl.outerHeight();
        const parentOffsetRight = parentOffsetLeft + parentEl.outerWidth();
        3;
        const parentOffsetBottom = parentOffsetTop + parentEl.outerHeight();

        if (childOffsetRight > parentOffsetRight) {
          childEl.each(function () {
            if (chillOffsetBottom > parentOffsetBottom) {
              $(this).addClass("overflowed-right-bottom");
              setInset(`auto ${horizontal} ${vertical} auto`);
            } else {
              $(this).addClass("overflowed-right");
              setInset(`${vertical} ${horizontal} auto auto`);
            }
          });
        } else if (childOffsetLeft < parentOffsetLeft) {
          childEl.each(function () {
            if (chillOffsetBottom > parentOffsetBottom) {
              $(this).addClass("overflowed-left-bottom");
              setInset(`auto auto ${vertical} ${horizontal}`);
            } else {
              $(this).addClass("overflowed-left");
              setInset(`${vertical} auto auto ${horizontal}`);
            }
          });
        } else if (chillOffsetBottom > parentOffsetBottom) {
          childEl.each(function () {
            $(this).addClass("overflowed-bottom");
            setInset(`auto auto ${vertical} ${center}`);
          });
        }
      }
    }
  });

  const data = (object) => {
    let imageUrl = "";
    let productName = "";
    let productPrice = "";
    let linkUrl = "";

    if (detect === "link-outside") {
      imageUrl = `${conceptRoomImageURL}/${object.thumbnail_img}`;
      productName = object.product_nm;
      productPrice = object.price;
      linkUrl = object.url;
    } else if (detectOutside) {
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
    object &&
    Object.keys(object)?.length > 0 && (
      <motion.div
        initial={{ opacity: 0, transform: "translateY(-8%)" }}
        animate={{ opacity: 1, transform: "translateY(0%)" }}
        exit={{ opacity: 0, transform: "translateY(-8%)" }}
        transition={{ duration: 0.1 }}
        className={`product-modal-mb ${objectId} `}
        style={{ inset }}
      >
        <div
          onClick={() =>
            isMobile &&
            navigate(
              `/shop/product/product_view?product_cd=${object?.product_cd}`
            )
          }
          className="d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center gap-2">
            <img className="main-img" src={data(object).imageUrl} />
            <div className="content d-flex flex-column justify-content-between">
              <div>
                <h5>{data(object).productName}</h5>
                <h4>{formatNumber(data(object).productPrice)}원</h4>
              </div>
              {!isMobile && (
                <div className="d-flex justify-content-end btn-3d">
                  <Link
                    className="btn"
                    target={
                      detectOutside || detect === "link-outside" ? "_blank" : ""
                    }
                    to={
                      detectOutside || detect === "link-outside"
                        ? data(object).linkUrl
                        : `/shop/product/product_view?product_cd=${object?.product_cd}`
                    }
                  >
                    자세히보기
                  </Link>
                  {product3d && (
                    <button onClick={() => setShow3dProduct(product3d)}>
                      <img
                        width={30}
                        height={30}
                        src="/images/cube.png"
                        alt=""
                      />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default ProductModalMB;
