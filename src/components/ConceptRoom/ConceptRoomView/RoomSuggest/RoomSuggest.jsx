/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-26 10:26:44
 * @modify date 2023-10-26 10:26:44
 * @desc This is a component of ConceptRoomView.jsx
 */

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import RoomCard from "../RoomCard/RoomCard";
import styles from "./RoomSuggest.module.css";
import "swiper/css";

const RoomSuggest = ({ rooms }) => {
  if (rooms?.length === 0) {
    return;
  }

  return (
    <div className={styles.room_suggest}>
      <h4 className={styles.suggest_title}>내 취향과 비슷한 룸</h4>
      <Swiper
        slidesPerView="auto"
        spaceBetween={16}
        loop={true}
        grabCursor={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={1000}
        modules={[Autoplay]}
      >
        {rooms?.map((room) => (
          <SwiperSlide
            key={room.concept_room_seq}
            className={styles.suggest_item}
          >
            <RoomCard
              id={room.concept_room_seq}
              name={room.concept_room_nm}
              image={room.thumbnail_img}
              viewCount={room.vw_cnt}
              likeCount={room.like_cnt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RoomSuggest;
