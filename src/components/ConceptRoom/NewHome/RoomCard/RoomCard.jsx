/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-09-25 15:18:35
 * @modify date 2023-10-03 14:39:05
 * @desc Card is a component of new home page
 */

import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillHeart } from "react-icons/ai";

import { conceptRoomImageURL } from "@utils/constants";
import styles from "./RoomCard.module.css";
import api from "@utils/api/api";
import { useState } from "react";

const RoomCard = ({
  id,
  name,
  image,
  tag,
  viewCount,
  likeCount,
  mark,
  refElement,
  currentUser,
}) => {
  const [activeMark, setActiveMark] = useState(mark);
  const navigate = useNavigate();

  const toggleBookmark = async (roomId) => {
    if (!currentUser) {
      return navigate("/shop/login/login");
    }

    const userId = currentUser?.cust_seq;

    try {
      await api({
        url: "/concept_room/bookmark",
        method: "POST",
        data: {
          concept_room_seq: roomId,
          cust_seq: userId,
        },
      });
      setActiveMark((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div ref={refElement} className={styles.room_card}>
      <div className={styles.card_image}>
        <Link
          to={`/shop/concept_room/concept_room_view?concept_room_seq=${id}`}
        >
          <img
            src={`${conceptRoomImageURL}/${image}`}
            alt="Room image"
            className={styles.image}
          />
        </Link>

        <div onClick={() => toggleBookmark(id)}>
          <BsBookmarkFill
            size={18}
            className={`${styles.icon} ${styles.icon__fill} ${
              activeMark ? styles.icon__active : ""
            }`}
          />

          <BsBookmark size={18} className={styles.icon} />
        </div>
      </div>

      <div className={styles.detail}>
        <Link
          to={`/shop/concept_room/concept_room_view?concept_room_seq=${id}`}
          className={styles.name}
        >
          {name}
        </Link>

        <h6 className={styles.styles}>{tag}</h6>

        <div className={styles.info_interact}>
          <div className={styles.view}>
            <AiFillEye size={18} />
            <h4 className={styles.view_count}>{viewCount ? viewCount : 0}</h4>
          </div>

          <div className={styles.like}>
            <AiFillHeart size={18} />
            <h4 className={styles.like_count}>{likeCount ? likeCount : 0}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
