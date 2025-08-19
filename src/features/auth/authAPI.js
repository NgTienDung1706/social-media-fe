import axiosInstance from "@/utils/axiosInstance";

import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "@/redux/authSlice";

export const login = async ({ email, password },dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post("/login", { email, password });
    //localStorage.setItem("access_token", res.token);
    //localStorage.setItem("username", res.user.username);
    dispatch(loginSuccess(res));
  } catch (err) {
    const message = err?.message || "Đăng nhập thất bại";
    console.error("Lỗi khi đăng nhập:", message);
    dispatch(loginFailed());
    throw new Error(message);
  }
  //return axiosInstance.post("/login", { email: email, password });
};

export const logout = async (dispatch) => {
  dispatch(logoutStart());
  try {
    await axiosInstance.post("/logout");
    //localStorage.removeItem("access_token");
    //localStorage.removeItem("username");
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailed());
  }
}
