const { instance } = require("../utils/instance")

export const getRooms = async () => {
    const response = await instance.get("/get-rooms")
    return response.data
}

export const getBrand = async () => {
    const response = await instance.get("/brand-list")
    return response.data
}

export const postRoom = async (data) => {
    const response = await instance({
        url: "/post-room",
        method: "post",
        data: { ...data }
    })
    return response.data
}

export const deleteRoom = async (id) => {
    const response = await instance({
        url: "/del-room",
        method: "post",
        data: {
            id: id
        }
    })
    return response.data
}

export const updateRoom = async (seq, data) => {
    try {
        const res = await instance({
            method: "POST",
            url: "/modify-list",
            data: {
                concept_room_seq: seq,
                data: data
            }
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const editRoom = async (seq) => {
    try {
        const res = await instance({
            method: "GET",
            url: `/concept-room-modify?concept_room_seq=${seq}`
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const changeMethod = async (seq, method) => {
    try {
        const res = await instance({
            method: "GET",
            url: `/get-slide?concept_room_seq=${seq}&method=${method}`
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const postUpdate = async (seq, data) => {
    try {
        const res = await instance({
            method: "POST",
            url: "/post-update-room",
            data: { ...data, concept_room_seq: seq }
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}
