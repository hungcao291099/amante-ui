import api from "../utils/api/api"

export const getGeneralData = async () => {
    try {
        const hotdealApi = '/shop/product/month_hotdeal/list'
        const filterApi = `/common/code/list?code_cd1=3300`
        const iconApi = `/common/code/list?code_cd1=2100`
        const categoryApi = `/sale/category/list`

        const responses = await Promise.all([
            api.get(hotdealApi),
            api.get(filterApi),
            api.get(iconApi),
            api.get(categoryApi),
        ])

        const result = {
            hotdeal: responses[0].data.data,
            sort_code_list: responses[1].data.data,
            icon_list: responses[2].data.data,
            category: responses[3].data.data
        }
        return result
    } catch (error) {
        console.log(error)
    }
}


export const getProduct = async (mode, search_option) => {
    try {
        var endpoint = mode == "all" ? `/sale/top_product/list?${new URLSearchParams(search_option).toString()}` : `/sale/product/list?${new URLSearchParams(search_option).toString()}`
        const response = await api.get(endpoint)
        return response.data 
    } catch (error) {
        console.log(error)   
    }
}
