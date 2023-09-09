import ReviewSection from './Review/ReviewSection';
import ReviewRange from './Review/ReviewRange';

const TabReviewSection = ({
  productView,
  formatNumber,
  cust_seq,
  user_id,
  user_nm,
  like_con,
  del_like,
  baseUrl,
  api,
  productCd,
  navigate,
}) => {
  return (
    <div className="tab_con prd_info_review" id="tab_review">
      <div className="tab_title">
        <h3>
          <span id="review_cnt">리뷰 {formatNumber(productView.review_cnt)}</span>
        </h3>
      </div>

      <ReviewRange productView={productView} />

      <ReviewSection
        productCd={productCd}
        cust_seq={cust_seq}
        user_id={user_id}
        user_nm={user_nm}
        reviewCount={productView.review_cnt}
        like_con={like_con}
        del_like={del_like}
        baseUrl={baseUrl}
        api={api}
        navigate={navigate}
        productView={productView}
      />
    </div>
  );
};

export default TabReviewSection;
