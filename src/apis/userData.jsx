import api from "@utils/api/api"

export default async () => {
  try {
    const {data} = await api.get('/shop/get/session_id')
    
    return {sessionId: data.sessionId}
  } catch (error) {
    console.log(error)
  }
}