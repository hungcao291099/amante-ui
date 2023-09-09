import { shareSns } from "@utils/functions";

const Share = ({productView, baseUrl}) => {

    return (
    <div className="share_area">
      <button type="button" className="open">
        공유하기 레이어 열기
      </button>
      <div className="share_layer">
        <button
          type="button"
          className="facebook"
          onClick={() => shareSns("F", `${baseUrl}/uploads/product/${productView?.file[1]?.file_nm}`, productView.product_nm)}
        >
          페이스북으로 공유하기
        </button>
        <button
          type="button"
          className="kakao"
          onClick={() => shareSns("K", `${baseUrl}/uploads/product/${productView?.file[1]?.file_nm}`, productView.product_nm)}
        >
          카카오톡으로 공유하기
        </button>
        <button
          type="button"
          className="story"
          onClick={() => shareSns("S", `${baseUrl}/uploads/product/${productView?.file[1]?.file_nm}`, productView.product_nm)}
        >
          카카오스토리로 공유하기
        </button>
        <button
          type="button"
          className="line"
          onClick={() => shareSns("L", `${baseUrl}/uploads/product/${productView?.file[1]?.file_nm}`, productView.product_nm)}
        >
          라인으로 공유하기
        </button>
        <button
          type="button"
          className="band"
          onClick={() => shareSns("B", `${baseUrl}/uploads/product/${productView?.file[1]?.file_nm}`, productView.product_nm)}
        >
          밴드로 공유하기
        </button>
        <button
          type="button"
          className="url"
          onClick={() => shareSns("U", `${baseUrl}/uploads/product/${productView?.file[1]?.file_nm}`, productView.product_nm)}
        >
          URL로 공유하기
        </button>
        <button type="button" className="close">
          공유하기 레이어 닫기
        </button>
      </div>
  </div>
  )
}

export default Share