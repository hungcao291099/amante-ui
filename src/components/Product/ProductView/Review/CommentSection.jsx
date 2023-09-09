import { useEffect, useState } from 'react';

const CommentSection = ({review, refreshComment ,replyWriteOpen, api}) => {
  const [commentList, setCommentList] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await api({
          url: '/shop/product/review/comment',
          method: 'GET',
          params: {
            use_review_seq: review.use_review_seq
          }
        })
        setCommentList(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
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