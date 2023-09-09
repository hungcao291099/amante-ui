import { koApiURL } from "@utils/constants";
import React, { useEffect, useState, useContext } from 'react';
import { mainWebImageURL, baseImageUrl, mainWebURL } from "@utils/constants"
import "swiper/css";
import { CdnContext } from "@contexts/cdnContext";
import OptionCItem from "@components/cart/OptionCItem";
import OptionIItem from "@components/cart/OptionIItem";
import OptionSItem from "@components/cart/OptionSItem";
import OptionItem from "@components/cart/OptionItem";
import Cookies from 'universal-cookie';



const Item = ({idx,product,total_price,total_point,box_qty,testNumber,formatNumber}) => {
  const cookies = new Cookies();
  const token = cookies.get('member_access_token');

  total_price += product.total_price;
  let tmp_point = 0;
  let product_type = product.product_type;
  let order_limit_cnt = product.order_limit_cnt ? product.order_limit_cnt : 0;
  let order_qty = product.order_qty ? product.order_qty : 0;
  let main_img ="";

  let c_option_text = '';
	let c_options_price = 0;

  if(product_type == 'G'){
    if(product.main_img != ""){
        main_img = "/uploads/present/"+product.main_img;     
    } else {
        main_img = "/asset/images/shop/product/pro_in_img.jpg";
    }
  } else {
    if(product.product_main_img != ""){
        main_img = "/uploads/product/65/"+product.product_main_img;
    } else {
        main_img = "/asset/images/shop/product/pro_in_img.jpg";
    }
  }

  

  return (
    <li key={idx}>
        <div className="item">
					<div className="box img">
						<div className="design_checkbox">
							<input  type="checkbox"  className="checkbox" name="cart_seq[]"  id={`cart_seq${product.cart_seq}`} value={`${product.cart_seq}`}  onClick={() => getPrice(koApiURL)} />
							<label ><img src={`${main_img}`} alt="" /></label>
						</div>
					</div>
					<div className="box con">
						<p className="tit"><a href={`${mainWebURL}/product/product_view?product_cd=${product.product_cd}`} >{product.product_nm}</a></p>
						<p className="info">
							<span>{product.trans_bigo}</span>
						</p>
						<button type="button" className="btn_del" value={`${product.cart_seq}`} onClick={(e) => delete_cart(`${product.cart_seq}`, token,koApiURL)}>삭제</button>
					</div>
				</div>
        {product.c_options != null && product.c_options.length > 0 ? (
                            <>
          <OptionCItem idx = {idx} product={product} box_qty = {box_qty} testNumber ={testNumber} order_limit_cnt = {order_limit_cnt} order_qty ={order_qty} formatNumber = {formatNumber}/>
                            </>
          ) : ""
        }
        { product.s_options != null && product.s_options.length > 0 ? (
                            <>
          <OptionSItem idx = {idx} product={product} box_qty = {box_qty} testNumber ={testNumber} order_limit_cnt = {order_limit_cnt} order_qty ={order_qty} formatNumber = {formatNumber}/>
                            </>
          ) : ""
        }
        { product.i_options != null && product.i_options .length > 0 ? (
                            <>
          <OptionIItem idx = {idx} product={product} box_qty = {box_qty} testNumber ={testNumber} order_limit_cnt = {order_limit_cnt} order_qty ={order_qty} formatNumber = {formatNumber}/>
                            </>
          ) : ""
        }
        {product.i_options != null && product.i_options .length < 0 && product.c_options .length < 0 && product.s_options .length < 0   ? (
                            <>
          <OptionItem idx = {idx} product={product} box_qty = {box_qty} testNumber ={testNumber} order_limit_cnt = {order_limit_cnt} order_qty ={order_qty} formatNumber = {formatNumber}/>
                            </>
          ) : ""
        }
       
    </li>
    
  )
}

export default Item