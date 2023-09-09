import { Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'

import { useConceptRoomContext } from '@contexts/ConceptRoomContext'
import { conceptRoomImageURL } from '@utils/constants'
import { formatNumber } from '@utils/functions'
import { Link } from 'react-router-dom'

const RelatedPost = () => {
  const { room } = useConceptRoomContext()
  return (
    <Row>
      <div className="post-related">
      {room.related_room?.length > 0 ? (
         <>
          <h2>내 취향과 비슷한 룸</h2>
          <Swiper
            slidesPerView="auto"
            spaceBetween={16}
            loop={true}
            grabCursor={true}
            autoplay={{delay: 2000, disableOnInteraction: false}}
            speed={1000}
            modules={[Autoplay]}
            className='post-list'
          >
            {/* ----------- ROOM related render ---------------  */}
            {room.related_room?.map((room, index) => (
              <SwiperSlide className="post-item" key={index}>
                <div className="post-item-img">
                  <Link style={{height: '100%'}} to={`/shop/concept_room/concept_room_view?concept_room_seq=${room.concept_room_seq}`}>
                    <img src={`${conceptRoomImageURL}/${room.thumbnail_img}`} alt={room.concept_room_nm}/>
                  </Link>
                </div>
                <Link href={`/shop/concept_room/concept_room_view?concept_room_seq=${room.concept_room_seq}`}>
                  <h2 className="post-name">
                    {room.concept_room_nm}
                  </h2>
                </Link>
                <div className="post-interactive d-flex">
                  <div className="interactive d-flex">
                    <img src="/images/svg/eye.svg" alt="This is an eye icon" />
                    <span>{room.vw_cnt ? formatNumber(room.vw_cnt): 0}</span>
                  </div>
                  <img src="/images/svg/line.svg" alt="This is a line icon" />
                  <div className="interactive d-flex">
                  <img src="/images/svg/heart.svg" alt="This is an eye icon" />
                    <span>{room.like_cnt ? formatNumber(room.like_cnt): 0}</span>
                  </div>
                </div>
              </SwiperSlide>
              )
            )}
          </Swiper>
         </>
      ) : null}
      </div>
    </Row>
  )
}

export default RelatedPost