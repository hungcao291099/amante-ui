import api from "../utils/api/api"

export const wish = async (product_cd) => {
    const endpoint = `/member/wish_click`
    const cust_seq = api.defaults.params["cust_seq"]
    try {
        if(!cust_seq || cust_seq == "") {
            alert("로그인 해주세요")
            return window.location.href = "/shop/login/login"
        }
        const response = await api({
            method: "POST",
            url: endpoint,
            data: {
                product_cd,
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const removeWish = async (product_cd) => {
    const endpoint = `/member/wish_click_off`
    try {
        const response = await api({
            method: "POST",
            url: endpoint,
            data: {
                product_cd,
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}