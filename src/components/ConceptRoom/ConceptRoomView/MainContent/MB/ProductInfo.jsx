import ScrollContainer from 'react-indiana-drag-scroll';
import ProductCard from '../../Popup/ProductCard';

const ProductInfo = ({ productInfo, mainWebURL, custSeq, baseUrl, setShowFormOption, setShow3dProduct }) => {
  return (
    <>
      <div className="product-form-mb">
        <h5>제품 상세정보</h5>
        {/* Render PRODUCT item */}

        <ScrollContainer className="d-flex gap-3 product-info-slide">
          {productInfo.product?.length > 0 &&
            productInfo.product.map((product, index) => (
              <ProductCard
                key={index}
                baseUrl={baseUrl}
                product={product}
                mainWebURL={mainWebURL}
                custSeq={custSeq}
                setShowFormOption={setShowFormOption}
                width="322px"
                height="162px"
                setShow3dProduct={setShow3dProduct}
                product3d={productInfo?.product3d}
              />
            ))}
        </ScrollContainer>
      </div>
    </>
  );
};

export default ProductInfo;
