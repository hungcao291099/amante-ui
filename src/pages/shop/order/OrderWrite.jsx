import { React , useEffect, useState,handleCheckBox,useContext } from "react";
import "swiper/css";
import { getCookie } from '@utils/functions';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { mainApi} from "@apis/mainApi";
import { useNavigate } from "react-router";
import { koApiURL } from "@utils/constants";


import {orderList} from '@apis/order';
import { CdnContext } from "@contexts/cdnContext";
import { formatNumber } from '@utils/functions'






const OrderWrite = () =>{

    const navigate = useNavigate();
    
    const [cart, setCart] = useState([]);
    const [codeTransMsgInfo, setCodeTransMsgInfo] = useState({});
    const [codeTransInfo, setCodeTransInfo] = useState({});
    const [directOrder, setDirectOrder] = useState({});
    const [memAddrList, setMemAddrList] = useState({});
    const [memInfo, setMemInfo] = useState({});
    const [memberGrpInfo, setMemberGrpInfo] = useState({});
    const [prevTransList, setPrevTransList] = useState({});
    const { baseUrl } = useContext(CdnContext);
    

    const cookies = new Cookies();
    const token = cookies.get('member_access_token');
    const userData = token ? jwt_decode(token) : null
    const cust_seq = userData?.cust_seq || null
    const user_id = userData?.user_id || null
    const user_nm = userData?.user_nm || null
    
    useEffect(() => {
        const fetchData = async () => {
          const result = await orderList(token);
            
          const resultJson = result.data.data;
          
          setCart(resultJson.cart_list);
          setCodeTransMsgInfo(resultJson.code_trans_msg_info);
          setCodeTransInfo(resultJson.const_trans_info);
          setDirectOrder(resultJson.direct_order);
          setMemAddrList(resultJson.mem_addr_list);
          setMemInfo(resultJson.mem_info);
          setMemberGrpInfo(resultJson.member_grp_info);
          setPrevTransList(resultJson.prev_trans_list);

        };
        fetchData();
      }, []);

      let re_name = prevTransList != null ? prevTransList.re_name : '' ;
      let re_hp = prevTransList != null ? prevTransList.re_hp : '' ;
      let re_zip = prevTransList != null ? prevTransList.re_zip : '' ;
      let re_addr1 = prevTransList != null  ? prevTransList.re_addr1 : '' ;
      let re_addr2 = prevTransList != null ? prevTransList.re_addr2 : '' ;
      let my_otype_cd = memInfo.next_use_otype_cd ? memInfo.next_use_otype_cd : "70";
      Functions.LoadEmail('or_email3', 'or_email2');

      $("#code_trans_msg").on("change",function(){
        
        $("#trans_memo").val($(this).val());
        
      });
    
return (
    <div>
        <form id="orderForm" name="orderForm">
            <input type="hidden" id="path_gb"  />
            <div className="content order order_write_page">
                <div className="top">
                    <h2>주문결제</h2>
                </div>
                <ul className="js_acd_toggle">
                    <li className="active">
                    <button type="button" className="btn_acd" ><span>주문상품 개</span></button>
                    <div className="con_acd">
                        <div className="c_lists">
                            <ul>
                            {cart.map((item, idx) => {
                                let cart_seq       = item.cart_seq;
                                let product_cd     = item.product_cd;
                                let product_nm     = item.product_nm;
                                let qty            = item.qty;
                                let supply_price   = item.supply_price;
                                let sale_price     = item.sale_price;

                                let main_img       = item.main_img;
                                let free_trans_yn  = item.free_trans_yn;
                                let fee_rate	   = item.fee_rate;
                                let category2_nm   = item.category2_nm;
                                let coupon_yn	   = item.coupon_use_yn;
                                let reserve_yn 	   = item.reserve_use_yn;
                                let reserve_rate   = item.reserve_rate;

                                let stock_price_info 	= item.stock_price_info;
                                let p_img
                                let reserve_use_yn_str 

				                    if(main_img != "" && main_img != null){
				                    	p_img = baseUrl+"/uploads/product/200/"+main_img;
				                    }else{
				                    	p_img = "/asset/images/srb/default/logo.png";
				                    }

				                    if(reserve_yn == "N"){
				                    	reserve_use_yn_str = "적립금 사용불가";
				                    }else{
				                    	reserve_use_yn_str = "";
				                    }

                                    let opt_price = 0;
                                    let opt_nm2
                                    let opt_nm = ""
									if(stock_price_info.length > 0){

                                        
                                        stock_price_info.map((item1, idKey1) => {
                                            opt_price += item1.tot_stock_opt_price;
                                            if(item1.tot_stock_opt_price > 0){
                                                opt_nm2 = "(+"+(item1.tot_stock_opt_price)+")";
                                            }
                                        });

                                    }else{
                                        opt_price = 0;
                                    }
										//  opt_price = stock_price_info.tot_stock_opt_price;
										// if(stock_price_info.tot_stock_opt_price > 0){
										// 	opt_nm2 = "("+(stock_price_info.tot_stock_opt_price)+")";
										// }
										// }else{
										// 	opt_price = 0;
										// }

                                        {item.option_list.map((o_row, idOption) => {
                                            if(opt_nm.length > 0){
                                             if(o_row.opt_gb == 'I'){
                                                 if(w_opt != ''){
                                                     opt_nm += ' / ' . w_opt.trim();
                                                     w_opt = '';
                                                 }

                                                 opt_nm += "</span><br><span><em>"+ o_row.opt_nm1.trim() + "</em> : " + o_row.opt_nm2.trim();
                                             } else {
                                                 opt_nm += ", " + o_row.opt_nm1.trim() + " : " + o_row.opt_nm2.trim();
                                             }
                                         } else{
                                             opt_nm = o_row.opt_nm1.trim() + " : " + o_row.opt_nm2.trim();

                                             if( o_row.w_opt.length > 0 ){
                                                 // $opt_nm .= ' / ' . trim($o_row['w_opt']);
                                                 w_opt = o_row.w_opt.trim();
                                             }
                                         }

                                         if(o_row.opt_price > 0) {
                                             opt_nm += "(+"+(o_row.opt_price * o_row.qty)+")";
                                         }
                                         opt_price += (o_row.opt_price) * o_row.qty;
                                     })
                                     }

                                        let product_price = sale_price * qty;
						                
				                    	let product_supply_price = supply_price * qty;
					                	
					                	let sum_product_price = product_price + opt_price;
                                        
					                	
						                // let sum_product_supply_price = sum_product_supply_price + opt_price;
					                	
					                	let discount_price = product_supply_price - product_price;
                            return (
                                <>
                                <li key={idx}>
                                    <div className="item">
                                        <div className="box img">
                                        <div className="design_checkbox">
                                            <label >
                                                <img  src={`${p_img}`} />
                                            </label>
                                        </div>
                                        </div>
                                        <div className="box con">
                                            <p className="tit">
                                                <a href={`${baseUrl}/product/product_view?product_cd=${product_cd}`} data-dtr-track={product_cd}>{product_nm}</a>
                                            </p>
                                            <p className="info">
                                            <span >
                                                <b dangerouslySetInnerHTML={{ __html: opt_nm}} />
                                                <b dangerouslySetInnerHTML={{ __html: opt_nm2}} />
                                            </span>
                                            <span>{qty}개</span>
										    <span>{reserve_use_yn_str}</span>
                                            </p>
                                            <div className="order_price">
                                                <dl>
                                                    <dt>상품금액</dt>
                                                    <dd>{formatNumber(product_price)}원</dd>
                                                </dl>
                                                <dl className="total">
                                                    <dt>주문금액</dt>
                                                    <dd>{formatNumber(sum_product_price)}원</dd>
                                                </dl>
									        </div>
                                        </div>
                                    </div>
                                </li>
                                <input type="hidden" id="cNo" name="cNo" value={`${cart_seq}`}/>
                                <input type="hidden" id={`qty${cart_seq}`} name={`qty${cart_seq}`} value={`${qty}`} />
                                <input type="hidden" id={`sum_product_price${cart_seq}`} name={`sum_product_price${cart_seq}`} value={`${sum_product_price}`}/>	
                                <input type="hidden" id={`product_cd${cart_seq}`} name={`product_cd${cart_seq}`} value={`${product_cd}`}/>
                                <input type="hidden" id={`free_trans_yn${cart_seq}`} name={`free_trans_yn${cart_seq}`} value={`${free_trans_yn}`}/>
                                <input type="hidden" id={`coupon_yn${cart_seq}`} name={`coupon_yn${cart_seq}`} value={`${coupon_yn}`}/>
                                <input type="hidden" id={`reserve_yn${cart_seq}`} name={`reserve_yn${cart_seq}`} value={`${reserve_yn}`}/>
                                </>
                                
                            )
                                
                            })}
                            </ul>
                        </div>
                        <div className="ntc_list">
                            <p>배송정보 : 70,000원 미만시 3,500원<br/>제주도, 도서산간, 제주도 도서산간 지역은 박스당 3,000원~8,000원의 추가배송비가 부과되며, 별도 안내를 드립니다.<br/>지역별 추가배송비 : 제주 3,000원 / 도서산간 5,000원 / 제주도 도서산간 8,000원<br/>대형화물로 운송되는 제품구매시, 해당 상품을 제외한 일반상품들은 기본 배송비 설정이 적용됩니다.</p>
                            <p className="tit">고객등급</p>
					        <p>[{memInfo.user_nm}]님은 [{memInfo.member_grp_nm}]입니다.</p>
                        </div>
                    </div>
                    </li>
                </ul>
                <div className="tg_box">
                    <ul className="js_acd_toggle left">
                        <li>
                            <button type="button" className="btn_acd"><span>주문자 정보</span></button>
                            <div className="con_acd">
                                <div className="form_area">
                                    <label  className="label_tit">주문하신 분</label>
                                    <input type="text" id="or_name" name="or_name" value={`${memInfo.user_nm}`} placeholder="주문하신 분" />
                                    <label  className="label_tit">연락처</label>
                                    <div className="phone_area">
                                        <input type="number" id="or_hp1" name="or_hp1" className="phone_first" placeholder="" value={`${memInfo.phone1}`}/>
                                        <span>-</span>
                                        <input type="number" id="or_hp2" name="or_hp2" className="phone_second" placeholder="" value={`${memInfo.phone2}`}/>
                                        <span>-</span>
                                        <input type="number" id="or_hp3" name="or_hp3" className="phone_last" placeholder="" value={`${memInfo.phone3}`}/>
                                    </div>
                                    <label htmlFor="or_email1" className="label_tit">이메일</label>
                                    <div className="email_area">
                                        <input type="text" id="or_email1" name="or_email1" className="phone_first" placeholder="" value={`${memInfo.email_id}`}/>
                                        <span>@</span>
                                        <input type="text" id="or_email2" name="or_email2" className="phone_first" placeholder="" value={`${memInfo.email_addr}`} />
                                        <select id="or_email3" name="or_email3" >
                                        </select>
                                    </div>

                                    <input type="hidden" id="prev_name" value={`${re_name}`}/>
                                    <input type="hidden" id="prev_hp" value={`${re_hp}`}/>
                                    <input type="hidden" id="prev_zip" value={`${re_zip }`}/>
                                    <input type="hidden" id="prev_addr1" value={`${re_addr1}`}/>
                                    <input type="hidden" id="prev_addr2" value={`${re_addr2}`}/>
                                </div>
                            </div>
                        </li>
                        <li className="tab_list">
                            <button type="button" className="btn_acd"><span>배송지 정보</span></button>
                            <div className="con_acd">
                                <div className="js_tab">
                                    <strong>주문/선물 선택</strong>
                                    <input type="hidden" id="order_gb" name="order_gb" value="N"/>
                                    <ul className="js_tabBtn m_tab">
                                        <li className="on"><button type="button" className="btn" onClick={() => order.setOrderType('N')}  >일반주문</button></li>
                                        <li><button type="button" className="btn" id="gift_btn" onClick={() => order.setOrderType('G')}>선물하기</button></li>
                                    </ul>
                                    <div className="js_tabCon on">
                                        <div className="design_checkbox">
                                            <input type="checkbox" name="copy_mem_info" id="copy_mem_info" value="Y" onClick={() => order.setReAddr()}/>
                                            <label htmlFor="copy_mem_info">주문자 정보와 동일</label>
                                        </div>
                                        <div className="rdo_box">
                                            <div className="design_radio">
                                                <input type="radio" name="shipping_addr" id="addr_default"  defaultChecked onClick={() => order.changeDelivery(memInfo.mem_addr_seq)}  />
                                                <label htmlFor="addr_default">기본배송지</label>
                                            </div>
                                            <div className="design_radio">
                                                <input type="radio" name="shipping_addr" id="addr_lately"/>
                                                <label htmlFor="addr_lately" onClick={() => order.recentReAddr()}>최근배송지</label>
                                            </div>
                                            <div className="design_radio">
                                                <input type="radio" name="shipping_addr" id="addr_new" onClick={() => order.recentReAddr()} />
                                                <label htmlFor="addr_new">신규배송지</label>
                                            </div>
                                            <button type="button" className="btn_txt btn_line" onClick={() => commonUI.layer.open('.addr_layer',{ bg : true, alert : true })}>주소록</button>
                                        </div>
                                        <div className="form_area">
                                            <label htmlFor="re_nm" className="label_tit">받는 사람</label>
                                            <input type="text" id="re_name" name="re_name"  placeholder="받는 사람" />
                                            <label htmlFor="addr" className="label_tit">주소</label>
                                            <div className="addr_area">
                                                <div className="addr_box ip">
                                                    <input type="number" id="re_zip" name="re_zip" className="addr_zip" placeholder="우편번호"  onClick={() => Address.Load('re')}/>
                                                    <input type="text" id="re_addr1" name="re_addr1" className="addr_first" placeholder="주소 찾기를 이용해주세요" onClick={() => Address.Load('re')}  readOnly="readonly" />
                                                </div>
                                                <div className="addr_box btn">
                                                    <input type="text" id="re_addr2" name="re_addr2" className="addr_last" placeholder="나머지 주소"/>
                                                    <button type="button" className="btn_txt btn_dpoint" onClick={() => Address.Load('re')}>주소찾기</button>
                                                </div>
                                            </div>
                                            <label htmlFor="re_hp1" className="label_tit">연락처1</label>
                                            <div className="phone_area">
                                                <input type="number" id="re_hp1" name="re_hp1" className="phone_first" placeholder=""/>
                                                <span>-</span>
                                                <input type="number" id="re_hp2" name="re_hp2" className="phone_second" placeholder=""/>
                                                <span>-</span>
                                                <input type="number" id="re_hp3" name="re_hp3" className="phone_last" placeholder=""/>
                                            </div>
                                            <label htmlFor="re_hp21" className="label_tit">연락처2</label>
                                            <div className="phone_area">
                                                <input type="number" id="re_hp21" name="re_hp21" className="phone_first" placeholder=""/>
                                                <span>-</span>
                                                <input type="number" id="re_hp22" name="re_hp22" className="phone_second" placeholder=""/>
                                                <span>-</span>
                                                <input type="number" id="re_hp23" name="re_hp23" className="phone_last" placeholder=""/>
                                            </div>
                                            <label htmlFor="delivery_msg" className="label_tit">배송메시지</label>
                                            <div className="del_msg_area">
                                                <select id="code_trans_msg">
                                                    <option >메시지 선택</option>
                                                   
                                                    {codeTransMsgInfo.length > 0 ? (
                                                         <>
                                                          {codeTransMsgInfo.map((t_row, idx) => (
                                                                <option value={`${t_row.code_nm2}`}>{t_row.code_nm2}</option>
                                                        ))}
                                                         </>
                                                    ):""}
                                                     
                                                </select>
                                                <input type="text" id="trans_memo" name="trans_memo" />
                                            </div>
                                            {cust_seq != '' ?(
                                                <>
                                                <div className="design_checkbox">
                                                    <input type="checkbox" id="info_update" name="info_update" value="Y"/>
                                                    <label htmlFor="info_update">해당 배송지 정보를 나의 회원정보로 등록합니다.</label>
                                                </div>
                                                </>
                                            ):""}
                                        </div>
                                    </div>
                                    <div className="js_tabCon tab_gift">
                                        <div className="js_tab">
                                            <input type="hidden" name="gift_order_gb" id="gift_order_gb" value="K" />
                                            <ul className="js_tabBtn s_tab">
                                                <li className="on"><button type="button" className="btn gift_order_btn" value="K">카카오톡으로 선물</button></li>
                                                <li><button type="button" className="btn gift_order_btn" value="S">문자(SMS)로 선물</button></li>
                                            </ul>
                                            <div className="js_tabCon on">
                                                <span className="text">- 결제완료 후 카카오톡 친구를 선택할 수 있습니다.</span>
                                                <div className="form_area">
                                                    <label htmlFor="kakao_re_name" className="label_tit">받는 사람</label>
                                                    <input type="text" id="kakao_re_name" name="kakao_re_name"  placeholder="받는 사람"  />
                                                    <label htmlFor="kakao_msg_card" className="label_tit">메세지 카드</label>
                                                    <div className="msg_card_area">
                                                        <textarea id="kakao_msg_card" name="kakao_msg_card" ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js_tabCon">
                                                <span className="text">- 결제완료 후 받는 사람에게 문자(SMS)가 발송됩니다.</span>
                                                <div className="form_area">
                                                    <label htmlFor="sms_re_name" className="label_tit">받는 사람</label>
                                                    <input type="text" id="sms_re_name" name="sms_re_name"  placeholder="받는 사람" />
                                                    <label htmlFor="phone_first1" className="label_tit">연락처</label>
                                                    <div className="phone_area">
                                                        <input type="number" id="sms_re_hp1" name="sms_re_hp1" className="phone_first" placeholder="" min="0" max="999"/>
                                                        <span>-</span>
                                                        <input type="number" id="sms_re_hp2" name="sms_re_hp2" className="phone_second" placeholder="" min="0" max="9999"/>
                                                        <span>-</span>
                                                        <input type="number" id="sms_re_hp3" name="sms_re_hp3" className="phone_last" placeholder="" min="0" max="9999"/>
                                                    </div>
                                                    <label htmlFor="sms_msg_card" className="label_tit">메세지 카드</label>
                                                    <div className="msg_card_area">
                                                        <textarea id="sms_msg_card" name="sms_msg_card" ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <input type="hidden" id="member_grp_rate" value={`${memberGrpInfo.reserve_rate}`} />
                    <input type="hidden" id="cust_seq_id" name="cust_seq_id" value={`${cust_seq}`} />
                    <input type="hidden" id="add_trans_yn" name="add_trans_yn" value="N" />										
                    <input type="hidden" id="add_trans_price" name="add_trans_price" value="0" />								
                    <input type="hidden" id="buy_coupon_price" name="buy_coupon_price" value="0" />           					
                    <input type="hidden" id="buy_reserve_price" name="buy_reserve_price" value="0" />           				

                    <input type="hidden" id="const_trans_price" name="const_trans_price" value="0" />				
                    <input type="hidden" id="trans_price" name="trans_price" value="0" />						

                    <input type="hidden" id="mb_reserve" name="mb_reserve" value={`${memInfo.mb_reserve}`} />
                    <input type="hidden" id="mb_deposit" name="mb_deposit" value={`${memInfo.mb_deposit}`} />

                    <input type="hidden" id="order_price" name="order_price"   value="0" />          						  	
                    <input type="hidden" id="order_origin_price" name="order_origin_price" value="0" />							
                    <input type="hidden" id="coupon_member_seq" name="coupon_member_seq" />                                   	
                    <input type="hidden" id="coupon_gb" name="coupon_gb" />							  						  	
                    <input type="hidden" id="cart_seqs" name="cart_seqs" />
                    <ul className="js_acd_toggle right">
                        <li>
                            <button type="button" className="btn_acd"><span>결제 정보</span></button>
                            <div className="con_acd">
                                <dl>
                                    <dt>총 상품금액</dt>
                                    <dd><em id="order_price_span">0</em>원</dd>
                                </dl>
                                <dl>
                                    <dt>총 할인금액</dt>
                                    <dd><em id="discount_span">-0</em>원</dd>
                                </dl>
                                <dl>
                                    <dt>총 추가금액</dt>
                                    <dd>0</dd>
                                </dl>
                                <dl>
                                    <dt>배송비</dt>
                                    <dd><em id="trans_price_span">0</em>원</dd>
                                </dl>
                                
                                <dl className="box coupon" id="coupon_div" style={{ padding: cust_seq == ""  ? 'none' : 'block' }} >
                                    <dt>쿠폰사용</dt>
                                    <dd>
                                        <input type="hidden" id="coupon_sale" name="coupon_sale" value="0" className="numeric" readOnly="readonly"/>
                                        <input type="text" id="use_coupon_nm" title="사용할 쿠폰"  readOnly="readonly"/>
                                        <button type="button" className="btn_txt btn_dpoint" id="openCouponList">선택</button>
                                        <button type="button" className="btn_txt" onClick={() => order.CouponReSet()}>취소</button>
                                    </dd>
                                </dl>

                                <dl className="box mileage" id="reserve_div" style={{ padding: cust_seq == ""  ? 'none' : 'block' }}>
                                    <dt>적립금사용</dt>
                                    <dd>
                                        <p><input type="text" name="use_reserve" id="use_reserve" title="사용적립금" value="0" className="numeric"/> 원</p>
                                        <div className="design_checkbox">
                                            <input type="checkbox" id="all_use_reserve" value="Y"/>
                                            <label htmlFor="all_use_reserve">전액사용<span>(사용가능: {memInfo.mb_reserve}원)</span></label>
                                        </div>
                                    </dd>
                                </dl>

                                <dl className="box mileage" id="deposit_div" style={{display:'none'}}>
                                    <dt>예치금사용</dt>
                                    <dd>
                                        <p><input type="text" name="use_deposit" id="use_deposit" title="사용적립금" value="0" className="numeric"/> 원</p>
                                        <div className="design_checkbox">
                                            <input type="checkbox" id="all_use_deposit" value="Y"/>
                                            <label htmlFor="all_use_deposit">전액사용<span>(사용가능: {memInfo.mb_deposit}원)</span></label>
                                        </div>
                                    </dd>
                                </dl>
                                <dl className="total">
                                    <dt>총 결제예정금액</dt>
                                    <dd>
                                        <em><span id="finish_price_span">0</span>원</em>
                                        <div style={{ padding: cust_seq == ""  ? 'none' : 'block' }}>
                                            <span id="finish_reserve_span">0</span>원 적립예정<br/>(최종 적립금과 상이할 수 있습니다.)
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </li>
                        <li>
                            <button type="button" className="btn_acd"><span>결제 수단</span></button>
                            <div className="con_acd">
                            <ul className="payment">
                                <li>
                                    <div className="design_radio">
                                        <input type="radio" name="otype_cd" id="otype_cd_70" className="ip_change" value="70" style={{ checked: my_otype_cd == "70"  ? 'checked' : 'checked' }} />
                                        <label htmlFor="otype_cd_70" className="ico_pay pay_kakao">
                                            <em><img src={`${baseUrl}/asset/images/shop/order/pay_kakao.png`} alt=""/>카카오페이</em>
                                            <p>
                                                • 카카오톡에서 신용/체크카드 연결하고, 결제도 지문으로 쉽고 편리하게 이용하세요!<br/>
                                                • 본인명의 스마트폰에서 본인명의 카드 등록 후 사용 가능(카드등록 : 카카오톡  더보기  카카오페이  카드)<br/>
                                                • 이용가능 카드사 : 모든 국내 신용/체크카드<br/>
                                                • 카드 결제 시, 결제금액 200만원 이상일 경우 ARS추가 인증이 필요합니다. 카카오머니 결제시는 추가인증 없음
                                            </p>
                                        </label>
                                    </div>
                                </li>
                                {directOrder != 'kakaopay_direct' ? (
                                    <>
                                    <li>
                                        <div className="design_radio">
                                            <input type="radio" name="otype_cd" id="otype_cd_10" className="ip_change" value="10" style={{ checked: my_otype_cd == "10"  ? 'checked' : 'checked' }} />
                                            <label htmlFor="otype_cd_10" className="ico_pay pay_account"><em><img src={`${baseUrl}/asset/images/shop/order/pay_account.png`} alt=""/>가상계좌</em></label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="design_radio">
                                            <input type="radio" name="otype_cd" id="otype_cd_20" className="ip_change" value="20" style={{ checked: my_otype_cd == "20"  ? 'checked' : 'checked' }} />
                                            <label htmlFor="otype_cd_20" className="ico_pay pay_credit"><em><img src={`${baseUrl}/asset/images/shop/order/pay_credit.png`} alt=""/>신용카드</em></label>
                                        </div>
                                    </li> 
                                    <li>
                                        <div className="design_radio">
                                            <input type="radio" name="otype_cd" id="otype_cd_30" className="ip_change" value="30" style={{ checked: my_otype_cd == "30"  ? 'checked' : 'checked' }} />
                                            <label htmlFor="otype_cd_30" className="ico_pay pay_escrow"><em><img src={`${baseUrl}/asset/images/shop/order/pay_escrow.png`} alt=""/>실시간계좌이체</em></label>
                                        </div>
                                    </li> 
                                    <li>
                                        <div className="design_radio">
                                            <input type="radio" name="otype_cd" id="otype_cd_100" className="ip_change" value="100" style={{ checked: my_otype_cd == "100"  ? 'checked' : 'checked' }}/>
                                            <label htmlFor="otype_cd_100" className="ico_pay pay_naver">
                                                <em><img src={`${baseUrl}/asset/images/shop/order/pay_naver.png`} alt=""/>네이버페이</em>
                                                <p>
                                                    • 주문 변경 시 카드사 혜택 및 할부 적용 여부는 해당 카드사 정책에 따라 변경될 수 있습니다.<br/>
                                                    • 네이버페이는 네이버ID로 별도 앱 설치 없이 신용카드 또는 은행계좌 정보를 등록하여 네이버페이 비밀번호로 결제할 수 있는 간편결제 서비스입니다.<br/>
                                                    • 결제 가능한 신용카드:신한,삼성,현대, BC,국민,하나,롯데, NH농협,씨티,카카오뱅크<br/>
                                                    • 결제 가능한 은행: <br/>
                                                    KB국민,IBK기업,NH농협,신한,씨티,SC제일,우리,카카오뱅크,케이뱅크,토스뱅크,하나,경남,광주,대구,부산,KDB산업,수협,우체국,전북,제주,새마을금고,신협,SBI저축,저축,미래에셋,삼성,신한금융투자,SK,유안타,유진투자,한국투자<br/>
                                                    • 네이버페이 카드 간편결제는 네이버페이에서 제공하는 카드사 별 무이자,청구할인 혜택을 받을 수 있습니다.
                                                </p>
                                            </label>
                                        </div>
							        </li>
                                    <li>
                                        <div className="design_radio">
                                            <input type="radio" name="otype_cd" id="otype_cd_40" className="ip_change" value="40" style={{ checked: my_otype_cd == "40"  ? 'checked' : 'checked' }}/>
                                            <label htmlFor="otype_cd_40" className="ico_pay pay_phone"><em><img src={`${baseUrl}/asset/images/shop/order/pay_phone.png`} alt=""/>휴대폰 결제</em></label>
                                        </div>
                                    </li>
                                    </>      
                                ): "" }
                            </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="agree_area">
                    <p>주문 동의</p>
                    <div className="con">
                        <div className="design_checkbox">
                            <input type="checkbox" id="all_agree" onClick={orderCheck} />
                            <label htmlFor="all_agree">전체 동의</label>
                        </div>
                        <div className="design_checkbox">
                            <input type="checkbox" name="next_use" id="next_use" className="checkbox" value="Y"/>
                            <label htmlFor="next_use">선택한 결제 수단을 다음에도 사용합니다.</label>
                        </div>
                        <div className="design_checkbox">
                            <input type="checkbox" id="buy_use" className="checkbox" />
                            <label htmlFor="buy_use">상기 결제정보를 확인하였으며, 구매진행에 동의합니다. <span>(필수)</span></label>
                        </div> 
                        {cust_seq === "" || cust_seq === null ? (
                            <>
                            <div className="design_checkbox">
                                <input type="checkbox" id="age_check" />
                                <label htmlFor="age_check">본인은 만 14세 이상입니다.<span className="point">(필수)</span></label>
                            </div>
                            <div className="design_checkbox">
                                <input type="checkbox" id="pri_check_02" />
                                <label htmlFor="pri_check_02">주문 및 개인정보 수집/이용에 동의 합니다.<span className="point">(필수)</span></label>
                                <button type="button" className="privacy_layer_02_btn layer_btn" >내용보기</button>
                            </div>
                            </>
                        ):"" }        
                    </div>
                </div>
                <div className="btn_area col2">
                    <button type="button" className="btn_txt" >취소</button>
                    <button type="button" className="btn_txt btn_point" onClick={() => order.orderSubmit(koApiURL,token)} >결제하기</button>
                </div>
            </div>
        </form>
        <div id="daum_layer" style={{display:'none',position:'fixed',top:'20%',overflow:'hidden',zIndex:'101'}}>
            <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style={{cursor:'pointer',position:'absolute',right:'-3px',top:'-3px',zIndex:'1'}} onClick={() => Address.Close()}  alt="닫기 버튼"/>
        </div>
    </div>
    
)};
export default OrderWrite;
