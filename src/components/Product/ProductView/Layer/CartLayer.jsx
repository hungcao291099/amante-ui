import React from 'react'

const CartLayer = ({navigate}) => {
  return (
    <div className="layer_box txt_layer cart_layer" id="cart_layer">
      <div className="layer_outer">
        <div className="layer_inner">
          <div className="layer_con">
            <button
              type="button"
              className="layer_close"
              onClick={() => commonUI.layer.close()}
            >
              닫기
            </button>
            <p className="tit">
              상품이 장바구니에 담겼습니다.
              <br />
              지금 확인하시겠습니까?
            </p>
            <div className="btn_area col2">
              <button
                type="button"
                className="btn_txt btn_point"
                onClick={() => navigate('/shop/cart/cart_lists')}
              >
                <span>예</span>
              </button>
              <button
                type="button"
                className="btn_txt btn_lgray"
                onClick={() => commonUI.layer.close()}
              >
                <span>계속쇼핑</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartLayer