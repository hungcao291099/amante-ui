import { useState } from 'react';
import ReviewStar from './ReviewStar';
import ReviewInfo from './ReviewInfo';
import Comment from './Comment';
import ReplyBox from './ReplyBox';
import CommentReply from './CommentReply';

const ReviewItem = ({ review, data, baseUrl, api }) => {
  const {
    arr12,
    refreshComment,
    cust_seq,
    replyOpen,
    like_con,
    del_like,
    user_id,
    user_nm,
    setRefreshComment,
    navigate,
  } = data;
  const [activeLike, setActiveLike] = useState(review.like_yn > 0 ? true : false);

  function review_like(e, no) {
    const span = e.currentTarget.parentElement.querySelector('span');

    if (activeLike === true) {
      span.textContent = Number(span.innerText) - 1;
      setActiveLike(false);
      del_like('product_review', no);
    } else {
      span.textContent = Number(span.innerText) + 1;
      setActiveLike(true);
      like_con('product_review', no, 'L');
    }
  }

  async function comment(seq) {
    let comment = $('#comment_' + seq).val();

    if (comment == '') {
      alert('등록할 댓글을 입력해주세요.');
      $('#comment_' + seq).focus();
      return false;
    }

    try {
      await api({
        url: '/shop/event/insert/comment',
        method: 'POST',
        data: {
          use_review_seq: seq,
          cust_seq,
          comment,
          user_id,
          title: null,
          user_nm,
        },
      });
      setRefreshComment((prev) => !prev);
      $('#comment_' + seq).val('');
    } catch (error) {
      console.log(error);
    }
  }

  function replyWriteOpen(e, use_review_seq = null, user_id = null) {
    var thisEle = $(e.target);
    $(thisEle).parents('li').find('.reply_box').toggleClass('on');
  }

  return (
    <li>
      <ReviewStar review={review} />

      <ReviewInfo review={review} arr12={arr12} baseUrl={baseUrl} />

      <Comment
        review={review}
        review_like={review_like}
        replyWriteOpen={replyWriteOpen}
        activeLike={activeLike}
      />

      <CommentReply
        review={review}
        refreshComment={refreshComment}
        replyWriteOpen={replyWriteOpen}
        replyOpen={replyOpen}
        api={api}
      />

      <ReplyBox review={review} cust_seq={cust_seq} navigate={navigate} comment={comment} />
    </li>
  );
};

export default ReviewItem;
