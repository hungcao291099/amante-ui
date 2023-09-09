import api from "@utils/api/api"

export const getCommunityList = async (mode) => {
  try {
      const endpoint =`/shop/community/list`;
      const response = await api.get(endpoint);
      return response.data.data
  } catch (error) {
      console.log(error)
  }
}

export const getRelationProductList = async (event_seq) => {
  try {
      const endpoint =`/shop/community/relation_product_list?event_seq=${event_seq}`;
      const response = await api.get(endpoint);
      return response.data.data
  } catch (error) {
      console.log(error)
  }
}

export const getView = async (event_seq) => {
  try {
      const endpoint =`/shop/community/view?event_seq=${event_seq}`;
      const response = await api.get(endpoint);
      return response.data.data
  } catch (error) {
      console.log(error)
  }
}

export const getBenefitInfo = async () => {
  try {
      const endpoint =`/shop/community/get_benefit_info`;
      const response = await api.get(endpoint);
      return response.data.data
  } catch (error) {
      console.log(error)
  }
}

