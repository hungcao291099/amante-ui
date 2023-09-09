
const ReviewWidget = ({productView, baseUrl, navigate, like_con, del_like}) => {



  function reviewLikePhoto(e, no, cnt){
    const chk = e.currentTarget.classList.contains('on')
    const span = e.currentTarget.querySelector('span')

    if (chk === true){
      del_like('product_review', no);
      span.textContent = `추천 ${Number(span.innerText.split(' ')[1]) - 1}`
      e.currentTarget.classList.remove('on')
    } else {
      like_con('product_review', no, 'L');
      span.textContent = `추천 ${Number(span.innerText.split(' ')[1]) + 1}`
      e.currentTarget.classList.add('on')
    }
  }


  return (
    <div className="review_widget" style={{width: '100%'}}>
      <div className="w_slide">
        {productView.review_photo?.map((review, index) => {

          let img = ''
          for (let i = 1; i < 6; i++) {
            if (review[`file_nm${i}`]) {
              img = review[`file_nm${i}`]
            }
          }

          return (
            <div className="slide" key={index}>
              <div className="profile">
                <div className="box img">
                  <img loading="lazy" src="/asset/images/shop/product/widget_pf_thumb03.png" />
                </div>
                <div className="box">
                  <p className="name">{review.user_id === '비회원' ? '네이버 페이 구매자' : `${review.user_id.substring(0, review.user_id.length - 2)}**`}</p>
                  <p>{review.reg_date.substring(0, 10)}</p>
                </div>
              </div>

              {review.photo_review_url ?
                <div className="wg_img">
                  <picture>
                    <source
                      loading="lazy"
                      src={review.photo_review_url}
                      media="(min-width:768px)"
                    />
                    {/* pc이미지 */}
                    <source
                      loading="lazy"
                      src={review.photo_review_url}
                      media="(max-width:767px)"
                    />
                    {/* mb이미지 */}
                    <img loading="lazy" src={review.photo_review_url} alt="" />
                    {/* pc이미지 */}
                  </picture>
                </div>
              : <div className="wg_img">
                  <picture>
                    {/*[if IE 9]><video style="display: none;"><![endif]*/}
                    <source
                      loading="lazy"
                      src={`${baseUrl}/uploads/review/${img}`}
                      media="(min-width:768px)"
                    />
                    {/* pc이미지 */}
                    <source
                      loading="lazy"
                      src={`${baseUrl}/uploads/review/${img}`}
                      media="(max-width:767px)"
                    />
                    {/* mb이미지 */}
                    {/*[if IE 9]></video><![endif]*/}
                    <img loading="lazy" src={`${baseUrl}/uploads/review/${img}`} alt="" />
                    {/* pc이미지 */}
                  </picture>
                </div>
              }
              <div className="con">
                <div className="review_area">
                  <div className="review_star">
                    <div className="star_bar" style={{width: `${review.point * 20}%`}}></div>
                  </div>
                </div>

                <div className="r_box">
                  <button 
                    type="button" 
                    className={`btn_rcmd ${review.like_yn > 0 ? 'on' : ''}`}
                    onClick={(e) => reviewLikePhoto(e, review.use_review_seq, review.like_cnt)}
                  >
                    <span>추천 {review.like_cnt}</span>
                  </button>
                  <button 
                    type="button" 
                    className="btn_rpt"
                    onClick={() => navigate('/shop/help/help_write')}
                  >
                    <span>신고하기</span>
                  </button>
                </div>

                <div className="txt">
                  {review.content}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ReviewWidget