import InfoArea from "./InfoArea/InfoArea";
import OrderButton from "./OrderButton";


const OrderInfo = ({productView, baseUrl, formatNumber, navigate, api, cust_seq, productCheck}) => {
  return (
    <div className="order_info">
      <div className="inner">
        <InfoArea productView={productView} baseUrl={baseUrl} formatNumber={formatNumber} navigate={navigate} api={api}/>

        <OrderButton productView={productView} navigate={navigate} cust_seq={cust_seq} productCheck={productCheck}/>
      </div>
    </div>
  )
}

export default OrderInfo