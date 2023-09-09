import { Col, Row } from 'react-bootstrap';
import { BsBookmark } from 'react-icons/bs';
import { formatNumber } from '@utils/functions'

const Download = ({ ImSpinner9, isLoading, downloadScreenshot, downCount }) => {
  return (
    <Row className="save-img">
      <Col xxl={9}></Col>
      <Col className="wrap-save d-flex align-items-center justify-content-end" xxl={3}>
        <div className="save-count d-flex align-items-center">
          <BsBookmark className="save-icon" />
          <span>{downCount ? formatNumber(downCount) : 0}</span>
        </div>
        <button
          className="d-flex align-items-center justify-content-center"
          onClick={downloadScreenshot}
        >
          {isLoading ? <ImSpinner9 className="loader" /> : <span>이미지 저장하기</span>}
        </button>
      </Col>
    </Row>
  );
};

export default Download;
