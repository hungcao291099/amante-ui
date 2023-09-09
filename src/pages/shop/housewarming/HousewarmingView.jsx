import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import 'swiper/css';

import { useLocation,useNavigate } from "react-router";
import { CdnContext } from "@contexts/cdnContext";
import { getHousewarmingView} from "@apis/housewarming";
import moment from 'moment';
import Comment from "@components/Comment/CommentHouseWarming";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import CommuTab from "@components/CommuTab";

const HousewarmingView = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const event_seq = searchParams.get("event_seq") || null;
    const cookies = new Cookies()
    const token = cookies.get('member_access_token')
    const userData = token ? jwt_decode(token) : null
    const cust_seq = userData?.cust_seq || null
    const user_id = userData?.user_id || null
    const user_nm = userData?.user_nm || null
    const sort = "housewarming";
    
    const navigate = useNavigate();

    const { baseUrl } = useContext(CdnContext)
    const [houseWarmingView, setHouseWarmingView] = useState({});
    
    
    useEffect(() => {
      const fetchData = async () => {
       
      const result =  await getHousewarmingView(event_seq);
      setHouseWarmingView(result.data);
       

      };
  
      fetchData();
    }, []);

     function like_con(sort, no, gubun){
        Csrf.Set(_CSRF_NAME_);
        $.ajax({
            url : "/shop/event/event_board_like_ajax",
            type : "post",
            data : {'sort':sort, 'no':no, 'gubun':gubun},
            dataType:'json',
            success:function(data){
                if(data.status == 'Y'){
                    location.reload();
                }else{
                    alert(data.msg);
                    location.reload();
                }
            },error:function(request,status,error){
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
     }

     function del_like(sort, no){
        Csrf.Set(_CSRF_NAME_);
        $.ajax({
            url : "/shop/event/event_board_like_del_ajax",
            type : "post",
            data : {'sort':sort, 'no':no},
            dataType:'json',
            success:function(data){
                if(data.status == 'Y'){
                    location.reload();
                }else{
                    alert(data.msg);
                    location.reload();
                }
            },error:function(request,status,error){
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        })
    }
     
     function share_sns(e){
        var url = window.document.location.href;
        if(e == 'U'){
            var textarea = document.createElement("textarea");
            document.body.appendChild(textarea);
            textarea.value = url;
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            alert("URL이 복사되었습니다.");
        }else if(e == 'F'){
            window.open( 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(url) );
        }else if(e == 'K'){
            Kakao.init('95e2f2d7c92bc69b40d5d41818055a6b');
            Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: '아망떼',
                    description: houseWarmingView.event_nm,
                    imageUrl:img_url,
                    link: {
                    mobileWebUrl: location.href,
                    webUrl: location.href,
                    },
                },
                social: {
                    likeCount: houseWarmingView.like,
                    commentCount: houseWarmingView.comm_cnt,
                },
                buttons: [
                    {
                    title: '게시물 보기',
                    link: {
                        mobileWebUrl: location.href,
                    },
                    },
                ]
                });
        }
    }
    return (
        <div>
            <CommuTab />
        <div className="content hw_tip housewarming housewarming_view_page">
        <div className="hw_tip_top">
            <picture>
                <source srcSet="/asset/images/shop/housewarming/housewarming_view_thumb.png" media="(min-width:768px)"/>
                <source srcSet="/asset/images/shop/housewarming/housewarming_view_thumb.png" media="(max-width:767px)"/>
                <img src="/asset/images/shop/housewarming/housewarming_view_thumb.png" alt=""/>
            </picture>
        </div>

        <div className="view_area">
            <div className="txt_con">
                <p className="tit"><strong className="tit">{houseWarmingView.event_nm}</strong></p>
                <p className="user_id">mornaliza_</p>
                    {/* <span className="pink">체험단</span>
                    <span>썬데이모닝</span> */}
                <div className="info">
                    <p className="ico_comment">{houseWarmingView.comm_cnt}</p>
                    <p className="ico_like">{houseWarmingView.like_cnt}</p>
                    <p className="ico_hit">{houseWarmingView.hit}</p>
                </div>
                <p className="date" >{moment(houseWarmingView.reg_date).format("DD/MM/YYYY")}</p>
            </div>
            <div className="wrap">
                        {(() => {
                            if (houseWarmingView.file_nm1) {
                            return (
                                <>
                                <div className="img js_offset">
                                    <picture>
                                        <source srcSet={`${baseUrl}/uploads/housewarming/${houseWarmingView.file_nm1}`} media="(min-width:768px)"/>
                                        <source srcSet={`${baseUrl}/uploads/housewarming/${houseWarmingView.file_nm1}`} media="(max-width:767px)"/>
                                        <img src={`${baseUrl}/uploads/housewarming/${houseWarmingView.file_nm1}`} alt=""/>
                                    </picture>
                                </div>
                                </>
                            );
                            } 
                            if (houseWarmingView.file_nm2) {
                                return (
                                    <>
                                    <div className="img js_offset">
                                        <picture>
                                            <source srcSet={`${baseUrl}/uploads/housewarming/${houseWarmingView.file_nm2}`} media="(min-width:768px)"/>
                                            <source srcSet={`${baseUrl}/uploads/housewarming/${houseWarmingView.file_nm2}`} media="(max-width:767px)"/>
                                            <img src={`${baseUrl}/uploads/housewarming/${houseWarmingView.file_nm2}`} alt=""/>
                                        </picture>
                                    </div>
                                    </>
                                );
                            }
                            if (houseWarmingView.file_nm3) {
                                return (
                                    <>
                                    <div className="img js_offset">
                                        <picture>
                                            <source srcSet={`${baseUrl}/uploads/housewarming/${houseWarmingView.file_nm3}`} media="(min-width:768px)"/>
                                            <source srcSet={`${baseUrl}/uploads/housewarming/${houseWarmingView.file_nm3}`} media="(max-width:767px)"/>
                                            <img src={`${baseUrl}/uploads/housewarming/${houseWarmingView.file_nm3}`} alt=""/>
                                        </picture>
                                    </div>
                                    </>
                                );
                            }
                            if (houseWarmingView.file_nm4) {
                                return (
                                    <>
                                    <div className="img js_offset">
                                        <picture>
                                            <source srcSet={`${baseUrl}/uploads/housewarming/${houseWarmingView.file_nm4}`} media="(min-width:768px)"/>
                                            <source srcSet={`${baseUrl}/uploads/housewarming/${houseWarmingView.file_nm4}`} media="(max-width:767px)"/>
                                            <img src={`${baseUrl}/uploads/housewarming/${houseWarmingView.file_nm4}`} alt=""/>
                                        </picture>
                                    </div>
                                    </>
                                );
                            }
                        })()}
                
                <div className="txt">
                	
	                <div className="btn_area col2">
                        {(() => {
                            if (houseWarmingView.like_cnt > 0) {
                            return (
                                <>
                                <button type="button" class="btn_txt btn_gray btn_like on" onClick={() =>del_like('housewarming',houseWarmingView.event_seq)}><span>좋아요</span></button>
                                </>
                            );
                            } else {
                            return (
                                <>
                                <button type="button" className="btn_txt btn_gray btn_like" onClick={() =>like_con('housewarming',houseWarmingView.event_seq, 'L')}><span>좋아요</span></button>
                                </>
                            );
                            }
                        })()}
                        <button type="button" className="open btn_txt btn_gray btn_share"><span>공유하기</span></button>
	                    <button type="button" className="btn_txt btn_gray btn_list" onClick={() => location.href = "/shop/housewarming/housewarming_lists"} ><span>목록보기</span></button>

                        <div className="share_area">
                            <div className="share_layer">
                                <button type="button" className="facebook" onClick={() =>share_sns('F')}>페이스북으로 공유하기</button>
                                <button type="button" className="kakao" onClick={() =>share_sns('K')}>카카오로 공유하기</button>
                                <button type="button" className="url" onClick={() =>share_sns('U')}>URL로 공유하기</button>
                                <button type="button" className="close">공유하기 레이어 닫기</button>
                            </div>
                        </div>
	                </div>
                </div>
            </div>
            <div className="design_line picture_prd">
            <div className="wrap">
                <h3>사진 속 상품</h3>
            
                <ul>
                {(() => {
                        if (0 == 0) {
                        return (
                            <>
                            {houseWarmingView.top_relation && houseWarmingView.top_relation.map((item, idx) => (
                            <li className="big" key={idx}>
                            <a href={`/shop/product/product_view?product_cd=${item.event_seq}&timestamp=${item.product_timestamp} `}>
                            <img src={`${baseUrl}/uploads/product/${item.product_main_img}`} alt="" />
                                    <div className="con">
                                        <p className="tit"><span>{item.relation_product_nm}</span></p>
                                        <p className="price">
                                        {(() => {
                                            if (item.relation_sale_price != item.relation_supply_price) {
                                                return (
                                                    <>
                                                    <span>{item.relation_fee_rate}%</span>
                                                    <span>{item.relation_sale_price}</span>
                                                    </>
                                                )
                                            }else{
                                                return (
                                                    <>
                                                    <span>{item.relation_sale_price}</span>
                                                    </>
                                                )
                                            }
                                            })()}
                                        </p>
                                    </div>
                                </a>
                            </li>
                            ))}
                            {houseWarmingView.relation_list && houseWarmingView.relation_list.map((item, idx) => (
                                <li key={idx}>
                                <a href={`/shop/product/product_view?product_cd=${item.event_seq}&timestamp=${item.product_timestamp} `}>
                                    <img src={`${baseUrl}/uploads/product/${item.product_main_img}`} alt="" />
                                </a>
                            </li>
                            ))}
                            </>
                        );

                        }
                    })()}
                </ul>
            
              </div>
            </div>

            <div className="design_line comment_area">
            <Comment event_seq={event_seq} cust_seq={cust_seq} user_id={user_id} user_nm={user_nm} sort={sort} />
            </div>
        </div>
    </div>
    </div>
    )
}


export default HousewarmingView
