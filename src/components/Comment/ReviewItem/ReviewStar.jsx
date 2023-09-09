
const ReviewStar = ({review}) => {
  return (
    <div className="review_star">
      <div className="star_bar" style={{ width: `${review.point * 20}%` }} />
    </div>
  )
}

export default ReviewStar