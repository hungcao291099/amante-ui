import axios from 'axios';
import $ from 'jquery';
import { createContext, useContext, useRef, useState } from 'react';

import { baseURL } from '@utils/constants';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Context = createContext();

export const ConceptRoomContext = ({ children }) => {
  // ==================== VARIABLES ===========================
  const custSeq = 29092001;
  const exportRef = useRef();
  const {pathname} = useLocation()

  // ====================== STATES ============================
  const [room, setRoom] = useState({});
  const [activeView, setActiveView] = useState(0);
  const [activeLike, setActiveLike] = useState(false);
  const [activeCart, setActiveCart] = useState(false);
  const [productModal, setProductModal] = useState(null);
  const [productObject, setProductObject] = useState([]);
  const [hiddenProduct, setHiddenProduct] = useState([]);
  const [showProductCard, setShowProductCard] = useState(true);
  const [hiddenCoordinates, setHiddenCoordinates] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 912);
  const [resetChanges, setResetChanges] = useState(false);
  const [optionMode, setOptionMode] = useState(null);
  const [optionData, setOptionData] = useState({});
  const [showSocialModal, setShowSocialModal] = useState({state: false, type: 'out'})
  const [showFormOption, setShowFormOption] = useState({ state: false, productCd: null });
  const [show3dProduct, setShow3dProduct] = useState(null);

  window.addEventListener('resize', () => {
    setIsMobile(window.innerWidth < 912);
  });


  useEffect(() => {
    if (!isMobile && pathname.endsWith('concept_room_view')) {
      const styleEl = document.querySelector('body').style
      const styleHeader = document.querySelector('.header-pc').style
      if (showSocialModal.state) {
        styleEl.overflow = 'hidden'
        styleEl.paddingRight = '18px'
        styleHeader.position = 'absolute'
      } else {
        styleEl.cssText = ""
        styleHeader.position = 'fixed'
      }
    }
  }, [showSocialModal.state]);

  // ======================= FUNCTIONAL ========================

  /**
   * This function toggles the visibility of coordinates unless an active video is present, in which
   * case it displays an alert message.
   * returns If `activeVideo` is truthy, an alert message saying "동영상 숨김 부탁드립니다." will be returned. If
   * `activeVideo` is falsy, `setHiddenCoordinates` will be called with the opposite value of
   * `hiddenCoordinates` and `setProductModal` will be set to `null`. No value is explicitly returned
   * in this
   */
  const hiddenCoordinatesHandler = () => {
    setHiddenCoordinates(!hiddenCoordinates);
    setProductModal(null);
  };

  /**
   * The function toggles the display of product and child objects, adds or removes overlay color
   * items, and updates the hidden product state based on whether the product is included in the hidden
   * product array.
   */
  const activeProductHandler = (product) => {
    if (hiddenCoordinates) {
      if (!hiddenProduct.includes(product.id)) {
        // Hidden items
        $(`.product-obj-${activeView}[data-obj-seq=${product.id}]`).each(function () {
          $(this).css('opacity', 0);
          setHiddenProduct((prev) => [...prev, product.id]);
        });
        // Hidden children items
        product.child_obj.length > 0 &&
          product.child_obj.map((childObj) => {
            $(`.product-obj-${activeView}[data-obj-seq=${childObj}]`).each(function () {
              $(this).css('opacity', 0);
              setHiddenProduct((prev) => [...prev, childObj]);
            });
          });
        // Add overlay color items
        $(`.color-item[data-obj-seq=${product.id}]`).each(function () {
          $(this).css({ 'pointer-events': 'none' });
          $(this).find('.color-opacity').css({ display: 'block' });
        });
      } else {
        // Show product items
        $(`.product-obj-${activeView}[data-obj-seq=${product.id}]`).each(function () {
          if ($(this).data('first-item')) {
            $(this).css('opacity', 1);
          } else {
            $(this).css('opacity', 0);
          }
          setHiddenProduct((prev) => prev?.filter((item) => item !== product.id));
        });
        // Show children items
        product.child_obj.length > 0 &&
          product.child_obj.map((childObj) => {
            $(`.product-obj-${activeView}[data-obj-seq=${childObj}]`).each(function () {
              if ($(this).data('first-item')) {
                $(this).css('opacity', 1);
              } else {
                $(this).css('opacity', 0);
              }
              setHiddenProduct((prev) => prev?.filter((item) => item !== childObj));
            });
          });
        // Remove overlay color items
        $(`.color-item[data-obj-seq=${product.id}]`).each(function () {
          $(this).css('pointer-events', 'auto');
          $(this).find('.color-opacity').css({ display: 'none' });
        });
      }
    } else {
      if (hiddenProduct.includes(product.id)) {
        // Add overlay color items
        $(`.color-item[data-obj-seq=${product.id}]`).each(function () {
          $(this).css({ 'pointer-events': 'none' });
          $(this).find('.color-opacity').css({ display: 'block' });
        });
      }
    }
  };

  /**
   * The function changes the view and resets various states and CSS properties.
   */
  const changeViewHandler = (viewId) => {
    setResetChanges((prev) => !prev);
    setActiveView(viewId);
    setProductModal(null);
    setHiddenProduct([]);
    setHiddenCoordinates(false);

    $(`.product-obj-${activeView}`).each(function () {
      $(this).css('zIndex', $(this).data('od'));
      if ($(this).data('first-item')) {
        $(this).css('opacity', 1);
      } else {
        $(this).css('opacity', 0);
      }
    });

    $('.color-item').each(function () {
      if (!isMobile) {
        $(this).find('.color-opacity').css({ display: 'none' });
      }
    });
  };

  /**
   * This function sets the product modal state to a given sequence.
   */
  const openProductModalHandler = (seq) => {
    setProductModal(seq);
  };

  /**
   * The function closes a product modal by setting its value to null.
   */
  const closeModalHandler = () => {
    setProductModal(null);
  };

  /**
   * When the resetChangesHandler function is called, for each product-obj-activeView element, set the
   * display to block and the zIndex to the original zIndex.
   */
  const resetChangesHandler = () => {
    setResetChanges((prev) => !prev);

    $(`.product-obj-${activeView}`).each(function () {
      $(this).css('zIndex', $(this).data('od'));
      if ($(this).data('first-item')) {
        $(this).css('opacity', 1);
        $(this).addClass('active');
      } else {
        $(this).css('opacity', 0);
        $(this).removeClass('active');
      }
    });
    setHiddenProduct([]);
    setHiddenCoordinates(false);
    setProductModal(null);

    if (optionMode === 'P') {
      $('.color-item').each(function () {
        $(this).css('pointer-events', 'auto');
        $(this).find('.color-opacity').css({
          display: 'none',
        });
      });
    }
  };

  return (
    <Context.Provider
      value={{
        isMobile,
        custSeq,

        hiddenCoordinates,
        setHiddenCoordinates,
        showProductCard,
        setShowProductCard,
        activeLike,
        setActiveLike,
        activeCart,
        setActiveCart,
        activeView,
        setActiveView,
        room,
        setRoom,
        productModal,
        productObject,
        setProductObject,
        hiddenProduct,
        setHiddenProduct,
        exportRef,
        resetChanges,
        setResetChanges,
        optionMode,
        setOptionMode,
        optionData,
        setOptionData,
        showSocialModal,
        setShowSocialModal,
        showFormOption, 
        setShowFormOption,
        show3dProduct,
        setShow3dProduct,

        hiddenCoordinatesHandler,
        activeProductHandler,
        changeViewHandler,
        openProductModalHandler,
        closeModalHandler,
        resetChangesHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useConceptRoomContext = () => useContext(Context);
