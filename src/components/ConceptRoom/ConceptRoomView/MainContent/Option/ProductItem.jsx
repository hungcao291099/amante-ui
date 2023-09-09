import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import { conceptRoomImageURL } from '@utils/constants';
import $ from 'jquery';

const ProductItem = ({ item }) => {
  const { product, activeProduct, setActiveProduct, setProductMarker, setHasMarker, productIndex } =
    item;
  const {
    hiddenProduct,
    activeView,
    optionMode,

    activeProductHandler,
    closeModalHandler,
  } = useConceptRoomContext();

  return (
    <div
      data-obj-seq={product.id}
      className={`product-img ${product.id === activeProduct?.id ? 'active' : ''}`}
      onClick={() => {
        if (optionMode === 'L') {
          const productOpt = $(`.product-obj-${activeView}`);
          productOpt.each(function () {
            const zIndex = $(this).data('od');
            if ($(this).data('opt-seq') === product.options[0]?.id) {
              $(this)[0].style.zIndex = zIndex + 1;
              $(this)[0].style.opacity = 1;
              $(this).addClass('active');
            } else {
              $(this)[0].style.zIndex = zIndex;
              $(this)[0].style.opacity = 0;
              $(this).removeClass('active');
            }
          });
        } else {
          activeProductHandler(product);
        }

        setProductMarker(product.id);
        setHasMarker(true);
        setActiveProduct({ id: product.id, product_cd: product.product_cd });
        closeModalHandler();
        document.querySelector('.product-info-slide').scrollTo(0, 0);
      }}
    >
      {hiddenProduct.includes(product.id) ? <div className="disabled-item">숨겨짐</div> : null}
      <span className={`label-index ${product.id === activeProduct?.id ? 'active' : ''}`}>
        {productIndex + 1}
      </span>
      <img src={`${conceptRoomImageURL}/${product.thumbnail_img}`} alt="" />
    </div>
  );
};

export default ProductItem;
