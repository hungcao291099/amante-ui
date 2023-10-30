/**
 * @author khaituong
 * @email [khaituong2909@mail.com]
 * @create date 2023-10-04 15:06:51
 * @modify date 2023-10-04 15:06:51
 * @desc This is concept room view page
 */
import { useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

import api from "@utils/api/api";
import LoadingBox from "@components/LoadingBox";
import RoomImage from "@components/ConceptRoom/ConceptRoomView/RoomImage/RoomImage";
import RoomInfo from "@components/ConceptRoom/ConceptRoomView/RoomInfo/RoomInfo";
import RoomVideo from "@components/ConceptRoom/ConceptRoomView/RoomVideo/RoomVideo";
import RoomSuggest from "@components/ConceptRoom/ConceptRoomView/RoomSuggest/RoomSuggest";
import styles from "./ConceptRoomView.module.css";

const ConceptRoomView = () => {
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const roomId = Number(queryParams.get("concept_room_seq")) || null;
  const roomListPath = "/shop/concept_room/concept_room_lists";

  useEffect(() => {
    if (!roomId) {
      return navigate(roomListPath);
    }
  }, [roomId]);

  const checkEmptyRoom = (data) => {
    const { styles, view } = data;
    if (styles.length === 0 && view.length === 0) {
      return navigate(roomListPath);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await api({
          url: "/room/concept/view",
          method: "GET",
          params: {
            concept_room_seq: roomId,
          },
        });
        checkEmptyRoom(data.response);
        setRoom(data.response);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [roomId]);

  if (isLoading) {
    return <LoadingBox />;
  }

  const handleGoBack = () => {
    return navigate(roomListPath);
  };

  return (
    <div className={styles.container}>
      <div className={styles.room_view}>
        {/* -- Back icon(show on MB) --  */}
        <div className={styles.view_back}>
          <MdArrowBackIosNew size={22} onClick={handleGoBack} />
        </div>

        {/* -- Information of room -- */}
        <RoomInfo
          name={room.concept_room_nm}
          authorName={room.user_nm}
          createdDate={room.reg_date}
          likeCount={room.like_cnt}
          viewCount={room.vw_cnt}
          styleList={room.styles}
        />

        {/* -- Video clip of room -- */}
        <RoomVideo id={roomId} url={room.bg_url} />

        {/* -- Content images of room -- */}
        <div className={styles.room_image__wrap}>
          {room.view?.length > 0 &&
            room.view.map((roomView) => (
              <RoomImage
                id={roomView.view_seq}
                image={roomView.file_nm}
                panorama={roomView.slide_url}
                products={roomView.room_object}
              />
            ))}
        </div>

        {/* -- Suggested list of room -- */}
        <RoomSuggest rooms={room.related_room} />
      </div>
    </div>
  );
};

export default ConceptRoomView;
