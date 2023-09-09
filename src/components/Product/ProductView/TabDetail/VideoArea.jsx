
const VideoArea = ({productView, baseUrl}) => {
  return (
    <>
      {productView.sub_img4 && (
        <div className="video_area">
          <video controls="">
            <source
              src={`${baseUrl}/uploads/product/${productView.sub_img4}`}
              type="video/mp4"
            />
          </video>
        </div>
      )}
    </>
  )
}

export default VideoArea