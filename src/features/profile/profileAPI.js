import axios from "@/utils/axiosInstance";

export const getProfile = async () => {
  return axios.get("/profile");
};

export const updateProfile = async (formData) => {
  return axios.put('/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
