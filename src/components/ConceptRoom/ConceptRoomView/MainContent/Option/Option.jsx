import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import MainArea from './MainArea/MainArea';
import TopArea from './TopArea';

const Option = ({
  setActiveProduct,
  activeProduct,
  setProductInfo,
  setProductMarker,
  setHasMarker,
}) => {
  const {
    hiddenCoordinates,
    hiddenCoordinatesHandler,
    resetChangesHandler,
    optionMode,
    optionData,
  } = useConceptRoomContext();

  // Hidden product marker
  const breakpoint = document.querySelectorAll(`.breakpoint`);
  if (hiddenCoordinates) {
    breakpoint.forEach((item) => {
      item.style.display = 'none';
    });
  } else {
    breakpoint.forEach((item) => {
      item.style.display = 'block';
    });
  }

  return (
    <div className="options">
      <TopArea
        resetChangesHandler={resetChangesHandler}
        setActiveProduct={setActiveProduct}
        optionData={optionData}
        setProductMarker={setProductMarker}
      />

      <MainArea
        optionData={optionData}
        activeProduct={activeProduct}
        setActiveProduct={setActiveProduct}
        optionMode={optionMode}
        hiddenCoordinates={hiddenCoordinates}
        hiddenCoordinatesHandler={hiddenCoordinatesHandler}
        setProductInfo={setProductInfo}
        setProductMarker={setProductMarker}
        setHasMarker={setHasMarker}
      />
    </div>
  );
};

export default Option;
