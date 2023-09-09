
const ProductInfo = ({productView, formatNumber}) => {
  return (
    <>
      <div className="title">{productView.product_nm}</div>

      <div className="price_area">
        {productView.supply_price !== productView.sale_price ? (
          <>
            {productView.discount_gb !== "B" ? (
              <span>{productView.fee_rate}%</span>
            ) : (
              <span>
                {Math.round(
                  ((productView.supply_price - productView.sale_price) /
                    productView.supply_price) *
                    100
                )}
                %
              </span>
            )}
            <ins>{formatNumber(productView.sale_price)}원</ins>
            <del>{formatNumber(productView.supply_price)}</del>
          </>
        ) : (
          <ins>{formatNumber(productView.sale_price)}원</ins>
        )}
      </div>

      <dl className="order_area">
        {productView.reserve_rate && (
          <>
            <dt className="first">적립금</dt>
            <dd className="first">
              {Math.floor(
                (productView.sale_price *
                  (productView.reserve_rate * 0.01)) /
                  10
              ) * 10}
              원 적립
            </dd>
          </>
        )}
        <dt>배송비</dt>
        <dd>{productView.trans?.bigo}</dd>
        {productView.reserve_rate === "N" && (
          <>
            <dt>적립금</dt>
            <dd>적립금 사용불가상품입니다.</dd>
          </>
        )}

        {productView.coupon_use_yn === "N" && (
          <>
            <dt>쿠폰</dt>
            <dd>쿠폰 사용불가상품입니다.</dd>
          </>
        )}
      </dl>
    </>
  )
}

export default ProductInfo