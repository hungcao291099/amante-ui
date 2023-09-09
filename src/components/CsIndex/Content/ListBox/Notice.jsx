import { Link } from "react-router-dom"


const Notice = ({noticeList}) => {
  return (
    <div className="box">
      <div className="more">
        <h3 className="tit">공지사항</h3>
        <Link to="/shop/notice/notice_lists" className="btn">
          더보기
        </Link>
      </div>
      <ul>
        {noticeList?.map((notice, index) => (
          <li key={index}>
            <Link to={`/shop/notice/notice_view?no=${notice.NO}`}>
              <p>{notice.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notice