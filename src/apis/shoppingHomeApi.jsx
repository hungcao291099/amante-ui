import api from "../utils/api/api";

export const shoppingHomeApi = async () => {
    try {
        const topBannerApi = '/shop/banner/shopping_home_top_banner'
        const middleBannerApi = 'shop/banner/shopping_home_banner'
        const categoryApi = '/shop/category/main/list'
        const bestMenuTabApi = "/shop/category/best/list";
        const newMenuTabApi = "/shop/category/new/list";
        const specialListApi = "/board/theme/list?main_yn=Y";
        const mainKeyWordApi = "/shop/banner/mainPopularKeyword";
        const hotdealApi = `/shop/product/month_hotdeal/list`

        const responses = await Promise.all([
            api.get(topBannerApi),
            api.get(middleBannerApi),
            api.get(categoryApi),
            api.get(bestMenuTabApi),
            api.get(newMenuTabApi),
            api.get(specialListApi),
            api.get(mainKeyWordApi),
            api.get(hotdealApi),
        ])

        const result = {
            topBanner: responses[0].data.data,
            middleBanner: responses[1].data.data,
            category: responses[2].data.data,
            bestMenuTab: responses[3].data.data.reverse(),
            newMenuTab: responses[4].data.data.reverse(),
            specialList: responses[5].data.data,
            keyword: responses[6].data.data,
            hotdeal: responses[7].data.data
        }

        return result
    } catch (error) {
        console.log(error)
    }  
}