
import axios from '@/utils/axiosInstance';

// Tìm kiếm user theo từ khóa
export const searchUsers = async (query) => {
  return axios.get('/search', { params: { query: query } });
};
