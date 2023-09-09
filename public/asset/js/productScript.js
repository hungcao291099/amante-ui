let w_opt = false;
const _CSRF_NAME_ = 'amante_csrf_token';

const formatNumber = (number) => {
  var formatter = new Intl.NumberFormat('en-US', {
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(number);
};

// -Bring the product box through the box ID
function get_box(box_id, type, detect) {
  if (type) {
    if (type === 'OPT') {
      return $('div[data-cart_opt_seq="' + box_id + '"]');
    }
    return $('div[data-cart-seq="' + box_id + '"]');
  } else {
    if (detect === 'concept_room') {
      return $(`.product-option-form__info-detail li[data-box-id="${box_id}"]`);
    } else {
      return $(`ul.select_item li[data-box-id="${box_id}"]`);
    }
  }
}

// -Delete the product box with the product box ID
function box_del(box_id, detect) {
  get_box(box_id, null, detect).remove();
  total_box_price(detect); // 전체 상품 가격 재계산
  if (w_opt === true) {
    w_opt = false;
  }
}

// -The number of boxes of the product must be set, and the add -oriented value should be included in the +1 -1.
function box_qty(box_id, add, quantiry, detect) {
  var box = get_box(box_id, null, detect);
  var qty = parseInt(box.data('qty')) + parseInt(add);

  var order_mini_quantiry = quantiry;
  //제한수량 체크
  if ($('#limit_check').val() === 'Y' && $('#order_limit_cnt').val() > 0) {
    //console.log( get_all_box() ) ;
    let limit_cnt = $('#order_limit_cnt').val();
    if (limit_cnt < qty) {
      alert('해당 상품은 ' + (parseInt(limit_cnt) + 1) + '개 이상 구매할 수 없습니다.');
      return false;
    }
  }

  if (qty >= order_mini_quantiry) {
    box.data('qty', qty);
    box.find('input.qty').val(qty);
    box_price(box_id, detect); // 개수 설정 후 박스 가격 계산
  } else {
    alert('최소 구매수량은 ' + order_mini_quantiry + '개 입니다.');
  }
}

// -Product price calculation, execution of total price calculations
function box_price(box_id, detect) {
  var $box = get_box(box_id, null, detect);

  var price = ($box.data('base-price') + $box.data('option-price')) * $box.data('qty');
  $box.find('.price').text(formatNumber(price));
  total_box_price(detect); // 바뀐 가격정보로 전체 가격 재계산
}

// -Bring all product boxes
function get_all_box(detect) {
  if (detect === 'concept_room') {
    return $('.product-option-form__info-detail li.item_box');
  } else {
    return $('ul.select_item li');
  }
}

function is_form_c_options_valid(detect) {
  let result = true;

  if (is_c_option_exist(detect)) {
    $(
      `.${
        detect === 'concept_room' ? 'product-option-form' : 'prd_info .order_info'
      } .select_box select[data-option-gb="C"]`
    ).each(function () {
      if ($(this).val() == '') {
        result = false;
        return false; // break $().each
      }
    });
  }

  return result;
}

// -Used to check if the product on the current page is an optional product
function is_c_option_exist(detect) {
  return (
    $(
      `.${
        detect === 'concept_room' ? 'product-option-form' : 'prd_info .order_info'
      } .select_box select`
    ).length > 0
  );
}

// -Importing the current optional option value
function get_form_c_options(detect) {
  if (!is_c_option_exist(detect)) {
    return {};
  }
  const options = [];

  $(
    `.${
      detect === 'concept_room' ? 'product-option-form' : 'prd_info .order_info'
    } .select_box select[data-option-gb="C"]`
  ).each(function () {
    if (!$(this).children('option:selected').val()) {
      return {};
    }

    options.push({
      option_gb: $(this).data('option-gb'),
      option_cd: $(this).data('option-cd'),
      option_nm: $(this).data('option-nm'),
      value_cd: $(this).children('option:selected').val(),
      value_nm: $(this).children('option:selected').data('option-nm'),
      price: $(this).children('option:selected').data('price'),
    });
  });
  return options;
}

// -Add product boxes, product and option information are stored in HTML data properties
function create_opt_box(product_info, detect) {
  var options = product_info.option_yn == 'Y' ? product_info.options : [];
  var box_id = get_box_id(product_info);

  if (is_box_exist(box_id, detect)) {
    return alert('이미 선택된 옵션입니다.');
  }

  var option_price = 0;
  if (product_info.option_yn == 'Y') {
    $.each(options, function (idx, option) {
      option_price += parseInt(option.price);
    });
  }

  let html = '';
  html += `<li class='item_box' data-box-id=${box_id} data-base-price=${product_info.base_price} data-option-price=${option_price} data-qty=${product_info.qty} `;
  html +=
    "data-product-cd='" +
    product_info.product_cd +
    "' data-product-gb='" +
    product_info.product_gb +
    "' data-stock-seq='" +
    product_info.stock_seq +
    "' ";
  html += `data-product-nm=${product_info.product_nm}} `;

  if (!w_opt) {
    html += "data-w-opt = ''";
  } else {
    html += "data-w-opt = '" + $('#w_opt_text').val() + "'";
  }

  var option_gb = null;
  if (product_info.option_yn == 'Y') {
    $.each(options, function (idx, option) {
      html += ' data-option' + idx + "-gb='" + option.option_gb + "' ";
      html += ' data-option' + idx + "-cd='" + option.option_cd + "' ";
      html += ' data-option' + idx + "-nm='" + option.option_nm + "' ";
      html += ' data-option' + idx + "-value-cd='" + option.value_cd + "' ";
      html += ' data-option' + idx + "-value-nm='" + option.value_nm + "' ";
      html += ' data-option' + idx + "-price='" + option.price + "' ";
      option_gb = option.option_gb;
    });
  }
  html += '>';

  if (option_gb !== 'C') {
    html += '<p>' + product_info.product_nm + '</p>';
  }

  if (product_info.option_yn == 'Y') {
    var opt_nm = '';
    $.each(options, function (idx, option) {
      if (option.option_gb == 'C') {
        opt_nm += option.value_nm + ' / ';
      }
    });

    if (option_gb === 'C' && $('#w_opt_text').length > 0) {
      opt_nm += $('#w_opt_text').val();
    }

    if (opt_nm) {
      html += '<strong>';
      html += opt_nm.trim().replace(/\/+$/, '');
      html += '</strong>';
    }
  }

  html += "<div class='count'>";
  html +=
    "	<button type='button' class='min' onclick='box_qty(\"" +
    box_id +
    '", -1, "' +
    product_info.qty +
    '", "' +
    detect +
    '")\'><span>감소</span></button>';
  html += `<input type='num' class='qty' value=${product_info.qty} title='수량' readonly/>`;
  html +=
    "	<button type='button' class='plus' onclick='box_qty(\"" +
    box_id +
    '", 1, "' +
    product_info.qty +
    '", "' +
    detect +
    '")\'><span>증가</span></button>';
  html += '</div>';
  html += "<p class='price'>" + formatNumber(product_info.base_price + option_price) + '</p>';
  html +=
    "<div class='btn'><button type='button' class='del' onclick='box_del(\"" +
    box_id +
    '", "' +
    detect +
    '")\'>삭제</button></div>';
  html += '</li>';

  if (detect === 'concept_room') {
    $('.product-option-form__info-detail .select_item').append(html);
  } else {
    $('.product_view_page .select_item').append(html);
  }

  total_box_price(detect);
  reset_option_form(detect); // 생성 후 옵션값 다시 선택할 수 있게 초기화
}

// -Create a unique box ID through product information (this page is used only for duplicate checks and is not stored in DB, etc.)
function get_box_id(product_info) {
  var options = JSON.stringify(product_info);
  return window.btoa(encodeURIComponent(escape(options)));
}

// -Check the already added product using the box ID
function is_box_exist(box_id, detect) {
  return get_box(box_id, null, detect).length > 0;
}

// -Full price calculation execution
function total_box_price(detect) {
  let price = 0;
  let qty = 0;

  if (detect === 'concept_room') {
    $('.product-option-form__info-detail li').each(function () {
      price += ($(this).data('base-price') + $(this).data('option-price')) * $(this).data('qty');
      qty += $(this).data('qty');
    });

    $('.product-option-form__info-detail-total-price').text(formatNumber(price));
    $('.product-option-form__info-detail-total-qty').text(formatNumber(qty));
  } else {
    $('ul.select_item li').each(function () {
      price += ($(this).data('base-price') + $(this).data('option-price')) * $(this).data('qty');
    });
    $('.total_price span').text(formatNumber(price) + '원');
  }
}

// -As an initial value
function reset_option_form(detect) {
  $(
    `.${
      detect === 'concept_room' ? 'product-option-form' : 'prd_info .order_info'
    } .select_box select`
  ).val('');

  //조합옵션일때 첫번째 옵션 빼고 나머지의 옵션값은 제거
  $(
    `.${
      detect === 'concept_room' ? 'product-option-form' : 'prd_info .order_info'
    } .select_box select[data-option-gb="C"]`
  ).each(function (idx) {
    //if( 'OPT_1' < $(this).data('option-cd') ){
    if (1 < $(this).data('index')) {
      $(this).children('option:not(:first)').remove();
    }
  });
}

function box_qty_cart(idd, add, token, koApiURL) {
  // let	cart_seq		=	 event.target.dataset.cart-seq;
  // const meta = event.target.parentNode.getAttribute("data-cart-seq");
  const id = document.getElementById(idd);

  let cart_seq = id.getAttribute('data-cart-seq'); //박스 구분하기 위한 카트 시퀀스
  let base_price = id.getAttribute('data-base-price'); //상품의 기본 가격
  let option_price = id.getAttribute('data-option-price'); //상품의 옵션 가격
  let free_trans_yn = id.getAttribute('data-free_trans_yn');
  let qty_value = id.getAttribute('data-qty');
  let qty = parseInt(qty_value) + parseInt(add); //선택한 박스의 현재 수량과 증감
  let product_cd = id.getAttribute('data-product-cd'); //박스 구분하기 위한 카트 시퀀스
  var price = (parseInt(base_price) + parseInt(option_price)) * parseInt(qty);
  var $box = get_box(cart_seq);

  let opt_gb = id.getAttribute('data-opt-gb');

  //재고 체크 변수
  var opt_val1 = id.getAttribute('data-opt-val1'); //조합옵션
  var opt_val2 = id.getAttribute('data-opt-val2'); //조합옵션
  var opt_val3 = id.getAttribute('data-opt-val3'); //조합옵션

  var opt_cd1 = id.getAttribute('data-opt-cd1'); //개별
  var opt_cd2 = id.getAttribute('data-opt-cd2'); //개별
  getPrice(koApiURL);
  if (qty > 0) {
    Csrf.Set(_CSRF_NAME_); //토큰 초기화
    $.ajax({
      type: 'POST',
      url: `${koApiURL}/member/cart/updQty`,
      dataType: 'json',
      data: {
        cart_seq: cart_seq,
        qty: add,
        n_qty: qty,
        opt_gb: opt_gb,
        product_cd: product_cd,
        opt_val1: opt_val1,
        opt_val2: opt_val2,
        opt_val3: opt_val3,
        opt_cd: opt_cd2,
      },
      headers: { Authorization: `Bearer ${token}` },
      success: function (res) {
        if (res.success == true) {
          var id = $box[0].id;

          $box.find('input.qty').val(res.data.qty);
          $box.find('p.price').text(price + '원');

          // box_price(cart_seq);
        } else if (res.success == 'err2') {
          if (res.data.length > 0) {
            var stock = parseInt(res.data[0].stock) - parseInt(res.data[0].limit_cnt);

            alert('재고가 부족합니다. 현재 남아있는 재고의 수는 ' + stock + '개 입니다.');
            location.reload();
          }
        } else {
          alert(res.msg);
          location.reload();
          return;
        }
        return;
      },
      error: function (res) {
        alert(res.responseText);
      },
    });
  }
}

function getPrice(koApiURL) {
  let cart_seq = '';
  var point = 0;
  var reserve_rate = 0;
  const selectedElements = document.querySelectorAll('input[name="cart_seq[]"]:checked');
  const selectedElementsCnt = selectedElements.length;

  selectedElements.forEach((item, index) => {
    point += $("div[data-cart-seq='" + item.value + "']").data('point');
    if (cart_seq == '') {
      cart_seq = item.value;
    } else {
      cart_seq += ',' + item.value + '';
    }
  });
  let charArr = cart_seq.split(',');
  if (selectedElementsCnt == 0) {
    $('#total_price').text(0 + '원');
    $('#delivery_fee').text(0 + '원');
    $('#total').html(0 + '원<em>' + 0 + '원 적립</em>');
    return true;
  }

  // Csrf.Set(_CSRF_NAME_); //토큰 초기화
  $.ajax({
    type: 'get',
    url: `${koApiURL}/cart/priceTotal`,
    // url: `http://192.168.80.6:3010/v1.0/cart/priceTotal`,

    dataType: 'json',
    async: false,
    data: {
      cart_seq: charArr,
    },
    success: function (res) {
      if (res.data[0].total_price != null) {
        $('#total_price').text(Functions.NumberFormat(res.data[0].total_price) + '원');
        $('#delivery_fee').text(Functions.NumberFormat(res.data[0].trans_price) + '원');
        $('#total').html(
          Functions.NumberFormat(
            parseInt(res.data[0].total_price) + parseInt(res.data[0].trans_price)
          ) +
            '원<em>' +
            Functions.NumberFormat(Math.round(res.data[0].total_price * reserve_rate)) +
            '원 적립</em>'
        );
      } else {
        $('#total_price').text(0 + '원');
        $('#delivery_fee').text(0 + '원');
        $('#total').html(0 + '원<em>' + 0 + '원 적립</em>');
      }
    },
    error: function (res) {
      //	alert(res.responseText);
    },
  });
}

function unCheck(koApiURL) {
  var x = document.getElementsByClassName('checkbox');

  for (i = 0; i < x.length; i++) {
    if (x[i] != 'undefined') {
      if (x[0].checked == true) {
        x[i].checked = true;
      } else {
        x[i].checked = false;
      }
    }
  }
  getPrice(koApiURL);
}

function orderCheck() {
  var check = document.getElementById('all_agree');

  var x = document.getElementsByClassName('checkbox');

  for (i = 0; i < x.length; i++) {
    if (check.checked == true) {
      x[i].checked = true;
    } else {
      x[i].checked = false;
    }
  }
}

function jsOrderSubmit(koApiURL, session_id, payment) {
  let cart_seq = '';
  const selectedElements = document.querySelectorAll('input[name="cart_seq[]"]:checked');

  selectedElements.forEach((item, index) => {
    if (cart_seq == '') {
      cart_seq = item.value;
    } else {
      cart_seq += ',' + item.value + '';
    }
  });

  if ($("input[name='cart_seq[]']:checked").length < 1) {
    alert('주문할 상품을 선택해 주세요.');
    return false;
  }

  Csrf.Set(_CSRF_NAME_); //토큰 초기화
  $.ajax({
    type: 'POST',
    url: `${koApiURL}/shop/cart/cart_proc`,
    dataType: 'json',
    async: false,
    data: {
      cart_seq: cart_seq,
      session_id: session_id,
      ajax_mode: 'ORDER',
    },
    success: function (res) {
      if (payment == 'kakao') {
        location.href = '/shop/order/order_write?direct_order=kakaopay_direct';
      } else {
        location.href = '/shop/order/order_write';
      }
    },
    error: function (res) {
      alert(res.responseText);
    },
  });
}

function delete_cart(cart_seq, token, koApiURL) {
  Csrf.Set(_CSRF_NAME_); //토큰 초기화
  $.ajax({
    type: 'delete',
    url: `${koApiURL}/member/cart/del`,
    dataType: 'json',
    data: {
      cart_seq: cart_seq,
    },
    headers: { Authorization: `Bearer ${token}` },
    success: function (res) {
      debugger;
      if (typeof res == 'string') {
        res = JSON.parse(res);
      }
      if (res.success == true) {
        location.reload();
      } else {
        alert('삭제에 실패했습니다.');
        return false;
      }
    },
    error: function (res) {
      alert(res.responseText);
    },
  });
}
