import styles from "./Coupon_Register.module.css"
const Coupon_Register =()=>{
    return(
        <div className={styles.wrap}>
            <div className={styles.container}>
                <input type="text" name="" id="" placeholder="쿠폰번호를 입력해주세요" />
                <input type="button" value="쿠폰등록" />
            </div>
        </div>
    )
}
export default Coupon_Register
