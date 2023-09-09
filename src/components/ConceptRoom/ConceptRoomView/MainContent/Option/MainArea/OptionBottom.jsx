import ScrollContainer from 'react-indiana-drag-scroll';
import ColorParent from '../ColorParent';

const OptionBottom = ({
  optionData,
  optionMode,
  hiddenCoordinates,
  activeProduct,
  hiddenCoordinatesHandler,
  setProductInfo
}) => {
  return (
    <div className="options-bottom">
      <h2>해당제품의 컬러를 변경해보세요</h2>
      <ul
        className="d-flex color-row"
        style={{
          fontSize: '10px',
          fontWeight: '400',
          color: '#888',
          height: optionMode === 'L' ? '140px' : '100px',
        }}
      >
        {/* Render COLOR item */}
        {optionData.room_object?.length > 0 ? (
          optionData.room_object.map((obj, index) => (
            <ScrollContainer
              className="wrap"
              key={index}
              style={{ display: obj.id === activeProduct.id ? 'flex' : 'none', gap: 12 }}
            >
              <ColorParent
                obj={obj}
                activeProduct={activeProduct}
                setProductInfo={setProductInfo}
              />
            </ScrollContainer>
          ))
        ) : (
          <span>등록된 색상이 없습니다.</span>
        )}
      </ul>
      {optionMode === 'P' && (
        <div className="check-product">
          <h1>제품을 숨겨서 공간을 확인해보세요</h1>
          <button
            className={`${hiddenCoordinates ? 'hidden' : ''}`}
            onClick={() => hiddenCoordinatesHandler()}
          >
            <div className={`check-circle ${hiddenCoordinates ? 'hidden' : 'show'}`}></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionBottom;
