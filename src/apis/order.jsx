import api from '@utils/api/api';


export const orderList = async (token) => {
  
  try {
    const {data} = await api({
      url: '/order/write',
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

