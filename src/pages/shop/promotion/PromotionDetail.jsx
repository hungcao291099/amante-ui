import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import Comment from "@components/Comment/Comment";
import { useLocation, useNavigate } from "react-router";
import { CdnContext } from "@contexts/cdnContext";
import { getPromotionView } from "@apis/promotion";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import CommuTab from '@components/CommuTab';


const PromotionDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const event_seq = searchParams.get("no") || null;
  const cookies = new Cookies()
  const token = cookies.get('member_access_token')
  const userData = token ? jwt_decode(token) : null
  const cust_seq = userData?.cust_seq || null
  const user_id = userData?.user_id || null
  const user_nm = userData?.user_nm || null
  const navigate = useNavigate();

  const { baseUrl } = useContext(CdnContext);
  const [promotionView, setPromotionView] = useState({});
  
  

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPromotionView(event_seq);
      setPromotionView(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <CommuTab/>
      <div className="content event wedding_event_list_page proposal_page promotion_view_page">
      <div className="view_area">
        <div
          className="con"
          dangerouslySetInnerHTML={{ __html: promotionView.content }}
        ></div>
      </div>
      <div className="btn_area">
        <a
          href="javascript:history.back(-1);"
          className="btn_txt"
          id="view_list"
        >
          목록보기
        </a>
      </div>
      {(() => {
                    if (promotionView.event_type == '4' || promotionView.event_type == '5') {
                      return (
                        <>
                          <Comment event_seq={event_seq} cust_seq={cust_seq} user_id={user_id} user_nm={user_nm}/>	
                        </>
                      );
                    }
                  })()}
    </div>
    </div>
   
  );
};
export default PromotionDetail;
