import { Link } from "react-router-dom"
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


const FaqBox = ({faqList}) => {
  return (
    <div className="faq_box box">
      <div className="inner_box">
        <div className="more">
          <h3 className="tit">자주 묻는 질문 (FAQ)</h3>
          <Link to="/shop/faq/faq_lists" className="btn">
            더보기
          </Link>
        </div>
        <div className="slider_box">
          <Swiper
            navigation={{
              nextEl: '.slick-next'
            }}
            slidesPerView='auto'
            modules={[Navigation]}
            speed={500}
          >
            {faqList?.map((faq, index) => (
              <SwiperSlide className="slide">
                <Link to={`/shop/faq/faq_lists?sort=${faq.code_gb}&no=${faq.NO}`}>
                  <p>
                    <strong>{index < 9 ? `0${index + 1}` : index + 1}</strong>
                    {faq.title}
                  </p>
                </Link>
              </SwiperSlide>
            ))} 
          </Swiper>
          <button className="slick-next slick-arrow"></button>
        </div>
      </div>
    </div>
  )
}

export default FaqBox