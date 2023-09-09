import { mainWebImageURL, mainWebURL } from '@utils/constants';
import ColorParent from '../Option/ColorParent';
import ProductInfo from './ProductInfo';

const OptionBottomMB = ({
  optionData,
  activeProduct,
  productInfo,
  setProductInfo,
  custSeq,
  setActiveProduct,
  baseUrl, 
  setShowFormOption,
  setShow3dProduct
}) => {
  return (
    <div id="options-bottom" className="options-bottom-mb">
      {Object.keys(activeProduct).length > 0 && (
        <div className="bottom-mb-wrap-content">
          <ul className="d-flex color-row-mb">
            {/* Render COLOR item */}
            {optionData.room_object?.length > 0 ? (
            optionData.room_object.map((obj, index) => (
                <div
                  className="wrap"
                  key={index}
                  style={{ display: obj.id === activeProduct.id ? 'flex' : 'none', gap: 10 }}
                >
                  <ColorParent
                    obj={obj}
                    activeProduct={activeProduct}
                    setProductInfo={setProductInfo}
                    setActiveProduct={setActiveProduct}
                  />
                </div>
              ))
            ) : (
              <span>등록된 색상이 없습니다.</span>
            )}
          </ul>
        </div>
      )}

      <ProductInfo
        productInfo={productInfo}
        mainWebImageURL={mainWebImageURL}
        mainWebURL={mainWebURL}
        custSeq={custSeq}
        baseUrl={baseUrl}
        setShowFormOption={setShowFormOption}
        setShow3dProduct={setShow3dProduct}
      />
    </div>
  );
};

export default OptionBottomMB;
