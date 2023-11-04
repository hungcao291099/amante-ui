import Cookies from "universal-cookie"
import React, { useCallback, useEffect, useRef, useState } from "react";
import api from "@utils/api/api";
import styles from "./UserInfo.module.css"
import { event } from "jquery";
const UserInfo =({userData}) =>{
    const cookies = new Cookies()
    const token = cookies.get("member_access_token")
    const user_info = JSON.parse(window.localStorage.userdata)
    
    return(
        <div className={styles.wrap}>
          <div className={styles.container}>
            <div className={styles.info}>
              <div className={styles.text}>이름</div>
              <div className={styles.data}>{userData?.user_nm}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.text}>이메일</div>
              <div className={styles.data}>{userData?.email}</div>             
            </div>
            <div className={styles.info}>
              <div className={styles.text}>휴대폰 번호</div>
              <div className={styles.data}> {userData?.phone}</div>  
            </div>
            <div className={styles.info}>
              <div className={styles.text}>생년월일</div>
              <div className={styles.data}>{userData?.birthday}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.text}>Gender</div>
              <div className={styles.data}>
               {userData?.gender}
              </div>
            </div>
            <div className={styles.info}>

            </div>
          </div>
        </div>
    )
}
export default UserInfo