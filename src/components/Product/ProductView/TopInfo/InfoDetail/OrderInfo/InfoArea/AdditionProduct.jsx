
const AdditionProduct = ({productView, baseUrl, formatNumber, navigate}) => {
  return (
    <>
      {productView.product_relation_yn && productView.additionList.length > 0 && (
        <div className="add_item">
          <button className="add_item_list_show on">추가 구성 상품</button>
          <ul className="add_item_list">
            {productView.additionList.map((add, index) => (
              <li key={index}>
                <div className="img">
                  <picture>
                    {/*[if IE 9]>
                      <video style="display: none;"><![endif]*/}
                    <source srcSet={`${baseUrl}/uploads/${add.addition_product_type === "G" ? "present" : "product"}/${add.addition_main_img}`} media="(min-width:768px)" />
                    {/* pc이미지 */}
                    <source srcSet={`${baseUrl}/uploads/${add.addition_product_type === "G" ? "present" : "product"}/${add.addition_main_img}`} media="(max-width:767px)" />
                    {/* mb이미지 */}
                    {/*[if IE 9]></video><![endif]*/}
                    <img loading="lazy" src={`${baseUrl}/uploads/${add.addition_product_type === "G" ? "present" : "product"}/${add.addition_main_img}`} alt="" />
                    {/* pc이미지 */}
                  </picture>
                </div>
            
                <div className="info">
                  <p className="t">{add.addition_product_nm}</p>
                  <div className="price_area">
                    {add.addition_fee_rate > 0 && <span>{add.addition_fee_rate}%</span>}
                      <ins>{formatNumber(add.addition_sale_price)}</ins>
                    {add.addition_supply_price > 0 && <del>{formatNumber(add.addition_supply_price)}</del>}
                  </div>
                  {add.addition_reserve_rate > 0 && <p className="i">{add.addition_reserve_rate}% 적립</p>}
                  <div className="add">
                    {add.addition_product_type === 'G' ?
                    <button 
                      type="button" 
                      className="add_gift_product" 
                      data-product-cd={add.addition_product_cd} 
                      data-product-nm={add.addition_product_nm} 
                      data-base-price={add.addition_sale_price} 
                      data-option-price='0' 
                      data-product-gb="A"
                    >
                      선택
                    </button>:
                    <button 
                      type="button" 
                      onClick={() => navigate(`/shop/product/product_view?product_cd=${add.addition_product_cd}`)}
                    >
                      구매하기
                    </button>
                  }
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default AdditionProduct