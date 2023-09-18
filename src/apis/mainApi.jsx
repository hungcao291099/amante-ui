import api from "../utils/api/api"

export const mainApi = async () => {
    try {
        const categoryListApi = "/shop/category/main/list";
        const housewamingListApi = "/board/housewarming/list?main_yn=Y";
        const specialListApi = "/board/theme/list?main_yn=Y";
        const mainPopupApi = "/shop/banner/mainPopup"
        const mainTopBannerApi = "/shop/banner/mainTop";
        const mainVisualApi = "/shop/banner/mainVisual";
        const mainKeyWordApi = "/shop/banner/mainPopularKeyword";
        const mainMiddleApi = "/shop/banner/mainMiddle"
        const bestMenuTabApi = "/shop/category/best/list";
        const newMenuTabApi = "/shop/category/new/list";
        const newCate = "/shop/product/category/newlist";

        const responses = await Promise.all([
            api.get(categoryListApi),
            api.get(housewamingListApi),
            api.get(specialListApi),
            api.get(mainPopupApi),
            api.get(mainTopBannerApi),
            api.get(mainVisualApi),
            api.get(mainKeyWordApi),
            api.get(mainMiddleApi),
            api.get(bestMenuTabApi),
            api.get(newMenuTabApi),
            api.get(newCate),
        ])

        const result = {
            category: responses[0].data.data,
            housewarming: responses[1].data.data,
            specialList: responses[2].data.data,
            mainPopup: responses[3].data.data,
            mainTopBanner: responses[4].data.data,
            mainVisual: responses[5].data.data,
            mainKeyword: responses[6].data.data,
            mainMiddle: responses[7].data.data,
            bestMenuTab: responses[8].data.data.reverse(),
            newMenuTab: responses[9].data.data.reverse(),
            newCate: responses[10].data.data,
        }

        return result
    } catch (error) {
        console.log(error)
    }
}

export const getProductList = async (category_cd, mode) => {
    try {
        const endpoint = mode == "new" ? `/shop/product/main/new/list?category1_cd=${category_cd}` : `/shop/product/main/best/list?category1_cd=${category_cd}`;
        const response = await api.get(endpoint);
        return response.data.data
    } catch (error) {
        console.log(error)
    }   

}
export const getBestCateImg = async (category_cd) => {
    let endpoint = `/shop/product/main/best/cate_img?category1_cd=${category_cd}`
    const response = await api.get(endpoint);
        return response.data
}
export const getInsta = async (mode) => {
    try {
        let endpoint = mode == "pet" ? "/shop/main/insta_img_pet/list" : "/shop/main/insta_img/list"
        const response = await api.get(endpoint);
        return response.data
    } catch (error) {
        console.log(error)
    }
}