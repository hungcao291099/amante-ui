const OptionI = ({ productView, detect }) => {
  const handleSelectOption = (e) => {
    if (
      $(
        `.${
          detect === 'concept_room' ? 'product-option-form' : 'prd_info .order_info'
        } .select_box select[data-option-gb='C'][data-product-cd=${productView.product_cd}]`
      ).length > 0 &&
      $(`.select_item > li[data-option0-gb='C'][data-product-cd=${productView.product_cd}]`)
        .length < 1
    ) {
      alert('상품 구성부터 선택해주세요.');
      $(e.target).val('');
      return;
    }

    const productInfo = {};
    productInfo.product_cd = productView.product_cd;
    productInfo.product_nm = $(e.target).children('option:selected').data('option-nm');
    productInfo.option_yn = 'Y';
    productInfo.base_price = 0;
    productInfo.product_gb = 'P';
    productInfo.stock_seq = $(e.target).children('option:selected').data('stock-seq');
    productInfo.qty =
      Number(productView.order_mini_quantiry) !== 0 ? productView.order_mini_quantiry : 1;
    productInfo.options = [
      {
        option_gb: $(e.target).data('option-gb'),
        option_cd: $(e.target).data('option-cd'),
        option_nm: $(e.target).data('option-nm'),
        value_cd: $(e.target).children('option:selected').val(),
        value_nm: $(e.target).children('option:selected').data('option-nm'),
        price: $(e.target).children('option:selected').data('price'),
      },
    ];

    create_opt_box(productInfo, detect);
  };

  return (
    productView.product_opt1_i?.length > 0 && (
      <>
        <div className="tit_area">
          <p className="tit">추가 구성</p>
        </div>

        <div className="select_box">
          {productView.product_opt1_i.map((opt1, index) => (
            <select
              key={index}
              name={`option${opt1.opt_cd1}`}
              data-option-cd={opt1.opt_cd1}
              data-option-nm={opt1.opt_nm1}
              data-option-gb="I"
              data-mandatory-yn={opt1.mandatory_yn}
              index={`${productView.product_cd}_index`}
              onChange={(e) => handleSelectOption(e)}
            >
              <option value="">{opt1.opt_nm1}</option>
              {productView[`product_opt2_${opt1.opt_cd1}`]?.map((opt2, index) =>
                opt2.soldout_yn === 'Y' ? (
                  opt2.opt_price > 0 ? (
                    <option
                      key={index}
                      value={opt2.opt_cd2}
                      data-price={opt2.opt_price}
                      data-option-nm={opt2.opt_nm2}
                      disabled
                    >
                      {opt2.opt_nm2}
                      {opt2.opt_price ? ` (+${formatNumber(opt2.opt_price)}원)` : ''}
                      {opt2.eos_yn !== 'Y'
                        ? opt2.restock_date
                          ? ` - 일시품절(재입고 ${opt2.restock_date}`
                          : ' - 일시품절'
                        : ' - 판매종료'}
                    </option>
                  ) : (
                    <option
                      key={index}
                      value={opt2.opt_cd2}
                      data-price={opt2.opt_price}
                      data-option-nm={opt2.opt_nm2}
                      disabled
                    >
                      {opt2.opt_nm2}
                      {opt2.opt_price ? `(${opt2.opt_price}원)` : ''}
                      {opt2.eos_yn !== 'Y'
                        ? opt2.restock_date
                          ? ` - 일시품절(재입고 ${opt2.restock_date}`
                          : ' - 일시품절'
                        : ' - 판매종료'}
                    </option>
                  )
                ) : opt2.opt_price > 0 ? (
                  <option
                    key={index}
                    value={opt2.opt_cd2}
                    data-price={opt2.opt_price}
                    data-option-nm={opt2.opt_nm2}
                    data-stock-seq={opt2.stock_seq}
                    disabled={opt2.eos_yn === 'Y' ? true : false}
                  >
                    {opt2.opt_nm2}
                    {opt2.opt_price ? ` (+${formatNumber(opt2.opt_price)}원)` : ''}
                    {opt2.eos_yn !== 'Y'
                      ? opt2.stock > 0 && opt2.stock < 100
                        ? `- (재고:${opt2.stock})`
                        : ''
                      : '- 판매종료'}
                  </option>
                ) : (
                  <option
                    key={index}
                    value={opt2.opt_cd2}
                    data-price={opt2.opt_price}
                    data-option-nm={opt2.opt_nm2}
                    data-stock-seq={opt2.stock_seq}
                    disabled={opt2.eos_yn === 'Y' ? true : false}
                  >
                    {opt2.opt_nm2}
                    {opt2.opt_price ? `(${opt2.opt_price}원)` : ''}
                    {opt2.eos_yn !== 'Y'
                      ? opt2.stock > 0 && opt2.stock < 100
                        ? `- (재고:${opt2.stock})`
                        : ''
                      : '- 판매종료'}
                  </option>
                )
              )}
            </select>
          ))}
        </div>
      </>
    )
  );
};

export default OptionI;
