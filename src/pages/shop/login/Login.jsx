import { useState, useEffect } from "react"
import { loginPost, verifyToken } from "@apis/loginApi"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

export default () => {
    const [input, setInput] = useState({ user_id: "", passwd: "", save_yn: "N", auto_login: "N" })
    const cookies = new Cookies()
    const navigate = useNavigate()

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const tokenSocial = params.get('token');
    const user_id_sns = params.get('user_id');
    
    if(tokenSocial){
        debugger
        const ONE_DAY = 84600;
        const ONE_YEAR = ONE_DAY * 365;
        let  auto_login ="Y";
        let  save_yn ="Y";

        // const { token, ...rest } = result.data
        cookies.set("member_access_token", tokenSocial, { path: "/", sameSite: "strict", maxAge: auto_login == "Y" ? ONE_YEAR : ONE_DAY })
        window.localStorage.setItem("auto_login", auto_login)
        window.localStorage.setItem("save_id", save_yn)
        // window.localStorage.setItem("userdata", JSON.stringify(rest))
        if (save_yn == "Y") {
            window.localStorage.setItem("user_id", user_id_sns)
        } else {
            window.localStorage.removeItem("user_id")
        }
        alert("로그인에 성공했습니다.")
        navigate(-1)
       
    }

    const verify = async () => {
        const token = cookies.get("member_access_token")
        const auto_login = window.localStorage.getItem("auto_login") || "N"
        if (token) {
            const result = await verifyToken(token, auto_login)
            if (result?.success) {
                if (result?.expires) {
                    cookies.set("member_access_token", result.token, { path: "/", sameSite: "strict", maxAge: 84600 })
                }
                navigate("/shop/main")
            }
        }
    }

    useEffect(() => {
        verify()
        const save = window.localStorage.getItem("save_id")
        if (save == "Y") {
            setInput(
                {
                    ...input,
                    save_yn: save,
                    user_id: window.localStorage.getItem("user_id") || ""
                })
        }
    }, [])

   
    const handleSubmit = async () => {
        const result = await loginPost(input.user_id, input.passwd, "W")
        const ONE_DAY = 84600;
        const ONE_YEAR = ONE_DAY * 365;

        if (result.success) {
            const { token, ...rest } = result.data
            cookies.set("member_access_token", token, { path: "/", sameSite: "strict", maxAge: input.auto_login == "Y" ? ONE_YEAR : ONE_DAY })
            window.localStorage.setItem("auto_login", input.auto_login)
            window.localStorage.setItem("save_id", input.save_yn)
            window.localStorage.setItem("userdata", JSON.stringify(rest))
            console.log(result,cookies);
            if (input.save_yn == "Y") {
                window.localStorage.setItem("user_id", rest.user_id)
            } else {
                window.localStorage.removeItem("user_id")
            }
            alert("로그인에 성공했습니다.")
            navigate(-1)
        } else {
            alert(result.message)
        }
        
    }

    const handlePress = async (e) => {
        if (e.keyCode == 13) {
            handleSubmit()
        }
    }

    const handleLogin = (mode) => {
        const path = "/"
        const maxAge = 84600

        if (mode == "N") {
            cookies.set('join_gb', 'N', { path, maxAge });
            cookies.set('sns_redirect', '/shop' + '/member/join/join', { path, maxAge });
            cookies.set('prev_url', '', { path, maxAge });
            window.location.href = "http://api.amante.com:3010/v1.0/member/login/naver"
        }

        if (mode == "K") {
            cookies.set('join_gb', 'K', { path, maxAge });
            cookies.set('sns_redirect', '/shop' + '/member/join/join', { path, maxAge });
            cookies.set('prev_url', '', { path, maxAge });
            window.location.href = `http://api.amante.com:3010/v1.0/member/login/kakao`
        }
    }

    return (
        <div className="content login_page">
            <div className="inner">
                <h2 className="login_logo">
                    <Link to={"/shop/main/main"}>
                        <picture>
                            <source srcSet="/asset/images/shop/default/pc_amante_logo.png" media="(min-width:768px)" />
                            <source srcSet="/asset/images/shop/default/mb_amante_logo.png" media="(max-width:767px)" />
                            <img src="/asset/images/shop/default/pc_amante_logo.png" alt="" />
                        </picture>
                    </Link>
                </h2>
                <div className="social_area_kakao">
                    <div className="tit-area">
                        <h3>회원가입</h3>
                        <p>아이디, 비밀번호, 이름, 휴대번호 입력하기 귀찮으시죠?<br />카카오로 1초 만에 회원가입 하세요.</p>
                        <button type="button" onClick={() => handleLogin("K")} className="btn_txt kakao"><span>카카오로 1초 로그인/회원가입</span></button>
                    </div>
                    <div className="join_benefit">
                        <ul>
                            <li>
                                <div className="img">
                                    <img src="/asset/images/shop/member/회원가입_로그인_이미지_03.png" alt="" />
                                </div>
                                <span>신규 회원 가입<b>10%, 15% 쿠폰</b></span>
                            </li>
                            <li>
                                <div className="img">
                                    <img src="/asset/images/shop/member/회원가입_로그인_이미지_05.png" alt="" />
                                </div>
                                <span>리뷰 작성 500원<b>30,000원 적립금</b></span>
                            </li>
                            <li>
                                <div className="img">
                                    <img src="/asset/images/shop/member/회원가입_로그인_이미지_07.png" alt="" />
                                </div>
                                <span>신규회원<b>무료배송 쿠폰</b></span>
                            </li>
                            <li>
                                <div className="img">
                                    <img src="/asset/images/shop/member/회원가입_로그인_이미지_12.png" alt="" />
                                </div>
                                <span>웨딩 & 이사 등록<b>쿠폰 15%</b></span>
                            </li>
                            <li>
                                <div className="img">
                                    <img src="/asset/images/shop/member/회원가입_로그인_이미지_13.png" alt="" />
                                </div>
                                <span>구매 적립금<b>1%</b></span>
                            </li>
                            <li>
                                <div className="img">
                                    <img src="/asset/images/shop/member/회원가입_로그인_이미지_14.png" alt="" />
                                </div>
                                <span>카카오 플친 추가<b>2,000원 쿠폰</b></span>
                            </li>
                        </ul>
                        <button type="button" onClick={() => handleLogin("K")} className="benefit_tit" >카카오 1초 회원가입하면<span>추가 할인 쿠폰까지 카톡으로 드려요!</span></button>
                    </div>
                    <div className="line-text"><span>또는</span></div>
                </div>
                <div className="js_tab">
                    <ul className="js_tabBtn">
                        <li className="on"><button type="button">기존회원</button></li>
                        <li><button type="button">비회원 주문조회</button></li>
                    </ul>
                    <div className="js_tabCon on">
                        <form onKeyDown={handlePress} action="">
                            <fieldset>
                                <input
                                    type="text"
                                    id="user_id_01"
                                    name="user_id"
                                    placeholder="아이디"
                                    autoComplete="off"
                                    onChange={(e) => setInput({ ...input, user_id: e.target.value })}
                                    value={input.user_id} />

                                <input
                                    type="password"
                                    id="user_pw"
                                    name="user_pw"
                                    placeholder="비밀번호"
                                    autoComplete="off"
                                    onChange={(e) => setInput({ ...input, passwd: e.target.value })}
                                    value={input.passwd} />

                                <p className="msg" style={{ display: "none" }}>아이디를 입력해주세요. / 비밀번호를 입력해주세요.</p>
                                <div className="chk_area">
                                    <div className="design_checkbox">
                                        <input onChange={
                                            (e) => {
                                                if (e.target.checked) {
                                                    setInput({ ...input, save_yn: e.target.value })
                                                } else {
                                                    setInput({ ...input, save_yn: "N" })
                                                }
                                            }
                                        } type="checkbox" id="id_save" checked={input.save_yn == "Y"} name="id_save" value="Y" />
                                        <label htmlFor="id_save">아이디저장</label>
                                    </div>
                                    <div className="design_checkbox">
                                        <input onChange={
                                            (e) => {
                                                if (e.target.checked) {
                                                    setInput({ ...input, auto_login: e.target.value })
                                                } else {
                                                    setInput({ ...input, auto_login: "N" })
                                                }
                                            }
                                        } type="checkbox" id="auto_login" name="auto_login" value="Y" />
                                        <label htmlFor="auto_login">자동로그인</label>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                        <div className="btn_area row_col">
                            <div className="login_btn_area">
                                <button onClick={handleSubmit} className="btn_txt btn_point">로그인</button>
                            </div>
                            <Link to="/shop/login/find_id" className="btn_txt">ID/PW 찾기</Link>
                            <Link to="/shop/join/join" className="btn_txt btn_dpoint">일반회원가입</Link>
                        </div>
                        <div className="social_area">
                            <div className="btn_area col2">
                                <button type="button" onClick={() => handleLogin("N")} className="btn_txt naver"><span>네이버 로그인</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}