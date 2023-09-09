import { koApiURL } from "@utils/constants";
import React, { useEffect, useState } from 'react';
import { getPromotionComment } from "@apis/promotion";
import { useLocation, useNavigate } from "react-router";
import CommentList from "@components/Comment/CommentList";


const Comment = ({event_seq,cust_seq,user_nm,user_id}) => {
  const navigate = useNavigate();
  const [promotionComment, setPromotionComment] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await getPromotionComment(event_seq);
      setPromotionComment(result.data);
    };

    fetchData();
  }, []);

  function comment(seq){
    
		let comment = $("#comment_content").val();
    let title = '';

		if(comment==""){
			alert('등록할 댓글을 입력해주세요.');
			$("#comment_content").focus();
			return false;
		}

let dataJson = {
  'event_seq':event_seq,
  'user_id':user_id,
  'user_nm':user_nm,
  'cust_seq':cust_seq,
  'title':title,
  'content':comment,
  'reg_ip':'192.168.80.6'
};

		Csrf.Set(_CSRF_NAME_); // 토큰초기화
		$.post(`${koApiURL}/shop/promotion/insert/comment`, dataJson,function(data) {
      $("#comment_content").val("")
		},'json')
		.fail(function(jqXHR) {
			alert("error" );
		})
	}

  return (
    <div className="commemt_area">
    <strong>댓글 {promotionComment.cnt}</strong>
    <div className="commemt_box">
    <input type="text" name="" defaultValue="" id="comment_content" />
    {!cust_seq ? 
          <button className="btn" onClick={() => {
            alert('로그인 후 사용할 수 있습니다.')
            return navigate('/shop/login/login')
          }}>등록</button>
        : <button type="button" className="btn" onClick={() => comment(event_seq)}>등록</button>}
    </div>
        <CommentList event_seq={event_seq} cust_seq={cust_seq} />
</div>	
  )
}

export default Comment