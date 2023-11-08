import styles from "./DepositDetail.module.css"
const DepositDetail =() =>{
    const data = undefined
    const coin = 0
    return(
        <div className={styles.wrap}>
            <div className={styles.info}>
                <div>
                    <h3>총 보유 적립금</h3>
                    <p>적립금 0원 이상부터 사용하실 수 있습니다.</p>
                </div>
                <div>
                    <h3><span>{coin}</span> 원</h3>
                </div>
            </div>
            <div className={styles.history_container}>
                {data
                ?   <div className={styles.content}></div> 
                :   <div className={styles.content}>
                    <p>적립금 내역이 없습니다.</p>
                    </div>}
            </div>
        </div>
    )
}
export default DepositDetail