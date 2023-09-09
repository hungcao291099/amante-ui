
const CouponLayer = ({productView, baseUrl, formatNumber, api, cust_seq, user_id, setRefreshPage}) => {



  async function issue(coupon_master_seq, coupon_seq) {
    try {
      const {data} = await api({
        url: '/shop/product/issue_coupon',
        method: "POST",
        data:{
          coupon_master_seq,
          coupon_seq,
          cust_seq,
          user_id
        }
      })
      
      if (data.status === 'ok') {
        alert("정상적으로 발급되었습니다.");
        setRefreshPage(prev => !prev)
        commonUI.layer.close()
      } else if (data.status === 'err') {
        alert(data.msg);
        return false;
      }
    } catch (error) {
      console.log(error)
    }
  }





  async function allissue() {
		const coupon_master_seq = productView.coupon_master_seq
		const coupon_seq = productView.coupon_seq
    
		if (coupon_seq.length === 0 || coupon_master_seq.length === 0) {
			alert('발급받을 수 있는 쿠폰이 없습니다.');
			return;
		}

    try {
      const {data} = await api({
        url: '/shop/product/issue_all_coupon',
        method: 'POST',
        data: {
          coupon_master_seq,
          coupon_seq,
          user_id,
          cust_seq
        }
      })

      if (data.status === 'ok') {
        alert("정상적으로 발급되었습니다.");
        setRefreshPage(prev => !prev)
        commonUI.layer.close()
      } else if (data.status === 'err') {
        alert(data.msg);
      }

    } catch (error) {
      console.log(error)
    }
	}



  return (
    <div className="layer_box coupon_sel_layer" id="coupon_sel_layer" style={{padding: 0}}>
      <div className="layer_outer">
        <div className="layer_inner">
          <div className="layer_con">
            <div className="layer_tit">
              <h2>쿠폰선택</h2>
              <button type="button" className="layer_close" onClick={() => commonUI.layer.close()}>닫기</button>
            </div>

            <div className="bn_area">
              <picture
                style={{cursor: productView.coupon_banner?.link !== "" ? 'pointer' : ''}}
                onClick={() => {
                  if (productView.coupon_banner?.link !== "") {
                    if (productView.coupon_banner?.link === 'in') {
                      return window.location.href = productView.coupon_banner.link
                    } else {
                      return window.open(productView.coupon_banner?.link)
                    }
                  }
                }}
              >
                <source srcSet={`${baseUrl}/uploads/banner/${productView.coupon_banner?.file_nm1}`} media="(min-width:768px)"/>
                <source srcSet={`${baseUrl}/uploads/banner/${productView.coupon_banner?.file_nm2}`}  media="(max-width:767px)"/>
                <img loading="lazy" src={`${baseUrl}/uploads/banner/${productView.coupon_banner?.file_nm1}`} alt=""/>
              </picture>
            </div>

            <ul>
              {productView.coupon_list?.map((coupon, index) => (
                coupon.check === 'N' && (
                  <li key={index}>
                    <div className="box">
                      {coupon.coupon_gb === 0 ? <p className="price">{coupon.coupon_value}%</p> : 
                      coupon.coupon_gb === 1 ? <p className="price">{coupon.coupon_value}원</p> : ''
                      }
                      <p className="tit">{coupon.title}</p>
                      <p>{formatNumber(coupon.min_price)}원 이상 구매시 최대 {formatNumber(coupon.max_price)}원 이상 할인</p>
                      <p>{coupon.s_date.substring(0,10)} ~ {coupon.e_date.substring(0,10)}</p>
                    </div>
                    <div className="box btn">
                      <button type="button"
                        onClick={() => issue(coupon.coupon_master_seq, coupon.coupon_seq)}
                      >
                        쿠폰 다운받기
                      </button>
                    </div>
                  </li>
                )
              ))}
            </ul>
            <div className="btn_area col2">
              <button type="button" className="btn_txt btn_lgray" onClick={() => commonUI.layer.close()}><span>닫기</span></button>
              <button type="button" className="btn_txt btn_point" onClick={() => allissue()}><span>쿠폰 모두 받기</span></button>
            </div>    
          </div>
        </div>
      </div>
    </div>
  )
}

export default CouponLayer