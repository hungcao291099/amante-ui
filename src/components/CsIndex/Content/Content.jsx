import FaqBox from './FaqBox'
import QnaBox from './QnaBox'
import ListBox from './ListBox'

const Content = ({qnaList, reviewList, noticeList, winnerList, faqList}) => {

  return (
    <div className="sec">
      <FaqBox faqList={faqList}/>
     
      <QnaBox/>

      <ListBox qnaList={qnaList} reviewList={reviewList} noticeList={noticeList} winnerList={winnerList}/>
    </div>
  )
}

export default Content