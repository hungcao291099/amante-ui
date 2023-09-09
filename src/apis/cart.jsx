import api from '@utils/api/api';

export const cartInsert = async (products, iscurr, sessionId, token) => {
  try {
    const {data} = await api({
      url: '/member/cart/insert',
      method: 'POST',
      data: { products, iscurr, sessionId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error)
  }
};


export const cartNum = async (sessionId) => {
  try {
    const {data} = await api({
      url: '/cart/num_by_cust_seq',
      method: 'GET',
      params: { sessionId },
    })
    return data
  } catch (error) {
    console.log(error)
  }
};

// Cart List
export const cartList = async (token) => {
  
  try {
    const {data} = await api({
      url: '/cart/lists',
      method: 'GET',
      params: {  },
      headers: {
            Authorization: `Bearer ${token}`,
          },
    });
  
    return data;
  } catch (error) {
    console.log(error)
  }
  
}

