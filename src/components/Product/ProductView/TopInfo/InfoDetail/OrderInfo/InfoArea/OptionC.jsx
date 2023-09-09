const OptionC = ({ productView, api, detect }) => {
  $(document).ready(function () {
    $(`.${detect === "concept_room" ? 'product-option-form' : 'prd_info .order_info'} .select_box select[data-option-gb="C"]`).on('change', function () {
      const select_opt_cd1 = $(this).data('option-cd');
      const select_opt_cd2 = $(this).val();
      let pre_opt_cd2 = '';
      const select_stock_seq = $(this).children('option:selected').data('stock-seq');
      const index = $(this).data('index');
      
      
      if (select_opt_cd2 != '') {
        $($(this).siblings()).each(async function (idx) {
          const siblings_this = $(this);
          const siblings_opt_cd1 = $(this).data('option-cd');
        
          //다음 연결되는 옵션이 있을 경우 그 옵션 값을 새로 불러옴
          if (siblings_opt_cd1 > select_opt_cd1) {
            try {
              const { data } = await api({
                url: 'shop/product/product_option',
                method: 'POST',
                data: {
                  index,
                  product_cd: productView.product_cd,
                  select_opt_cd2,
                  siblings_opt_cd1,
                  pre_opt_cd2,
                },
              });
              let option_html = '';
              let opt_cd1 = '';
              $.each(data, function (idx, item) {
                if (idx == 0) {
                  option_html += "<option value=''>" + item.opt_nm1 + '</option>';
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
                      "<option value='" +
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

                    option_html += '</option>';
                  } else {
                    option_html +=
                      "<option value='" +
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

                    option_html += '</option>';
                  }
                } else {
                  option_html +=
                    "<option value='" +
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

                  option_html += '</option>';
                }

                opt_cd1 = item.opt_cd1;
              });

              siblings_this.html(option_html);

              //조합옵션일때 선택한 옵션 빼고 나머지의 하위 옵션값은 제거
              $('.prd_info .order_info .select_box select[data-option-gb="C"]').each(function (
                idx
              ) {
                if (opt_cd1 < $(this).data('option-cd')) {
                  $(this).children('option:not(:first)').remove();
                }
              });
            } catch (error) {
              console.log(error);
            }

            return false;
          } else if (siblings_opt_cd1 < select_opt_cd1) {
            pre_opt_cd2 = $(this).val();
          }
        });
      }

      if (!is_form_c_options_valid(detect)) {
        // 모든 조합 옵션이 선택되지 않으면 실행하지 않음
        return;
      }
      const product_info = {};
      product_info.product_cd = productView.product_cd;
      product_info.product_nm = productView.product_nm;
      product_info.base_price = parseInt(productView.sale_price);
      product_info.product_gb = 'P';
      product_info.stock_seq = select_stock_seq;
      product_info.qty =
        Number(productView.order_mini_quantiry) !== 0 ? productView.order_mini_quantiry : 1;

      if (is_c_option_exist(detect)) {
        product_info.option_yn = 'Y';
        product_info.options = get_form_c_options(detect);
      } else {
        product_info.option_yn = 'N';
      }

      if (productView.write_use_yn === 'Y') {
        if ($('#w_opt_text')) {
          if ($('#w_opt_text').val().trim() === '') {
            return false;
          }
        }
      }

      create_opt_box(product_info, detect);
    });
  });

  return (
    <>
      {productView.product_opt1_c?.length > 0 && (
        <div className="select_box">
          {productView.product_opt1_c?.map((opt, index) => (
            <select
              name={`option${opt.opt_cd1}`}
              data-option-cd={opt.opt_cd1}
              data-option-nm={opt.opt_nm1}
              data-option-gb="C"
              data-mandatory-yn={opt.mandatory_yn}
              data-index={index + 1}
              key={`${productView.product_cd}_${index}`}
              data-product-cd={productView.product_cd}
            >
              <option value="">{opt.opt_nm1}</option>
              {index === 0 &&
                productView[`product_opt2_${opt.opt_cd1}`]?.map((opt2, index) =>
                  opt2.soldout_yn === 'Y' ? (
                    <option
                      key={index}
                      value={opt2.opt_cd2}
                      data-price={opt2.opt_price}
                      data-option-nm={opt2.opt_nm2}
                      disabled
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
                          {opt2.restock_date
                            ? ` - 일시품절 (재입고 ${opt2.restock_date})`
                            : ` - 일시품절`}
                        </>
                      )}
                    </option>
                  ) : (
                    <option
                      key={index}
                      value={opt2.opt_cd2}
                      data-price={opt2.opt_price}
                      data-option-nm={opt2.opt_nm2}
                    >
                      {opt2.opt_nm2}
                      {opt2.opt_price ? `(${opt2.opt_price}원)` : ''}
                    </option>
                  )
                )}
            </select>
          ))}
        </div>
      )}
    </>
  );
};

export default OptionC;
