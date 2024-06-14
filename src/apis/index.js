import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Ở phía Frontend không cần nhất thiết phải luôn try catch trong các hàm lấy dữ liệu, việc này dẫn đến dư
// thừa catch lỗi quá nhiều
// Giải pháp clean code là chỉ catch tập trung ở một nơi, bằng cách tận dụng interceptors của axios
// Hiểu đơn giản thì interceptors là cách chúng ta đánh chặn vào giữa req hoặc res để xử lý logic mà chúng ta muốn

// Boards
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // Lưu ý: axios sẽ trả kết quả về qua property của nó là data
  return response.data
}

// Columns
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  // Lưu ý: axios sẽ trả kết quả về qua property của nó là data
  return response.data
}

// Cards
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  // Lưu ý: axios sẽ trả kết quả về qua property của nó là data
  return response.data
}
