import api from "../utils/api/api"


export const getTipList = async (rowCount) => {
    try {
        var endpoint = `/board/tip/tip_lists?pageCnt=${rowCount}`
        const response = await api.get(endpoint)
        return response.data
    } catch (error) {
        console.log(error)   
    }
}



export const getTipView = async (mode) => {
    try {
        var endpoint = `/board/tip/tip_view?event_seq=${mode}`
        const response = await api.get(endpoint)
        return response.data
    } catch (error) {
        console.log(error)   
    }
}
