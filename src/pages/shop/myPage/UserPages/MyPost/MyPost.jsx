import styles from "./MyPost.module.css"
const MyPost =() =>{
    const data = undefined
    return(
        <div className={styles.wrap}>
            <table className={styles.table_mypost}>
                <thead>
                    <th>등록일자</th>
                    <th>제목</th>
                    <th>게시판</th>
                </thead>
                {!data?
                <tr>
                <td colSpan={3}>등록된 정보가 없습니다.</td>
                </tr>:
                <tr>
                <td></td>
                <td></td>
                <td></td>
                </tr>}
                
            </table>
        </div>
    )
}
export default MyPost