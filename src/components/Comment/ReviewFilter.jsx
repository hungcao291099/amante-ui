import {useState} from 'react';

const ReviewFilter = ({setReviewPage, setReviewSort, setReviewPhoto,setReviewKey}) => {
  const[value, setValue] = useState("");
 
  return (
    <div className="sch_area">
				<div className="sch_top">
					<div className="select_box">
						<select id="category">
							<option value="product_nm">상품명</option>
							<option value="wt_use_review.title">제목</option>
							<option value="wt_use_review.content">내용</option>
						</select>                
					</div>
					<div className="search_box">
						<input type="text" id="keyword2" value={value} onChange={(e) => {setValue(e.target.value)}}/>
						<button type="button" className="btn"  >검색</button>
					</div>
				</div>

				<div className="sch_top">
					<div className="select_box">
          <select id="review_sort" onChange={(e) => {
              setReviewPage(1)
              setReviewSort(e.target.value)
            }}>
							<option value="stb1.use_review_seq DESC">최신순</option>
							<option value="like_cnt DESC">추천순</option>
							<option value="stb1.point DESC">평점높은순</option>
							<option value="stb1.point ASC">평점낮은순</option>
						</select>               
					</div>

					<div className="design_checkbox">
          <input
          type="checkbox"
          id="photo_list"
          onChange={(e) => {
            setReviewPage(1)
            setReviewPhoto(e.target.checked)
          }}
        />
						<label htmlFor="photo_list">포토리뷰 모아보기</label>
					</div>
				</div>
			</div>
    // <div className="review_filter">
    //   <select id="review_sort" onChange={(e) => {
    //     setReviewPage(1)
    //     setReviewSort(e.target.value)
    //   }}>
    //     <option value="like_cnt">추천순</option>
    //     <option value="date_desc">최신순</option>
    //     <option value="point_desc">평점높은순</option>
    //     <option value="point_asc">평점낮은순</option>
    //   </select>
    //   <div className="design_checkbox">
        // <input
        //   type="checkbox"
        //   id="photo_list"
        //   onChange={(e) => {
        //     setReviewPage(1)
        //     setReviewPhoto(e.target.checked)
        //   }}
        // />
    //     <label htmlFor="photo_list">포토리뷰 모아보기</label>
    //   </div>
    // </div>
  )
}

export default ReviewFilter