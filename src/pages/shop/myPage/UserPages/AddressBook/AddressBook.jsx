import { useEffect, useState } from "react"
import styles from "./AddressBook.module.css"
import AddressList from "./AddressList"
import AddressNew from "./AddressNew"
import AddressRecently from "./AddressRecently"
const AddressBook =() =>{
    const [menuTab,setMenuTab] = useState(1)

    const handleSetTab = (tabId) => {
        if(tabId==2){$("#new_addr").show()}
        setMenuTab(tabId)
    }
    const handleClose = () =>{
        setMenuTab(1)
        $("#new_addr").hide()
    }
    const RenderComponent =(tab)=>{
        switch (tab) {
            case 1: return <AddressList onSetTab={handleSetTab}/>
            case 2: return <AddressNew onClose={handleClose}/>
            case 3: return <AddressRecently/>
            default:return <AddressList onSetTab={handleSetTab}/>  
        }
    }
 
    
    return(
        <div className={styles.wrap}>
            <div className={styles.container}  >
                <div className={styles.menu_tab}>
                    <div className={menuTab===1?styles.tab_active:styles.tab_1} onClick={()=>setMenuTab(1)}> <p>주소록</p> </div>
                    <div className={menuTab===2 ?styles.tab_active:styles.tab_2} id="new_addr" popup_active="false" onClick={()=>setMenuTab(2)}> <p>배송지 추가</p> </div>
                    <div className={menuTab===3?styles.tab_active:styles.tab_3} onClick={()=>setMenuTab(3)}> <p>최근배송지</p> </div>
                </div>
                <div className={styles.content} style={menuTab===1?{borderTopLeftRadius:0}:null}>
                        {RenderComponent(menuTab)}
                </div>
            </div>
        </div>
    )
}
export default AddressBook