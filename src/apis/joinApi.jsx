import api from "../utils/api/api"

export const checkId = async (user_id) => {
    const endpoint = `/member/idCheck`
    try {
        const response = await api({
            url: endpoint,
            method: "POST",
            data: { user_id }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const checkPhone = async ({ phone, name, mode }) => {
    const endpoint = `/member/phone/check`
    try {
        const response = await api({
            method: "POST",
            url: endpoint,
            data: { phone, name, mode }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const checkCode = async ({ phone, cert_num }) => {
    const endpoint = `/member/cert/check`
    try {
        const response = await api({
            method: "POST",
            url: endpoint,
            data: { phone, cert_num }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const join = async (data) => {
    const endpoint = '/member/join'
    try {
        const response = await api({
            url: endpoint,
            method: "POST",
            data: { ...data }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getProfileKakao = async (token) => {
    try {
        
        const response = 
        await api.get(`https://kapi.kakao.com/v2/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const getProfileNaver = async (token) => {
    try {
        
        const response = 
        await api.get(`https://openapi.naver.com/v1/nid/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

