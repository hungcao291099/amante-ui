const ReplyBox = ({ review, cust_seq, navigate, comment }) => {
  return (
    <div className="reply_box">
      <input
        type="text"
        name=""
        defaultValue=""
        id={`comment_${review.use_review_seq}`}
      />
      {!cust_seq ? (
        <button
          className="btn"
          onClick={() => {
            alert("로그인 후 사용할 수 있습니다.");
            return navigate("/shop/login/login");
          }}
        >
          등록
        </button>
      ) : (
        <button
          type="button"
          className="btn"
          onClick={() => comment(review.use_review_seq)}
        >
          등록
        </button>
      )}
    </div>
  );
};

export default ReplyBox;
