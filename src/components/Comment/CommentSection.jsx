import { useEffect, useState } from 'react';

const CommentSection = ({review, refreshComment ,replyWriteOpen, koApiURL}) => {
  const [commentList, setCommentList] = useState([])


  useEffect(() => {
    $.get({
			url: `${koApiURL}/shop/product/review/comment`,
			async: false,
			type: 'GET',
			data: {
				'use_review_seq': review.use_review_seq,
			},
			success: function(data) {
        setCommentList(data)
			},
			error: function(error) {
				return console.log(error)
			}
		});
  }, [refreshComment]);



  return (
    <ul className="list">
    {commentList?.map((comment, index) => (
      <li key={index}>
        <div className="info">
          <p>
            {comment.comment}
          </p>
        </div>
        <div className="comment">
          <span className="user_id">{comment.user_id}</span>
          <span className="year">{comment.reg_date.substring(0, 10)}</span>
          <button
            type="button"
            className="reply_btn"
            onClick={(e) => replyWriteOpen(e, review.use_review_seq, review.user_id)}
          >
            답글달기
          </button>
        </div>
      </li>
    ))}
  </ul>
  )
}

export default CommentSection