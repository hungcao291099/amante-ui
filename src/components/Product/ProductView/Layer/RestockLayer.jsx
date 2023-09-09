const RestockLayer = ({
  productView,
  baseUrl,
  formatNumber,
  cust_seq,
  navigate,
  api,
  phone,
  email,
  user_id,
  user_nm,
}) => {
  async function jsRestock(stock_seq, product_cd) {
    try {
      const { data } = await api({
        url: '/shop/product/product_restock',
        method: 'POST',
        data: {
          stock_seq,
          product_cd,
          hp: phone,
          email,
          user_id,
          user_nm,
          cust_seq,
        },
      });

      alert(data.message);
      if (data.success) {
        commonUI.layer.close();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="layer_box restock_layer" id="restock_layer">
      <div className="layer_outer">
        <div className="layer_inner">
          <div className="layer_con">
            <div className="layer_tit">
              <h2>재입고알림 상품선택</h2>
              <button type="button" className="layer_close" onClick={() => commonUI.layer.close()}>
                닫기
              </button>
            </div>

            <div className="scroll_box">
              <ul>
                {productView.alram_list?.map((item, index) => (
                  <li key={index}>
                    <div className="layer_pd_info">
                      <div className="img">
                        <img src={`${baseUrl}/uploads/product/${item.product_main_img}`} alt="" />
                      </div>

                      <div className="txt">
                        <p className="tit">{item.product_nm}</p>
                        {[1, 2, 3, 4].map(
                          (number) =>
                            item[`opt_nm1_${number}`] !== null && (
                              <p key={number} className="option">
                                {item[`opt_nm1_${number}`]} : {item[`opt_nm2_${number}`]}
                              </p>
                            )
                        )}
                        <div className="price">
                          <ins>
                            {formatNumber(
                              item.sale_price +
                                item.price1 +
                                item.price2 +
                                item.price3 +
                                item.stock_opt_price
                            )}
                          </ins>
                        </div>
                      </div>
                    </div>

                    <div className="btn_area">
                      <button
                        type="button"
                        className="btn_txt"
                        onClick={() => {
                          if (cust_seq) {
                            jsRestock(item.stock_seq, item.product_cd);
                          } else {
                            return navigate('/shop/login/login');
                          }
                        }}
                      >
                        신청
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestockLayer;
