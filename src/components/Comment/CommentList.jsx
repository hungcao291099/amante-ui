import { koApiURL } from "@utils/constants";
import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import "swiper/css";
import { CdnContext } from "@contexts/cdnContext";


const CommentList = ({event_seq,cust_seq}) => {
  const [commentList, setCommentList] = useState()
  const { baseUrl } = useContext(CdnContext);
debugger

  useEffect(() => {
    $.get({
			url: `${koApiURL}/shop/promotion/promotion_comment_list`,
			async: false,
			type: 'GET',
			data: {
				'event_seq': event_seq,
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
    <ul className="view_con">
        
      {commentList?.map((item, index) => {
             
              if (item.event_type == 2) {
                return (
                  <li key={index}>
                    <a href={`/shop/event/promotion_detail?no=${item.event_board_seq}`} >
                    <div className="img">
                      {item.file_nm1 !== "" && item.file_nm1 !== null ? (
                          <picture>
                            <source srcSet={`${baseUrl}/uploads/event/${item.file_nm1}`} media="(min-width:768px)" />
                            <source  srcSet={`${baseUrl}/uploads/event/${item.file_nm1}`} media="(max-width:767px)" />
                            <img  src={`${baseUrl}/uploads/event/${item.file_nm1}`} />
                          </picture>
                      ):(
                          <picture>
                            <source srcSet={`${baseUrl}/uploads/event/${item.event_img}`} media="(min-width:768px)" />
                            <source  srcSet={`${baseUrl}/uploads/event/${item.event_img}`} media="(max-width:767px)" />
                            <img  src={`${baseUrl}/uploads/event/${item.event_img}`} />
                          </picture>
                      )}
                    </div>
                  </a>
                  <div className="txt_con">
                    <p className="tit"><a href={`/shop/event/promotion_detail?no=${item.event_board_seq}`}>{item.title}</a></p>
                    <p className="user_id">{item.user_id}***</p>
                    <div className="info">
                        <p className="ico_comment">2</p>
                        <p className="ico_like">{item.like_cnt}</p>
                        <p className="ico_hit">{item.hit}</p>
                    </div>
	                </div>
                  </li>
                )
              }
              if (item.event_type == 3) {
                return (
                  <tr>
                  <td className="num mb_hidden"><span></span></td>
                  {item.secret_yn == "N"  ? (
                    <td className="tit">
                    <a href={`/shop/event/promotion_detail?no=${item.event_board_seq}`} >{item.title}({item.reply_cnt})</a>
                   </td>
                  ):(
                    <div>
                    {item.user_id == "N"  ? (
                      <td className="tit">
                          <a href={`/shop/event/promotion_detail?no=${item.event_board_seq}`} className="secret" >[비밀글]{item.title}({item.reply_cnt})</a>
                      </td>
                    ):(
                      <td className="tit">
                          <a href={`/shop/event/promotion_detail?no=${item.event_board_seq}`} className="secret" >[비밀글]{item.title}({item.reply_cnt})</a>
                      </td>
                    )}
                    </div>
                  )}
                  
                  <td className="user_nm"><span>{item.user_id}***</span></td>
                  <td className="date"><span>{item.reg_date}</span></td>
                  <td className="sum mb_hidden"><span>{item.hit}</span></td>
                </tr>
                )
              }
              if (item.event_type == 4) {
                let secret_yn = "Y";
                return (
                  <li key={index}>
                    <div className="comment">
                      <div className="top">
	                        <span className="user_id">{item.user_id}***</span>
	                        <span className="date">{item.reg_date}</span>
                          {cust_seq == item.cust_seq && (
                              <button onClick={() => {reply_del(item.event_board_seq);}}>삭제</button>
                           )}
	                    </div>
                      {secret_yn == 'N' ? (
                            <><p dangerouslySetInnerHTML={{ __html: item.content }}></p></>
                      ) : (
                            <>
                            {cust_seq == item.cust_seq ? (
                              <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                            ):(
                              <p className="secret">비공개 댓글입니다.</p>
                            )}
                            </>
                      )
                      }

	                  </div>
                    {item.admin_reply_yn == 'Y' ? (
                        <div className="reply">
                        <div className="top">
                            <span className="user_id">{item.admin_id}</span>
                            <span className="date">{item.reply_date}</span>
                        </div>
                        {secret_yn == 'N' || cust_seq == item.cust_seq ? (
                          <p >{item.admin_reply}</p>
                        ):(
                          <p className="secret">비공개 댓글입니다.</p>
                        )}
                        </div>
                    ):''}
                    
                  </li>
                )
              }
              if (item.event_type == 5) {
                let secret_yn
                {item.secret_yn == 'Y' ? ( secret_yn = 'Y'):( secret_yn = 'N') }

                return (
                  <li key={index}>
                    <div className="comment">
                      <div className="top">
	                        <span className="user_id">{item.user_id}***</span>
	                        <span className="date">{item.reg_date}</span>
                          {cust_seq == item.cust_seq && (
                              <button onClick={() => {reply_del(item.event_board_seq);}}>삭제</button>
                           )}
	                    </div>
                      {secret_yn == 'N' ? (
                            <><p dangerouslySetInnerHTML={{ __html: item.content }}></p></>
                      ) : (
                            <>
                            {cust_seq == item.cust_seq ? (
                              <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                            ):(
                              <p className="secret">비공개 댓글입니다.</p>
                            )}
                            </>
                      )
                      }

	                  </div>
                    {item.admin_reply_yn == 'Y' ? (
                        <div className="reply">
                        <div className="top">
                            <span className="user_id">{item.admin_id}</span>
                            <span className="date">{item.reply_date}</span>
                        </div>
                        {secret_yn == 'N' || cust_seq == item.cust_seq ? (
                          <p >{item.admin_reply}</p>
                        ):(
                          <p className="secret">비공개 댓글입니다.</p>
                        )}
                        </div>
                    ):''}
                    
                  </li>
                )
              }
            })}
  </ul>
  )
}

export default CommentList