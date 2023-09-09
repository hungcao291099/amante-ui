import AdditionProduct from "./AdditionProduct"
import BoxNoOption from "./BoxNoOption"
import OptionC from "./OptionC"
import OptionI from "./OptionI"
import OptionS from "./OptionS"


const InfoArea = ({productView, baseUrl, formatNumber, navigate, api}) => {
  return (
    <div className="info_area">
      <div className="tit_area">
        <p className="tit">상품 구성</p>
      </div>
      
      {productView.write_use_yn === "Y" && (
        <div className="txt_opt">
          <input type="text" id="w_opt_text" />
          <label htmlFor="w_opt_text" className="tit">
            {productView.write_title}
          </label>
        </div>
      )}

      {/* OPT C */}
      <OptionC productView={productView} api={api}/>

      {/* OPT S */}
      <OptionS productView={productView}/>

      {/* OPT I */}
      <OptionI productView={productView}/>

      {/* product ADDITION list */}
      <AdditionProduct productView={productView} baseUrl={baseUrl} formatNumber={formatNumber} navigate={navigate}/>

      {/* box for NO OPTION */}
      <BoxNoOption productView={productView} formatNumber={formatNumber}/>

      <div className="total_price">
        총 상품 금액 <span>0원</span>
      </div>

      <div className="close_btn tit_area">
        <button type="button" className="close">
          닫기
        </button>
      </div>

    </div>
  )
}

export default InfoArea