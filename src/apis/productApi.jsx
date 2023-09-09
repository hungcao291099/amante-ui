import api from "../utils/api/api"

export const getProduct = async () => {
    const response = await api.get("/manager/concept/room/product/list");
    return response.data
}