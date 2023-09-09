import { mainWebImageURL } from "@utils/constants"
import { Link } from "react-router-dom"

const ProductItem = ({data}) => {
  const { product } = data
  return (
    <Link className="product-item" to={`/shop/product/product_view?product_cd=${product.product_cd}`}>
      <img src={`${mainWebImageURL}/product/${product.file_nm}`} alt="" />
    </Link>
  )
}

export default ProductItem