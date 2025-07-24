import axiosInstance from "@/utils/axiosInstance";

// API đăng ký tài khoản
export const register = async (formData) => {
  return axiosInstance.post("/register", formData);
};

// API xác thực OTP
export const verifyOTP = async (email, otp) => {
  return axiosInstance.post("/verify-otp", { email, otp });
};
