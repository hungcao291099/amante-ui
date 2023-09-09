import CommentSection from '../CommentSection'

const CommentReply = ({review, refreshComment, replyWriteOpen, replyOpen, api}) => {
  return (
    <div className="comment_reply">
      {review.comment_cnt > 0 && (
        <>
          <button type="button" className="btn" onClick={(e) => replyOpen(e)}>
            이전 답글 <span className="count">{review.comment_cnt}</span>
          </button>
          <div className="comment_list">
            <CommentSection review={review} refreshComment={refreshComment} replyWriteOpen={replyWriteOpen} api={api}/>
          </div>
        </>
      )}
    </div>
  )
}

export default CommentReply