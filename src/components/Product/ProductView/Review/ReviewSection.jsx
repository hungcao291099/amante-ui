import { useEffect, useState, Fragment } from 'react';

import ReviewItem from './ReviewItem/ReviewItem';
import ReviewFilter from './ReviewFilter';
import ReviewLayer from './ReviewLayer';

const ReviewSection = ({
  productCd,
  reviewCount,
  like_con,
  del_like,
  cust_seq,
  user_id,
  user_nm,
  baseUrl,
  api,
  navigate,
  productView,
}) => {
  const [reviewList, setReviewList] = useState([]);
  const [refreshComment, setRefreshComment] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewSort, setReviewSort] = useState('like_cnt');
  const [reviewPhoto, setReviewPhoto] = useState(false);
  const arr12 = Array.from({ length: 11 }, (_, index) => index + 2);
  const data = {
    arr12,
    refreshComment,
    cust_seq,
    replyOpen,
    like_con,
    del_like,
    user_id,
    user_nm,
    setRefreshComment,
    navigate,
  };
  let reviewGb = null;

  useEffect(() => {
    if (reviewPhoto) {
      // 포토 리뷰 구분
      reviewGb = 'P';
    } else {
      reviewGb = '';
    }

    const fetchData = async () => {
      try {
        const {data} = await api({
          url: '/shop/product/review/list',
          method: 'GET',
          params: {
            page: reviewPage,
            product_cd: productCd,
            review_gb: reviewGb,
            review_sort: reviewSort,
          }
        })
        setReviewList(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [refreshComment, reviewPage, reviewSort, reviewPhoto]);

  function replyOpen(e) {
    var thisEle = $(event.target);
    $(thisEle).siblings('.comment_list').toggleClass('on');
  }

  if (reviewPage === 1 && reviewCount < 6) {
    $('#review_btn').hide();
  } else if (reviewPage > 1 && reviewCount < 6) {
    alert('마지막 글입니다.');
    $('#review_btn').hide();
  } else {
    $('#review_btn').show();
  }

  return (
    <>
      <ReviewFilter
        setReviewPage={setReviewPage}
        setReviewSort={setReviewSort}
        setReviewPhoto={setReviewPhoto}
        productView={productView}
        baseUrl={baseUrl}
        navigate={navigate}
        like_con={like_con}
        del_like={del_like}
      />
      <div className="review_list">
        <ul className="list">
          {reviewList?.map((review, index) => (
            <Fragment key={index}>
              <ReviewItem
                key={index}
                review={review}
                data={data}
                baseUrl={baseUrl}
                api={api}
              />

              {/* REVIEW layer */}
              <ReviewLayer review={review} arr12={arr12} baseUrl={baseUrl} />
            </Fragment>
          ))}
        </ul>
      </div>

      <div className="btn_area">
        <button
          type="button"
          id="review_btn"
          onClick={() => {
            if (reviewCount === reviewList?.length) {
              return alert('마지막 글입니다.');
            } else {
              setReviewPage((prev) => prev + 1);
            }
          }}
          className="btn_txt btn_arrow"
        >
          <span>리뷰 더 보기</span>
        </button>
      </div>
    </>
  );
};

export default ReviewSection;
