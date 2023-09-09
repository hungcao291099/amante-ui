import { koApiURL } from "@utils/constants";
import React, { useEffect, useState, useContext } from 'react';
import { mainWebImageURL, baseImageUrl, mainWebURL } from "@utils/constants"
import "swiper/css";
import { CdnContext } from "@contexts/cdnContext";
import Cookies from 'universal-cookie';




const OptionSItem = ({idx,product,box_qty,order_limit_cnt,order_qty}) => {
  const cookies = new Cookies();
  const token = cookies.get('member_access_token');

  let s_options = product.s_options;
  let s_option_text = '';
  // let c_options_price = 0;
  let w_opt = '';

  s_options.map(s_option => {
    s_option_text += s_option.opt_nm1 + ':' + s_option.opt_nm2 + '/';
    w_opt			=	s_option.w_opt;
})
debugger
let tmp_point = 0;
let  s_stock_opt_price = 0;
if(s_options.length > 0){
   s_stock_opt_price = s_options[0].opt_price;
}

let point		= (product.qty*(product.sale_price +  s_stock_opt_price) )*0.01;
 tmp_point	+= point;



  return (
    <div className="opt" id={`option_${idx}`}
         data-cart-seq={`${product.cart_seq}`}
         data-product-cd={`${product.product_cd}`}
         data-base-price={`${product.sale_price}`}
         data-option-price={`${s_stock_opt_price}`}
         data-qty={`${product.qty}`}
         data-product-gb="P"
         data-opt-gb="S"
         data-point={`${point}`}
         data-free_trans_yn={`${product.free_trans_yn}`}
         data-opt-cd1 =  {`${s_options[0].opt_cd1}`}
				 data-opt-cd2 =  {`${s_options[0].opt_cd2}`}
    >
            <p>
              {s_option_text}
              {w_opt != '' || w_opt != null ? (<>{w_opt}</> ) : ""}
             
            </p>
            <div className="qty_box">
							<button type="button" className="minus" onClick={(e) => box_qty_cart(`option_${idx}`, -1,token,koApiURL)}><span>감소</span></button>
							<input type="text" className="qty" name="qty" id="qty" value={`${product.qty}`}  />
							<button type="button" className="plus" onClick={(e) => box_qty_cart(`option_${idx}`, 1,token,koApiURL)}><span>증가</span></button>
						</div>
            <p className="price">{formatNumber((product.sale_price + s_stock_opt_price) * product.qty)}원</p>
    </div>
  )
}

export default OptionSItem

// onClick={(e) => replyWriteOpen(e, review.use_review_seq, review.user_id)}
