import api from "../utils/api/api"


export const getPromitionList = async (stat,page) => {
    try {
        var endpoint = `/shop/promotion/promotion_lists?stat=${stat}&page=${page}`

        const response = await api.get(endpoint)
        
        return response.data;
    } catch (error) {
        console.log(error)
    }
   
}

export const getBanner = async () => {
    try {
        var endpoint = `/shop/promotion/banner_list`

        const response = await api.get(endpoint)
        
        return response.data;
    } catch (error) {
        console.log(error)
    }
   
}
export const getPromotionView = async (no) => {
    try {
        var endpoint = `/shop/promotion/promotion_view?event_seq=${no}`

        const response = await api.get(endpoint)
        
        return response.data;
    } catch (error) {
        console.log(error)
    }
   
}

export const getPromotionComment = async (no) => {
    try {
        var endpoint = `/shop/promotion/promotion_comment?event_seq=${no}`

        const response = await api.get(endpoint)
        
        return response.data;
    } catch (error) {
        console.log(error)
    }
   
}

