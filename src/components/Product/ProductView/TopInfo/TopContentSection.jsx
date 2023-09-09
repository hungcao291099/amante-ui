import ImageArea from './ImageArea'
import InfoDetail from './InfoDetail/InfoDetail'

const TopContentSection = ({productView, baseUrl, codes, formatNumber, cust_seq, navigate, api, token}) => {
  return (
    <div className="prd_info_top">
      {/* LEFT content */}
      <ImageArea productView={productView} baseUrl={baseUrl}/>

      {/* RIGHT content */}
      <InfoDetail productView={productView} baseUrl={baseUrl} codes={codes} formatNumber={formatNumber} cust_seq={cust_seq} navigate={navigate} api={api} token={token}/>      
    </div>
  )
}

export default TopContentSection