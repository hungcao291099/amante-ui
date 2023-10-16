/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-05 15:03:16
 * @modify date 2023-10-05 15:03:16
 * @desc The ImageSlide is component of ConceptRoomView.jsx
 */

import { useState } from "react";

import styles from "./ImageSlice.module.css";
import { isValidUrl } from "@utils/functions";
import { AiFillHome } from "react-icons/ai";
import { conceptRoomImageURL } from "@utils/constants";
import { useSelector } from "react-redux";

const ImageSlide = ({
  playerUrl,
  objectList,
  activePlayer360,
  onTogglePlayer360,
}) => {
  const { optionActiveId } = useSelector((state) => state.option);

  return (
    <div className={styles.image_slide}>
      {/* -- Button 360 -- */}
      {isValidUrl(playerUrl) && (
        <button
          onClick={onTogglePlayer360}
          className={`
            ${styles.slide_button360} 
            ${activePlayer360 ? styles.slide_button360__active : ""}
          `}
        >
          {activePlayer360 ? (
            <AiFillHome size={24} />
          ) : (
            <img src="/images/svg/360-degrees.svg" alt="360 icon" />
          )}
        </button>
      )}

      {/* -- Player 360 & Image -- */}
      {activePlayer360 ? (
        <iframe
          className={styles.slide_player360}
          allow="xr-spatial-tracking; vr; gyroscope; accelerometer; fullscreen"
          allowFullScreen
          src={playerUrl}
        />
      ) : (
        <>
          {objectList?.map((object) => {
            return object.options.map((option) => {
              const active = option.option_seq === optionActiveId;

              return (
                <img
                  className={`
                    ${styles.image_option} 
                    ${active ? styles.image_option__active : ""}
                  `}
                  key={option.id}
                  src={`${conceptRoomImageURL}/object/${option.option_file_nm}`}
                />
              );
            });
          })}
        </>
      )}
    </div>
  );
};

export default ImageSlide;
