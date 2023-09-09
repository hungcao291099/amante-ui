import OptionCenter from './OptionCenter';
import OptionBottom from './OptionBottom';

const MainArea = ({
  optionData,
  activeProduct,
  setActiveProduct,
  optionMode,
  hiddenCoordinates,
  hiddenCoordinatesHandler,
  setProductInfo,
  setProductMarker,
  setHasMarker
}) => {

  return (
    <div className="d-flex flex-column justify-content-between wrap-options">
      <OptionCenter
        optionData={optionData}
        activeProduct={activeProduct}
        setActiveProduct={setActiveProduct}
        setProductMarker={setProductMarker}
        setHasMarker={setHasMarker}
      />

      <OptionBottom
        optionData={optionData}
        optionMode={optionMode}
        hiddenCoordinates={hiddenCoordinates}
        activeProduct={activeProduct}
        hiddenCoordinatesHandler={hiddenCoordinatesHandler}
        setProductInfo={setProductInfo}
      />
    </div>
  );
};

export default MainArea;
