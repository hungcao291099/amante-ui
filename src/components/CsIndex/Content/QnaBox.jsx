import { Link } from "react-router-dom"

const QnaBox = () => {
  return (
    <div className="qna_write_box">
      <p className="txt">
        궁금한 점이 있으신가요?
        <br />
        1:1문의에 남겨주시면 답변 드리겠습니다.
      </p>
      <div className="btn_area col3">
        <Link
          className="btn_txt"
          to="/shop/mypage/order/order_lists"
        >
          나의주문내역
        </Link>
        <Link
          className="btn_txt"
          to='/shop/qna/my_qna_lists'
        >
          나의문의내역
        </Link>
        <Link
          className="btn_txt btn_point"
          to='/shop/help/help_write'
        >
          1:1 문의
        </Link>
      </div>
    </div>
  )
}

export default QnaBox