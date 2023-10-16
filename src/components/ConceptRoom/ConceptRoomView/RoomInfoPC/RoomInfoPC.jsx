/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-06 08:39:15
 * @modify date 2023-10-06 08:44:55
 * @desc This is a component of ConceptRoomView.jsx
 */

import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";

import { formatNumber, splitStr } from "@utils/functions";
import { conceptRoomImageURL } from "@utils/constants";
import styles from "./RoomInfoPC.module.css";

const RoomInfoPC = ({
  name,
  authorName,
  createdDate,
  likeCount,
  viewCount,
  styleList,
}) => {
  const newCreatedDate = splitStr(createdDate, 10);
  const newLikeCount = likeCount ? formatNumber(likeCount) : 0;
  const newViewCount = viewCount ? formatNumber(viewCount) : 0;

  return (
    <div className={styles.room_info__pc}>
      <h2 className={styles.info_name__pc}>{name}</h2>

      <div className={styles.info_content__pc}>
        <div className={styles.content_author__pc}>
          <h4 className={styles.author_name__pc}>{authorName}</h4>
          <h4 className={styles.author_created__pc}>{newCreatedDate}</h4>
        </div>
        <div className={styles.content_interactive__pc}>
          <div className={styles.interactive_item__pc}>
            <AiOutlineHeart size={20} />
            <h4 className={styles.item_number__pc}>{newLikeCount}</h4>
          </div>
          <div className={styles.interactive_item__pc}>
            <AiOutlineEye size={24} />
            <h4 className={styles.item_number__pc}>{newViewCount}</h4>
          </div>
        </div>
      </div>

      <div className={styles.info_styles__pc}>
        {styleList?.map((style) => {
          const detailStyles = style.style.split(",");

          return (
            <div key={style.h_code} className={styles.style_item__pc}>
              <div className={styles.item_icon__pc}>
                <img
                  className={styles.icon_image__pc}
                  src={`${conceptRoomImageURL}/${style.file_nm_dis}`}
                  alt="Room icon"
                />
                <h4 className={styles.icon_name__pc}>{style.h_name}</h4>
              </div>

              <div className={styles.item_line__pc}></div>

              <div className={styles.item_tags__pc}>
                {detailStyles?.map((tag, index) => (
                  <h4 key={index} className={styles.tag_item__pc}>
                    {tag}
                  </h4>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomInfoPC;
