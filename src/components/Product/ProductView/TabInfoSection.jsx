
const TabInfoSection = ({productView, parse}) => {
  return (
    <>
      {productView.productCon && (
        <div className="tab_con prd_info_product_con" id="tab_info">
          <div className="tab_title">
            <h3>배송/반품/교환안내</h3>
          </div>
          <div>{parse(productView.productCon.content2)}</div>
        </div>
      )}
    </>
  )
}

export default TabInfoSection