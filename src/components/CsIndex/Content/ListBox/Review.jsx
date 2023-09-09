import { Link } from "react-router-dom"

const Review = ({reviewList}) => {
  return (
    <div className="box">
      <div className="more">
        <h3 className="tit">상품후기</h3>
        <Link to="/shop/review/review_lists" className="btn">
          더보기
        </Link>
      </div>
      <ul>
        {reviewList?.map((review, index) => (
          <li key={index}>
            <Link to={`/shop/review/review_lists`}>
              <p>{review.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Review