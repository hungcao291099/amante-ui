/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-04 09:11:00
 * @modify date 2023-10-04 09:11:00
 * @desc This is room card of concept room
 */
import { useCallback } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Link } from "react-router-dom";

import { conceptRoomImageURL, mainWebImageURL } from "@utils/constants";
import styles from "./RoomCard.module.css";

const RoomCard = ({ refElement, id, name, brand, image, subImage, tag }) => {
  const newTag = useCallback((string) => {
    return string?.split("#");
  });

  const path = `/shop/concept_room/concept_room_view?concept_room_seq=${id}`;

  return (
    <div ref={refElement} className={styles.room_card}>
      <div className={styles.card_content}>
        <Link to={path} className={styles.content_name}>
          [스타일링 by {brand}] {name}
        </Link>

        <ScrollContainer className={styles.content_tags}>
          {newTag(tag).map(
            (tag, index) =>
              index !== 0 && (
                <h4 key={index} className={styles.tag_item}>
                  {tag}
                </h4>
              )
          )}
        </ScrollContainer>
      </div>

      <Link className={styles.card_image} to={path}>
        <img
          className={styles.image}
          src={`${conceptRoomImageURL}/${image}`}
          alt="Room card"
        />
      </Link>

      <ScrollContainer className={styles.sub_images}>
        {subImage?.map((image) => (
          <Link
            key={image.product_cd}
            className={styles.image_item}
            to={`/shop/product/product_view?product_cd=${image.product_cd}`}
          >
            <img
              className={styles.image}
              src={`${mainWebImageURL}/product/${image.file_nm}`}
              alt="Card sub image"
            />
          </Link>
        ))}
      </ScrollContainer>
    </div>
  );
};

export default RoomCard;
