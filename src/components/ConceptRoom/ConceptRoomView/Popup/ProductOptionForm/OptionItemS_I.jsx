
const OptionItemS_I = ({
  opt2,
  opt,
  formatNumber,
  productData,
  setShowOptionList,
  setActiveOption,
  activeOption
}) => {
 
  
  const handleClickItem = (e, data) => {
    const productInfo = {};
    productInfo.product_cd = productData.product_cd;
    productInfo.product_nm = data.opt_nm2;
    productInfo.option_yn = 'Y';
    productInfo.base_price = parseInt(productData.sale_price);
    productInfo.product_gb = 'P';
    productInfo.stock_seq = e.target.getAttribute('data-stock-seq');
    productInfo.qty =
    Number(productData.order_mini_quantiry) !== 0 ? productData.order_mini_quantiry : 1;
    productInfo.options = [
      {
        option_gb: 'S',
        option_cd: data.opt_cd1,
        option_nm: data.opt_nm1,
        value_cd: data.opt_cd2,
        value_nm: data.opt_nm2,
        price: data.opt_price,
      },
    ];
    
    create_opt_box(productInfo, 'concept_room');
    setShowOptionList('')
    setActiveOption(data.opt_cd2)
  };

  return opt2.soldout_yn === 'Y' ? (
    <li
      className={`custom-select-option d-flex align-items-center ${opt2.opt_cd2 === activeOption ? 'active' : ''}`}
      onClick={(e) => handleClickItem(e, opt2)}
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
  ) : opt2.opt_price > 0 ? (
    <li
      className={`custom-select-option d-flex align-items-center ${opt2.opt_cd2 === activeOption ? 'active' : ''}`}
      value={opt2.opt_cd2}
      data-price={opt2.opt_price}
      data-option-nm={opt2.opt_nm2}
      data-stock-seq={opt2.stock_seq}
      disabled={opt2.eos_yn === 'Y' ? true : false}
      onClick={(e) => handleClickItem(e, opt2)}
    >
      {opt2.opt_nm2}
      {opt2.opt_price ? ` (+${formatNumber(opt2.opt_price)}원)` : ''}
      {opt2.eos_yn !== 'Y'
        ? opt.stock > 0 && opt.stock < 100
          ? `- (재고:${opt2.stock})`
          : ''
        : '- 판매종료'}
    </li>
  ) : (
    <li
      className={`custom-select-option d-flex align-items-center ${opt2.opt_cd2 === activeOption ? 'active' : ''}`}
      value={opt2.opt_cd2}
      data-price={opt2.opt_price}
      data-option-nm={opt2.opt_nm2}
      data-stock-seq={opt2.stock_seq}
      disabled={opt2.eos_yn === 'Y' ? true : false}
      onClick={(e) => handleClickItem(e, opt2)}
    >
      {opt2.opt_nm2}
      {opt2.opt_price ? `(${opt2.opt_price}원)` : ''}
      {opt2.eos_yn !== 'Y' ? '- 판매종료' : ''}
      {opt2.eos_yn !== 'Y'
        ? opt.stock > 0 && opt.stock < 100
          ? `- (재고:${opt2.stock})`
          : ''
        : '- 판매종료'}
    </li>
  );
};

export default OptionItemS_I;
