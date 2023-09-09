import api from "@utils/api/api"


export const getData = async () => {
    try {
        const bannerTopApi = `/banner/pet/top/list`
        const categoryListApi = `/pet/category/list?category_m_cd=14`
        const iconListApi = `/shop/icon/list?group_cds=${encodeURIComponent([2002, 2003, 2004, 2005])}`
        const bannerCenterApi = `/banner/pet/center/list`
        const eventListApi = `/shop/event/list?event_seq=9`
        const iconApi = `/common/code/list?code_cd1=2100`

        const responses = await Promise.all([
            api.get(bannerTopApi),
            api.get(categoryListApi),
            api.get(iconListApi),
            api.get(bannerCenterApi),
            api.get(eventListApi),
            api.get(iconApi)
        ])

        const result = {
            bannerTop: responses[0].data.data,
            category: responses[1].data.data,
            iconList: responses[2].data.data,
            bannerCenter: responses[3].data.data,
            eventList: responses[4].data.data,
            iconCodeList: responses[5].data.data
        }

        return result
    } catch (error) {
        console.log(error)
    }
}

export const getProductByMode = async (mode, category_cd) => {
    try {
        const endpoint = mode == "new" ? `/pet/product/new/list?category1_cd=14` : `/pet/product/best/list?category1_cd=14&category2_cd=${category_cd}`
        const response = await api.get(endpoint)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getProductListByGroup = async (group_cd = 2200) => {
    try {
        const endpoint = `/shop/icon/product/list?group_cd=${group_cd}`
        const response = await api.get(endpoint)
        return response.data
    } catch (error) {
        console.log(error)
    }
}