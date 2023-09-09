import { koApiURL } from "@utils/constants";
import React, { useEffect, useState, useContext } from 'react';
import { mainWebImageURL, baseImageUrl, mainWebURL } from "@utils/constants"
import "swiper/css";
import { CdnContext } from "@contexts/cdnContext";
import Cookies from 'universal-cookie';




const OptionCItem = ({idx,product,box_qty,order_limit_cnt,order_qty,formatNumber}) => {
  const cookies = new Cookies();
  const token = cookies.get('member_access_token');

  let c_options = product.c_options;
  let c_option_text = '';
  let c_options_price = 0;
  let w_opt = '';

c_options.map(c_option => {
    c_option_text += c_option.opt_nm1 + ':' + c_option.opt_nm2 ;
    c_options_price += c_option.opt_price;
    w_opt			=	c_option.w_opt;
})

let tmp_point = 0;
let c_stock_opt_price = c_options[0].stock_opt_price;
let point		= (product.qty*(product.sale_price + c_options_price + c_stock_opt_price) )*0.01;
 tmp_point	+= point;



  return (
    <div className="opt" id={`option_${idx}`}
         data-cart-seq={`${product.cart_seq}`}
         data-product-cd={`${product.product_cd}`}
         data-base-price={`${product.sale_price}`}
         data-option-price={`${c_options_price} + ${c_stock_opt_price}`}
         data-qty={`${product.qty}`}
         data-product-gb="P"
         data-opt-gb="C"
         data-point={`${point}`}
         data-free_trans_yn={`${product.free_trans_yn}`}
    >
            <p>
              {c_option_text}
              {w_opt != '' || w_opt != null ? (<>{w_opt}</> ) : ""}
              {c_options_price + c_stock_opt_price  > 0 ? (<>{c_options_price + c_stock_opt_price} 원 </> ) : ""}
            </p>
            <div className="qty_box">
							<button type="button" className="minus" onClick={(e) => box_qty_cart(`option_${idx}`, -1,token,koApiURL)}><span>감소</span></button>
							<input type="text" className="qty" name="qty" id="qty" value={`${product.qty}`}  />
							<button type="button" className="plus" onClick={(e) => box_qty_cart(`option_${idx}`, 1,token,koApiURL)}><span>증가</span></button>
						</div>
            <p className="price">{formatNumber((product.sale_price + c_options_price + c_stock_opt_price) * product.qty)}원</p>
    </div>
  )
}

export default OptionCItem

// onClick={(e) => replyWriteOpen(e, review.use_review_seq, review.user_id)}
