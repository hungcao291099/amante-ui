
const GiftLayer = () => {
  return (
    <div className="layer_box gift_layer" id="gift_layer">
      <div className="layer_outer">
        <div className="layer_inner">
          <div className="layer_con">
            <div className="layer_tit">
              <h2>선물하기란?</h2>
              <button
                type="button"
                className="layer_close"
                onClick={() => commonUI.layer.close()}
              >
                닫기
              </button>
            </div>
            <picture>
              {/*[if IE 9]>
              <video style="display: none;"><![endif]*/}
              <source
                srcSet="/asset/images/shop/product/pc_gift_img.png"
                media="(min-width:768px)"
              />
              {/* pc이미지 */}
              <source
                srcSet="/asset/images/shop/product/mb_gift_img.png"
                media="(max-width:767px)"
              />
              {/* mb이미지 */}
              {/*[if IE 9]></video><![endif]*/}
              <img
                loading="lazy"
                src="/asset/images/shop/product/pc_gift_img.png"
                alt=""
              />
              {/* pc이미지 */}
            </picture>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GiftLayer