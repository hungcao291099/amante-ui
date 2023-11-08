import { useEffect, useState } from "react"
import styles from "./AddressRecently.module.css"
import { MdDeleteForever } from "react-icons/md";
const AddressRecently =() =>{
    
    return(
        <div className={styles.wrap}>
            
            <div className={styles.top_bar}>
                <div className={styles.select}>
                    <input type="checkbox" name="" id="" />
                    <p>전체선택</p>
                </div>
                <input className={styles.delete} type="button" value="선택삭제" />
              
            </div>
            <div className={styles.content}>
                <div className={styles.items}>
                    <div className={styles.select}><input type="checkbox" name="" id="" /></div>
                    <div className={styles.item}>
                        <p>(01849) 서울 노원구 공릉로 95 (공릉동) 465435123</p>
                        <p>010-4238-6454 / 010-4238-6454</p>
                        <p>문앞에 놔주세요</p>
                    </div>
                    <input type="button" value="배송지추가" />
                    <div className={styles.btn_del}>{<MdDeleteForever/>}</div>
                </div>
                <div className={styles.items}>
                    <div className={styles.select}><input type="checkbox" name="" id="" /></div>
                    <div className={styles.item}>
                        <p>(01849) 서울 노원구 공릉로 95 (공릉동) 465435123</p>
                        <p>010-4238-6454 / 010-4238-6454</p>
                        <p>문앞에 놔주세요</p>
                    </div>
                    <input type="button" value="배송지추가" />
                    <div className={styles.btn_del}>{<MdDeleteForever/>}</div>
                </div>
                <div className={styles.items}>
                    <div className={styles.select}><input type="checkbox" name="" id="" /></div>
                    <div className={styles.item}>
                        <p>(01849) 서울 노원구 공릉로 95 (공릉동) 465435123</p>
                        <p>010-4238-6454 / 010-4238-6454</p>
                        <p>문앞에 놔주세요</p>
                    </div>
                    <input type="button" value="배송지추가" />
                    <div className={styles.btn_del}>{<MdDeleteForever/>}</div>
                </div>
                <div className={styles.items}>
                    <div className={styles.select}><input type="checkbox" name="" id="" /></div>
                    <div className={styles.item}>
                        <p>(01849) 서울 노원구 공릉로 95 (공릉동) 465435123</p>
                        <p>010-4238-6454 / 010-4238-6454</p>
                        <p>문앞에 놔주세요</p>
                    </div>
                    <input type="button" value="배송지추가" />
                    <div className={styles.btn_del}>{<MdDeleteForever/>}</div>
                </div>
                <div className={styles.items}>
                    <div className={styles.select}><input type="checkbox" name="" id="" /></div>
                    <div className={styles.item}>
                        <p>(01849) 서울 노원구 공릉로 95 (공릉동) 465435123</p>
                        <p>010-4238-6454 / 010-4238-6454</p>
                        <p>문앞에 놔주세요</p>
                    </div>
                    <input type="button" value="배송지추가" />
                    <div className={styles.btn_del}>{<MdDeleteForever/>}</div>
                </div>
                <div className={styles.items}>
                    <div className={styles.select}><input type="checkbox" name="" id="" /></div>
                    <div className={styles.item}>
                        <p>(01849) 서울 노원구 공릉로 95 (공릉동) 465435123</p>
                        <p>010-4238-6454 / 010-4238-6454</p>
                        <p>문앞에 놔주세요</p>
                    </div>
                    <input type="button" value="배송지추가" />
                    <div className={styles.btn_del}>{<MdDeleteForever/>}</div>
                </div>
            </div>
        </div>
    )
}
export default AddressRecently