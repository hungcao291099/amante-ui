import { useEffect } from 'react';

import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import { conceptRoomImageURL } from '@utils/constants';

const ProductItem = ({ item }) => {
  const { product, activeProduct, setActiveProduct, setProductInfo } = item;
  const {
    hiddenProduct,
    activeView,
    activeVideo,
    setActiveVideo,
    isMobile,

    activeProductHandler,
    fetchProductRelated,
  } = useConceptRoomContext();

  useEffect(() => {
    if (activeProduct !== undefined && activeProduct.view === activeView) {
      fetchProductRelated(activeProduct.product_cd);
    }
  }, [activeProduct, activeView]);

  return (
    <div
      data-obj-seq={[product.id]}
      className={`product-img ${
        activeVideo ? '' : product.id === activeProduct?.id ? 'active' : ''
      }`}
      onClick={() => {
        if (isMobile) {
          setProductInfo(product.product_detail);
        }
        activeProductHandler(product);
        setActiveProduct({ id: product.id, product_cd: product.product_cd });
        setActiveVideo(false);
      }}
    >
      {activeVideo ? (
        <div className="disabled-item">숨겨짐</div>
      ) : (
        hiddenProduct.includes(product.id) && <div className="disabled-item">숨겨짐</div>
      )}
      <img src={`${conceptRoomImageURL}/${product.thumbnail_img}`} alt="" />
    </div>
  );
};

export default ProductItem;
