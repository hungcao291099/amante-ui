import { useEffect, useState } from "react"
import styles from "./AddressNew.module.css"
const AddressNew =({onClose}) =>{
   
    return(
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.title}><label htmlFor="">배송지명</label></div>
                    <div className={styles.field}><input type="text" name="" id="" placeholder="배송지명"/></div>
                </div>
                <div className={styles.container}>
                    <div className={styles.title}><label htmlFor="">받는 사람</label></div>
                    <div className={styles.field}><input type="text" name="" id="" placeholder="받는 사람"/></div>
                </div>
                <div className={styles.container} id={styles.address}>
                    <div className={styles.title}><label htmlFor="">주소</label></div>
                    <div className={styles.field}>
                        <input type="text" name="" id="" placeholder="받는 사람"/>
                        <input type="text" name="" id="" placeholder="받는 사람"/>
                        <input type="text" name="" id="" placeholder="받는 사람"/>
                        <input className={styles.btn_address} type="button" value="주소찾기" />
                    </div>
                </div>
                <div className={styles.container} id={styles.phone}>
                    <div className={styles.title}><label htmlFor="">휴대폰 번호</label></div>
                    <div className={styles.field}>
                        <input type="text" name="" id=""/>
                        <span>-</span>
                        <input type="text" name="" id=""/>
                        <span>-</span>
                        <input type="text" name="" id=""/>
                        </div>
                </div>
                <div className={styles.container} id={styles.contact}>
                    <div className={styles.title}><label htmlFor="">연락처</label></div>
                    <div className={styles.field}>
                        <input type="text" name="" id=""/>
                        <span>-</span>
                        <input type="text" name="" id=""/>
                        <span>-</span>
                        <input type="text" name="" id=""/>
                        </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.title}><label htmlFor="">주문메시지</label></div>
                    <div className={styles.field}><input type="text" name="" id="" placeholder="주문메시지"/></div>
                </div>
                <div className={styles.container}>
                    <div className={styles.title}><label htmlFor="">배송메시지</label></div>
                    <div className={styles.field}>
                        <select name="" id="">
                            <option value="">직접입력</option>
                            <option value="1">배송 전 연락주세요</option>
                            <option value="2">부재시 경비실에 맡겨주세요</option>
                            <option value="3">문 앞에 놓고 가주세요</option>
                        </select>
                        <input type="text" name="" id="" placeholder="추가사항"/>
                    </div>
                </div>
                <div className={styles.checkbox_container}>
                    <input type="checkbox" name="" id="set_default" />
                    <label htmlFor="set_default">기본 배송지로 저장</label>
                </div>
                <div className={styles.btn_container}>
                    <input type="button" value="취소" onClick={()=>onClose()}/>
                    <input type="button" value="저장하기" onClick={()=>onClose()} />
                </div>
            </div>
        </div>
    )
}
export default AddressNew