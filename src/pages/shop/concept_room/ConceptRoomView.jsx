import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MainContent from '@components/ConceptRoom/ConceptRoomView/MainContent/MainContent';
import RelatedPost from '@components/ConceptRoom/ConceptRoomView/RelatedPost';
import TextContent from '@components/ConceptRoom/ConceptRoomView/TextContent';
import LoadingBox from '@components/LoadingBox';
import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import { CdnContext } from '@contexts/cdnContext';
import api from '@utils/api/api';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import VideoArea from '../../../components/ConceptRoom/ConceptRoomView/MainContent/MB/VideoArea';
import ProductOptionForm from '../../../components/ConceptRoom/ConceptRoomView/Popup/ProductOptionForm/ProductOptionForm';
import InteractiveButton from '../../../components/InteractiveButton';
import ShareSocial from '../../../components/ShareSocial';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ConceptRoomView = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const conceptRoomSeq = Number(queryParams.get('concept_room_seq')) || null;
  const {
    setRoom,
    room,
    setActiveView,
    setOptionMode,
    setOptionData,
    showSocialModal,
    setShowSocialModal,
    activeView,
    showFormOption,
    setShowFormOption,
    show3dProduct,
    setShow3dProduct,
  } = useConceptRoomContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('member_access_token');
  const userData = token ? jwt_decode(token) : null;
  const cust_seq = userData?.cust_seq || null;
  const user_id = userData?.user_id || null;
  const { baseUrl } = useContext(CdnContext);

  useEffect(() => {
    if (conceptRoomSeq === null) {
      navigate('/shop/concept_room/concept_room_lists');
    }

    setIsLoading(true);

    const fetchData = async () => {
      try {
        const { data } = await api({
          url: '/room/concept/view',
          method: 'GET',
          params: {
            concept_room_seq: conceptRoomSeq,
            cust_seq,
          },
        });
        const { styles, view } = data.response;
        if (styles.length === 0 && view.length === 0) {
          return navigate('/shop/concept_room/concept_room_lists');
        }

        setRoom(data.response);
        setActiveView(data.response.view[0]?.view_seq);
        setOptionMode(data.response.upload_method);
        setOptionData(data.response.view[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const updateViewCount = async () => {
      try {
        await api({
          url: 'room/concept/update_view_count',
          method: 'POST',
          data: {
            concept_room_seq: conceptRoomSeq,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    updateViewCount();
    fetchData();
  }, [conceptRoomSeq]);

  // Format detail of style to an array from room.styles
  const detailValue = room.styles?.reduce((acc, item) => {
    const styleList = item.style.split(',');
    return acc.concat(styleList);
  }, []);

  return isLoading ? (
    <LoadingBox />
  ) : (
    <>
      <div className="concept-room-container text-area-mb">
        <img
          className="previous-page__btn"
          onClick={() => navigate('/shop/concept_room/concept_room_lists')}
          src="/images/svg/arrow-left.svg"
          alt="This is a left arrow icon"
        />

        <h3 className="room-name">{room.concept_room_nm}</h3>

        <h5 className="subtitle">
          한눈에 보는 룸투어 <span>{room.view?.length}컷</span>
        </h5>

        <div className="category-list-mb d-flex flex-wrap">
          {detailValue?.map((detail, index) => (
            <h4 key={index}>{detail}</h4>
          ))}
        </div>
      </div>

      <VideoArea device="pc" />
      <div className="concept-room-container">
        <TextContent />
      </div>

      <div className="concept-room-container" style={{ padding: 0 }}>
        <MainContent custSeq={cust_seq} room={room} baseUrl={baseUrl} />
      </div>

      <div className="concept-room-container concept-room-container__interactive justify-content-center">
        <InteractiveButton
          room={room}
          navigate={navigate}
          custSeq={cust_seq}
          userId={user_id}
          device="pc"
          setShowSocialModal={setShowSocialModal}
        />
      </div>

      <div className="concept-room-container">
        {/* {room.related_product?.length > 0 && <RelatedProduct products={room.related_product} />} */}
        <RelatedPost />
      </div>

      <div className="concept-room-view__footer">
        <div className="empty-area"></div>
        <InteractiveButton
          room={room}
          navigate={navigate}
          custSeq={cust_seq}
          userId={user_id}
          setShowSocialModal={setShowSocialModal}
        />
      </div>

      <ShareSocial
        room={room}
        url={
          showSocialModal.type === 'out'
            ? window.location.href
            : $(`.inner-img .product-obj-${activeView}.active`)[0]?.src
        }
        show={showSocialModal.state}
        setShowSocialModal={setShowSocialModal}
      />

      <ProductOptionForm
        token={token}
        productCd={showFormOption.productCd}
        setShowFormOption={setShowFormOption}
        custSeq={cust_seq}
        navigate={navigate}
        formatNumber={formatNumber}
        baseUrl={baseUrl}
        show={showFormOption.state ? true : false}
      />

      <div div className={`modal-product-3d ${show3dProduct ? '' : 'hidden'}`}>
        <IconButton className="modal-product-3d__close-btn" onClick={() => setShow3dProduct(null)}>
          <CloseIcon fontSize="medium" />
        </IconButton>
        <iframe src={show3dProduct} frameborder="0"></iframe>
      </div>
    </>
  );
};

export default ConceptRoomView;
