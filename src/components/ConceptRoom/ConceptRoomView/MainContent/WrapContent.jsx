import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'

import MainImg from '@components/ConceptRoom/ConceptRoomView/MainContent/MainImg'
import Option from '@components/ConceptRoom/ConceptRoomView/MainContent/Option/Option'
import OptionMb from '@components/ConceptRoom/ConceptRoomView/MainContent/Option/OptionMb'
import { useConceptRoomContext } from '@contexts/ConceptRoomContext'
import VideoView from '../VideoView'
import { isValidUrl } from '../../../../utils/functions'

const WrapContent = ({view}) => {
  const {
    room,
    resetChanges,
    activeView,
    activeVideo
  } = useConceptRoomContext()
  const [productInfo, setProductInfo] = useState(view.room_object[0]?.product_detail)
  const [activeProduct, setActiveProduct] = useState({
    id: view.room_object[0]?.id,
    product_cd: view.room_object[0]?.product_cd,
    view: view.view
  })

   /* This `useEffect` hook is setting the `activeProduct` state whenever the `resetChanges` dependency
  changes. It sets the `activeProduct` state to an object containing the `id`, `product_cd`, and
  `view` properties of the first object in the `view.room_object` array. This is likely used to
  reset the active product to the first product in the array whenever the user clicks the "reset"
  button. */
  useEffect(() => {          
    setActiveProduct({
      id: view.room_object[0]?.id,
      product_cd: view.room_object[0]?.product_cd,
      view: view.view
    })
  },[resetChanges])

  return (
    <Row className="main-container" style={{display: view.view === activeView ? "flex" : "none"}}>
      <div className={`content-mb ${view.view === activeView ? "active" : ""}`}>
        {isValidUrl(room.bg_url) && activeVideo ? <VideoView device="-mb"/> : <VideoView display="none" device="-mb"/>}
        {isValidUrl(room.bg_url) && activeVideo ? <MainImg item={{view, setActiveProduct, setProductInfo}} display="none"/> : <MainImg item={{view, setActiveProduct, setProductInfo}}/>}
      </div>
      <div className='content-pc'>
        <MainImg item={{view, setActiveProduct, setProductInfo}}/>
      </div>
      <Option item={{view, activeProduct, setActiveProduct, productInfo, setProductInfo}}/>
      <OptionMb item={{view, activeProduct, setActiveProduct, productInfo, setProductInfo}}/>
    </Row>
  )
}

export default WrapContent