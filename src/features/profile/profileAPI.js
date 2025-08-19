import axios from '@/utils/axiosInstance';
import { setCurrentUser } from '@/redux/authSlice';

// Lấy thông tin profile của user theo id
export const getUserProfileById = async (userId) => {
  return axios.get(`/profile/${userId}`);
};

export const getProfile = async () => {
  return axios.get("/profile");
};

export const updateProfile = async (formData, dispatch) => {
  const result = await axios.put('/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  dispatch(setCurrentUser(result));
  return result;
};
