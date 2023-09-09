
const ReviewLayer = ({review, arr12, baseUrl}) => {



  function unslick(seq){
		$("#photo_slide_"+seq).slick('unslick');
	}



  return (
    <>
      {(review.file_nm1 || review.photo_review_url) && (
        <div className='layer_box review_layer' id={`review_layer${review.use_review_seq}`}>
          <div className="layer_outer">
            <div className="layer_inner">
              <div className="layer_con">
                <button className="layer_close" onClick={() => {
                  unslick(review.use_review_seq)
                  commonUI.layer.close()
                }}>닫기</button>
                <div className="photo_slide" id={`photo_slide_${review.use_review_seq}`}>
                  {[1,2,3,4,5].map(number => (
                    review[`file_nm${number}`] && (
                      review[`file_nm${number}`].split('.')[1] === 'mp4' ? (
                        <div className='slide' key={number}>
                          <video>
                            <source src={`${baseUrl}/uploads/review/${review[`file_nm${number}`]}`} type="video/mp4"/>
                          </video>
                        </div>
                      ) : 
                        <div className='slide' key={number}>
                          <img src={`${baseUrl}/uploads/review/${review[`file_nm${number}`]}`}/>
                        </div>
                      
                    )
                  ))}

                  {review.photo_review_url && (
                    <>
                      {review[`photo_review_url`].split('.')[1] === 'mp4' ? (
                        <div className="slide">
                          <video>
                            <source src={review.photo_review_url} type="video/mp4"/>
                          </video>
                        </div>
                      ) : 
                        <div className="slide">
                          <img src={review.photo_review_url} alt="" />
                        </div>
                      }
                      {arr12.map(num => review[`photo_review_url${num}`] && (
                        review[`photo_review_url${num}`].split('.')[4] === 'mp4' ? (
                          <div className="slide" key={num}>
                            <video>
                              <source src={review[`photo_review_url${num}`]} type="video/mp4"/>
                            </video>
                          </div>
                        ): (
                          <div className="slide" key={num}>
                            <img src={review[`photo_review_url${num}`]} alt="" />
                          </div>
                        )
                      ))}
                    </>
                  )}
                </div>
                <div className="control_box">
                  <span className="current">1</span> / <span className={`total${review.use_review_seq}`}>3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewLayer