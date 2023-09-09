import { useEffect, useState, useContext } from "react";
import "swiper/css";
import { useLocation } from "react-router";
import { CdnContext } from "@contexts/cdnContext";
import { getTipView } from "@apis/tipApi";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import Comment from "@components/Comment/CommentHouseWarming";
import CommuTab from '@components/CommuTab';

const TipView = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const event_seq = searchParams.get("event_seq") || null;

    const cookies = new Cookies()
    const token = cookies.get('member_access_token')
    const userData = token ? jwt_decode(token) : null
    const cust_seq = userData?.cust_seq || null
    const user_id = userData?.user_id || null
    const user_nm = userData?.user_nm || null
    const sort = "tip";

  const { baseUrl } = useContext(CdnContext);
  const [tipViewDetail, setTipView] = useState({});
  const [tipViewDetailLike, setTipViewLike] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await getTipView(event_seq);
      const dataa = result.data;
      setTipView(dataa.view);
      setTipViewLike(dataa.like_yn);
      
    };

    fetchData();
  }, []);

  return (
    <div>
        <CommuTab/>
        <div className="content hw_tip tip tip_view_page">
            <div className="view_area" style={{ marginTop:"0px"}} >
                <div className="txt_con">
                    <p className="tit">{tipViewDetail.event_nm}</p>
                    <p className="user_id">{tipViewDetail.writer_id}</p>
                    <div className="info">
                        <p className="ico_comment">{tipViewDetail.comm_cnt}</p>
                        <p className="ico_like">{tipViewDetail.like_cnt}</p>
                        <p className="ico_hit">{tipViewDetail.hit}</p>
                    </div>
                    <p className="date">{tipViewDetail.reg_date}</p>
                </div>
                <div className="wrap">
                    <p  dangerouslySetInnerHTML={{ __html: tipViewDetail.content }}></p>
                    <div className="btn_area col2">
                        {(() => {
                            if (tipViewDetailLike > 0) {
                            return (
                                <>
                                <button type="button" class="btn_txt btn_gray btn_like on" onClick={() =>del_like('housewarming',tipViewDetail.event_seq)}><span>좋아요</span></button>
                                </>
                            );
                            } else {
                            return (
                                <>
                                <button type="button" className="btn_txt btn_gray btn_like" onClick={() =>like_con('housewarming',tipViewDetail.event_seq, 'L')}><span>좋아요</span></button>
                                </>
                            );
                            }
                        })()}
                        <button type="button" className="open btn_txt btn_gray btn_share"><span>공유하기</span></button>
	                    <button type="button" className="btn_txt btn_gray btn_list" onClick={() =>history.back()} ><span>목록보기</span></button>

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
                <div className="design_line comment_area">
                <Comment event_seq={event_seq} cust_seq={cust_seq} user_id={user_id} user_nm={user_nm} sort={sort}/>
                </div>
            </div>
        </div>
    </div>
  );
};
export default TipView;


