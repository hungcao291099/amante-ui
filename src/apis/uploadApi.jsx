import api from "../utils/api/api"

export const uploadSingle = async (formData, folder) => {
    const response = await api.post('/manager/file/upload', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "folder": folder
        }
    })
    return response.data
}

export const deleteSingle = async ({file_nm, folder}) => {
    const response = await api.post("/manager/file/delete", {file_nm, folder})
    return response.data
}

export const deleteMultiple = async ({file_arr, folder}) => {
    const response = await api.post("/manager/file/multiple/delete", {file_arr, folder})
    return response.data
}