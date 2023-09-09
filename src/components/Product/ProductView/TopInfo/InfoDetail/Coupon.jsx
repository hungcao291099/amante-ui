const Coupon = ({productView, cust_seq, navigate}) => {
  return (
    <>
      {productView.coupon_use_yn === "Y" &&
        (cust_seq
          ? productView.coupon_list.length > 0 && (
              <div className="coupon_area" data-cust={cust_seq}>
                <p>이 상품에만 적용되는 쿠폰</p>
                <button
                  type="button"
                  className="btn_txt"
                  onClick={() =>
                    commonUI.layer.open(".coupon_sel_layer", {
                      bg: true,
                      alert: true,
                    })
                  }
                >
                  <span>쿠폰받기</span>
                </button>
              </div>
            )
          : productView.coupon_list.length > 0 && (
              <div className="coupon_area">
                <p>이 상품에만 적용되는 쿠폰</p>
                <button
                  type="button"
                  className="btn_txt"
                  onClick={() => {
                    window.alert("로그인하셔야 다운로드 하실수 있습니다.");
                    return navigate("/shop/login/login");
                  }}
                >
                  <span>쿠폰받기</span>
                </button>
              </div>
            ))}
    </>
  );
};

export default Coupon;
