import axiosInstance from "@/utils/axiosInstance";

export const login = async ({ email, password }) => {
  return axiosInstance.post("/login", { email: email, password });
};
