import api from "../utils/api/api"



export const getHousewarmingList = async (orderBy,rowCount) => {
    try {
        var endpoint = `/shop/housewarming/list?order_by=${orderBy}&pageCnt=${rowCount}`
        const response = await api.get(endpoint)
        return response.data
    } catch (error) {
        console.log(error)   
    }
}

export const getHousewarmingView = async (event_seq,rowCount) => {
    try {
        var endpoint = `/shop/housewarming/view?event_seq=${event_seq}&rowCount=${rowCount}`
        const response = await api.get(endpoint)
        return response.data
    } catch (error) {
        console.log(error)   
    }
}

