import api from '@utils/api/api';

const OptionItemC = ({ opt2, productData, indexParent, activeOption, setActiveOption, setShowOptionList }) => {
  $(document).ready(function () {
    $('.custom-select-option[data-option-gb="C"]').on('click', function () {
      const select_opt_cd1 = $(this).parent().data('option-cd');
      const select_opt_cd2 = $(this).data('value');
      let pre_opt_cd2 = '';
      const select_stock_seq = $(this).children('option:selected').data('stock-seq');
      const index = $(this).parent().data('index');

      if (select_opt_cd2 != '') {
        $($(this).closest('.option-item').siblings()).each(async function (idx) {
          const siblings_this = $(this).find('ul');
          const siblings_opt_cd1 = $(this).find('ul').data('option-cd');

          //다음 연결되는 옵션이 있을 경우 그 옵션 값을 새로 불러옴
          if (siblings_opt_cd1 > select_opt_cd1) {
            try {
              const { data } = await api({
                url: 'shop/product/product_option',
                method: 'POST',
                data: {
                  index,
                  product_cd: productData.product_cd,
                  select_opt_cd2,
                  siblings_opt_cd1,
                  pre_opt_cd2,
                },
              });
              let option_html = '';
              let opt_cd1 = '';
              $.each(data, function (idx, item) {
                if (idx == 0) {
                  option_html += '';
                }

                let option_price = parseInt(item.opt_price);
                let option_disabled = '';

                if (item.eos_yn == 'Y') {
                  option_disabled = 'disabled';
                }

                if (item.combine_idx == item.tot_combine_cnt) {
                  //조합의 마지막 옵션일 경우 품절 체크를 해줌
                  option_price += parseInt(item.stock_opt_price);
                  if (item.soldout_yn == 'Y') {
                    option_html +=
                      "<li class='custom-select-option d-flex align-items-center' data-value='" +
                      item.opt_cd2 +
                      "' data-price='" +
                      option_price +
                      "' data-option-nm='" +
                      item.opt_nm2 +
                      "' disabled>" +
                      item.opt_nm2;

                    if (option_price > 0) {
                      option_html += '(+' + formatNumber(option_price) + '원)';
                    } else if (option_price < 0) {
                      option_html += '(' + formatNumber(option_price) + '원)';
                    }

                    if (item.eos_yn == 'Y') {
                      option_html += ' - 판매종료'; //재입고미정
                    } else if (item.eos_yn == 'N') {
                      if (item.restock_date) {
                        option_html += ' - 일시품절 (재입고 ' + item.restock_date + ')';
                      } else {
                        option_html += ' - 일시품절'; //재입고미정
                      }
                    }

                    option_html += '</li>';
                  } else {
                    option_html +=
                      "<li class='custom-select-option d-flex align-items-center' data-value='" +
                      item.opt_cd2 +
                      "' data-price='" +
                      option_price +
                      "' data-option-nm='" +
                      item.opt_nm2 +
                      "' data-stock-seq='" +
                      item.stock_seq +
                      "'" +
                      option_disabled +
                      '>' +
                      item.opt_nm2;
                    if (option_price > 0) {
                      option_html += '(+' + formatNumber(option_price) + '원)';
                    } else if (option_price < 0) {
                      option_html += '(' + formatNumber(option_price) + '원)';
                    }

                    if (item.eos_yn == 'Y') {
                      option_html += ' - 판매종료'; //재입고미정
                    }

                    if (item.stock > 0 && item.stock < 10) {
                      option_html += '(재고:' + item.stock + ')';
                    }

                    option_html += '</li>';
                  }
                } else {
                  option_html +=
                    "<li class='custom-select-option d-flex align-items-center' data-value='" +
                    item.opt_cd2 +
                    "' data-price='" +
                    option_price +
                    "' data-option-nm='" +
                    item.opt_nm2 +
                    "'" +
                    option_disabled +
                    '  >' +
                    item.opt_nm2;
                  if (option_price > 0) {
                    option_html += '(+' + formatNumber(option_price) + '원)';
                  } else if (option_price < 0) {
                    option_html += '(' + formatNumber(option_price) + '원)';
                  }

                  if (item.eos_yn == 'Y') {
                    option_html += ' - 판매종료'; //재입고미정
                  }

                  option_html += '</li>';
                }

                opt_cd1 = item.opt_cd1;
              });

              siblings_this.html(option_html);
            } catch (error) {
              console.log(error);
            }

            return false;
          } else if (siblings_opt_cd1 < select_opt_cd1) {
            pre_opt_cd2 = $(this).data('value');
          }
        });
      }

      if (!is_form_c_options_valid('concept_room')) {
        // 모든 조합 옵션이 선택되지 않으면 실행하지 않음
        return;
      }

      const product_info = {};
      product_info.product_cd = productData.product_cd;
      product_info.product_nm = productData.product_nm;
      product_info.base_price = parseInt(productData.sale_price);
      product_info.product_gb = 'P';
      product_info.stock_seq = select_stock_seq;
      product_info.qty =
        Number(productData.order_mini_quantiry) !== 0 ? productData.order_mini_quantiry : 1;

        console.log(product_info)
        setActiveOption(select_opt_cd2);
        setShowOptionList('')
      return
      if (is_c_option_exist('concept_room')) {
        product_info.option_yn = 'Y';
        product_info.options = get_form_c_options('concept_room');
      } else {
        product_info.option_yn = 'N';
      }

      if (productData.write_use_yn === 'Y') {
        if ($('#w_opt_text')) {
          if ($('#w_opt_text').val().trim() === '') {
            return false;
          }
        }
      }
      create_opt_box(product_info, 'concept_room');
      
    });
  });

  return opt2.soldout_yn === 'Y' ? (
    <li
      className={`custom-select-option d-flex align-items-center ${
        opt2.opt_cd2 === activeOption ? 'active' : ''
      }`}
      data-value={opt2.opt_cd2}
      data-price={opt2.opt_price}
      data-option-nm={opt2.opt_nm2}
      data-option-gb="C"
      data-stock-seq={opt2.stock_seq}
    >
      {opt2.opt_price > 0 ? (
        <>
          {opt2.opt_nm2}
          {opt2.restock_date
            ? ` - 일시품절 (재입고 ${opt2.restock_date})(+ ${opt2.opt_price}원 )`
            : ` - 일시품절`}
        </>
      ) : (
        <>
          {opt2.opt_nm2}
          {opt2.restock_date ? ` - 일시품절 (재입고 ${opt2.restock_date})` : ` - 일시품절`}
        </>
      )}
    </li>
  ) : (
    <li
      className={`custom-select-option d-flex align-items-center ${
        opt2.opt_cd2 === activeOption ? 'active' : ''
      }`}
      data-name={opt2.opt_nm2}
      data-value={opt2.opt_cd2}
      data-price={opt2.opt_price}
      data-option-nm={opt2.opt_nm2}
      data-option-gb="C"
      data-stock-seq={opt2.stock_seq}
      disabled
    >
      {opt2.opt_nm2}
      {opt2.opt_price ? `(${opt2.opt_price}원)` : ''}
    </li>
  );
};

export default OptionItemC;
