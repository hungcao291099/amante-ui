import { useEffect, useState, useRef } from "react"
import Cookies from "universal-cookie"
import { verifyToken } from "@apis/loginApi"
import { getProfileKakao,getProfileNaver } from "@apis/joinApi"
import { useNavigate } from "react-router"
import { checkId, join, checkPhone, checkCode } from "@apis/joinApi"
import { Link } from "react-router-dom"

export default () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const tokenSocial = params.get('token');
    const social = params.get('social');

    const [memberInfo, setMemberInfo] = useState(undefined)
    const [profileInfo, setProfileInfo] = useState(undefined)
    const [profileList, setProfile] = useState(undefined)
    
    
    let sns_nm 
    let sns_phone 
    let sns_email 
    let sns_birth_year 
    let sns_birth 
    let email
    let join_gb = 'W'
    if(profileInfo != undefined){
        if(social == 'K'){
            sns_nm = profileInfo.profile.nickname;
            sns_phone = profileInfo.phone_number;
            sns_email = profileInfo.email;
            sns_birth_year = profileInfo.birthyear;
            sns_birth = profileInfo.birthday;
            join_gb ='K';
        }else{
            sns_nm = profileInfo.response.name;
            sns_phone = profileInfo.response.mobile;
            sns_email = profileInfo.response.email;
            sns_birth_year = profileInfo.response.birthyear;
            sns_birth = profileInfo.response.birthday;
            join_gb ='N';
        }
       

         email = sns_email.split('@');
         
        
        
    }
     
    const [input, setInput] = useState({
        username: "",
        userid: "",
        password: "",
        confirmPass: "",
        phoneNumber: "",
        phoneCode: "",
        emailFirst: "",
        emailSecond: "",
        birthYear: "",
        birthMonth: "",
        birthDay: "",
        gender: "F",
        ageCheck: "",
        lawCheck: "",
        collectCheck: "",
        processCheck: "",
        etcCheck: ""
    })
    const cookies = new Cookies()
    const navigate = useNavigate()
    const lawRef = useRef(null)
    const infoCollectionRef = useRef(null)
    const infoProcessingRef = useRef(null)
    const idMsgRef = useRef(null)
    const pwRef = useRef(null)
    const phoneRef = useRef(null)
    const emailRef = useRef(null)
    const nameRef = useRef(null)
    const dobRef = useRef(null)
    const codeRef = useRef(null)
    const [approvePost, setApprovePost] = useState({ phone: false, code: false, id: false })

    const handleCloseAllLayer = () => {
        layer(lawRef, "close")
        layer(infoCollectionRef, "close")
        layer(infoProcessingRef, "close")
    }

    document.addEventListener("keydown", (e) => {
        if (e.code == "Escape") handleCloseAllLayer()
        return () => {
            document.removeEventListener("keydown", handleCloseAllLayer)
        }
    })

   
   
   

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
        const fetchData = async () => {
            if(tokenSocial && social){
                if(social == "N"){
                    const result =  await getProfileNaver(tokenSocial);
                    setProfile(result);
                    setProfileInfo(result);
                }else{
                    const result =  await getProfileKakao(tokenSocial);
                    setProfile(result);
                    setProfileInfo(result.kakao_account);
                }
                
                
                
            }
        };
    
        fetchData();
      }, []);

    useEffect(() => {
        const memberInfo = JSON.parse(window.localStorage.getItem("userdata"))
        setMemberInfo(memberInfo)
        verify()
        
    }, [])

    useEffect(() => {
        if (input.password != input.confirmPass) { handleMessage(pwRef, "비밀번호 확인이 일치하지 않습니다.") }
        else { handleMessage(pwRef, "") }
    }, [input.confirmPass])

    const layer = (ref, type) => {
        if (type == "open") {
            ref.current.style.display = "block"
            ref.current.classList.add("bg_layer")
            ref.current.classList.add("alert")
        } else {
            ref.current.style.display = "none";
            ref.current.classList.remove("bg_layer")
            ref.current.classList.remove("alert")
        }
    }

    const handleLayer = (layerName, type) => {
        if (layerName == "law") layer(lawRef, type)
        if (layerName == "collect") layer(infoCollectionRef, type)
        if (layerName == "process") layer(infoProcessingRef, type)
    }

    const handleCheckId = async () => {
        const result = await checkId(input.userid)
        if (!result.success) {
            handleMessage(idMsgRef, result.message)
            setInput({ ...input, userid: "" })
        } else {
            setApprovePost({ ...approvePost, id: true })
            alert(result.message)
        }
    }

    const handleCheckPhone = async () => {
        debugger

        let phone = document.getElementById('tel_first').value;
        let user_nm = document.getElementById('user_nm').value;
        const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
        if (!regPhone.test(phone)) {
            handleMessage(phoneRef, "올바른 휴대폰 번호를 입력해주세요.")
            setInput({ ...input, phoneNumber: "" })
        } else {
            const result = await checkPhone({
                phone: phone,
                name:  user_nm,
                mode: "NEW"
            })

            if (result.success) {
                setApprovePost({ ...approvePost, phone: true })
                alert(result.msg)
            } else {
                alert(result.msg)
                setInput({ ...input, phoneNumber: "" })
            }
        }
    }

    const handleCheckVerifyCode = async () => {
        const result = await checkCode({
            phone: input.phoneNumber,
            cert_num: input.phoneCode
        })

        if (result.success) {
            setApprovePost({ ...approvePost, code: true })
            alert(result.msg)
        } else {
            alert(result.msg)
            setInput({ ...input, phoneCode: "" })
        }
    }

    const handleMessage = (ref, message) => {
        ref.current.style.display = "block"
        ref.current.textContent = message
    }

    const handleJoin = async () => {
        debugger
        let username =  document.getElementById('user_nm').value;
        let userid =  document.getElementById('user_id').value;
        let password =  document.getElementById('passwd').value;
        let confirmPass =  document.getElementById('passwdConfirm').value;
        let phoneNumber =  document.getElementById('tel_first').value;
        let phoneCode =  document.getElementById('tel_code').value;
        let emailFirst =  document.getElementById('email_first').value;
	    let emailSecond =  document.getElementById('email_middle').value;
        let birthDay =  document.getElementById('birth_day').value;
        let birthMonth =  document.getElementById('birth_month').value;
        let birthYear =  document.getElementById('birth_year').value;
        

        if (username == "") {
            return handleMessage(nameRef, "이름을 입력해주세요")
        }

        if (userid == "" && !approvePost.id) {
            return handleMessage(idMsgRef, "사용자 아이디를 입력해주세요")
        }

        if (password !== confirmPass) {
            return handleMessage(pwRef, "비밀번호 확인이 일치하지 않습니다.")
        }

        if (password == "" || confirmPass == "") {
            return handleMessage(pwRef, "비밀번호/비밀번호 확인을 입력해주세요")
        }

        if (phoneNumber == "" && !approvePost.phone) {
            return handleMessage(phoneRef, "올바른 휴대폰 번호를 입력해주세요.")
        }

        if (phoneCode == "" && !approvePost.code) {
            return handleMessage(codeRef, "인증번호를 입력해주세요")
        }

        if (emailFirst == "" && emailSecond == "") {
            return handleMessage(emailRef, "유효한 이메일 주소를 입력하세요")
        }

        if (birthDay == "" && birthMonth == "" && birthYear == "") {
            return handleMessage(dobRef, "유효한 생년월일을 입력하세요.")
        }


        const data = {
            user_id: userid,
            user_nm: username,
            passwd: password,
            gender: input.gender,
            birthday: `${birthYear}-${birthMonth}-${birthDay}`,
            phone: phoneNumber,
            email: `${emailFirst}@${emailSecond}`,
            etc_check: input.etcCheck,
            join_gb: join_gb,
            join_path: "WEB",
            sns_data: profileList
        }

        const response = await join(data)
        if (response.success) {
            alert(response.message)
            navigate("/shop/login/login", { replace: true })
        } else {
            alert(response.message)
        }
    }

    const handleLogin = (mode) => {
        const path = "/"
        const maxAge = 84600

        if (mode == "N") {
            cookies.set('join_gb', 'N', { path, maxAge });
            cookies.set('sns_type', 'J', { path, maxAge })
            window.location.href = "https://nid.naver.com/oauth2.0/authorize"
            + "?client_id=5VYaqI_Px_EqcKRmPrt4"
            + "&response_type=code"
            + "&state=91ea5d1117eb4c820717d78c2f31b3dc"
            + "&svctype=0"
            + "&redirect_uri=https://amante.co.kr/shop/auth/naver";
        }

        if (mode == "K") {
            cookies.set('join_gb', 'K', { path, maxAge });
            cookies.set('sns_type', 'J', { path, maxAge })
            window.location.href = `https://sync.autoworks.io/sync/NW5XeHNFeEtiei9ydWdIemVjcWxHUT09`
        }
    }



    return (
        <div className="contents">
            <div className="content member join join_page">
                <div className="inner">
                    <div className="top_photo">
                        <picture>
                            <source srcSet="/asset/images/shop/member/mb_join_banner.jpg" media="(max-width:767px)" />
                            <source srcSet="/asset/images/shop/member/pc_join_banner.jpg" media="(min-width:768px)" />
                            <img src="/asset/images/shop/member/pc_join_banner.jpg" />
                        </picture>
                    </div>
                    <h2 className="page_tit">회원가입</h2>
                    {!memberInfo?.sns_gb ?
                        <>
                            <p className="sub_tit">SNS 간편회원가입</p>
                            <div className="sns_login">
                                <div className="btn_area col2">
                                    <button onClick={() => handleLogin("K")} type="button" className="btn_txt kakao">
                                        <span>카카오 회원가입</span>
                                    </button>
                                    <button onClick={() => handleLogin("N")} type="button" className="btn_txt naver">
                                        <span>네이버 회원가입</span>
                                    </button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <p className="sub_tit">일반회원가입</p>
                            <p className="sub_tit">
                                {memberInfo?.sns_gb == "K" ?
                                    "카카오 회원 인증이 완료되었습니다 다음 정보를 입력해주세요." :
                                    "네이버 회원인증이 완료되었습니다. 다음 정보를 입력해주세요."}
                            </p>
                        </>
                    }
                    <div className="form_area">
                        <form id="joinForm">
                            <label htmlFor="user_nm" className="label_tit">이름</label>
                            <input type="text" id="user_nm" name="user_nm" placeholder="이름" autoComplete="off" className=""
                                onChange={(e) => {
                                    setInput({ ...input, username: e.target.value  })
                                }} value={sns_nm == undefined? input.username : sns_nm} />
                            <p className="msg" style={{ display: "none" }} ref={nameRef} id="nm_msg"></p>

                            <label htmlFor="user_id" className="label_tit">아이디</label>
                            <div className="id_area">
                                <input
                                    type="text"
                                    id="user_id"
                                    name="user_id"
                                    value={input.userid}
                                    onChange={(e) => {
                                        setInput({ ...input, userid: e.target.value })
                                    }} placeholder="아이디" autoComplete="off" />

                                <button type="button" onClick={handleCheckId} className="btn_txt id_btn" >중복체크</button>
                            </div>
                            <p className="form_sub">영문 & 숫자 혼합 사용</p>
                            <p className="msg" style={{ display: "none" }} ref={idMsgRef} id="id_msg"></p>

                            <label htmlFor="passwd" className="label_tit">비밀번호</label>
                            <div className="pass_area">
                                <input type="password"
                                    onChange={(e) => {
                                        setInput({ ...input, password: e.target.value })
                                    }}
                                    id="passwd"
                                    name="passwd"
                                    autoComplete="off"
                                    placeholder="비밀번호" />

                                <input
                                    onChange={(e) => {
                                        setInput({ ...input, confirmPass: e.target.value })
                                    }}
                                    type="password"
                                    id="passwdConfirm"
                                    autoComplete="off"
                                    placeholder="비밀번호 확인" />

                                <p className="form_sub">영문 대소문자, 숫자, 특수문자 중 혼합하여 2종류 10~16자 또는 3종류 8~16자 입력</p>
                                <p className="msg" style={{ display: "none" }} ref={pwRef} id="pw_msg"></p>
                            </div>

                            <label htmlFor="tel_first" className="label_tit">휴대폰 번호</label>
                            <div className="tel_area">
                                <div className="tel_num tel_box">
                                    <input
                                        type="text"
                                        id="tel_first"
                                        name="phone"
                                        className="tel_first"
                                        placeholder="- 없이 입력해주세요."
                                        onChange={(e) => {
                                            setInput({
                                                ...input,
                                                phoneNumber: e.target.value
                                                    .replace(/[^0-9.]/g, '')
                                                    .replace(/(\..*)\./g, '$1')
                                            })
                                        }}
                                        value={sns_phone == undefined ? input.phoneNumber : sns_phone}
                                        maxLength="11" />
                                    <button type="button" onClick={handleCheckPhone} className="tel_btn">인증</button>
                                    <p className="msg" style={{ display: "none" }} ref={phoneRef} id="tel_msg"></p>
                                </div>
                                <div className="tel_code tel_box">
                                    <input type="text" onChange={(e) => setInput({ ...input, phoneCode: e.target.value })} id="tel_code" className="tel_first" name="tel_code" placeholder="" />
                                    <button type="button" onClick={handleCheckVerifyCode} className="tel_btn">확인</button>
                                    <p className="msg" style={{ display: "none" }} id="tel_code_msg" ref={codeRef}></p>
                                </div>
                            </div>

                            <label htmlFor="email_first" className="label_tit">이메일</label>
                            <div className="email_area">
                                <input
                                    onChange={(e) => setInput({ ...input, emailFirst: e.target.value })}
                                    value={sns_email == undefined ? input.emailFirst : email[0]}
                                    type="text"
                                    name="email_first"
                                    id="email_first"
                                    className="phone_first"
                                    placeholder="" />
                                <span>@</span>
                                <input
                                    type="text"
                                    id="email_middle"
                                    name="email_last"
                                    className="phone_first"
                                    placeholder=""
                                    onChange={(e) => setInput({ ...input, emailSecond: e.target.value })}
                                    value={sns_email == undefined ? input.emailSecond : email[1]} />

                                <select
                                    value={sns_email == undefined ? input.emailSecond : email[1]}
                                    onChange={(e) => setInput({ ...input, emailSecond: e.target.value })}
                                    name=""
                                    id="email_last">

                                    <option value="">직접 입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="nate.com">nate.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                </select>
                                <p className="msg" style={{ display: "block" }} ref={emailRef} id="tel_msg"></p>
                            </div>

                            <label htmlFor="birth_year" className="label_tit">생년월일</label>
                            <div className="user_birthday">
                                <select
                                    value={input.birthYear}
                                    onChange={(e) => setInput({ ...input, birthYear: e.target.value })}
                                    name="birth_year"
                                    id="birth_year">

                                    <option value="">년도</option>
                                    {(() => {
                                        const y = new Date().getFullYear() - 14;
                                        const year_options = [];

                                        for (let i = y - 88; i <= y; i++) {
                                            year_options.push(
                                                <option key={i} value={i}>
                                                    {i}
                                                </option>
                                            );
                                        }

                                        return year_options
                                    })()}
                                </select>

                                <select
                                    value={input.birthMonth}
                                    onChange={(e) => setInput({ ...input, birthMonth: e.target.value })}
                                    name="birth_month"
                                    id="birth_month">
                                    <option value="">월</option>
                                    {(() => {
                                        const month_options = [];
                                        for (let i = 1; i <= 12; i++) {
                                            month_options.push(
                                                <option key={i} value={i}>
                                                    {i}
                                                </option>
                                            );
                                        }
                                        return month_options
                                    })()}
                                </select>

                                <select
                                    value={input.birthDay}
                                    onChange={(e) => setInput({ ...input, birthDay: e.target.value })}
                                    name="birth_day"
                                    id="birth_day"
                                >
                                    <option value="">일</option>
                                    {(() => {
                                        const day_options = [];
                                        for (let i = 1; i <= 31; i++) {
                                            day_options.push(
                                                <option key={i} value={i}>
                                                    {i}
                                                </option>
                                            );
                                        }
                                        return day_options
                                    })()}
                                </select>
                                <p className="msg" style={{ display: "none" }} ref={dobRef} id="id_msg">test</p>
                            </div>
                            <label htmlFor="gender_chk" className="label_tit">성별</label>
                            <div className="gender_area">
                                <div className="design_radio">
                                    <input
                                        onChange={(e) => setInput({ ...input, gender: e.target.value })}
                                        type="radio"
                                        name="gender"
                                        id="gender_women"
                                        checked={input.gender == "F"}
                                        value="F" />
                                    <label htmlFor="gender_women">여성</label>
                                </div>
                                <div className="design_radio">
                                    <input
                                        onChange={(e) => setInput({ ...input, gender: e.target.value })}
                                        type="radio"
                                        name="gender"
                                        id="gender_men"
                                        value="M"
                                        checked={input.gender == "M"}
                                    />
                                    <label htmlFor="gender_men">남성</label>
                                </div>
                            </div>
                            <label htmlFor="" className="label_tit">약관동의</label>
                            <div className="info_check">
                                <div className="all_check">
                                    <div className="design_checkbox">
                                        <input
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setInput({
                                                        ...input,
                                                        processCheck: "Y",
                                                        ageCheck: "Y",
                                                        collectCheck: "Y",
                                                        lawCheck: "Y",
                                                        etcCheck: "Y"
                                                    })
                                                } else {
                                                    setInput({
                                                        ...input,
                                                        processCheck: "N",
                                                        ageCheck: "N",
                                                        collectCheck: "N",
                                                        lawCheck: "N",
                                                        etcCheck: "N"
                                                    })
                                                }
                                            }}
                                            type="checkbox"
                                            id="all_check"
                                            value="" />
                                        <label htmlFor="all_check">전체 동의</label>
                                    </div>
                                </div>
                                <div className="check_list">
                                    <div className="design_checkbox">
                                        <input
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setInput({ ...input, ageCheck: e.target.value })
                                                } else {
                                                    setInput({ ...input, ageCheck: "N" })
                                                }
                                            }}
                                            type="checkbox"
                                            id="age_check"
                                            checked={input.ageCheck == "Y"}
                                            value="Y" />
                                        <label htmlFor="age_check">14세 이상입니다. <span className="point">(필수)</span></label>
                                    </div>
                                    <div className="design_checkbox">
                                        <input
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setInput({ ...input, lawCheck: e.target.value })
                                                } else {
                                                    setInput({ ...input, lawCheck: "N" })
                                                }
                                            }}
                                            checked={input.lawCheck == "Y"}
                                            type="checkbox"
                                            id="law_check" value="Y" />
                                        <label htmlFor="law_check"><span className="under_line">이용약관</span> <span className="point">(필수)</span></label>
                                        <button type="button" className="law_layer_btn layer_btn" onClick={() => handleLayer("law", "open")}>내용보기</button>
                                    </div>
                                    <div className="design_checkbox">
                                        <input
                                            checked={input.collectCheck == "Y"}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setInput({ ...input, collectCheck: e.target.value })
                                                } else {
                                                    setInput({ ...input, collectCheck: "N" })
                                                }
                                            }}
                                            type="checkbox"
                                            id="pri_check_01"
                                            value="Y" />
                                        <label htmlFor="pri_check_01"><span className="under_line">개인정보수집 및 이용안내</span> <span className="point">(필수)</span></label>
                                        <button type="button" className="privacy_layer_01_btn layer_btn" onClick={() => handleLayer("collect", "open")}>내용보기</button>
                                    </div>
                                    <div className="design_checkbox">
                                        <input
                                            checked={input.processCheck == "Y"}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setInput({ ...input, processCheck: e.target.value })
                                                } else {
                                                    setInput({ ...input, processCheck: "N" })
                                                }
                                            }}
                                            type="checkbox"
                                            id="pri_check_02" value="Y" />
                                        <label htmlFor="pri_check_02"><span className="under_line">개인정보처리위탁 </span> <span className="point">(필수)</span></label>
                                        <button type="button" className="privacy_layer_02_btn layer_btn" onClick={() => handleLayer("process", "open")}>내용보기</button>
                                    </div>
                                    <div className="design_checkbox">
                                        <input
                                            checked={input.etcCheck == "Y"}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setInput({ ...input, etcCheck: e.target.value })
                                                } else {
                                                    setInput({ ...input, etcCheck: "N" })
                                                }
                                            }}
                                            type="checkbox"
                                            id="etc_check"
                                            value="Y"
                                            name="etc_check" />
                                        <label htmlFor="etc_check">이메일, SMS, 앱 푸쉬 알림 마케팅 수신 동의 <span className="point not">(선택)</span></label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="btn_area col2">
                        <Link to="/shop/login/login" className="btn_txt">로그인</Link>
                        <button type="button" className="btn_txt btn_point" onClick={handleJoin}>회원가입</button>
                    </div>
                </div>
            </div>

            <div ref={lawRef} className="layer_box join_layer law_layer m-0" id="law_layer">
                <div className="layer_outer">
                    <div className="layer_inner">
                        <div className="layer_con">
                            <div className="layer_tit">
                                <h2>이용약관</h2>
                                <button
                                    type="button"
                                    className="layer_txt_close"
                                    onClick={() => handleLayer("law", "close")}
                                >
                                    닫기
                                </button>
                            </div>
                            <div className="scroll_box">
                                {/*div className="date">시행일: 2019년 03월18일</div*/}
                                <div className="con">
                                    <p className="txt">
                                        인터넷 쇼핑몰 『[SHOP] 사이버 몰』회원 약관
                                        <br />
                                        <br />
                                        제1조(목적) <br />
                                        이 약관은 (주)평안이 운영하는 아망떼사이버 몰(이하 "몰"이라
                                        한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를
                                        이용함에 있어 몰과 이용자의 권리·의무 및 책임사항의 규정을
                                        목적으로 합니다. <br />
                                        <br />
                                        제2조(정의) <br />
                                        ① "몰" 이란 (주)평안이 재화 또는 용역을 이용자에게 제공하기
                                        위하여 컴퓨터등 정보통신설비를 이용하여 재화 또는 용역을 거래할
                                        수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을
                                        운영하는 사업자의 의미로도 사용합니다. <br />
                                        ② "이용자"란 "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는
                                        서비스를 받는 회원 및 비회원을 말합니다. <br />
                                        ③ 회원'이라 함은 "몰"에 개인정보를 제공하여 회원등록을 한
                                        자로서, "몰"의 정보를 지속적으로 제공받으며, "몰"이 제공하는
                                        서비스를 계속적으로 이용할 수 있는 자를 말합니다. <br />
                                        ④ 비회원'이라 함은 회원에 가입하지 않고 "몰"이 제공하는 서비스를
                                        이용하는 자를 말합니다. <br />
                                        <br />
                                        제3조(약관의 명시와 개정) <br />
                                        ① "몰"은 이 약관의 내용과 상호, 영업소 소재지, 대표자의 성명,
                                        사업자등록번호, 연락처(전화, 팩스, 전자우편 주소 등) 등을
                                        이용자가 알 수 있도록 사이버몰의 초기 서비스화면(전면)에
                                        게시합니다. <br />
                                        ② "몰"은 약관의규제에관한법률, 전자거래기본법, 전자서명법,
                                        정보통신망이용촉진등에관한법률, 방문판매등에관한법률,
                                        소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할
                                        수 있습니다. <br />
                                        ③ "몰"이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
                                        현행약관과 함께 몰의 초기화면에 그 적용일자 7일이전부터 적용일자
                                        전일까지 공지합니다. <br />
                                        ④ "몰"이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에
                                        체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는
                                        개정전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한
                                        이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한
                                        개정약관의 공지기간내에 '몰"에 송신하여 "몰"의 동의를 받은
                                        경우에는 개정약관 조항이 적용됩니다. <br />
                                        ⑤ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는
                                        정부가 제정한 전자거래소비자보호지침 및 관계법령 또는 상관례에
                                        따릅니다. <br />
                                        <br />
                                        제4조(서비스의 제공 및 변경) <br />
                                        ① "몰"은 다음과 같은 업무를 수행합니다.
                                        <br />
                                        1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결
                                        <br />
                                        2. 구매계약이 체결된 재화 또는 용역의 배송
                                        <br />
                                        3. 기타 "몰"이 정하는 업무
                                        <br />
                                        ② "몰"은 재화의 품절 또는 기술적 사양의 변경 등의 경우에는 장차
                                        체결되는 계약에 의해 제공할 재화·용역의 내용을 변경할 수
                                        있습니다. 이 경우에는 변경된 재화·용역의 내용 및 제공일자를
                                        명시하여 현재의 재화·용역의 내용을 게시한 곳에 그 제공일자 이전
                                        7일부터 공지합니다. <br />
                                        ③ "몰"이 제공하기로 이용자와 계약을 체결한 서비스의 내용을
                                        재화의 품절 또는 기술적 사양의 변경등의 사유로 변경할 경우에는
                                        "몰"은 이로 인하여 이용자가 입은 손해를 배상합니다. 단, "몰"에
                                        고의 또는 과실이 없는 경우에는 그러하지 아니합니다. <br />
                                        <br />
                                        제5조(서비스의 중단) <br />
                                        ① "몰"은 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의
                                        두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로
                                        중단할 수 있습니다. <br />
                                        ② 제1항에 의한 서비스 중단의 경우에는 "몰"은 제8조에 정한
                                        방법으로 이용자에게 통지합니다. <br />
                                        ③ "몰"은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로
                                        인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단
                                        "몰"에 고의 또는 과실이 없는 경우에는 그러하지 아니합니다.{" "}
                                        <br />
                                        <br />
                                        제6조(회원가입) <br />
                                        ① 이용자는 "몰"이 정한 가입 양식에 따라 회원정보를 기입한 후 이
                                        약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
                                        <br />
                                        ② "몰"은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음
                                        각호에 해당하지 않는 한 회원으로 등록합니다. <br />
                                        1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을
                                        상실한 적이 있는 경우, 다만 제7조제3항에 의한 회원자격 상실후
                                        3년이 경과한 자로서 "몰"의 회원재가입 승낙을 얻은 경우에는
                                        예외로 한다. <br />
                                        2. 등록 내용에 허위, 기재누락, 오기가 있는 경우 <br />
                                        3. 기타 회원으로 등록하는 것이 "몰"의 기술상 현저히 지장이
                                        있다고 판단되는 경우 <br />
                                        ③ 회원가입계약의 성립시기는 "몰"의 승낙이 회원에게 도달한
                                        시점으로 합니다. <br />
                                        ④ 회원은 제15조제1항에 의한 등록사항에 변경이 있는 경우, 즉시
                                        전자우편 기타 방법으로 "몰"에 대하여 그 변경사항을 알려야
                                        합니다. <br />
                                        <br />
                                        제7조(회원 탈퇴 및 자격 상실 등) <br />
                                        ① 회원은 "몰"에 언제든지 탈퇴를 요청할 수 있으며 "몰"은 즉시
                                        회원탈퇴를 처리합니다. <br />
                                        ② 회원이 다음 각호의 사유에 해당하는 경우, "몰"은 회원자격을
                                        제한 및 정지시킬 수 있습니다.
                                        <br />
                                        1. 가입 신청시에 허위 내용을 등록한 경우 <br />
                                        2. "몰"을 이용하여 구입한 재화·용역 등의 대금, 기타 "몰"이용에
                                        관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우 <br />
                                        3. 다른 사람의 "몰" 이용을 방해하거나 그 정보를 도용하는 등
                                        전자거래질서를 위협하는 경우 <br />
                                        4. "몰"을 이용하여 법령과 이 약관이 금지하거나 공서양속에 반하는
                                        행위를 하는 경우 <br />
                                        ③ "몰"이 회원 자격을 제한·정지 시킨후, 동일한 행위가 2회이상
                                        반복되거나 30일이내에 그 사유가 시정되지 아니하는 경우 "몰"은
                                        회원자격을 상실시킬 수 있습니다. <br />
                                        ④ "몰"이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다.
                                        이 경우 회원에게 이를 통지하고, 회원등록 말소전에 소명할 기회를
                                        부여합니다. <br />
                                        <br />
                                        제8조(회원에 대한 통지) <br />
                                        ① "몰"이 회원에 대한 통지를 하는 경우, 회원이 "몰"에 제출한
                                        전자우편 주소로 할 수 있습니다. <br />
                                        ② "몰"은 불특정다수 회원에 대한 통지의 경우 1주일이상 "몰"
                                        게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. <br />
                                        제9조(구매신청) <br />
                                        "몰"이용자는 "몰"상에서 이하의 방법에 의하여 구매를 신청합니다.{" "}
                                        <br />
                                        1. 성명, 주소, 전화번호 입력 <br />
                                        2. 재화 또는 용역의 선택 <br />
                                        3. 결제방법의 선택 <br />
                                        4. 이 약관에 동의한다는 표시(예, 마우스 클릭) <br />
                                        <br />
                                        제10조(계약의 성립) <br />
                                        ① "몰"은 제9조와 같은 구매신청에 대하여 다음 각호에 해당하지
                                        않는 한 승낙합니다. <br />
                                        1. 신청 내용에 허위, 기재누락, 오기가 있는 경우 <br />
                                        2. 미성년자가 담배, 주류등 청소년보호법에서 금지하는 재화 및
                                        용역을 구매하는 경우
                                        <br />
                                        3. 기타 구매신청에 승낙하는 것이 "몰" 기술상 현저히 지장이
                                        있다고 판단하는 경우 <br />
                                        ② "몰"의 승낙이 제12조 제1항의 수신확인통지 형태로 이용자에게
                                        도달한 시점에 계약이 성립한 것으로 봅니다. <br />
                                        <br />
                                        제11조(지급방법) <br />
                                        몰"에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각호의
                                        하나로 할 수 있습니다. <br />
                                        1. 계좌이체 <br />
                                        2. 신용카드결제 <br />
                                        3. 온라인무통장입금 <br />
                                        <br />
                                        제12조(수신확인통지·구매신청 변경 및 취소) <br />
                                        ① "몰"은 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를
                                        합니다. <br />
                                        ② 수신확인통지를 받은 이용자는 의사표시의 불일치등이 있는 경우에
                                        수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수
                                        있습니다. <br />
                                        ③ "몰"은 배송전 이용자의 구매신청 변경 및 취소요청이 있는 때에는
                                        지체없이 요청에 따라 처리합니다. <br />
                                        <br />
                                        제13조(배송) <br />
                                        "몰"은 이용자가 구매한 재화에 대해 배송수단, 수단별 배송비용
                                        부담자, 수단별 배송기간 등을 명시합니다. 만약 "몰"의 고의·과실로
                                        약정 배송기간을 초과한 경우에는 그로 인한 이용자의 손해를
                                        배상합니다. <br />
                                        <br />
                                        제14조(환급, 반품 및 교환) <br />
                                        ① "몰"은 이용자가 구매신청한 재화 또는 용역이 품절등의 사유로
                                        재화의 인도 또는 용역의 제공을 할 수 없을 때에는 지체없이 그
                                        사유를 이용자에게 통지하고, 사전에 재화 또는 용역의 대금을 받은
                                        경우에는 대금을 받은 날부터 3일이내에, 그렇지 않은 경우에는 그
                                        사유발생일로부터 3일이내에 계약해제 및 환급절차를 취합니다.{" "}
                                        <br />
                                        ② 다음 각호의 경우에는 "몰"은 배송된 재화일지라도 재화를
                                        반품받은 다음 영업일 이내에 이용자의 요구에 따라 즉시 환급, 반품
                                        및 교환 조치를 합니다. 다만 그 요구기한은 배송된 날로부터 20일
                                        이내로 합니다. <br />
                                        1. 배송된 재화가 주문내용과 상이하거나 "몰"이 제공한 정보와
                                        상이할 경우
                                        <br />
                                        2. 배송된 재화가 파손, 손상되었거나 오염되었을 경우 <br />
                                        3. 재화가 광고에 표시된 배송기간보다 늦게 배송된 경우 <br />
                                        4. 방문판매등에관한법률 제18조에 의하여 광고에 표시하여야 할
                                        사항을 표시하지 아니한 상태에서 이용자의 청약이 이루어진 경우{" "}
                                        <br />
                                        <br />
                                        제15조(개인정보보호) <br />
                                        ① "몰"은 이용자의 정보수집시 구매계약 이행에 필요한 최소한의
                                        정보를 수집합니다. <br />
                                        다음 사항을 필수사항으로 하며 그 외 사항은 선택사항으로 합니다.{" "}
                                        <br />
                                        1. 성명 <br />
                                        2. 주민등록번호(회원의 경우) <br />
                                        3. 주소 <br />
                                        4. 전화번호 <br />
                                        5. 희망ID(회원의 경우) <br />
                                        6. 비밀번호(회원의 경우) <br />
                                        ② "몰"이 이용자의 개인식별이 가능한 개인정보를 수집하는 때에는
                                        반드시 당해 이용자의 동의를 받습니다. <br />
                                        ③ 제공된 개인정보는 당해 이용자의 동의없이 목적외의 이용이나
                                        제3자에게 제공할 수 없으며, 이에 대한 모든 책임은 "몰"이 집니다.
                                        다만, 다음의 경우에는 예외로 합니다. <br />
                                        1. 배송업무상 배송업체에게 배송에 필요한 최소한의 이용자의
                                        정보(성명, 주소, 전화번호)를 알려주는 경우 <br />
                                        2. 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서
                                        특정 개인을 식별할 수 없는 형태로 제공하는 경우 <br />
                                        ④ "몰"이 제2항과 제3항에 의해 이용자의 동의를 받아야 하는
                                        경우에는 개인정보관리 책임자의 신원(소속, 성명 및 전화번호 기타
                                        연락처),정보의 수집목적 및 이용목적, 제3자에 대한 정보제공
                                        관련사항(제공받는자, 제공목적 및 제공할 정보의 내용)등
                                        정보통신망 이용촉진등에 관한법률 제16조제3항이 규정한 사항을
                                        미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할
                                        수 있습니다. <br />
                                        ⑤ 이용자는 언제든지 "몰"이 가지고 있는 자신의 개인정보에 대해
                                        열람 및 오류정정을 요구할 수 있으며 "몰"은 이에 대해 지체없이
                                        필요한 조치를 취할 의무를 집니다. 이용자가 오류의 정정을 요구한
                                        경우에는 "몰"은 그 오류를 정정할 때까지 당해 개인정보를 이용
                                        하지 않습니다. <br />
                                        ⑥ "몰"은 개인정보 보호를 위하여 관리자를 한정하여 그 수를
                                        최소화하며 신용카드, 은행계좌 등을 포함한 이용자의 개인정보의
                                        분실, 도난, 유출, 변조 등으로 인한 이용자의 손해에 대하여 모든
                                        책임을 집니다. <br />
                                        ⑦ "몰" 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의
                                        수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체
                                        없이 파기합니다. <br />
                                        <br />
                                        제16조("몰"의 의무) <br />
                                        ① "몰은 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를
                                        하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로
                                        재화·용역을 제공하는 데 최선을 다하여야 합니다. <br />
                                        ② "몰"은 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록
                                        이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추
                                        어야 합니다. <br />
                                        ③ "몰"이 상품이나 용역에 대하여 「표시·광고의공정화에관한법률」
                                        제3조 소정의 부당한 표시·광고행위를 함으로써 이용자가 손해를
                                        입은 때에는 이를 배상할 책임을 집니다. <br />
                                        ④ "몰"은 이용자가 원하지 않는 영리목적의 광고성 전자우편을
                                        발송하지 않습니다. <br />
                                        <br />
                                        제17조(회원의 ID 및 비밀번호에 대한 의무) <br />
                                        ① 제15조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은
                                        회원에게 있습니다. <br />
                                        ② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는
                                        안됩니다. <br />
                                        ③ 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고
                                        있음을 인지한 경우에는 바로 "몰"에 통보하고 "몰"의 안내가 있는
                                        경우에는 그에 따라야 합니다. <br />
                                        <br />
                                        제18조(이용자의 의무) <br />
                                        이용자는 다음 행위를 하여서는 안됩니다. <br />
                                        1. 신청 또는 변경시 허위내용의 등록 <br />
                                        2. "몰"에 게시된 정보의 변경 <br />
                                        3. "몰"이 정한 정보 이외의 정보(컴퓨터 프로그램 등)의 송신 또는
                                        게시 <br />
                                        4. "몰" 기타 제3자의 저작권 등 지적재산권에 대한 침해 <br />
                                        5. "몰" 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위{" "}
                                        <br />
                                        6. 외설 또는 폭력적인 메시지·화상·음성 기타 공서양속에 반하는
                                        정보를 몰에 공개 또는 게시하는 행위 <br />
                                        <br />
                                        제19조(연결"몰"과 피연결"몰" 간의 관계) <br />
                                        ① 상위 "몰"과 하위 "몰"이 하이퍼 링크(예: 하이퍼 링크의 대상에는
                                        문자, 그림 및 동화상 등이 포함됨)방식 등으로 연결된 경우, 전자를
                                        연결 "몰"(웹 사이트)이라고 하고 후자를 피연결
                                        "몰"(웹사이트)이라고 합니다. <br />
                                        ② 연결 "몰"은 피연결 "몰"이 독자적으로 제공하는 재화·용역에
                                        의하여 이용자와 행하는 거래에 대해서 보증책임을지지 않는다는
                                        뜻을 연결 "몰"의 사이트에서 명시한 경우에는 그 거래에 대한
                                        보증책임을지지 않습니다. <br />
                                        <br />
                                        제20조(저작권의 귀속 및 이용제한) <br />
                                        ① "몰"이 작성한 저작물에 대한 저작권 기타 지적재산권은 "몰"에
                                        귀속합니다. <br />
                                        ② 이용자는 "몰"을 이용함으로써 얻은 정보를 "몰"의 사전 승낙없이
                                        복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로
                                        이용하거나 제3자에게 이용하게 하여서는 안됩니다. <br />
                                        <br />
                                        제21조(분쟁해결) <br />
                                        ① "몰"은 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그
                                        피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.{" "}
                                        <br />
                                        ② "몰"은 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그
                                        사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자
                                        에게 그 사유와 처리일정을 즉시 통보해 드립니다. <br />
                                        ③ "몰"과 이용자간에 발생한 분쟁은 전자거래기본법 제28조 및 동
                                        시행령 제15조에 의하여 설치된 전자거래분쟁조정위원회의 조정에
                                        따를 수 있습니다. <br />
                                        <br />
                                        제22조(재판권 및 준거법) <br />
                                        ① "몰"과 이용자간에 발생한 전자거래 분쟁에 관한 소송은
                                        민사소송법상의 관할법원에 제기합니다. <br />
                                        ② "몰"과 이용자간에 제기된 전자거래 소송에는 한국법을
                                        적용합니다. <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={infoCollectionRef} className="layer_box join_layer privacy_layer_01 m-0" id="privacy_layer_01">
                <div className="layer_outer">
                    <div className="layer_inner">
                        <div className="layer_con">
                            <div className="layer_tit">
                                <h2>개인정보수집 및 이용안내</h2>
                                <button
                                    type="button"
                                    className="layer_txt_close"
                                    onClick={() => handleLayer("collect", "close")}
                                >
                                    닫기
                                </button>
                            </div>
                            <div className="scroll_box">
                                <div className="con">
                                    <p className="list">
                                        필수정보
                                        <br />
                                        <br />
                                        1. 목적
                                        <br />
                                        - 회원제 서비스 이용/본인확인
                                        <br />
                                        <br />
                                        2. 항목
                                        <br />
                                        - 이름, 아이디, 비밀번호,이메일, 휴대폰,생일
                                        <br />
                                        - 휴대폰, 이메일
                                        <br />
                                        <br />
                                        3. 보유기간
                                        <br />
                                        - 회원탈퇴 후 5일까지
                                        <br />
                                        <br />
                                        <br />
                                        선택정보
                                        <br />
                                        <br />
                                        1. 목적
                                        <br />
                                        - 마케팅 활용(이벤트, 맞춤형 광고)
                                        <br />
                                        <br />
                                        2. 항목
                                        <br />
                                        - 휴대폰, 이메일
                                        <br />
                                        <br />
                                        3. 보유기간
                                        <br />- 회원탈퇴 후 5일까지
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={infoProcessingRef} className="layer_box join_layer privacy_layer_02 m-0" id="privacy_layer_02">
                <div className="layer_outer">
                    <div className="layer_inner">
                        <div className="layer_con">
                            <div className="layer_tit">
                                <h2>개인정보처리위탁</h2>
                                <button
                                    type="button"
                                    className="layer_txt_close"
                                    onClick={() => handleLayer("process", "close")}
                                >
                                    닫기
                                </button>
                            </div>
                            <div className="scroll_box">
                                <div className="con">
                                    <p className="list">
                                        한진택배
                                        <br />
                                        <br />
                                        1. 목적
                                        <br />
                                        -상품배송 / 배송관련 정보, 택배 배송을 위한 시스템 지원업무
                                        <br />
                                        <br />
                                        <br />
                                        CJ택배
                                        <br />
                                        <br />
                                        1. 목적
                                        <br />
                                        -상품배송 / 배송관련 정보, 택배 배송을 위한 시스템 지원업무
                                        <br />
                                        <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
