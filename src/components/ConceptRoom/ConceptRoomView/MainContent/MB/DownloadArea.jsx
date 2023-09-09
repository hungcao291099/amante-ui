import { Container } from 'react-bootstrap';
import { BsBookmark } from 'react-icons/bs'

const DownloadArea = ({ ImSpinner9, isLoading, downloadScreenshot }) => {
  return (
    <Container>
      <div className="w-100 d-flex justify-content-end">
        <div className="save-btn-mobile" onClick={downloadScreenshot}>
          {isLoading ? (
            <ImSpinner9 className="loader" />
          ) : (
            <BsBookmark className="save-btn-icon-mobile" />
          )}
          <span>이미지 저장하기</span>
        </div>
      </div>
    </Container>
  );
};

export default DownloadArea;
