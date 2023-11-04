import styles from "./FavoriteProduct.module.css"

const FavoriteProduct =() =>{
    return(
        <div className={styles.wrap}>
            <img src="/asset/images/shop/mypage/wish_empty.png" alt="" />
            <p>찜한 상품이 없습니다.</p>
            <input type="button" value="상품 찜하러 가기" />
        </div>
    )
}
export default FavoriteProduct