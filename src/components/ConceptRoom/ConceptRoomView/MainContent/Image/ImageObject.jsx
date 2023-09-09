const ImageObject = ({
  imageObject,
  conceptRoomImageURL,
  optionMode,
  closeModalHandler,
  view,
  productModal,
  setHasMarker,
  isMobile,
  setProductMarker,
}) => {
  return (
    <>
      {imageObject?.map((obj, objIndex) =>
        obj.options.map((opt, index) => {
          const width = (parseInt(obj.width) / 770) * 100 + '%';
          const height = (parseInt(obj.height) / 580) * 100 + '%';
          const dataOd =
            optionMode === 'L'
              ? index === 0
                ? Number(obj.od) + 5
                : Number(obj.od) + 4
              : Number(obj.od) + 5;

          // Style of image
          const optStyle = {
            position: 'absolute',
            left: obj.object_pos_x + '%',
            top: obj.object_pos_y + '%',
            zIndex: dataOd,
            width: optionMode === 'P' ? width : '100%',
            height: optionMode === 'P' ? height : '100%',
            opacity: (optionMode === 'L' ? objIndex === 0 && index === 0 : index === 0) ? 1 : 0,
            transition: `opacity ${optionMode === 'P' ? '.2s linear' : 'none'}`,
          };

          if (obj.object_pos_x && obj.object_pos_y) {
            return (
              <img
                key={index}
                className={`product-obj-${view.view_seq} product-object ${
                  (optionMode === 'L' ? objIndex === 0 && index === 0 : index === 0) ? 'active' : ''
                }`}
                data-od={dataOd}
                data-opt-seq={opt.id}
                data-obj-seq={obj.id}
                data-child-obj={obj.child_obj.length > 0 ? obj.child_obj : null}
                data-first-item={
                  (optionMode === 'L' ? objIndex === 0 && index === 0 : index === 0) ? true : false
                }
                data-file-name={opt.option_file_nm}
                style={optStyle}
                src={`${conceptRoomImageURL}/object/${opt.option_file_nm}`}
                onClick={() => {
                  if (productModal === null) {
                    setHasMarker((prev) => !prev);
                    setProductMarker(null);
                  } else {
                    closeModalHandler();
                  }
                }}
              />
            );
          }
        })
      )}

      <img
        className="bg-img"
        id="main-img"
        src={`${conceptRoomImageURL}/${view.file_nm}`}
        alt=""
        onClick={() => {
          if (productModal === null) {
            setHasMarker((prev) => !prev);
          } else {
            closeModalHandler();
            setProductMarker(null);
          }
        }}
      />
    </>
  );
};

export default ImageObject;
