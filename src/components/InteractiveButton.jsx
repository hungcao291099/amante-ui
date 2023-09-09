import { likeInfo } from '@utils/functions';

const InteractiveButton = ({ room, navigate, custSeq, userId, device, setShowSocialModal }) => {

  
  return (
    <div className={`justify-content-center align-items-center interactive-area ${device}`}>
      <div
        onClick={() => setShowSocialModal({state: true, type: 'out'})}
        className="d-flex gap-2 interactive-area__btn justify-content-center align-items-center social-form"
      >
        <img src="/images/svg/share.svg" alt="This is a share icon" />
        <h5>공유하기</h5>
        {/* <ShareSocial room={room} show={showSocial ? true : false} url={window.location.href} /> */}
      </div>
      <div
        onClick={() => {
          if (!custSeq) {
            if (confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?')) {
              navigate('/shop/login/login');
            }
          } else {
            likeInfo('concept_room', 'L', room.concept_room_seq, userId, custSeq);
          }
        }}
        className={`d-flex gap-2 interactive-area__btn justify-content-center align-items-center like-room ${room.concept_room_seq} ${room.like_on}`}
      >
        {/* <span src="/images/svg/heart-big.svg" alt="This is a heart icon" /> */}
        <h5>저장하기</h5>
      </div>
    </div>
  );
};

export default InteractiveButton;
