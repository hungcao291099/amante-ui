import { Link, Route, Routes } from "react-router-dom";
import styles from "./MyPage.module.css";
import api from "@utils/api/api";
import { BiLogOut } from "react-icons/bi";
import Cookies from "universal-cookie"
import { useState } from "react";
import ChangePw from "./UserPages/ChangePw/ChangePw"
import UpdateUSerInfo from "./UserPages/UpdateInfo/UpdateInfo"
import Proposal from "./UserPages/MyPost/MyPost";
import MyReview from "./UserPages/MyReview/MyReview";
import AddressBook from "./UserPages/AddressBook/AddressBook";
import Order from "./UserPages/Order";
import OrderHistory from "./UserPages/OrderHistory/OrderHistory";
import DepositDetail from "./UserPages/DepositDetail/DepositDetail";
import Coupon from "./UserPages/Coupon/Coupon";
import FavoriteProduct from "./UserPages/FavoriteProduct/FavoriteProduct";
import RecentViewProduct from "./UserPages/RecentViewProduct";
import { useEffect } from "react";
import UserInfo from "./UserPages/UserInfo/UserInfo";
const MyPage = () => {
    const [Pages, setPages] = useState(0)
    const cookies = new Cookies()
    const token = cookies.get("member_access_token")
    const [userData,setUserData] = useState()
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await api({
              url: `/member/info`,
              method: "GET",
              headers: { 'Authorization': `Bearer ${token}`}
            });
            setUserData(data.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
        console.log(userData);
      }, []);
    useEffect(()=>{
        $(".mypage li").css("background-color", "white")
        $(".mypage li").css("border-left", "2px solid transparent")
        $(`.p${Pages}`).css("background-color", "#d7e4e2")
        $(`.p${Pages}`).css("border-left", "2px solid #0D685B")
    },[Pages])
    const handleLogout = (e) => {
        // alert("로그아웃되었습니다.");
        // const token = cookies.get("member_access_token");
        // if (
        //     token &&
        //     token !== "" &&
        //     token !== null &&
        //     token !== undefined &&
        //     token !== "undefined"
        // ) {
        //     cookies.set("member_access_token", "", {
        //         maxAge: 0,
        //         path: "/",
        //         sameSite: "strict",
        //     });
        //     window.localStorage.removeItem("auto_login");
        //     window.localStorage.removeItem("save_id");
        //     window.localStorage.removeItem("userdata");
        //     setIsLogin(false);
        // }
    };

    const RenderComponent = () => {
        if(userData){
            switch (Pages) {
                case 0: return <UserInfo userData={userData}/>
                case 1: return <UpdateUSerInfo userData={userData}/>
                case 2: return <ChangePw />
                case 3: return <Proposal />
                case 4: return <MyReview />
                case 5: return <AddressBook />
                case 6: return <Order />
                case 7: return <OrderHistory />
                case 8: return <DepositDetail />
                case 9: return <Coupon />
                case 10: return <FavoriteProduct />
                case 11: return <RecentViewProduct />
    
                default: return <UserInfo userData={userData}/>
            }
        }
       
    }

    return (
        <div className={`${styles.wrap} mypage`}>
            <div className={styles.left_wrap}>
                <div className={styles.user_info}>
                    <div className={styles.avatar}></div>
                    <div className={styles.info}>
                        <h3>{userData?.user_nm}</h3>
                        <h4>{userData?.email}</h4>
                        <div className={styles.member}>
                            <div className={styles.member_grp}>
                                <h4>고객등급</h4>
                                <h3>{userData?.member_grp_nm}</h3>
                            </div>
                            <div className={styles.member_coin}>
                                <h4>적립금</h4>
                                <h3>0원</h3>
                            </div>
                            <div className={styles.member_voucher}>
                                <h4>쿠폰</h4>
                                <h3>16개</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.user_props}>
                    <ul>
                        <li className={"p0"} onClick={() => { setPages(0) }}>
                            <h3>User Info</h3>
                        </li>
                        <li className={"p1"} onClick={() => { setPages(1) }}>
                            <h3>회원정보수정</h3>
                        </li>
                        <li className={"p2"} onClick={() => { setPages(2) }}>
                            <h3>비밀번호 변경</h3>
                        </li>
                        <li className={"p3"} onClick={() => { setPages(3) }}>
                            <h3>내게시물</h3>
                        </li>
                        <li className={"p4"} onClick={() => { setPages(4) }}>
                            <h3>내리뷰</h3>
                        </li>
                        <li className={"p5"} onClick={() => { setPages(5) }}>
                            <h3>주소록관리</h3>
                        </li>
                    </ul>

                </div>
                <div className={styles.cart_props}>
                    <ul>
                        <li className={"p6"} onClick={() => { setPages(6) }}>
                            <h3>주문</h3>
                        </li>
                        <li className={"p7"} onClick={() => { setPages(7) }}>
                            <h3>이전 주문내역</h3>
                        </li >
                        <li className={"p8"} onClick={() => { setPages(8) }}>
                            <h3>적립금 내역</h3>
                        </li>
                        <li className={"p9"} onClick={() => { setPages(9) }}>
                            <h3>쿠폰내역</h3>
                        </li>
                        <li className={"p10"} onClick={() => { setPages(10) }}>
                            <h3>찜한상품</h3>
                        </li>
                        <li className={"p11"} onClick={() => { setPages(11) }}>
                            <h3>최근본상품</h3>
                        </li>

                    </ul>
                </div>
                <div className={styles.logout} onClick={() => { handleLogout() }}>
                    <div ><BiLogOut /></div>
                    <h3>로그아웃</h3>

                </div>
            </div>
            <div className={styles.right_wrap}>
                <h1 className={styles.right_wrap_title}>안녕하세요, <span>{userData?.user_nm} ({userData?.user_id})</span> 님  !</h1>
                {RenderComponent()}
            </div>
        </div>
    )

}
export default MyPage