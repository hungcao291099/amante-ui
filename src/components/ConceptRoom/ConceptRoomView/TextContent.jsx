import { Row, Col } from "react-bootstrap"
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai"

import { useConceptRoomContext } from "@contexts/ConceptRoomContext"
import { splitStr, formatNumber } from '@utils/functions'
import { conceptRoomImageURL } from '@utils/constants'

const TextContent = () => {
  const { room } = useConceptRoomContext()

  return (
    <section className="content-text">
      <h1 className="concept-room-name">
        {room.concept_room_nm}
      </h1>

      <Row className="concept-room-info">
        <Col className="info-left d-flex">
          <h4 className="brand">{room.user_nm}</h4>
          <span className="register-date">{splitStr(room.date_created, 10)}</span>
        </Col>
        <Col className="info-right d-flex justify-content-end">
          <div className="like-count d-flex align-items-center">
            <AiOutlineHeart className="icon"/>
            <span>{room.like_cnt ? formatNumber(room.like_cnt) : 0}</span>
          </div>
          <div className="view-count d-flex align-items-center">
            <AiOutlineEye  className="icon"/>
            <span>{room.vw_cnt? formatNumber(room.vw_cnt) : 0}</span>
          </div>
        </Col>
      </Row>

      <Row className="concept-room-style d-flex">
        {/* ----------- STYLE ROOM render ---------------- */}
        {room.styles?.map((style, index) => {
          const details = style.style.split(',')

          return (
          <Col md={6} className="detail-top-left d-flex align-items-center" key={index}>
            <div className="wrap-icon d-flex flex-column">
              <img src={`${conceptRoomImageURL}/${style.file_nm_dis}`} alt="" />
              <span>{style.h_name}</span>
            </div>
            <div className="wrap-line">
              <div className="line"></div>
            </div>
            <div className="tags-row d-flex align-items-center">
              {/* -------------- DETAIL STYLE ROOM render ---------------- */}
              {details?.map((item, index) => (
                <div className="tags d-flex" key={index}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Col>
          )
        })}
      </Row>

      <div className="content-line">
      </div>
    </section>

  )
}

export default TextContent