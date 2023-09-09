import { AnimatePresence, motion } from "framer-motion"
import { Col } from "react-bootstrap"

import ProductModal from '@components/ConceptRoom/ConceptRoomView/Popup/ProductModal'
import { useConceptRoomContext } from '@contexts/ConceptRoomContext'
import { conceptRoomImageURL } from '@utils/constants'
import ProductModalMB from "../Popup/ProductModalMB"
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import ProductModalLink from "../Popup/ProductModalLink"

const MainImg = ({item, display}) => {
  const {
    isMobile, 

    mode,
    productModal,
    activeView,
    setActiveView,
    hiddenNav,

    openProductModalHandler, 
    closeModalHandler,
    changeViewHandler
  } = useConceptRoomContext()
  const { view, setActiveProduct, setProductInfo } = item



  /**
   * This function sets the active product and product info if the product does not have a custom URL.
   */
  const activeProductObjectHandler = (product) => {
    // if (!product.custom_url) {
      setActiveProduct({id: product.id, product_cd: product.product_cd, view: activeView})
      if(isMobile) {
        setProductInfo(product.product_detail)
      }
    // }
  } 

 

  // Set the minimum distance for a swipe to be recognized
  const MIN_SWIPE_DISTANCE = 50;
  const viewData = Array.from(document.querySelectorAll(`.view-mode-btn.button-mb`)).map(item => item.getAttribute('data-view'))
  // Variables to track touch position
  let startX, startY, distX, distY;

  const touchStartHandler = (event) => {
    // $('body').css('touch-action', 'none')
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  }

  const touchMoveHandler = (event) => {
    distX = event.touches[0].clientX - startX;
    distY = event.touches[0].clientY - startY;
  }
  
  /**
   * This function handles touch end events and determines the direction of a swipe gesture to change
   * the active view.
   * returns the result of calling `setActiveView` with the view that was swiped to (either the
   * previous or next view in `viewData`).
  */
 const touchEndHandler = () => {
   if (isMobile) {
    const currentIndex = viewData.indexOf(activeView)
    //  $('body').css('touch-action', 'pan-y')
    if (Math.abs(distX) > MIN_SWIPE_DISTANCE && Math.abs(distY) < MIN_SWIPE_DISTANCE) {
      // If the distance is greater than the minimum, determine the direction of the swipe
      if (distX > 0) {
        // Swipe right
        if (currentIndex > 0) {
          changeViewHandler(viewData[currentIndex - 1])
          return setActiveView(viewData[currentIndex - 1])
          }
        } else {
          if (currentIndex < viewData.length - 1) {
            changeViewHandler(viewData[currentIndex + 1])
            return setActiveView(viewData[currentIndex + 1])
          }
        }
      }
    }
  }
  
 
  return (
    <>
      {/* ------ DAY ------- */}
      <Col className={`main-img ${mode !== "light" ? "hidden" : "light"}`} lg={9} style={{display: display? display : ""}}>       
        <div className="inner-img" id={`inner-img-${view.view}-light`} onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler}>
          {isMobile && <div>
            <SlArrowLeft className={`arrow-left ${hiddenNav ? 'hidden' : activeView === viewData[0] ? 'hidden' : ''}`}/>
            <SlArrowRight className={`arrow-right ${hiddenNav ? 'hidden' :activeView === viewData[viewData.length - 1] ? 'hidden' : ''}`}/>  
          </div>}
          {view.room_object?.map(obj => (
              obj.options.map((opt, index) => {
                const width = (parseInt(opt.width) / 770) * 100 + "%"
                const height = (parseInt(opt.height) / 580) * 100 + "%"

                const optStyle = {
                  position: "absolute",
                  left: obj.x + "%", 
                  top: obj.y + "%", 
                  zIndex: obj.child_obj.length > 0 ? index === 0 ? Number(opt.od) + 3 : Number(opt.od) + 2 : index === 0 ? Number(opt.od) + 5 : Number(opt.od) + 4, 
                  width: width, height: height,
                  opacity: index === 0 ? 1 : 0,
                  transition: 'opacity .2s linear',
                }

                if (obj.x && obj.y) {
                  return (
                    <img 
                      key={index}
                      className={`product-obj-${view.view} product-object ${index === 0 ? "active" : ""}`} 
                      data-od={obj.child_obj.length > 0 ? index === 0 ? Number(opt.od) + 3 : Number(opt.od) + 2 : index === 0 ? Number(opt.od) + 5 : Number(opt.od) + 4} 
                      data-opt-seq={opt.id} 
                      data-obj-seq={obj.id} 
                      data-child-obj={obj.child_obj.length > 0 ? obj.child_obj : null}
                      data-first-item={index === 0 ? true : false}
                      style={optStyle}
                      src={`${conceptRoomImageURL}/object/${opt.file_nm_l}`}
                    />
                  )
                }
              })
              )
            )}
          <img className="bg-img" id="main-img" src={`${conceptRoomImageURL}/${view.file_nm_l}`} alt="" onClick={() => closeModalHandler()}/>
          {view.room_object?.map((product, index) => {
            if (product.coord_x && product.coord_y) {
              return (
                <div className='breakpoint' key={index} style={{left: product.coord_x + "%", top: product.coord_y + "%"}} onMouseEnter={() => {
                  openProductModalHandler(product.product_cd)
                 }}>
                  <AnimatePresence>
                  {product.product_cd === productModal ? 
                    isMobile ? 
                    product.custom_url ? <ProductModalLink product={product} device="mb" currentMode="light"/> : <ProductModalMB item={{product: product.product_detail}} currentMode="light"/>
                  : product.custom_url ? <ProductModalLink product={product}/> : <ProductModal item={{product: product.product_detail}}/> 
                  : null}
                  </AnimatePresence>
                  <img 
                    onClick={() => activeProductObjectHandler(product)} 
                    className="breakpoint-img" 
                    src={`/images/svg/${isMobile ? 
                      `tag${product.product_cd === productModal ? "-active" : product.custom_url ? "" : "-obj"}` 
                      : product.custom_url ? "breakpoint-link" : "breakpoint"}.svg`} 
                    alt="" />
                </div>
              )
            }
          }
          )}
        </div>
      </Col>

      {/* ------ NIGHT ------- */}
      <Col className={`main-img ${mode !== "dark" ? "hidden" : "dark"}`} lg={9} style={{display: display? display : ""}}>       
        <div className="inner-img" id={`inner-img-${view.view}-dark`} onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler}>
          {isMobile && <div>
            <SlArrowLeft className={`arrow-left ${hiddenNav ? 'hidden' : activeView === viewData[0] ? 'hidden' : ''}`}/>
            <SlArrowRight className={`arrow-right ${hiddenNav ? 'hidden' : activeView === viewData[viewData.length - 1] ? 'hidden' : ''}`}/>
          </div>}
          {view.room_object?.map(obj=> (
              obj.options.map((opt, index) => {
                const width = (parseInt(opt.width) / 770) * 100 + "%"
                const height = (parseInt(opt.height) / 580) * 100 + "%"

                const optStyle = {
                  position: "absolute",
                  left: obj.x + "%", 
                  top: obj.y + "%", 
                  zIndex: obj.child_obj.length > 0 ? index === 0 ? Number(opt.od) + 3 : Number(opt.od) + 2 : index === 0 ? Number(opt.od) + 5 : Number(opt.od) + 4, 
                  width: width, height: height,
                  opacity: index === 0 ? 1 : 0,
                  transition: 'opacity .2s linear',
                }

                if (obj.x && obj.y) {
                  return (  
                    <img 
                      key={index}
                      className={`product-obj-${view.view} ${index === 0 ? "active" : ""}`} 
                      data-od={obj.child_obj.length > 0 ? index === 0 ? Number(opt.od) + 3 : Number(opt.od) + 2 : index === 0 ? Number(opt.od) + 5 : Number(opt.od) + 4} 
                      data-opt-seq={opt.id} 
                      data-obj-seq={obj.id} 
                      data-child-obj={obj.child_obj.length > 0 ? obj.child_obj : null}
                      data-first-item={index === 0 ? true : false}
                      style={optStyle}
                      src={`${conceptRoomImageURL}/object/${opt.file_nm_d ? opt.file_nm_d : opt.file_nm_l}`}
                    />
                  )
                }
              })
              )
            )}
          <img className="bg-img" id="main-img" src={`${conceptRoomImageURL}/${view.file_nm_d ? view.file_nm_d : view.file_nm_l}`} alt="" onClick={() => closeModalHandler()}/>
          {view.room_object?.map((product, index) => {
            if (product.coord_x && product.coord_y) {
                return (
                  <div className='breakpoint' key={index} style={{left: product.coord_x + "%", top: product.coord_y + "%"}} onMouseEnter={() => {
                    openProductModalHandler(product.product_cd);
                  }}>
                  <AnimatePresence>
                    {product.product_cd === productModal ? 
                      isMobile ? 
                      product.custom_url ? <ProductModalLink product={product} device="mb" currentMode="dark"/> : <ProductModalMB item={{product: product.product_detail}} currentMode="dark"/>
                    : product.custom_url ? <ProductModalLink product={product}/> : <ProductModal item={{product: product.product_detail}}/> 
                    : null}
                    </AnimatePresence>
                    <img 
                    onClick={() => activeProductObjectHandler(product)} 
                    className="breakpoint-img" 
                    src={`/images/svg/${isMobile ? 
                      `tag${product.product_cd === productModal ? "-active" : product.custom_url ? "" : "-obj"}` 
                      : product.custom_url ? "breakpoint-link" : "breakpoint"}.svg`} 
                    alt="" />
                  </div>
                )
              }
            }
          )}
        </div>
      </Col>
    </>
  )
}

export default MainImg
