import { Link } from "react-router-dom"

const Winner = ({winnerList}) => {
  return (
    <div className="box">
    <div className="more">
      <h3 className="tit">이벤트 당첨자 발표</h3>
      <Link to="/shop/event/winner_lists" className="btn">
        더보기
      </Link>
    </div>
    <ul>
      {winnerList?.map((winner, index) => (
        <li key={index}>
          <Link to={`/shop/event/winner_view?no=${winner.event_after_seq}`}>
            <p>{winner.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Winner