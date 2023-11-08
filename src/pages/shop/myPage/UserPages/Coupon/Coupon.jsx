import { useEffect, useState } from "react";
import styles from "./Coupon.module.css";
import { Tab } from "bootstrap";
import Coupon_Detail from "./Coupon_Detail";
import Coupon_Register from "./Coupon_Register";
const Coupon =() =>{
    const [MenuTabs,setTabs] = useState(1)
    const RenderComponent =(tab)=>{
        if(tab==1){
            return <Coupon_Detail/>
        }
        else{
            return <Coupon_Register/>
        }
    }
    useEffect(()=>{
            $(document).ready(function(){
                $("#tab_1,#tab_2").css("background-color","transparent")
                $("#tab_1,#tab_2").css("border-bottom","2px solid transparent")
                $(`#tab_${MenuTabs}`).css("background-color","#d7e4e2")
                $(`#tab_${MenuTabs}`).css("border-bottom","2px solid #0D685B")
            })
            
        
    },[MenuTabs])
   
    return(
        <div className={styles.wrap}>
            <div className={styles.menu_tab}>
                <div className={styles.tab_detail} id="tab_1" onClick={()=>setTabs(1)} >
                    <label htmlFor="tab_detail">쿠폰내역</label>
                </div>
                <div className={styles.tab_register} id="tab_2"onClick={()=>setTabs(2)}>
                    <label htmlFor="tab_detail">쿠폰등록</label>
                </div>
            </div>
            <div className={styles.content}>
                {RenderComponent(MenuTabs)}
            </div>
        </div>
    )
}
export default Coupon