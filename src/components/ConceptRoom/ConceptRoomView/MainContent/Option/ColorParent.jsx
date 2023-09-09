import { useEffect, useState } from 'react';

import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import ColorItem from './ColorItem';
import { isValidUrl } from '@utils/functions';

const ColorParent = ({ obj, activeProduct, setProductInfo }) => {
  const { resetChanges, optionMode } = useConceptRoomContext();
  const [activeColor, setActiveColor] = useState(null);

  useEffect(() => {
    if (obj.id === activeProduct.id) {
      setProductInfo({
        product: obj.options[0]?.product.length > 0 ? obj.options[0]?.product : {},
        product3d: isValidUrl(obj.options[0]?.option_nm) ? obj.options[0]?.option_nm : null,
      });
    }

    setActiveColor(obj.options[0]?.id);
  }, [resetChanges, optionMode === 'L' && activeProduct]);

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
