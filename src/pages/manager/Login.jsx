import {useState} from "react"
import Cookies from "universal-cookie";
import {login} from "@apis/authApi";
import {useNavigate} from "react-router-dom";

export default () => {
    const [userInput, setUserInput] = useState({m_id: "", m_pw: ""})
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await login(userInput);
        alert(result.msg)
        if(result.status === "ok") {
            cookies.set("manager_acs_tk", result.access_token, { path: "/", sameSite: "strict", maxAge: 84600 })
            window.localStorage.setItem("admin_info", JSON.stringify(result.data))
            navigate("/manager/concept-room/list")
        }
    }


    const handleSetUserInput = (input, e) => {
        if (input === "m_id") {
            setUserInput({...userInput, m_id: e.target.value})
        }

        if (input === "m_pw") {
            setUserInput({...userInput, m_pw: e.target.value})
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column vh-100">
            <div className="d-flex flex-column gap-5" style={{width: "300px"}}>
                <div className="d-flex justify-content-center">
                    <img src="/images/login_logo.png"/>
                </div>
                <form method="post" className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
                    <div className="d-flex flex-column gap-2">
                        <input
                            onChange={(e) => handleSetUserInput("m_id", e)}
                            value={userInput.m_id}
                            placeholder="관리자 아이디"
                            type="text"
                            className="form-control rounded-0"/>

                        <input
                            onChange={(e) => handleSetUserInput("m_pw", e)}
                            value={userInput.m_pw}
                            placeholder="비밀번호"
                            type="password"
                            className="form-control rounded-0"/>
                    </div>
                    <button className="py-3 fw-bold text-white" style={{background: "#F29642"}}>로그인</button>
                </form>
            </div>
        </div>
    )
}