import api from "@utils/api/api"

export const product = async () => {
  try {
    const sortListApi = '/common/code/list?code_cd1=3300'
    const codeListApi = '/common/code/list?code_cd1=2100'

    const response = await Promise.allSettled([
      api.get(sortListApi),
      api.get(codeListApi)
    ])

    const result = {
      sortList: response[0].value?.data.data,
      codeList: response[1].value?.data.data
    }

    return result
  } catch (error) {
    console.log(error)
  }
}


export const productCate = async (category1Cd, category2Cd, category3Cd, token) => {
  try {
    const data = {
      category1_cd: category1Cd, 
      category2_cd: category2Cd, 
      category3_cd: category3Cd
    }

    const cateBanner = `/shop/product/cate_banner`
    const cateList = `/shop/product/cate_list`

    const response = await Promise.allSettled?.([
      api.get(cateBanner, {params: data}),
      api.get(cateList, {params: data, headers: { 'Authorization': `Bearer ${token}`}})
    ])

  
    const result = {
      cateBanner: response[0].value?.data.banner,
      cateData: response[1].value?.data.data
    }

    return result
  } catch (error) {
    console.log(error)
  }
}