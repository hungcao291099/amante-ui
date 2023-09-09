import api from "../utils/api/api"

export const loginPost = async (user_id, passwd, login_gb) => {
    try {
        const response = await api({
            url: "/member/login",
            method: "POST",
            data: {
                user_id, passwd, login_gb
            },
        }, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const verifyToken = async (token, auto_login) => {
    try {
        const response = await api.get(`/member/token/verify?auto_login=${auto_login}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}