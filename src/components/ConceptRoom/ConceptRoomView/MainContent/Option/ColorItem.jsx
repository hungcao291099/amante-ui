import $ from 'jquery';

import { conceptRoomImageURL } from '@utils/constants';
import { useConceptRoomContext } from '@contexts/ConceptRoomContext';

const ColorItem = ({ opt, obj, activeColor, setActiveColor, setProductInfo, isValidUrl }) => {
  const { activeView, activeVideo, optionMode, closeModalHandler } = useConceptRoomContext();

  const activeColorHandler = (option) => {
    setProductInfo({
      product: option.product?.length > 0 ? option.product : {},
      product3d: isValidUrl(option?.option_nm) ? option?.option_nm : null,
    });
    closeModalHandler();
    document.querySelector('.product-info-slide').scrollTo(0, 0);

    const colorId = option.id;
    const productOpt =
      optionMode === 'P'
        ? $(`.product-obj-${activeView}[data-obj-seq=${obj.id}]`)
        : $(`.product-obj-${activeView}`);

    productOpt.each(function () {
      const zIndex = $(this).data('od');
      if ($(this).data('opt-seq') === colorId) {
        $(this)[0].style.zIndex = zIndex;
        $(this)[0].style.opacity = 1;
        $(this).addClass('active');
        setActiveColor(colorId);
      } else {
        $(this)[0].style.zIndex = zIndex - 1;
        $(this)[0].style.opacity = 0;
        $(this).removeClass('active');
      }
    });
  };

  return (
    <li
      onClick={() => activeColorHandler(opt)}
      className="color-item"
      data-opt-seq={opt.id}
      data-obj-seq={obj.id}
    >
      <div
        data-obj-seq={obj.id}
        data-opt-seq={opt.id}
        className={`color-image ${activeVideo ? '' : opt.id === activeColor ? 'active' : ''}`}
      >
        <img src={`${conceptRoomImageURL}/${opt.thumbnail_img}`} />
        <span className="color-opacity"></span>
      </div>
      {/* <span>{opt.option_nm}</span> */}
    </li>
  );
};

export default ColorItem;
