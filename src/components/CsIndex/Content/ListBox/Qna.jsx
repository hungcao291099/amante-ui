import { Link } from "react-router-dom"

const Qna = ({qnaList}) => {
  return (
    <div className="box">
      <div className="more">
        <h3 className="tit">QNA게시판</h3>
        <Link to="/shop/qna/qna_lists" className="btn">
          더보기
        </Link>
      </div>
      <ul>
        {qnaList?.map((qna, index) => (
          <li key={index}>
            <Link to={`/shop/qna/qna_view?no=${qna.NO}`}>
              <p>{qna.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Qna