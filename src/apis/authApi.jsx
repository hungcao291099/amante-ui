import api from "../utils/api/api";

export const login = async (data) => {
    try {
        const endpoint = "/manager/auth/login";
        const response = await api({
            url: endpoint,
            method: "POST",
            data: {...data}
        })
        return response.data
    } catch (e) {
        console.log(e)
    }
}