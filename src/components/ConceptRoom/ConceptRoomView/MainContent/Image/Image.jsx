import { AiFillHome } from 'react-icons/ai';
import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import { conceptRoomImageURL, mainWebURL } from '@utils/constants';
import { isValidUrl } from '../../../../../utils/functions';
import ImageObject from './ImageObject';
import ImageProduct from './ImageProduct';

const Image = ({
  view,
  setActiveProduct,
  activeProduct,
  productMarker,
  hasMarker,
  setHasMarker,
  objectRef,
  productInfo,
  setProductMarker,
  baseUrl,
  custSeq,
  showPlayer360,
  setShowPlayer360,
}) => {
  const {
    isMobile,

    productModal,
    optionMode,
    optionData,
    activeView,
    setShow3dProduct,

    openProductModalHandler,
    closeModalHandler,
  } = useConceptRoomContext();
  

  return (
    <div
      className={`inner-img view-${view.view_seq}`}
      data-has-object={view.room_object.length > 0 ? true : false}
    >
      {isValidUrl(view.slide_url) && (
        <button
          onClick={() => setShowPlayer360((value) => !value)}
          className={`btn-player360 ${showPlayer360 ? 'active' : ''}`}
        >
          {showPlayer360 ? (
            <AiFillHome size={24} />
          ) : (
            <img src="/images/svg/360-degrees.svg" alt="Icon" />
          )}
        </button>
      )}
      {showPlayer360 ? (
        <iframe
          className="player-360"
          frameBorder={0}
          allow="vr,gyroscope,accelerometer,fullscreen"
          scrolling="no"
          allowFullScreen="true"
          src={view.slide_url}
        />
      ) : (
        <>
          <ImageObject
            imageObject={view.room_object}
            conceptRoomImageURL={conceptRoomImageURL}
            optionMode={optionMode}
            closeModalHandler={closeModalHandler}
            isMobile={isMobile}
            view={view}
            productModal={productModal}
            setHasMarker={setHasMarker}
            setProductMarker={setProductMarker}
          />

          <ImageProduct
            setActiveProduct={setActiveProduct}
            imageObject={view.room_object}
            productModal={productModal}
            openProductModalHandler={openProductModalHandler}
            isMobile={isMobile}
            hasMarker={hasMarker}
            optionData={optionData}
            activeView={activeView}
            optionMode={optionMode}
            activeProduct={activeProduct}
            productMarker={productMarker}
            objectRef={objectRef}
            productInfo={productInfo}
            baseUrl={baseUrl}
            mainWebURL={mainWebURL}
            custSeq={custSeq}
            setShow3dProduct={setShow3dProduct}
          />
        </>
      )}
    </div>
  );
};

export default Image;
