/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-25 15:29:00
 * @modify date 2023-10-26 10:04:03
 * @desc This is a component of RoomImage
 */

import { conceptRoomImageURL, mainWebImageURL } from "@utils/constants";
import styles from "./ProductItem.module.css";

const ProductItem = ({
  image,
  active,
  disabled,
  isCompany,
  isMobile,
  onMouseEnter,
}) => {
  const style = {
    pointerEvents: disabled ? "none" : "auto",
  };

  const imageUrl = isCompany
    ? `${mainWebImageURL}/product/${image}`
    : `${conceptRoomImageURL}/${image}`;

  const handleClick = () => {
    if (isMobile) {
      onMouseEnter();
    }
  };

  return (
    <div
      style={style}
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
      className={`
        ${styles.product_item} 
        ${active ? styles.product_item__active : ""}
      `}
    >
      <img className={styles.item_image} src={imageUrl} alt="Product item" />
    </div>
  );
};

export default ProductItem;
