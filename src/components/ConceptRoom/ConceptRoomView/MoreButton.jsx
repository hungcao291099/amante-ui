import { useState } from 'react';

const MoreButton = ({ downloadScreenshot, room, activeView, setShowMore, setShowSocialModal }) => {

  return (
    <ul className="list">
      <li
        className="item"
        onClick={() => {
          downloadScreenshot();
          setShowMore(false);
        }}
      >
        <h4>이미지 다운로드</h4>
        <img src="/images/svg/download-image-icon.svg" alt="This is a checkmark icon" />
      </li>
      {/* <li className='item'>
          <h4>찜 내역에 이미지 저장</h4>
          <img src="/images/svg/like-image-icon.svg" alt="This is a checkmark icon" />
        </li> */}

      <li
        className="text item social-form"
        onClick={() => {
          setShowSocialModal({state: true, type: 'in'});
          setShowMore(false);
        }}
      >
        <h4>이미지 공유하기</h4>
        <img src="/images/svg/share-image-icon.svg" alt="This is a checkmark icon" />
      </li>
    </ul>
  );
};

export default MoreButton;
