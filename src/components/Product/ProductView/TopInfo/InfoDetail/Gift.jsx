import React from 'react'

const Gift = ({productView}) => {
  return (
    <div className="gift_ntc">
      <button
        type="button"
        className="ico_gift"
        onClick={() => commonUI.layer.open('.gift_layer', { bg : true, alert : true })}
      >
        <span>선물하기 안내보기</span>
      </button>
      <div className="restock_area pc_hidden">
        {productView.alram_list?.length > 0 && (
          <button
            type="button"
            className="btn_txt"
            onClick={() => commonUI.layer.open('.restock_layer', {bg: true, alert: true})}
          >
            <span>재입고알리미 신청</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Gift