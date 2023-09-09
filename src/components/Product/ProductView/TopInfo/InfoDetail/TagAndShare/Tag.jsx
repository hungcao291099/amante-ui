
const Tag = ({productView, codes}) => {
  
  return (
    <div className="label_info">
      {productView.icon &&
        (productView.product_state === "4" ? (
          <picture>
            <source
              srcSet="/asset/images/shop/product/p_2106.jpg "
              media="(min-width:768px)"
            />
            {/* pc이미지 */}
            <source
              srcSet="/asset/images/shop/product/p_2106.jpg "
              media="(max-width:767px)"
            />
            {/* mb이미지 */}
            <img
              src="/asset/images/shop/product/p_2106.jpg "
              alt="재입고 알림신청"
            />
            {/* pc이미지 */}
          </picture>
        ) : (
          codes?.map(
            (code, index) =>
              productView.icon.includes(code.code_cd2) && (
                <picture key={index}>
                  {/*[if IE 9]><video style="display: none;"><![endif]*/}
                  <source
                    srcSet={`/asset/images/shop/product/p_${code.code_cd2}.jpg`}
                    media="(min-width:768px)"
                  />
                  {/* pc이미지 */}
                  <source
                    srcSet={`/asset/images/shop/product/m_${code.code_cd2}.jpg`}
                    media="(max-width:767px)"
                  />
                  {/* mb이미지 */}
                  {/*[if IE 9]></video><![endif]*/}
                  <img
                    loading="lazy"
                    src={`/asset/images/shop/product/p_${code.code_cd2}.jpg`}
                    alt={code.code_nm2}
                  />
                  {/* pc이미지 */}
                </picture>
              )
          )
        ))}
    </div>
  )
}

export default Tag