
const ProductInfoSection = ({productView}) => {
  return (
    <div className="tab_con prd_info_detail">
      <div className="tab_title js_toggle_btn">
        <button type="button">상품 고시 정보</button>
      </div>
      <div className="toggle_con">
        <dl>
          <dt className="first">제품소재</dt>
          {productView.productDetail?.product_material ? <dd className="first">{productView.productDetail?.product_material}</dd> : <dd className="first">상세페이지 참조</dd>}
          <dt>색상</dt>
          {productView.productDetail?.product_color ? <dd>{productView.productDetail?.product_color}</dd> : <dd>상세페이지 참조</dd>}
          <dt>치수</dt>
          {productView.productDetail?.product_info ? <dd>{productView.productDetail?.product_info}</dd> : <dd>상세페이지 참조</dd>}
          <dt>제품구성</dt>
          {productView.productDetail?.product_use_age ? <dd>{productView.productDetail?.product_use_age}</dd> : <dd>상세페이지 참조</dd>}
          <dt>제조자</dt>
          {productView.productDetail?.product_make_company ? <dd>{productView.productDetail?.product_make_company}</dd> : <dd>상세페이지 참조</dd>}
          <dt>제조국</dt>
          {productView.productDetail?.product_make_country ? <dd>{productView.productDetail?.product_make_country}</dd> : <dd>상세페이지 참조</dd>}
        </dl>

        <div className="box">
          <p className="sub_tit">세탁방법 및 취급 시 주의사항</p>
          <ul className="info">
            <li>
              {productView.productDetail?.product_laundry ? <dd>{productView.productDetail?.product_laundry }</dd>: <dd>상세페이지 참조</dd>}
            </li>
          </ul>
        </div>

        <div className="box sec">
          <p className="sub_tit">품질보증기준</p>
          {productView.productDetail?.product_guaranty ? <p className="info">{productView.productDetail?.product_guaranty}</p> : <p className="info">상세페이지 참조</p>}
          <p className="sub_tit">A/S 책임자와 전화번호</p>
          {productView.productDetail?.product_as_inquire ? <p className="info">{productView.productDetail?.product_as_inquire}</p> : <p className="info">상세페이지 참조</p>}
        </div>
      </div>
    </div>
  )
}

export default ProductInfoSection