import { koApiURL } from "@utils/constants";
import React, { useEffect, useState } from 'react';
import { getPromotionComment } from "@apis/promotion";
import { useLocation, useNavigate } from "react-router";
import CommentHouseList from "@components/Comment/CommentHouseList";

const CommentHouseWarming = ({event_seq,cust_seq,user_nm,user_id,sort}) => {
  const navigate = useNavigate();

  function comment(seq){
    
		let comment = $("#comment_content").val();
 
		if(comment==""){
			alert('등록할 댓글을 입력해주세요.');
			$("#comment_content").focus();
			return false;
		}

let dataJson = {

  'sort':sort,
  'user_id':user_id,
  'user_nm':user_nm,
  'wno':seq,
  'mode':"mode",
  'content':comment,
  'title':null,
  'mailsend':'N',
  'del':'N'
};

		Csrf.Set(_CSRF_NAME_); // 토큰초기화
		$.post(`${koApiURL}/shop/house/insert/comment`, dataJson,function(data) {
      $("#comment_content").val("")
      window.location.reload(true)
		},'json')
		.fail(function(jqXHR) {
			alert("error" );
		})
	}

  return (
           
                <div className="wrap">
                    <h3 id="total_count">댓글</h3>
                    <div className="wrtite_box">
                        <input type="text" id="comment_content" title="댓글 작성란" placeholder="댓글을 남겨주세요"/>
                        {!cust_seq ? 
                        <button className="btn_txt btn_dpoint" onClick={() => {
                          alert('로그인 후 사용할 수 있습니다.')
                          return navigate('/shop/login/login')
                        }}>등록</button>
                      : <button type="button" className="btn_txt btn_dpoint" onClick={() => comment(event_seq)}>등록</button>}
                    </div>
                    <CommentHouseList event_seq={event_seq} user_id={user_id} sort={sort} />
                    <button type="button" className="btn_txt" onClick={() => getCommentList('add')}>댓글 더 보기</button>
                </div>
            
  )
}

export default CommentHouseWarming