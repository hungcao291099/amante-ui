
const ReviewInfo = ({review, arr12, baseUrl}) => {



  function reviewLayer(seq,slide){
		commonUI.layer.open('#review_layer'+seq, { bg : true, alert : true });

		var slideTotal = $("#photo_slide_"+seq).children(".slide").length;
		$(".total"+seq).text(slideTotal);
		$(".control_box .current").text(1);

		//상품상세 포토 리뷰 레이어
		$("#photo_slide_"+seq).slick({
			// adaptiveHeight: true,
			setPosition: 0,
			slidesToShow: 1,
			arrows: true,
			dots: false,
			infinite: false,
			variableWidth: false,
			responsive: [
			{
			breakpoint: 767,
				settings: {
				// adaptiveHeight: true,
				setPosition: 0,
				slidesToShow: 1,
				arrows: true,
				dots: false,
				infinite: false,
				variableWidth: false,
				}
			}],
		}).on("afterChange", function(event, slick, currentSlide){
			var current = currentSlide + 1,
				total = slick.slideCount;
			$(".control_box .current").text(current);
			$(".control_box .total").text(total);
		});
		$('#photo_slide_'+seq).slick('goTo',slide-1);

		//포토 리뷰 레이어 css 기준
		$(".photo_slide .slide img").each(function(index, item){
			var rvLayerImgWd = $(item).width(),
				rvLayerImgHg = $(item).height();

			if(rvLayerImgWd >= rvLayerImgHg){
				$(this).css({"width":"100%"});
			}else{
				$(this).css({"height":"100%"});
			}
		});
		$(".photo_slide .slide video").each(function(index, item){
			var rvLayerVdoWd = $(item).width(),
				rvLayerVdoHg = $(item).height();

			if(rvLayerVdoWd >= rvLayerVdoHg){
				$(this).css({"width":"100%"});
			}else{
				$(this).css({"height":"100%"});
			}
		});
	}



  return (
    <div className="info">
      <p className="tit">{review.title}</p>
      <div className="img_box">
        {[1,2,3,4,5].map(number => (
          review[`file_nm${number}`] && (
            <div className="img" key={number}>
                {review[`file_nm${number}`].split('.')[1] === 'mp4' ? (
                  <button onClick={() => reviewLayer(review.use_review_seq, number)}>
                    <video>
                      <source src={`${baseUrl}/uploads/review/${review[`file_nm${number}`]}`} type="video/mp4"/>
                    </video>
                  </button>
                ) : 
                  <button onClick={() => reviewLayer(review.use_review_seq, number)}>
                    <img src={`${baseUrl}/uploads/review/${review[`file_nm${number}`]}`}/>
                  </button>
                }
            </div>
          )
        ))}
        {review.photo_review_url && (
          <div className="img_box">
            {review[`photo_review_url`].split('.')[1] === 'mp4' ? (
              <div className="img">
                <button onClick={() => reviewLayer(review.use_review_seq, 1)}>
                  <video>
                    <source src={review.photo_review_url} type="video/mp4"/>
                  </video>
                </button>
              </div>
            ) : 
              <div className="img">
                <button onClick={() => reviewLayer(review.use_review_seq, 1)}>
                  <img src={review.photo_review_url} alt="" />
                </button>
              </div>
            }
            {arr12.map(num => review[`photo_review_url${num}`] && (
              review[`photo_review_url${num}`].split('.')[4] === 'mp4' ? (
                <div className="img" key={num}>
                  <button onClick={() => reviewLayer(review.use_review_seq, num)}>
                    <video>
                      <source src={review[`photo_review_url${num}`]} type="video/mp4"/>
                    </video>
                  </button>
                </div>
              ): (
                <div className="img" key={num}>
                  <button onClick={() => reviewLayer(review.use_review_seq, num)}>
                    <img src={review[`photo_review_url${num}`]} alt="" />
                  </button>
                </div>
              )
            ))}
          </div>
        )}
      </div>
      <p className="txt">{review.content}</p>
    </div>
  )
}

export default ReviewInfo