import Cookies from "universal-cookie"
import React, { useCallback, useEffect, useRef, useState } from "react";
import api from "@utils/api/api";
import styles from "./UpdateInfo.module.css"
import { event } from "jquery";
const UpdateInfo =({userData}) =>{
    var email = userData?.email?.split("@")[0]
    
     useEffect(()=>{
      if($("#r1").val()===userData?.gender){$("#r1").attr("checked",true)}
      if($("#r2").val()===userData?.gender){$("#r2").attr("checked",true)}
      if($("#r3").val()===userData?.gender){$("#r3").attr("checked",true)}
     },[userData])
      
      const date = userData?.birthday?.split("-")
    return(
        <div className={styles.wrap}>
          <div className={styles.container}>
            <div className={styles.info}>
              <div className={styles.text}>이름</div>
              <div className={styles.data}><input type="text" placeholder={userData?.user_nm}/></div>
            </div>
            <div className={styles.info}>
              <div className={styles.text}>이메일</div>
              <div className={styles.data}>
                <div className={styles.data_email}>
                <input type="text" placeholder={email}/>
                <p>@</p>
                <input type="text" placeholder="gmail.com" />
                <select name="" id="">
                  <option value="">직접입력</option>
                  <option value="1">naver.com</option>
                  <option value="2">gmail.com</option>
                  <option value="3">daum.net</option>
                  <option value="4">nate.com</option>
                </select>
                </div>
                </div>
            </div>
            <div className={styles.info}>
              <div className={styles.text}>휴대폰 번호</div>
              <div className={styles.data}>
                  <div className={styles.data_phone}>
                    <input type="text" placeholder={userData?.phone}/>
                    <input type="button" value="인증" />
                    <input type="text" />
                    <input type="button" value="확인" />
                    <p>휴대폰 번호 변경시 재인증이 필요합니다.</p>
                  </div>
                </div>  
            </div>
            <div className={styles.info}>
              <div className={styles.text}>생년월일</div>
              <div className={styles.data}>
                <input type="number" placeholder={date?date[0]:"YYYY"} max={2020} min={1900}/>
                <input type="number" placeholder={date?date[1]:"MM"} max={12} min={1}/>
                <input type="number" placeholder={date?date[2]:"DD"} max={31} min={1}/>
             
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.text}>Gender</div>
              <div className={styles.data}>
                <div className={styles.radio_container}>
                <input type="radio" value="M" id="r1" name="gender"  />
                <label htmlFor="r1">남성</label>
                </div>
                <div className={styles.radio_container}>
                <input type="radio" value="F" id="r2" name="gender"  />
                <label htmlFor="r2">여성</label>
                </div>
                <div className={styles.radio_container}>
                <input type="radio" value="" id="r3" name="gender" />
                <label htmlFor="r3">다른</label>
                </div>
              </div>
            </div>
            <div className={styles.info}>

            </div>
          <div className={styles.btn_container}>
            <input className={styles.btn_submit} type="button" value="Submit" />
            <input className={styles.btn_clear}type="button" value="Clear" />
          </div>
          </div>
        </div>
    )
}
export default UpdateInfo