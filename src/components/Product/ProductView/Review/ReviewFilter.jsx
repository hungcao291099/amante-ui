import ReviewWidget from './ReviewWidget'
import { useConceptRoomContext } from '@contexts/ConceptRoomContext'

const ReviewFilter = ({setReviewPage, setReviewSort, setReviewPhoto, productView, baseUrl, navigate, like_con, del_like}) => {
  const {isMobile} = useConceptRoomContext()

  return (
    <div className="review_filter" style={{overflow: !isMobile ? 'visible' : 'hidden'}}>
      <ReviewWidget productView={productView} baseUrl={baseUrl} navigate={navigate} like_con={like_con} del_like={del_like}/>

      <select id="review_sort" onChange={(e) => {
        setReviewPage(1)
        setReviewSort(e.target.value)
      }}>
        <option value="like_cnt">추천순</option>
        <option value="date_desc">최신순</option>
        <option value="point_desc">평점높은순</option>
        <option value="point_asc">평점낮은순</option>
      </select>
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
  )
}

export default ReviewFilter