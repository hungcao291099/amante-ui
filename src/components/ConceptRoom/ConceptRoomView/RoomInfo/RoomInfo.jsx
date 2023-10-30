/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-06 08:39:15
 * @modify date 2023-10-23 15:57:12
 * @desc This is a component of ConceptRoomView.jsx
 */

import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";

import { formatNumber, splitStr } from "@utils/functions";
import { conceptRoomImageURL } from "@utils/constants";
import styles from "./RoomInfo.module.css";

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
    <div className={styles.room_info}>
      <h2 className={styles.info_name}>{name}</h2>

      <div className={styles.info_content}>
        <div className={styles.content_author}>
          <h4 className={styles.author_name}>{authorName}</h4>
          <h4 className={styles.author_created}>{newCreatedDate}</h4>
        </div>
        <div className={styles.content_interactive}>
          <div className={styles.interactive_item}>
            <AiOutlineHeart size={20} />
            <h4 className={styles.item_number}>{newLikeCount}</h4>
          </div>
          <div className={styles.interactive_item}>
            <AiOutlineEye size={24} />
            <h4 className={styles.item_number}>{newViewCount}</h4>
          </div>
        </div>
      </div>

      <div className={styles.info_styles}>
        {styleList?.map((style) => {
          const detailStyles = style.style.split(",");

          return (
            <div key={style.h_code} className={styles.style_item}>
              <div className={styles.item_block}>
                <div className={styles.block_icon}>
                  <img
                    className={styles.icon_image}
                    src={`${conceptRoomImageURL}/${style.file_nm_dis}`}
                    alt="Room icon"
                  />
                  <h4 className={styles.icon_name}>{style.h_name}</h4>
                </div>
                
                <div className={styles.item_line}>
                  <span className={styles.line_border}></span>
                </div>
              </div>

              <div className={styles.item_tags}>
                {detailStyles?.map((tag, index) => (
                  <h4 key={index} className={styles.tag_item}>
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
