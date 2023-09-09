
const TopInfo = () => {
  return (
    <div className="top_info">
      <div className="box box_01">
        <p className="txt">
          <strong>고객센터 1588-2933</strong>
          평일 10시~17시 | 점심시간 12시~13시
          <br />
          주말, 공휴일 휴무
        </p>
        <p className="txt">
          <strong>카카오톡 문의</strong>
          평일 10시~17시 | 점심시간 12시~13시
          <br />
          주말, 공휴일 휴무
        </p>
        <button
          type="button"
          className="btn_cs kakao_btn"
          onClick={() => window.open('http://pf.kakao.com/_mEdPxd/chat')}
        >
          <span>카카오톡 문의</span>
        </button>
        <button
          type="button"
          className="btn_cs talk_btn"
          onClick={() => window.open('https://talk.naver.com/WC376H')}
        >
          <span>네이버 톡톡 문의</span>
        </button>
      </div>
      <div className="box box_02">
        <p className="txt">
          <strong>계좌 정보</strong>
          농협 245-01-001182 / 예금주 (주)평안
        </p>
        <p className="txt">
          <strong>배송 정보</strong>
          택배사 : 한진택배
          <br />
          반품주소지 : 대구광역시 달서구 성서로 71
          <br />
          <br />
          평일 낮 12시 이전 주문은 당일 출고를 하고 있습니다. (주말,
          공휴일 제외)
          <br />
          제주도&amp;도서산간은 고객 부담으로 추가 배송비가 부과되며,
          주문 시 개별 안내를 드립니다.
          <br />
          7만원 이상 배송비는 무료, 7만원 미만은 3,500원의 택배비가
          부과됩니다.
          <br />
          반품, 교환은 제품 수령 후 세탁, 사용 전 7일 이내에 가능하며,
          취소, 교환, 반품 문의는 게시판이나, 1588-2933을 통해 연락을
          주십시오.
        </p>
      </div>
    </div>
  )
}

export default TopInfo