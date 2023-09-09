import { koApiURL } from "@utils/constants";
import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import "swiper/css";
import { CdnContext } from "@contexts/cdnContext";


const CommentHouseList = ({event_seq,user_id,sort}) => {
  const [commentList, setCommentList] = useState()
  const { baseUrl } = useContext(CdnContext);
  

  useEffect(() => {
    $.get({
			url: `${koApiURL}/shop/housewarming/comment`,
			async: false,
			type: 'GET',
			data: {
				'event_seq': event_seq,
        'sort' : sort
			},
			success: function(res) {
        
        setCommentList(res.data)
			},
			error: function(error) {
				return console.log(error)
			}
		});
  }, []);

  return (
      <ul className="cmt_box" id="comm_ul">
        {commentList && commentList.map((item, idx) => (
              <li key={idx}>
                  <div className="top">
                      <p className="user_id">{item.user_id}</p>
                      <p>{item.reg_date}</p>
                      {item.user_id == user_id ? (
                        <p className="right"><button type="button" className="btn_del" onClick={() => comment_del(item.no)}>삭제</button></p>
                      ):(
                        <p className="right"><button type="button">신고</button></p>
                      )}
                  </div>
                  <p className="txt">
                     {item.content}
                  </p>
              </li>
            ))}
  </ul>
  )
}

export default CommentHouseList