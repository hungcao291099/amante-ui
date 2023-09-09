import api from "../utils/api/api"

export const getStyles = async () => {
    const response = await api.get("/manager/style/list");
    return response.data
}

export const getDetailed = async (h_code) => {
    const response = await  api.get("/manager/style/detailed?h_code=" + h_code);
    return response.data
}

export const insertStyle = async (data) => {
    const response = await api.post("/manager/style/new", data, {
        headers: {
            "folder": "styles",
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data
}

export const updateStyle = async (data) => {
    const response = await api.post("/manager/style/edit", data, {
        headers: {
            "folder": "styles",
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

export const insertDetail = async (data) => {
    const response = await api.post("/manager/detailed/new", data, {})
    return response.data
}

export const updateDetail = async (data) => {
    const response = await api.post("/manager/detailed/edit", data, {})
    return response.data
}