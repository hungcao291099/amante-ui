
const TabButtonsSection = ({productView, formatNumber}) => {



  const moveTab = (e, tabName) => {
    const tabBtn = $('.tab_btn button')
    const el = e.currentTarget
   
    if (!el.matches('.active')) {
      tabBtn.removeClass('active')
      el.classList.add('active')
    }

    const ofs = $("#" + tabName).offset();
		$('html, body').scrollTop(ofs.top - 130);
  }


  
  return (
    <ul className="tab_btn">
      <li>
        <button
          type="button"
          className="active"
          onClick={(e) =>  moveTab(e, 'tab_detail')}
        >
          <span>상품상세</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={(e) =>  moveTab(e, 'tab_info')}>
          <span>구매안내</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={(e) =>  moveTab(e, 'tab_review')}>
          <span>
            리뷰{" "}
            <span id="review_cnt">
              {formatNumber(productView.review_cnt)}
            </span>
          </span>
        </button>
      </li>
      <li>
        <button type="button" onClick={(e) =>  moveTab(e, 'tab_qna')}>
          <span>문의</span>
        </button>
      </li>
      {productView.productDetail?.product_component_yn === 'Y' && (
        <li>
          <button type="button" onClick={(e) =>  moveTab(e, 'tab_guide')}>
            <span>구매가이드</span>
          </button>
        </li>
      )}
    </ul>
  )
}

export default TabButtonsSection