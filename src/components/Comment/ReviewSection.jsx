import { useEffect, useState } from 'react';

import ReviewFilter from './ReviewFilter';
import ReviewItem from './ReviewItem/ReviewItem';



const ReviewSection = ({ reviewCount, like_con, del_like, cust_seq, user_id, user_nm, koApiURL, navigate, baseUrl}) => {
  const [reviewList, setReviewList] = useState([])  
  const [refreshComment, setRefreshComment] = useState(false)
  const [reviewPage, setReviewPage] = useState(1)
  const [reviewSort, setReviewSort] = useState('like_cnt')
  const [reviewPhoto, setReviewPhoto] = useState(false)
  const arr12 = Array.from({ length: 11 }, (_, index) => index + 2);
  const data = {arr12, refreshComment, cust_seq, replyOpen, like_con, del_like, user_id, user_nm, setRefreshComment, navigate}
  let reviewGb = null

  const [reviewKey, setReviewKey] = useState('')
 





  useEffect(() => {
		if (reviewPhoto) { // 포토 리뷰 구분
			reviewGb = "P";
		} else {
			reviewGb = "";
		}
    
		$.get({
			url: `${koApiURL}/shop/review/list`,
			async: false,
			type: 'GET',
			data: {
				'page': reviewPage,
				'review_gb': reviewGb,
				'review_sort': reviewSort,
        'reviewKey': reviewKey,
			},
			success: function(data) {
        setReviewList(data)
			},
			error: function(jqXHR) {
				alert("Error : " + jqXHR);
				console.log(jqXHR);
			}
		});
  }, [refreshComment, reviewPage, reviewSort, reviewPhoto]);




  
  function replyOpen(e){
    var thisEle = $(event.target);
    $(thisEle).siblings('.comment_list').toggleClass('on');
  }

  if  (reviewPage === 1 && reviewCount < 6){
		$('#review_btn').hide();
	} else if (reviewPage > 1 && reviewCount < 6){  
		alert('마지막 글입니다.');
		$('#review_btn').hide();
	} else{
    $('#review_btn').show();
  }

  return (
    <>
      <ReviewFilter setReviewPage={setReviewPage} setReviewSort={setReviewSort} setReviewPhoto={setReviewPhoto} setReviewKey={setReviewKey}/>
      <div className="review_list">
        <ul className="list" >
        
        {reviewList?.map((review, index) => (
          <ReviewItem key={index} review={review} data={data} baseUrl={baseUrl} koApiURL={koApiURL} />
          ))}
        
        </ul>
      </div>

      <div className="btn_area">
        <button
          type="button"
          id="review_btn"
          onClick={() => setReviewPage(prev => prev + 1)}
          className="btn_txt btn_arrow"
        >
          <span>리뷰 더 보기</span>
        </button>
      </div>
    </>
  )
}

export default ReviewSection