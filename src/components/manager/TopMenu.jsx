import styles from "@styles/ConceptRoomMenu.module.css";
import Cookies from "universal-cookie"
import {useNavigate} from "react-router-dom";

export default () => {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const userdata = JSON.parse(window.localStorage.getItem("admin_info"))

    const handleLogout = () => {
        cookies.remove("manager_acs_tk", {path: "/"})
        navigate("/manager/login")
    }



    return (
        <div className="fixed-top">
            <div className={styles.navbar}>
                <div className="h-100 align-items-center d-flex gap-5">
                    <div>
                        <img src="/images/header_logo.png"/>
                    </div>
                    <div className="d-flex gap-5">
                        <span style={{fontSize: "12px"}}>오늘주문 0건</span>
                        <span style={{fontSize: "12px"}}>오늘매출액 0원</span>
                        <span style={{fontSize: "12px"}}>오늘가입회원 0명</span>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-5">
                    <div className="d-flex align-items-center gap-4">
                        <div className="d-flex align-items-center gap-2">
                            <img src="/images/ico_name.png"/>
                            <span style={{fontSize: "12px"}}>{userdata && userdata.login_nm}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <img src="/images/ico_time.png"/>
                            <span style={{fontSize: "12px"}}>접속시간 {userdata && userdata.login_sdate}</span>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        {/* <button className={styles.btn}>비밀번호변경</button> */}
                        <button onClick={handleLogout} className={styles.btn}>로그아웃</button>
                    </div>
                </div>
            </div>
            <div className={styles.menu}>
                {/*<ul className={styles.top__menu_ul}>*/}
                {/*    {topMenu && topMenu.map(el => (*/}
                {/*        <li className="h-100" key={el.menu_cd1}>*/}
                {/*            <Link to={"#"}>*/}
                {/*                {el.menu_nm1}*/}
                {/*            </Link>*/}
                {/*        </li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
            </div>
        </div>
    )
}