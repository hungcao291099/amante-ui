import api from "../utils/api/api"

export default async () => {
    try {
        const response = await api.get("/system/cdn/check")
        return response.data.url
    } catch (error) {
        console.log(error)
    }
}

export const getAllCdn = async () => {
    const response = await api.get("/manager/system/cdn")
    return response.data
}

export const updateCdn = async (service_div) => {
    const response = await api.post("/manager/system/modify", {service_div})
    return response.data
}