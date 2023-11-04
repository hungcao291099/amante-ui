import styles from "./ChangePw.module.css"
const ChangePw =() =>{
    return(
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.block1}>
                    <p>기존 비밀번호</p>
                    <input type="text" name="" id="" placeholder="기존 비밀번호" />
                </div>
                <div className={styles.block1}>
                    <p>신규 비밀번호</p>
                    <input type="text" name="" id="" placeholder="신규 비밀번호" />
                </div>
                <div className={styles.block1}>
                    <p>비밀번호 확인</p>
                    <input type="text" name="" id="" placeholder="비밀번호 확인" />
                </div>
                
                <div className={styles.btn_container}>
                    <input className={styles.btn_submit} type="button" value="취소" />
                    <input className={styles.btn_clear} type="button" value="저장" />
                </div>
               
            </div>
        </div>
    )
}
export default ChangePw