import styles from "./Coupon_Detail.module.css"

const Coupon_Detail =()=>{
const data = undefined
if(data){
    return(
        <div className={styles.wrap}>
        <div className={styles.container}>
            <div className={styles.item}>
                <img src=""alt="" />
                <div className={styles.item_info}>
                    <p><b></b></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
)
}
else{
    return(
        <div className={styles.wrap}>
            <img src="/asset/images/shop/mypage/coupon_empty.png" alt="" />
            <p>보유 중인 쿠폰이 없습니다.</p>
        </div>
    )
}

}
export default Coupon_Detail