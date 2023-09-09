import api from "../utils/api/api"


export const getReviewList = async (mode) => {
    try {
        var endpoint = `/shop/review/review_lists?checkDevice=${mode} `
       
        const response = await api.get(endpoint)
        return response.data
    } catch (error) {
        console.log(error)   
    }
}