import { koApiURL } from "@utils/constants";
import React, { useEffect, useState, useContext } from 'react';
import { mainWebImageURL, baseImageUrl, mainWebURL } from "@utils/constants"
import "swiper/css";
import { CdnContext } from "@contexts/cdnContext";
import Cookies from 'universal-cookie';




const OptionItem = ({idx,product,box_qty,order_limit_cnt,order_qty,formatNumber}) => {
  const cookies = new Cookies();
  const token = cookies.get('member_access_token');

let point		= (product.qty*(product.sale_price) )*0.01;

let tmp_point = 0;
tmp_point	+= point;



  return (
    <div className="opt" id={`option_${idx}`}
         data-cart-seq={`${product.cart_seq}`}
         data-product-cd={`${product.product_cd}`}
         data-base-price={`${product.sale_price}`}
         data-option-price='0'
         data-qty={`${product.qty}`}
         data-product-gb="P"
        
         data-point={`${point}`}
         data-free_trans_yn={`${product.free_trans_yn}`}
    >
            <p>
              {product.product_nm}
            </p>
            <div className="qty_box">
							<button type="button" className="minus" onClick={(e) => box_qty_cart(`option_${idx}`, -1,token,koApiURL)}><span>감소</span></button>
							<input type="text" className="qty" name="qty" id="qty" value={`${product.qty}`}  />
							<button type="button" className="plus" onClick={(e) => box_qty_cart(`option_${idx}`, 1,token,koApiURL)}><span>증가</span></button>
						</div>
            <p className="price">{formatNumber(product.total_price)}원</p>
    </div>
  )
}

export default OptionItem

