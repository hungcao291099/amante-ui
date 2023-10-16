/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-06 08:33:22
 * @modify date 2023-10-06 08:33:22
 * @desc This is component of ConceptRoomView.jsx
 */

import { isValidUrl } from "@utils/functions";
import styles from "./RoomVideo.module.css";
import ReactPlayer from "react-player";

const RoomVideo = ({ id, url }) => {
  if (!isValidUrl(url)) {
    return null;
  }

  return (
    <div className={styles.room_video}>
      <ReactPlayer
        key={id}
        className={styles.video_item}
        url={url}
        width="100%"
        height="100%"
        playing
        muted
        loop
        controls
        playsinline
        config={{
          file: {
            attributes: {
              crossorigin: "anonymous",
            },
          },
        }}
      />
    </div>
  );
};

export default RoomVideo;
