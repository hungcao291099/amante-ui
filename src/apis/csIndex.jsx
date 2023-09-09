import api from "@utils/api/api"

export const faIndex = async () => {
  try {
    const {data} = await api.get('/board/faq/faq_index_lists')
    return data.data
  } catch (error) {
    return error.response.data
  }
}


export const qnaIndex = async () => {
  try {
    const {data} = await api.get('/board/qna/index_qna_lists')
    return data.data
  } catch (error) {
    return error.response.data
  }
}


export const noticeIndex = async () => {
  try {
    const {data} = await api.get('/board/notice/notice_index_lists')
    return data.data
  } catch (error) {
    return error.response.data
  }
}


export const winnerIndex = async () => {
  try {
    const {data} = await api.get('/board/index/winner/list')
    return data.data
  } catch (error) {
    return error.response.data
  }
}


export const reviewIndex = async () => {
  try {
    const {data} = await api.get('/member/mypage/index/review/list')
    return data.data
  } catch (error) {
    return error.response.data
  }
}