import { AnimatePresence } from "framer-motion";
import $ from "jquery";
import ProductModalMB from "../../Popup/ProductModalMB";
import { AiOutlinePlus } from "react-icons/ai";

const Marker = ({
  object,
  productModal,
  isMobile,
  openProductModalHandler,
  setActiveProduct,
  optionData,
  activeView,
  optionMode,
  activeProduct,
  objectRef,
  markerIndex,
  productInfo,
  detect,
  baseUrl,
  mainWebURL,
  custSeq,
  setShow3dProduct,
}) => {
  const wrapObjectPC = document.querySelector(`.options-center .product`);

  const activeProductObjectHandler = (product) => {
    setActiveProduct({
      id: product.id,
      product_cd: product.product_cd,
      view: optionData.view_seq,
    });

    // Show image active when click product MARKER
    if (optionMode === "L") {
      const productOpt = $(`.product-obj-${activeView}`);
      productOpt.each(function () {
        const zIndex = $(this).data("od");
        if ($(this).data("opt-seq") === product.options[0]?.id) {
          $(this)[0].style.zIndex = zIndex + 1;
          $(this)[0].style.opacity = 1;
          $(this).addClass("active");
        } else {
          $(this)[0].style.zIndex = zIndex;
          $(this)[0].style.opacity = 0;
          $(this).removeClass("active");
        }
      });
    }
  };

  const slideToActiveView = () => {
    if (objectRef.current && objectRef.current.swiper) {
      objectRef.current.swiper.slideTo(markerIndex);
    }
  };

  /* Check item of options have product: 
    - if have only one product_cd of item !== null return true
    - otherwise return false false
  */
  const hasProduct = (data) => {
    return data.options?.some((item) =>
      item.product?.some((product) => product.product_cd)
    );
  };

  const hasProductOutside = (data) => {
    return data.options?.some(
      (item) =>
        item.out_url &&
        item.out_product_nm &&
        item.out_thumbnail &&
        item.out_price
    );
  };

  return (
    <div
      className="breakpoint"
      style={{
        left: detect === "link-outside" ? object.x + "%" : object.coord_x + "%",
        top: detect === "link-outside" ? object.y + "%" : object.coord_y + "%",
      }}
      onMouseEnter={() => {
        openProductModalHandler(object);
        if (object.id !== activeProduct.id && detect !== "link-outside") {
          activeProductObjectHandler(object);
        }

        if (markerIndex > 3) {
          wrapObjectPC.scrollTo({
            top: wrapObjectPC?.offsetHeight,
            behavior: "smooth",
          });
        } else {
          wrapObjectPC.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      onClick={() => {
        if (isMobile) {
          if (detect !== "link-outside") {
            slideToActiveView();
          } else {
            setActiveProduct({});
          }

          if (object.id !== activeProduct.id && detect !== "link-outside") {
            activeProductObjectHandler(object);
          }
        }
      }}
    >
      <AnimatePresence>
        {object?.id === productModal?.id && (
          <ProductModalMB
            object={
              hasProduct(object) || hasProductOutside(object)
                ? productInfo?.product
                : object
            }
            product3d={productInfo?.product3d}
            objectId={object.id}
            isMobile={isMobile}
            baseUrl={baseUrl}
            mainWebURL={mainWebURL}
            custSeq={custSeq}
            setShow3dProduct={setShow3dProduct}
            hasProductOutside={hasProductOutside(object)}
            detectOutside={productInfo.detectOutside}
            detect={detect}
          />
        )}
      </AnimatePresence>

      <span className="overlay-breakpoint"></span>

      <span
        className={`d-flex align-items-center justify-content-center breakpoint-img ${
          object?.id === productModal?.id ? "active" : ""
        }  ${detect === "link-outside" ? "link-outside" : ""}`}
      >
        {detect === "link-outside" ? <AiOutlinePlus /> : markerIndex + 1}
      </span>
    </div>
  );
};

export default Marker;
