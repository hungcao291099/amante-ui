import { useState } from 'react';
import MoreButton from '../MoreButton';
import { clickOutsideClose } from '@utils/functions';

const MiddleArea = ({ downloadScreenshot, room, activeView, setShowSocialModal }) => {
  const [showMore, setShowMore] = useState(false);

  clickOutsideClose('middle-area .more-btn', setShowMore, false)

  return (
    <div className="concept-room-container d-flex justify-content-between align-items-center middle-area">
      <h4>한눈에 보는 룸투어</h4>
      <img
        onClick={() => setShowMore((prev) => !prev)}
        className="more-btn"
        src="/images/svg/more-btn.svg"
        alt=""
      />

      {showMore && (
        <MoreButton
          downloadScreenshot={downloadScreenshot}
          room={room}
          activeView={activeView}
          setShowMore={setShowMore}
          setShowSocialModal={setShowSocialModal}
        />
      )}
    </div>
  );
};

export default MiddleArea;
