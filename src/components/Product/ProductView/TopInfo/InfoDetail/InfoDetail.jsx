import { cartInsert } from '@apis/cart';
import { checkDevice, getCookie } from '@utils/functions';
import BuyPay from './BuyPay';
import Coupon from './Coupon';
import Gift from './Gift';
import LineBanner from './LineBanner';
import OrderInfo from './OrderInfo/OrderInfo';
import ProductInfo from './ProductInfo';
import ReviewStar from './ReviewStar';
import TagAndShare from './TagAndShare/TagAndShare';

const InfoDetail = ({
  productView,
  baseUrl,
  codes,
  formatNumber,
  cust_seq,
  navigate,
  api,
  token,
}) => {
  const limitCheck =
    productView.order_limit_cnt > 0 && !cust_seq
      ? 'N'
      : productView.order_limit_cnt > 0 && cust_seq
      ? 'Y'
      : 'D';
  const sessionId = getCookie('session_id');

  // Run shopping cart & immediately through HTML data properties of each box
  function productCheck(productCd, iscurr) {
    // If you do not choose the options in the optional product and there is no product information box
    if (limitCheck === 'N') {
      alert('해당 상품은 로그인 후 서비스를 이용할 수 있습니다.');
      navigate('/shop/login/login');
      return false;
    }

    if (is_c_option_exist() && get_all_box().length == 0) {
      alert('옵션을 선택해주세요.');
      return false;
    }

    /* Check if the required option has been selected */
    var mandatory_info = []; //Arrangement to hold required options

    $('.select_box select').each(function (idx) {
      if ($(this).data('mandatory-yn') == 'Y') {
        mandatory_info.push($(this).data('option-cd'));
      }
    });

    var boxes = get_all_box();
    boxes.each(function () {
      for (var i = 0; typeof $(this).data('option' + i + '-nm') != 'undefined'; i++) {
        const option_cd = $(this).data('option' + i + '-cd');

        mandatory_info = mandatory_info.filter(function (element) {
          return element !== option_cd;
        });
      }
    });

    if (mandatory_info.length > 0) {
      var mandatory_option_nm = $("select[name='option" + mandatory_info[0] + "']").data(
        'option-nm'
      );

      alert(mandatory_option_nm + ' 옵션은 필수 선택입니다.');
      //alert("Only additional products cannot be purchased.");	//Request for change of phrase 2022-03-30
      return false;
    }
    /* Check if the required option has been selected */

    // Product information Object as a product information box
    var product_array = [];
    var boxes = get_all_box();

    let order_qty = $('#order_qty').val();
    let limit_check = limitCheck;
    let order_limit_cnt = $('#order_limit_cnt').val();
    var exit = false;
    var free_trans_yn_exit = false;
    var product_count = 0;

    boxes.each(function () {
      free_trans_yn_exit = false;
      product_count = 0;

      var product_info = {};
      var product_add = 'N';
      product_info.product_cd = $(this).data('product-cd'); // Product number
      product_info.product_nm = $(this).data('product-nm'); // product name
      product_info.base_price = $(this).data('base-price'); // Product price (excluding options)
      product_info.is_mobile = commonUI.isMobile; // Order on mobile
      product_info.qty = $(this).data('qty'); // Number of products
      product_info.product_gb = $(this).data('product-gb');
      product_info.stock_seq = $(this).data('stock-seq'); //inventory seq
      product_info.limit_check = limitCheck;

      if (product_info.product_gb == 'P') {
        //In case of a single delivery product,
        product_count = product_count + parseInt($(this).data('qty'));
        if (productView.free_trans_yn !== 2001 && productView.free_trans_yn !== 2002) {
          if (product_count >= 2) {
            free_trans_yn_exit = true;
            return false;
          }
        }
      }

      if (limit_check === 'Y') {
        if (order_limit_cnt - order_qty < product_info.qty) {
          alert(
            '회원님은 ' +
              (parseInt(order_limit_cnt) - parseInt(order_qty) + 1) +
              '개 이상 구매할 수 없습니다.'
          );
          exit = true;
          return false;
        }
      }

      if (is_c_option_exist()) {
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
      productView.product_opt1_c?.length === 0 &&
      productView.product_opt1_s?.length === 0 &&
      productView.stock_soldout_yn === 'Y'
    ) {
      alert('품절 상품입니다.');
      return false;
    }

    if (limitCheck === 'Y' && $('#order_limit_cnt').val() > 0) {
      if (get_all_box().length > 1) {
        alert('해당 상품은 한 개의 옵션만 선택할 수 있습니다.');
        return;
      }
    }

    // Add a shopping cart or just before purchasing, delete boxes, and re -calculate the total price
    if (is_c_option_exist()) {
      get_all_box().remove();
      total_box_price();
    }

    if ($('#w_opt_text')) {
      if ($('#w_opt_text').val() === '') {
        alert('작성형 옵션을 선택해주세요.');
        return false;
      }
    }

    // $.cookie('product_view_k', JSON.stringify(product_array) ,{ expires: 1, path: '/' }); //ga script
    if (iscurr == 'F') {
      cartProduct(product_array);
    } else if (iscurr == 'NPAY') {
      buyProductNpay(product_array);
    } else if (iscurr == 'K') {
      buyProductKakao(product_array);
    } else if (iscurr == 'G') {
      buyProductGift(product_array);
    } else {
      buyProduct(product_array);
    }
  }

  const cartProduct = async function (products) {
    const result = await cartInsert(products, 'F', sessionId, token);
    if (result.success) {
      const prevCount =
        checkDevice() === 'desktop' ? $('.another-menu li a em') : $('.util-menu-mb a em');
      prevCount.text(Number(prevCount.text()) + result.data.cart_cnt);
      commonUI.layer.open('.cart_layer', { bg: true, alert: true });
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

  const buyProductNpay = async function (products) {
    const result = await cartInsert(products, 'T', sessionId, token);
    if (result.success) {
      navigate('/shop/npay/move_pay');
    }
  };

  const buyProductKakao = async (products) => {
    const result = await cartInsert(products, 'T', sessionId, token);
    if (result.success) {
      navigate('/shop/order/order_write?direct_order=kakaopay_direct');
    }
  };

  return (
    <div className="prd_info">
      <LineBanner productView={productView} baseUrl={baseUrl} />

      <TagAndShare productView={productView} baseUrl={baseUrl} codes={codes} />

      <ReviewStar productView={productView} formatNumber={formatNumber} />

      <ProductInfo productView={productView} formatNumber={formatNumber} />

      <Coupon productView={productView} cust_seq={cust_seq} navigate={navigate} />

      <OrderInfo
        productView={productView}
        baseUrl={baseUrl}
        formatNumber={formatNumber}
        navigate={navigate}
        api={api}
        cust_seq={cust_seq}
        productCheck={productCheck}
      />

      <BuyPay productView={productView} productCheck={productCheck} />

      <Gift productView={productView} />
    </div>
  );
};

export default InfoDetail;
