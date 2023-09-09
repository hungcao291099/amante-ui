import Share from './Share'
import Tag from './Tag'

const TagAndShare = ({productView, baseUrl, codes}) => {
  return (
    <div className="top_info_area">
      <Tag productView={productView} codes={codes}/>

      <Share productView={productView} baseUrl={baseUrl}/>
    </div>
  )
}

export default TagAndShare