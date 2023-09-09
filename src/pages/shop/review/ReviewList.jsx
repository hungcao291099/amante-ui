import { useCallback, useEffect, useRef, useState,useContext } from "react";
import { Link } from "react-router-dom";
import 'swiper/css';
import { useLocation,useNavigate} from "react-router";
import { getReviewList} from "@apis/review";
import Comment from "@components/Comment/ReviewSection";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { koApiURL } from "@utils/constants";
import { CdnContext } from "@contexts/cdnContext";
import CommuTab from "@components/CommuTab";
import {checkDevice} from '@utils/functions'

const ReviewList = () => {
  const navigate = useNavigate();
	const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const event_seq = searchParams.get("no") || null;
  const cookies = new Cookies()
  const token = cookies.get('member_access_token')
  const userData = token ? jwt_decode(token) : null
  const cust_seq = userData?.cust_seq || null
  const user_id = userData?.user_id || null
  const user_nm = userData?.user_nm || null
  const {baseUrl} = useContext(CdnContext)

    const [reviewList, setReviewList] = useState(undefined);
    // debugger
    useEffect(() => {
      const fetchData = async () => {
        const result = await getReviewList(checkDevice())
        setReviewList(result.data.review_info);
      };
  
      fetchData();
    }, []);

    return (
      <div>
        <CommuTab />
        <div className="content cs review_form review_lists_page">
             {reviewList && reviewList.map((item,index) => (
        <div className="inner" key={index}>
            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
            <h2 className="page_tit">상품후기</h2>
				<Comment event_seq={event_seq} cust_seq={cust_seq} user_id={user_id} user_nm={user_nm} koApiURL={koApiURL} baseUrl={baseUrl} navigate={navigate}/>	
        </div>
             ))}
    </div>
      </div>
        
    )
}

export default ReviewList;