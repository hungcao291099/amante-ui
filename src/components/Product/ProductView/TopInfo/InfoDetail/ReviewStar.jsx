
const ReviewStar = ({productView, formatNumber}) => {



  const reviewMove = () => {
    const TabReviewTop = $(".prd_info_review").offset().top;

    if ($(window).width() > 768) {
      $("html, body").animate(
        {
          scrollTop: TabReviewTop - 143,
        },
        300
      );
    } else {
      $("html, body").animate(
        {
          scrollTop: TabReviewTop,
        },
        300
      );
    }
  };




  return (
    <div className="review_area">
      <button
        type="button"
        className="view_review_move"
        onClick={reviewMove}
      >
        리뷰이동
      </button>
      <div className="review_star">
        {productView.review_cnt !== 0 ? (
          <div
            className="star_bar"
            style={{
              width:
                Math.round((productView.total_avg_review / 5) * 100) +
                "%",
            }}
          />
        ) : (
          <div className="star_barb" style={{ width: "100%" }} />
        )}
      </div>
      <span>리뷰 {formatNumber(productView.review_cnt)}개</span>
    </div>
  )
}

export default ReviewStar