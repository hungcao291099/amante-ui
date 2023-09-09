import api from "../utils/api/api"

export const specialProductListApi = async () => {
    try {
        const endpoint = '/special/product/list'
        const response = await api.get(endpoint)
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}