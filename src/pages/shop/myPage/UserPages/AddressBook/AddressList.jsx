import { useEffect, useState } from "react"
import styles from "./AddressList.module.css"
import { MdDeleteForever } from "react-icons/md";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiTwotoneEdit,AiOutlineArrowRight } from "react-icons/ai";
const AddressList =({onSetTab}) =>{
    const [defaultAddr,setDefaultAddr] = useState(1)
   
    return(
        <div className={styles.wrap}>
            
            <div className={styles.content}>
                <div className={styles.items}>
                    <div className={styles.item}>
                        <p>(01849) 서울 노원구 공릉로 95 (공릉동) 465435123</p>
                        <p>010-4238-6454 / 010-4238-6454</p>
                        <p>문앞에 놔주세요</p>
                    </div>
                    <div className={defaultAddr===1?styles.btn_default_active:styles.btn_default} onClick={()=>setDefaultAddr(1)}>{<BsFillBookmarkHeartFill/>}</div>
                    <div className={styles.btn_edit}>{<AiTwotoneEdit/>}</div>
                    <div className={styles.btn_del}>{<MdDeleteForever/>}</div>
                </div>
                <div className={styles.items}>
                    <div className={styles.item}>
                        <p>(01849) 서울 노원구 공릉로 95 (공릉동) 465435123</p>
                        <p>010-4238-6454 / 010-4238-6454</p>
                        <p>문앞에 놔주세요</p>
                    </div>
                    <div className={defaultAddr===2?styles.btn_default_active:styles.btn_default} onClick={()=>setDefaultAddr(2)}>{<BsFillBookmarkHeartFill/>}</div>
                    <div className={styles.btn_edit}>{<AiTwotoneEdit/>}</div>
                    <div className={styles.btn_del}>{<MdDeleteForever/>}</div>
                </div>
                <div className={styles.items}>
                <div className={styles.btn_container} onClick={()=> onSetTab(2)}>
                    <p>배송지 추가</p>
                    <AiOutlineArrowRight/>
                </div>
                </div>
                
            </div>
        </div>
    )
}
export default AddressList