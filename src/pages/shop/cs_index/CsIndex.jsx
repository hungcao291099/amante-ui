import { useEffect, useState } from "react";


import { faIndex, noticeIndex, qnaIndex, reviewIndex, winnerIndex } from "@apis/csIndex";
import TopInfo from "@components/CsIndex/TopInfo";
import Content from "@components/CsIndex/Content/Content";
import { Helmet } from "react-helmet";


const CsIndex = () => {
  const [faqList, setFaqList] = useState([])
  const [qnaList, setQnaList] = useState([])
  const [noticeList, setNoticeList] = useState([])
  const [winnerList, setWinnerList] = useState([])
  const [reviewList, setReviewList] = useState([])



  useEffect(() => {
    const fetchData = async() => {
      setFaqList(await faIndex())
      setQnaList(await qnaIndex())
      setNoticeList(await noticeIndex())
      setWinnerList(await winnerIndex())
      setReviewList(await reviewIndex())
    }

    fetchData()
  }, []);



  return (
    <>
      <Helmet>
        <title>아망떼 ㅣ고객센터</title>
      </Helmet>
      <div className="content cs cs_index_page">
        <div className="inner">
          <TopInfo/>
      
          <Content qnaList={qnaList} reviewList={reviewList} noticeList={noticeList} winnerList={winnerList} faqList={faqList}/>
        </div>
      </div>
    </>
  );
};

export default CsIndex;
