import { cartInsert } from '@apis/cart';
import api from '@utils/api/api';
import { checkDevice, getCookie } from '@utils/functions';
import { baseImageUrl } from '@utils/constants'
import React, { useEffect, useState } from 'react';
import OptionC from '../../../../Product/ProductView/TopInfo/InfoDetail/OrderInfo/InfoArea/OptionC';
import OptionI from '../../../../Product/ProductView/TopInfo/InfoDetail/OrderInfo/InfoArea/OptionI';
import OptionS from '../../../../Product/ProductView/TopInfo/InfoDetail/OrderInfo/InfoArea/OptionS';
import AddCartSuccess from '../AddCartSuccess';

const ProductOptionForm = ({
  token,
  productCd,
  setShowFormOption,
  custSeq,
  navigate,
  formatNumber,
  baseUrl,
  show,
}) => {
  const [data, setData] = useState({});
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(true);
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowSnackbar(false);
    }, 4000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/shop/product/detail?product_cd=${productCd}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    document.querySelector('.product-option-form__info-detail .select_item').innerHTML = '';
    document.querySelector('.product-option-form__info-detail-total-price').innerText = 0;
    document.querySelector('.product-option-form__info-detail-total-qty').innerText = 0;
    setProductInfo({})
  }, [productCd]);

  const limitCheck =
    data?.order_limit_cnt > 0 && !custSeq ? 'N' : data?.order_limit_cnt > 0 && custSeq ? 'Y' : 'D';
  const sessionId = getCookie('session_id');

  const productCheck = (productCd, isCurr) => {
    // If you do not choose the options in the optional product and there is no product information box
    if (limitCheck === 'N') {
      alert('해당 상품은 로그인 후 서비스를 이용할 수 있습니다.');
      navigate('/shop/login/login');
      return false;
    }

    if (is_c_option_exist('concept_room') && get_all_box('concept_room').length == 0) {
      alert('옵션을 선택해주세요.');
      return false;
    }

    /* Check if the required option has been selected */
    var mandatory_info = []; //Arrangement to hold required options

    $('.product-option-form .option-item').each(function (idx) {
      if ($(this).find('ul').data('mandatory-yn') == 'Y') {
        mandatory_info.push($(this).find('ul').data('option-cd'));
      }
    });

    const boxes = get_all_box('concept_room');
    boxes.each(function () {
      for (var i = 0; typeof $(this).data('option' + i + '-nm') != 'undefined'; i++) {
        const option_cd = $(this).data('option' + i + '-cd');

        mandatory_info = mandatory_info.filter(function (element) {
          return element !== option_cd;
        });
      }
    });

    if (mandatory_info.length > 0) {
      const mandatory_option_nm = $("select[name='option" + mandatory_info[0] + "']").data(
        'option-nm'
      );

      alert(mandatory_option_nm + ' 옵션은 필수 선택입니다.');
      //alert("Only additional products cannot be purchased.");	//Request for change of phrase 2022-03-30
      return false;
    }

    /* Check if the required option has been selected */

    // Product information Object as a product information box
    const product_array = [];

    const order_qty = $('#order_qty').val();
    let exit = false;
    let free_trans_yn_exit = false;
    let product_count = 0;

    boxes.each(function () {
      free_trans_yn_exit = false;
      product_count = 0;
      const product_info = {};
      let product_add = 'N';
      product_info.product_cd = $(this).data('product-cd'); // Product number
      product_info.product_nm = $(this).data('product-nm'); // product name
      product_info.base_price = $(this).data('base-price'); // Product price (excluding options)
      product_info.is_mobile = commonUI.isMobile; // Order on mobile
      product_info.qty = $(this).data('qty'); // Number of products
      product_info.product_gb = $(this).data('product-gb');
      product_info.stock_seq = $(this).data('stock-seq'); //inventory seq
      product_info.limit_check = limitCheck;

      if (product_info.product_gb === 'P') {
        //In case of a single delivery product,
        product_count = product_count + parseInt($(this).data('qty'));
        if (data.free_trans_yn !== 2001 && data.free_trans_yn !== 2002) {
          if (product_count >= 2) {
            free_trans_yn_exit = true;
            return false;
          }
        }
      }

      if (limitCheck === 'Y') {
        if (data.order_limit_cnt - data.order_qty < product_info.qty) {
          alert(
            '회원님은 ' +
              (parseInt(order_limit_cnt) - parseInt(data.order_qty) + 1) +
              '개 이상 구매할 수 없습니다.'
          );
          exit = true;
          return false;
        }
      }

      if (is_c_option_exist('concept_room')) {
        if (Number(product_info.product_cd) !== Number(productCd)) {
          //In the case of additional component products, the product code is different and there is no option, so it is processed as no option
          product_info.option_yn = 'N';
          product_info.options = [];
        } else {
          product_info.option_yn = 'Y';
          product_info.options = [];
          for (var i = 0; typeof $(this).data('option' + i + '-nm') != 'undefined'; i++) {
            product_info.options.push({
              option_gb: $(this).data('option' + i + '-gb'),
              option_cd: $(this).data('option' + i + '-cd'),
              option_nm: $(this).data('option' + i + '-nm'),
              value_cd: $(this).data('option' + i + '-value-cd'),
              value_nm: $(this).data('option' + i + '-value-nm'),
              option_price: $(this).data('option-price'),
              w_opt: $(this).data('w-opt'),
            });

            //In the case of independent options (additional options), it is attached to the first shopping cart product option.
            if ($(this).data('option' + i + '-gb') == 'I') {
              product_array[0].options.push({
                option_gb: $(this).data('option' + i + '-gb'),
                option_cd: $(this).data('option' + i + '-cd'),
                option_nm: $(this).data('option' + i + '-nm'),
                value_cd: $(this).data('option' + i + '-value-cd'),
                value_nm: $(this).data('option' + i + '-value-nm'),
                option_qty: product_info.qty,
                option_price: $(this).data('option-price'),
                w_opt: $(this).data('w-opt'),
              });

              product_add = 'Y';
            }
          }
        }
      } else {
        product_info.option_yn = 'N';
      }

      if (product_add == 'N') {
        product_array.push(product_info);
      }
    });

    //Limit quantity escape
    if (exit) {
      return false;
    }

    if (free_trans_yn_exit) {
      alert('단일배송 상품입니다.');
      return false;
    }

    // Check out of stock if it is a la carte
    if (
      data.product_opt1_c?.length === 0 &&
      data.product_opt1_s?.length === 0 &&
      data.stock_soldout_yn === 'Y'
    ) {
      alert('품절 상품입니다.');
      return false;
    }

    if (limitCheck === 'Y' && data.order_limit_cnt > 0) {
      if (get_all_box('concept_room').length > 1) {
        alert('해당 상품은 한 개의 옵션만 선택할 수 있습니다.');
        return;
      }
    }

    // Add a shopping cart or just before purchasing, delete boxes, and re -calculate the total price
    if (is_c_option_exist('concept_room')) {
      get_all_box('concept_room').remove();
      total_box_price('concept_room');
    }

    if ($('#w_opt_text')) {
      if ($('#w_opt_text').val() === '') {
        alert('작성형 옵션을 선택해주세요.');
        return false;
      }
    }

    if (isCurr == 'F') {
      cartProduct(product_array);
    } else if (isCurr == 'G') {
      buyProductGift(product_array);
    } else {
      buyProduct(product_array);
    }
  };

  const cartProduct = async function (products) {
    const result = await cartInsert(products, 'F', sessionId, token);
    if (result.success) {
      const prevCount =
        checkDevice() === 'desktop' ? $('.another-menu li a em') : $('.util-menu-mb a em');
      prevCount.text(Number(prevCount.text()) + result.data.cart_cnt);
      setShowCartSuccess(true);
    }
  };

  const buyProduct = async function (products) {
    const result = await cartInsert(products, 'T', sessionId, token);
    if (result.success) {
      return navigate('/shop/order/order_write');
    } else {
      return navigate('/shop/login/login?iscurr=T');
    }
  };

  const buyProductGift = async function (products) {
    const result = await cartInsert(products, 'T', sessionId, token);
    if (result.success) {
      return navigate('/shop/order/order_write?direct_order=gift_direct');
    }
  };

  return (
    <div className={`product-option-form ${show ? '' : 'hidden'}`}>
      {showCartSuccess && data?.keywd ? (
        <AddCartSuccess
          keyword={data.keywd}
          api={api}
          custSeq={custSeq}
          formatNumber={formatNumber}
          baseUrl={baseUrl}
          setShowFormOption={setShowFormOption}
          navigate={navigate}
          setShowCartSuccess={setShowCartSuccess}
          baseImageUrl={baseImageUrl}
        />
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-between p-3 top-area">
            <h4 className="product-option-form__title">담을 옵션을 선택해 주세요</h4>
            <img
              className='btn-close'
              onClick={() =>
                setShowFormOption((prev) => ({ state: false, productCd: prev.productCd }))
              }
              src="/images/svg/times.svg"
              alt=""
            />
          </div>

          <div className="p-3 product-option-form__middle-area">
            <div className="d-flex gap-1 mb-1 align-items-center">
              <h3 className="product-option-form__label">상품구성</h3>
              <span className="main-title">(필수)</span>
              <span className="main-title">*</span>
            </div>

            <OptionC productView={data} api={api} detect="concept_room" />

            <OptionS
              productView={data}
              detect="concept_room"
              productInfo={productInfo}
              setProductInfo={setProductInfo}
            />

            <OptionI productView={data} detect="concept_room" />

            <div className="product-option-form__info-detail mt-4">
              <div className="select_item"></div>
              <div className="product-option-form__info-detail-row d-flex align-items-center justify-content-between">
                <h5>총 수량 </h5>
                <div>
                  <span className="product-option-form__info-detail-total-qty">0</span>개
                </div>
              </div>

              <div className="product-option-form__info-detail-row d-flex align-items-center justify-content-between">
                <h5>총 금액</h5>
                <div>
                  <span className="product-option-form__info-detail-total-price">0</span>원
                </div>
              </div>
            </div>

            <div className="product-option-form__info-detail-btn d-flex justify-content-between align-items-center mt-5 mb-1">
              <button
                onClick={() => {
                  if (custSeq) {
                    productCheck(productCd, 'G');
                  } else {
                    alert('로그인이 필요합니다.');
                    navigate(`/shop/login/login`);
                  }
                }}
              >
                <img src="/images/svg/gift.svg" alt="" />
              </button>

              <button onClick={() => productCheck(productCd, 'F')}>장바구니 담기</button>

              <button
                onClick={() => {
                  if (custSeq) {
                    productCheck(productCd, 'T');
                  } else {
                    alert('로그인이 필요합니다.');
                    navigate(`/shop/login/login`);
                  }
                }}
              >
                바로구매
              </button>
            </div>
          </div>

          {showSnackbar && (
            <div className="snackbar d-flex align-items-center justify-content-center">
              필수 옵션을 선택해 주세요
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductOptionForm;
