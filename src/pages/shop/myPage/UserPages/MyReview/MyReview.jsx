import styles from "./MyReview.module.css" 
import { AiOutlineDown } from "react-icons/ai";
const MyReview =() =>{
    return(
        <div className={styles.wrap}>
            <div className={styles.container}>

            </div>
            <div className={styles.more_btn}>
                <p>더 보기</p>
                <AiOutlineDown/>
            </div>
        </div>
    )
}
export default MyReview