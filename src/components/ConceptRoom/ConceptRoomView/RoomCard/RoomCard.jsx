/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-26 10:34:01
 * @modify date 2023-10-26 10:34:01
 * @desc This is a component of RoomSuggest
 */

import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router";

import { conceptRoomImageURL } from "@utils/constants";
import { formatNumber } from "@utils/functions";
import styles from "./RoomCard.module.css";

const RoomCard = ({ id, name, image, viewCount, likeCount }) => {
  const navigate = useNavigate();

  const imageUrl = `${conceptRoomImageURL}/${image}`;
  const newViewCount = viewCount ? formatNumber(viewCount) : 0;
  const newLikeCount = likeCount ? formatNumber(likeCount) : 0;

  const handleClick = (id) => {
    navigate(`/shop/concept_room/concept_room_view?concept_room_seq=${id}`);
  };

  return (
    <div className={styles.room_card}>
      <img
        onClick={() => handleClick(id)}
        className={styles.card_image}
        src={imageUrl}
        alt="Card image"
      />
      <h5 onClick={() => handleClick(id)} className={styles.card_name}>
        {name}
      </h5>
      <div className={styles.card_info}>
        <div className={styles.info_item}>
          <AiOutlineEye size={20} className={styles.item_icon} />
          <span className={styles.item_count}>{newViewCount}</span>
        </div>
        <div className={styles.info_item}>
          <AiOutlineHeart size={18} className={styles.item_icon} />
          <span className={styles.item_count}>{newLikeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
