import Qna from "./ListBox/Qna"
import Review from "./ListBox/Review"
import Notice from "./ListBox/Notice"
import Winner from "./ListBox/Winner"


const ListBox = ({qnaList, reviewList, noticeList, winnerList}) => {
  return (
    <div className="list_box">
      <Qna qnaList={qnaList} />

      <Review reviewList={reviewList}/>

      <Notice noticeList={noticeList}/>

      <Winner winnerList={winnerList}/>
    </div>
  )
}

export default ListBox