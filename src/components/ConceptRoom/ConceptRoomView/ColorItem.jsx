import $ from 'jquery'

import { conceptRoomImageURL } from "@utils/constants"
import { useConceptRoomContext } from "@contexts/ConceptRoomContext"

const ColorItem = ({opt, obj, activeColor, setActiveColor, number}) => {
  const { mode, activeView, activeVideo, setActiveVideo } = useConceptRoomContext()

  /**
   * The function handles the display and z-index of product options based on the selected color ID.
   */
  const activeColorHandler = (colorId) => {
    const productOpt = $(`.product-obj-${activeView}[data-obj-seq=${obj.id}]`)
    setActiveVideo(false)
    productOpt.each(function() {
      const zIndex = $(this).data('od')
      if ($(this).data('opt-seq') === colorId) {
        $(this)[0].style.zIndex = zIndex + 1
        $(this)[0].style.opacity = 1
        $(this).addClass("active")
        setActiveColor(colorId)
      } else {
        $(this)[0].style.zIndex = zIndex
        $(this)[0].style.opacity = 0
        $(this).removeClass("active")
      }
    })
  }

  return (
    <li 
      // onClick={(e) => !activeVideo ? activeColorHandler(opt.id) : alert('동영상 숨김 부탁드립니다.')}
      onClick={() => activeColorHandler(opt.id)}
      className="color-item"
      data-opt-seq={opt.id}
      data-obj-seq={obj.id}
    >
      <div 
        data-obj-seq={obj.id} 
        data-opt-seq={opt.id} 
        className={`color-image ${activeVideo ? '' : opt.id === activeColor ? "active" : ""}`}
      >
        <img src={`${conceptRoomImageURL}/${opt.thumbnail_img}`} />
        {/* <span className="color-opacity"></span> */}
        <span className={`color-opacity ${activeVideo ? 'mb' : ''}`}></span>
      </div>
      <span>{opt.color_nm}</span>
  </li>
  )
}

export default ColorItem