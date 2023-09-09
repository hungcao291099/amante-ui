
const Comment = ({review, review_like, replyWriteOpen, activeLike}) => {
  
  return (
    <div className="comment">
      <span className="user_id">{review.user_id === '비회원' ? '비회원' : review.user_id.substring(0, 4) + '***'}</span>
      <span className="year">{review.reg_date.substring(0, 10)}</span>
      <button
        type="button"
        className="reply_btn"
        onClick={(e) => replyWriteOpen(e)}
      >
        답글달기
      </button>
      <div className="item_check">
        <input
          type="checkbox"
          checked={activeLike}
          id={`item_chk_${review.use_review_seq}`}
          onChange={(e) => review_like(e, review.use_review_seq)}
        />
        <label htmlFor={`item_chk_${review.use_review_seq}`}>
          추천
          <span className="count" id={`item_chk_cnt_${review.use_review_seq}`}>
            {review.like_cnt}
          </span>
        </label>
      </div>
    </div>
  )
}

export default Comment