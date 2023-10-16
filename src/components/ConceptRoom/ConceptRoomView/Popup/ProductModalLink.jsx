import $ from 'jquery';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ProductModalLink = ({ product, isMobile }) => {
  const gapPC = '16px';
  const gapMB = '14px';
  const vertical = `calc(100% + ${isMobile ? gapMB : gapPC})`;
  const horizontal = `${isMobile ? -11 : -16}px`;
  const center = isMobile ? '-56px' : '-88px';
  const [inset, setInset] = useState(`${vertical} auto auto ${center}`);

  /* Check product modal is overflowed
    * set INSET
    - overflowed right: calc(100% + 16px) auto auto -16px
    - overflowed left: calc(100% + 16px) -16px auto auto
    - overflowed bottom: auto auto calc(100% + 16px) -128px
    - overflowed left bottom: auto auto calc(100% + 16px) -16px
    - overflowed right bottom: auto -16px calc(100% + 16px) auto
    - no overflowed: calc(100% + 16px) auto auto -128px
    * px will be different when appear of mobile
  */
  $(document).ready(function () {
    if (Object.keys(product).length > 0) {
      const childEl = $(`.product-modal-link.${product.id}`);
      const parentEl = $(`.product-modal-link.${product.id}`).parent().parent();
      if (childEl && parentEl) {
        const { left: childOffsetLeft, top: childOffsetTop } = childEl.offset();
        const { left: parentOffsetLeft, top: parentOffsetTop } = parentEl.offset();
        const childOffsetRight = childOffsetLeft + childEl.outerWidth();
        const chillOffsetBottom = childOffsetTop + childEl.outerHeight();
        const parentOffsetRight = parentOffsetLeft + parentEl.outerWidth();
        const parentOffsetBottom = parentOffsetTop + parentEl.outerHeight();

        if (childOffsetRight > parentOffsetRight) {
          childEl.each(function () {
            if (chillOffsetBottom > parentOffsetBottom) {
              $(this).addClass('overflowed-right-bottom');
              setInset(`auto ${horizontal} ${vertical} auto`)
            } else {
              $(this).addClass('overflowed-right');
              setInset(`${vertical} ${horizontal} auto auto`)
            }
          });
        } else if (childOffsetLeft < parentOffsetLeft) {
          childEl.each(function () {
            if (chillOffsetBottom > parentOffsetBottom) {
              $(this).addClass('overflowed-left-bottom');
              setInset(`auto auto ${vertical} ${horizontal}`)
            } else {
              $(this).addClass('overflowed-left');
              setInset(`${vertical} auto auto ${horizontal}`)
            }
          });
        } else if (chillOffsetBottom > parentOffsetBottom) {
          childEl.each(function () {
            $(this).addClass('overflowed-bottom');
            setInset(`auto auto ${vertical} ${center}`)
          });
        }
      }
    }
  });

  return (
    Object.keys(product).length > 0 && (
      <motion.div
        initial={{ opacity: 0, transform: 'translateY(-8%)' }}
        animate={{ opacity: 1, transform: 'translateY(-0%)' }}
        exit={{ opacity: 0, transform: 'translateY(-8%)' }}
        transition={{ duration: 0.1 }}
        className={`product-modal-link ${product.id}`}
        style={{ inset }}
      >
        <a href={product.url} target='_blank'>{product.product_nm}</a>
      </motion.div>
    )
  );
};

export default ProductModalLink;
