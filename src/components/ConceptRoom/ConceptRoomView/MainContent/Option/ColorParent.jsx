import { useEffect, useState } from 'react';

import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import ColorItem from './ColorItem';
import { isValidUrl } from '@utils/functions';

const ColorParent = ({ obj, activeProduct, setProductInfo }) => {
  const { resetChanges, optionMode } = useConceptRoomContext();
  const [activeColor, setActiveColor] = useState(null);

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

  const checkOutside = (data) => {
    if (hasProduct(data) && hasProductOutside(data)) {
      return false
    } else if (hasProduct(data) && !hasProductOutside(data)) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    if (obj.id === activeProduct.id) {
      setProductInfo({
        product: hasProduct(obj) ? obj.options[0].product[0] : hasProductOutside(obj) && obj.options[0],
        productCard: hasProduct(obj) ? obj.options[0].product : hasProductOutside(obj) && obj.options,
        detectOutside: checkOutside(obj), 
        product3d: isValidUrl(obj.options[0]?.option_nm) ? obj.options[0]?.option_nm : null,
      });
    }

    setActiveColor(obj.options[0]?.id);
  }, [resetChanges, optionMode === 'L' && activeProduct.id]);


  return obj.options.map((opt, index) => {
    return (
      <ColorItem
        isValidUrl={isValidUrl}
        key={index}
        opt={opt}
        obj={obj}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        setProductInfo={setProductInfo}
      />
    );
  });
};

export default ColorParent;
