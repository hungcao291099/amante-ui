import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import api from '@utils/api/api';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import $ from 'jquery';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { ImSpinner9 } from 'react-icons/im';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ContentArea from './ContentArea';
import VideoArea from './MB/VideoArea';
import Download from './PC/Download';
import MiddleArea from './MiddleArea';

const MainContent = ({ custSeq, room, baseUrl }) => {
  const {
    isMobile,

    activeView,
    hiddenCoordinates,
    setHiddenCoordinates,
    optionMode,
    setShowSocialModal,
  } = useConceptRoomContext();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const conceptRoomSeq = Number(queryParams.get('concept_room_seq')) || null;
  const [isLoading, setIsLoading] = useState(false);

  const downloadScreenshot = async () => {
    let imgUrl;
    const filename = uuidv4();
    const el = document.querySelector(`.inner-img.view-${activeView}`);

    if (optionMode === 'P') {
      if (!isMobile && !hiddenCoordinates) {
        return alert('숨겨진 좌표를 부탁합니다!');
      } else {
        if (JSON.parse(el.getAttribute('data-has-object')) === false) {
          imgUrl = $(el).children().attr('src');
        } else {
          setHiddenCoordinates(true);
          imgUrl = await htmlToImage.toBlob(el);
        }
      }
    } else {
      if (JSON.parse(el.getAttribute('data-has-object')) === false) {
        imgUrl = $(el).children().attr('src');
      } else {
        imgUrl = $(`.inner-img .product-obj-${activeView}.active`)[0].src;
      }
    }

    saveAs(imgUrl, filename);
    setIsLoading(true);
    try {
      await api({
        url: '/room/concept/update_download_image_count',
        method: 'POST',
        data: {
          concept_room_seq: conceptRoomSeq,
        },
      });
      setIsLoading(false);
      const prevSaveCount = Number($('.save-count span').text());
      $('.save-count span').text(prevSaveCount + 1);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <section className="main-content">

      <MiddleArea
        downloadScreenshot={downloadScreenshot}
        room={room}
        activeView={activeView}
        setShowSocialModal={setShowSocialModal}
      />

      <ContentArea viewArr={room.view} custSeq={custSeq} baseUrl={baseUrl} />

      <div className="content-line-v2-mb"></div>

      <Download
        ImSpinner9={ImSpinner9}
        downloadScreenshot={downloadScreenshot}
        isLoading={isLoading}
        downCount={room.dl_cnt}
      />

      <Row className="content-line"></Row>
    </section>
  );
};

export default MainContent;
