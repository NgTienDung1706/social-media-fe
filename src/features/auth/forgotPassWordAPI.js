
import axiosInstance from "@/utils/axiosInstance";

// Gửi yêu cầu quên mật khẩu
export const forgotPassword = async (email) => {
  return axiosInstance.post("/forgot-password", { email });
};

// Xác nhận OTP quên mật khẩu
export const verifyForgotOTP = async (email, otp) => {
  return axiosInstance.post("/verify-forgot-otp", { email, otp });
};

// Đặt lại mật khẩu mới
export const resetPassword = async (email, newPassword) => {
  return axiosInstance.post("/reset-password", { email, newPassword });
};
