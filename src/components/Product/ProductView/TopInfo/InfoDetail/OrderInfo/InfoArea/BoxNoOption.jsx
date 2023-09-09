
const BoxNoOption = ({productView, formatNumber}) => {

  return (
    <ul className="select_item">
      {productView.product_opt1_c?.length === 0 && productView.product_opt1_s?.length === 0 && (
        <li 
          data-box-id="no_option" 
          data-product-cd={productView.product_cd} 
          data-base-price={productView.sale_price} 
          data-option-price='0' 
          data-qty='1' 
          data-product-gb="P" 
          data-stock-seq={productView.stock_seq}
        >
          <p>{productView.product_nm}</p>
          <div className="count">
            <button type="button" className="min" onClick="box_qty('no_option', -1);">
              감소
            </button>
            <input
              type="num"
              className="qty"
              value={productView.order_mini_quantiry ? productView.order_mini_quantiry : 1}
              readOnly=""
              title="수량"
            />
            <button type="button" className="plus" onClick="box_qty('no_option', 1);">
              증가
            </button>
          </div>
          <p className="price">
            {formatNumber(productView.sale_price)}
          </p>
        </li>
      )}
    </ul>
  )
}

export default BoxNoOption