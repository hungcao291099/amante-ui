import { koApiURL } from "@utils/constants";
import React, { useEffect, useState, useContext } from 'react';
import { mainWebImageURL, baseImageUrl, mainWebURL } from "@utils/constants"
import "swiper/css";
import { CdnContext } from "@contexts/cdnContext";
import Cookies from 'universal-cookie';




const OptionIItem = ({idx,product,box_qty,order_limit_cnt,order_qty}) => {
  const cookies = new Cookies();
  const token = cookies.get('member_access_token');

  let i_options = product.i_options;


// i_options.map(c_option => {
//     c_option_text += c_option.opt_nm1 + ':' + c_option.opt_nm2 ;
//     c_options_price += c_option.opt_price;
//     w_opt			=	c_option.w_opt;
// })

// let tmp_point = 0;
// let c_stock_opt_price = c_options[0].stock_opt_price;
// let point		= (product.qty*(product.sale_price + c_options_price + c_stock_opt_price) )*0.01;
//  tmp_point	+= point;


let tmp_point = 0;
  return (
    <div>
        {i_options &&
            i_options.map((item, idx) => {
              let point		= (item.qty*(item.opt_price) )*0.01;
							 tmp_point	+= point;
              return (
                <div className="opt" id={`option_${idx}`}
                    data-cart-seq={`${item.cart_seq}`}
                    data-product-cd={`${product.product_cd}`}
                    data-base-price={`${item.sale_price}`}
                    data-option-price='0'
                    data-qty={`${product.qty}`}
                    data-product-gb="P"
                    data-opt-gb="I"
                    data-point={`${point}`}
                    data-free_trans_yn={`${product.free_trans_yn}`}
                    data-opt-cd1 =  {`${item.opt_cd1}`}
                    data-opt-cd2 =  {`${item.opt_cd2}`}
                >
            <p>
              {item.opt_nm2}
            </p>
            <div className="qty_box">
							<button type="button" className="minus" onClick={(e) => box_qty_cart(`option_${idx}`, -1,token,koApiURL)}><span>감소</span></button>
							<input type="text" className="qty" name="qty" id="qty" value={`${product.qty}`}  />
							<button type="button" className="plus" onClick={(e) => box_qty_cart(`option_${idx}`, 1,token,koApiURL)}><span>증가</span></button>
						</div>
            <p className="price">{formatNumber(item.opt_price * product.qty)}원</p>
    </div>
              );
            })}
    </div>
  )
}

export default OptionIItem

// onClick={(e) => replyWriteOpen(e, review.use_review_seq, review.user_id)}
