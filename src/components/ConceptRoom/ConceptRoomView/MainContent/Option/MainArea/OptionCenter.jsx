import ScrollContainer from 'react-indiana-drag-scroll';
import ProductItem from '../ProductItem';

const OptionCenter = ({
  optionData,
  activeProduct,
  setActiveProduct,
  setProductMarker,
  setHasMarker,
}) => {
  return (
    <div className="options-center">
      <h2>제품선택</h2>
      <ScrollContainer
        style={{ height: optionData.room_object?.length > 4 ? '80%' : 'auto' }}
        className="product d-flex align-items-center"
      >
        {/* Render PRODUCT item */}
        {optionData.room_object?.length > 0 ? (
          optionData.room_object?.map((product, productIndex) => (
            <ProductItem
              key={productIndex}
              item={{
                product,
                activeProduct,
                setActiveProduct,
                productIndex,
                setProductMarker,
                setHasMarker,
              }}
            />
          ))
        ) : (
          <span className="no-product">등록된 제품이 없습니다.</span>
        )}
      </ScrollContainer>
    </div>
  );
};

export default OptionCenter;
