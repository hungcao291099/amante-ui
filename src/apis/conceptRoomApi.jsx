import api from "../utils/api/api";

export const getBrand = async () => {
    const response = await api.get("/shop/code2/list?code1=900");
    return response.data.data
}

export const getRooms = async (params) => {
    const response = await api.get(`/manager/concept/room/list?${new URLSearchParams(params)}`);
    return response.data.response
}

export const updateRoomFromList = async (data) => {
    const response = await api({
        url: "/manager/concept/room/list/update",
        method: "POST",
        data: { ...data }
    })
    return response.data
}

export const getProductView = async (concept_room_seq) => {
    const response = await api.get(`/manager/room/product/view?concept_room_seq=${concept_room_seq}`, {})
    return response.data
}

export const getProductRoomList = async (query) => {
    const response = await api.get(`/manager/room/product/list?${new URLSearchParams(query)}`)
    return response.data
}

export const getRoomProduct = async (product_cd) => {
    const response = await api.get(`/manager/room/lookup/product?product_cd=${product_cd}`)
    return response.data
}

export const changeMethod = async (concept_room_seq, method) => {
    const response = await api.get(`/manager/concept/room/slide?concept_room_seq=${concept_room_seq}&method=${method}`)
    return response.data;
}

export const getStyles = async () => {
    const response = await api.get(`/room/concept/styles/list`)
    return response.data
}

export const postRoom = async (data) => {
    await api({
        url: "/room/log/write",
        method: "POST",
        data: { data }
    });
    const response = await api({
        url: "/room/concept/new",
        method: "POST",
        data: { ...data }
    })
    return response.data
}

export const getEditRoom = async (seq) => {
    const response = await api.get(`/room/concept/modify?concept_room_seq=${seq}`);
    await api({
        url: "/room/log/write",
        method: "POST",
        data: { data: response.data }
    });
    return response.data
}

export const postUpdate = async (seq, data) => {
    await api({
        url: "/room/log/write",
        method: "POST",
        data: { data: {seq, data} }
    });
    const response = await api.post("/room/concept/modify/post", { seq, ...data })
    return response.data
}

export const getRecom = async (seq) => {
    const response = await api.get(`/room/manager/recom/list?concept_room_seq=${seq}`)
    return response.data
}

export const getDelRoom = async () => {
    try {
        const res = await api({
            method: "GET",
            url: "/room/manager/del"
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}
