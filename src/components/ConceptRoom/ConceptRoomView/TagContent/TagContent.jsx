/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-24 09:33:39
 * @modify date 2023-10-24 15:02:25
 * @desc This is a component of RoomImage.jsx
 */

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { conceptRoomImageURL, mainWebImageURL } from "@utils/constants";
import { formatNumber } from "@utils/functions";
import styles from "./TagContent.module.css";

const TagContent = ({ id, image, name, price, link, tagRef, isCompany }) => {
  const tagContentRef = useRef(null);
  const [translateX, setTranslateX] = useState({ left: "", right: "" });
  const [overflowedX, setOverflowedX] = useState({ left: false, right: false });

  const imageUrl = isCompany
    ? `${mainWebImageURL}/product/${image}`
    : `${conceptRoomImageURL}/${image}`;

  const initialAnimation = { opacity: 0, y: "-8%" };
  const animateAnimation = { opacity: 1, y: "0%" };

  const openInNewTab = (url) => {
    const win = window.open(url, "_blank");
    win.focus();
  };

  useEffect(() => {
    const elementDOMRect = tagContentRef.current.getBoundingClientRect();
    const overflowedLeft = elementDOMRect.left < 0;
    const overflowedRight = elementDOMRect.right > window.innerWidth;
    const width = tagContentRef.current.offsetWidth;
    const tagWidth = tagRef.current.offsetWidth;
    const center = (width - tagWidth) / 2;

    setTranslateX({ left: `-${center}px`, right: "auto" });

    if (overflowedLeft) {
      setTranslateX({ left: `-${center / 12}px`, right: "auto" });
      setOverflowedX({ left: true, right: false });
    }
    if (overflowedRight) {
      setTranslateX({ left: "auto", right: `-${center / 12}px` });
      setOverflowedX({ left: false, right: true });
    }
  }, [id]);

  return (
    <motion.div
      onClick={() => openInNewTab(link)}
      style={translateX}
      ref={tagContentRef}
      initial={initialAnimation}
      animate={animateAnimation}
      exit={initialAnimation}
      transition={{ duration: 0.2 }}
      className={`
        ${styles.tag_content} 
        ${overflowedX.left ? styles.overflowed__left : ""}
        ${overflowedX.right ? styles.overflowed__right : ""}
      `}
    >
      <img className={styles.content_image} src={imageUrl} alt="Tag image" />
      <div className={styles.content_detail}>
        <h5 className={styles.detail_name}>{name}</h5>
        <h4 className={styles.detail_price}>{formatNumber(price)}원</h4>
      </div>
      <MdOutlineKeyboardArrowRight size={22} className={styles.content_icon} />
    </motion.div>
  );
};

export default TagContent;
