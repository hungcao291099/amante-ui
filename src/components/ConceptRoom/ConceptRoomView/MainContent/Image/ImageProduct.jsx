import Marker from './Marker';

const ImageProduct = ({
  imageObject,
  productModal,
  openProductModalHandler,
  isMobile,
  hasMarker,
  setActiveProduct,
  optionData,
  activeView,
  optionMode,
  activeProduct,
  productMarker,
  objectRef,
  productInfo,
  baseUrl,
  mainWebURL,
  custSeq,
  setShow3dProduct
}) => {
  /* Check item of options have product: 
    - if have only one product_cd of item !== null return true
    - otherwise return false false
  */
  const hasProduct = (arr) => {
    const result = arr.options.some((item) => item.product_cd !== null);
    return result;
  };

  /* LOGIC CHECK
    - If have productMarker(show only one marker) -> (1) else -> (2)
    - (2) show product Product marker and Link outside marker
  */

  return (
    <>
      {productMarker ? (
        // (1)
        hasMarker &&
        imageObject?.map(
          (object, index) =>
            object.id === productMarker &&
            object.coord_x !== '00.00' &&
            object.coord_y !== '00.00' &&
            hasProduct(object) && (
              <Marker
                object={object}
                productModal={productModal}
                openProductModalHandler={openProductModalHandler}
                setActiveProduct={setActiveProduct}
                optionData={optionData}
                activeView={activeView}
                optionMode={optionMode}
                isMobile={isMobile}
                activeProduct={activeProduct}
                objectRef={objectRef}
                key={index}
                markerIndex={index}
                productInfo={productInfo}
                baseUrl={baseUrl}
                mainWebURL={mainWebURL}
                custSeq={custSeq}
                setShow3dProduct={setShow3dProduct}
              />
            )
        )
      ) : (
        // (2)
        <>
          {imageObject?.map(
            (object, index) =>
              object.coord_x !== '00.00' &&
              object.coord_y !== '00.00' &&
              hasProduct(object) &&
              (isMobile ? (
                hasMarker && (
                  <Marker
                    key={index}
                    object={object}
                    productModal={productModal}
                    openProductModalHandler={openProductModalHandler}
                    setActiveProduct={setActiveProduct}
                    optionData={optionData}
                    activeView={activeView}
                    optionMode={optionMode}
                    isMobile={isMobile}
                    activeProduct={activeProduct}
                    objectRef={objectRef}
                    markerIndex={index}
                    productInfo={productInfo}
                    baseUrl={baseUrl}
                    mainWebURL={mainWebURL}
                    custSeq={custSeq}
                    setShow3dProduct={setShow3dProduct}
                  />
                )
              ) : (
                // (3)
                <Marker
                  key={index}
                  object={object}
                  productModal={productModal}
                  openProductModalHandler={openProductModalHandler}
                  setActiveProduct={setActiveProduct}
                  optionData={optionData}
                  activeView={activeView}
                  optionMode={optionMode}
                  isMobile={isMobile}
                  activeProduct={activeProduct}
                  objectRef={objectRef}
                  markerIndex={index}
                  productInfo={productInfo}
                  baseUrl={baseUrl}
                  mainWebURL={mainWebURL}
                  custSeq={custSeq}
                  setShow3dProduct={setShow3dProduct}
                />
              ))
          )}

          {optionData.outside_prd?.length > 0 &&
            optionData.outside_prd.map((item, index) =>
              isMobile ? (
                hasMarker && (
                  <Marker
                    key={index}
                    object={item}
                    productModal={productModal}
                    openProductModalHandler={openProductModalHandler}
                    setActiveProduct={setActiveProduct}
                    optionData={optionData}
                    activeView={activeView}
                    optionMode={optionMode}
                    isMobile={isMobile}
                    activeProduct={activeProduct}
                    objectRef={objectRef}
                    markerIndex={index}
                    productInfo={productInfo}
                    detect="link-outside"
                  />
                )
              ) : (
                <Marker
                  key={index}
                  object={item}
                  productModal={productModal}
                  openProductModalHandler={openProductModalHandler}
                  setActiveProduct={setActiveProduct}
                  optionData={optionData}
                  activeView={activeView}
                  optionMode={optionMode}
                  isMobile={isMobile}
                  activeProduct={activeProduct}
                  objectRef={objectRef}
                  markerIndex={index}
                  productInfo={productInfo}
                  detect="link-outside"
                />
              )
            )}
        </>
      )}
    </>
  );
};

export default ImageProduct;
