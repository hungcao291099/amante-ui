import DetailBanner from "./DetailBanner"
import VideoArea from "./VideoArea"


const TabDetailSection = ({productView, baseUrl, navigate, like_con, del_like, parse}) => {
  return (
    <div className="tab_con prd_detail" id="tab_detail">
      <div className="con_box">
        <DetailBanner productView={productView} baseUrl={baseUrl}/>

        <VideoArea productView={productView} baseUrl={baseUrl}/>

        {productView.productDetail?.content && (
          parse(productView?.productDetail?.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>'))
        )}
      </div>
    </div>
  )
}

export default TabDetailSection