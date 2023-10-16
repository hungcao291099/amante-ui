/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-06 08:27:01
 * @modify date 2023-10-06 08:27:01
 * @desc This is component of ConceptRoomView.jsx
 */
import { useCallback } from "react";

import styles from "./RoomInfo.module.css";

const RoomInfo = ({ id, name, slideCount, styleList }) => {
  
  const tagList = useCallback(() => {
    return styleList?.reduce((acc, item) => {
      const tag = item.style.split(",");
      return acc.concat(tag);
    }, []);
  }, [id]);

  return (
    <div className={styles.room_info}>
      <h2 className={styles.info_name}>{name}</h2>
      <h4 className={styles.info_title}>
        한눈에 보는 룸투어
        <span className={styles.title_number}>{slideCount}컷</span>
      </h4>

      <ul className={styles.info_tags}>
        {tagList()?.map((tag, index) => (
          <li className={styles.tag} key={index}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomInfo;
