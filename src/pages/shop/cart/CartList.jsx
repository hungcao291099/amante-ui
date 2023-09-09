import { React , useEffect, useState,handleCheckBox } from "react";
import "swiper/css";
import { getCookie } from '@utils/functions';
import Cookies from 'universal-cookie';
import {cartList} from '@apis/cart';
import jwt_decode from "jwt-decode";
import Item from "@components/cart/Item";
import Banner from "@components/cart/Banner";
import { mainApi} from "@apis/mainApi";
import { useNavigate } from "react-router";
import { koApiURL } from "@utils/constants";
import { formatNumber } from '@utils/functions'




const CartList = () =>{
 
  const navigate = useNavigate();
    const [totalCount, setTotalCount] = useState();
    const [cart, setCart] = useState([]);
    const [memInfo, setMemInfo] = useState({});
    const [mainTopBanner, setMainTopBanner] = useState({});
    


    const cookies = new Cookies();
    const token = cookies.get('member_access_token');

  
    const userData = token ? jwt_decode(token) : null
    const cust_seq = userData?.cust_seq || null
    const user_id = userData?.user_id || null
    const user_nm = userData?.user_nm || null
    useEffect(() => {
        const fetchData = async () => {
          const result = await cartList(token);
          
          const banner = await mainApi();
          setMainTopBanner(banner.mainTopBanner);
          
          const resultJson = result.data;
          setCart(resultJson.cart);
          setTotalCount(resultJson.total_count);
          setMemInfo(resultJson.mem_info);
          
          
        };
        fetchData();
      }, []);
      
let total_price = 0;
let total_point = 0;

let testNumber = 10;







return (
  <div className="content order cart_lists_page">
              <div className="wrap">
                <div className="top_prd">
                  <h3>장바구니 ({totalCount})</h3>
                  <p>{user_nm} 님은 [{memInfo.member_grp_nm}] 회원입니다.</p>
                </div>

                <div className="top">
                  <div className="design_checkbox">
                    <input type="checkbox" id="all_N" className="checkbox" onClick={() => unCheck(koApiURL)}/>
                    <label >전체선택</label>
                  </div>
                  <button type="button" id="btn_del">선택삭제</button>
                </div>
              </div>
              <div className="c_lists design_line">
                <ul>
                {cart.map((product, idx) => {
                  return (
                    <>
                    <Item product={product} idx={idx} total_price = {total_price} total_point = {total_point} box_qty ={box_qty} testNumber={testNumber} formatNumber = {formatNumber}/>
                    </>
                  )
                   total_point += tmp_point;		
                })}
                </ul>
              </div>
              <div className="common_banner">
              {mainTopBanner.length > 0 ? (
                            <>
                 {mainTopBanner.map((item, idx) => {
                  return (
                    <>
                   <Banner item = {item} idx = {idx} />
                    </>
                  )
                   total_point += tmp_point;		
                })}
                            </>
                  ) : ""
                }
              </div>
              <div id="total_container">
              <div className="total_price">
                <div id="wrap_container">
                  <div className="wrap">
                    <dl>
                      <dt>총 상품가</dt>
                      <dd id="total_price">0</dd>
                    </dl>
                    <dl>
                      <dt>배송비</dt>
                      <dd id="delivery_fee">
                      0
                      </dd>
                    </dl>
                    <dl className="total">
                      <dt>총 상품 금액</dt>
                      <dd id="total" >
                        0
                        <em>0원 적립</em>
                      </dd>
                    </dl>
                  </div>
                  <div className="btn_area">
                  <p>총 {totalCount}개</p>
                  {!cust_seq ? (
                    <button type="button" className="btn_txt btn_point" onClick={() => {
                      alert('로그인 후 사용할 수 있습니다.')
                      return navigate('/shop/login/login')
                    }}>주문하기</button>
                    ) : (
                    <button type="button" className="btn_txt btn_point"  onClick={() => jsOrderSubmit(koApiURL,getCookie('session_id'),'')}>주문하기</button>
                    )
                  }
                  </div>
                </div>
              </div>
              </div>
               
  </div>

)};
export default CartList;