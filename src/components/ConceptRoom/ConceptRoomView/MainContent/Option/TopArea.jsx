const TopArea = ({ optionData, resetChangesHandler, setActiveProduct, setProductMarker }) => {
  return (
    <div className="options-top d-flex justify-content-between">
      <h2>내 마음대로 방 꾸며보기</h2>
      <div className="wrap-btn d-flex flex-colum align-items-end">
        <button
          onClick={() => {
            setProductMarker(null);
            resetChangesHandler();
            setActiveProduct({
              id: optionData.room_object[0].id,
              product_cd: optionData.room_object[0].product_cd,
              view: optionData.view_seq,
            });
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default TopArea;
