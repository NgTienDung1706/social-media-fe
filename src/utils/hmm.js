import axios from "axios";
import store from "@/redux/store";
import { setAccessToken, logout } from "@/redux/authSlice";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true // Để gửi cookie từ server
});

let isRefreshing = false;
let failedQueue = [];

// Function to add failed requests to the queue
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    }
    );
    failedQueue = [];
}

instance.interceptors.request.use(function (config) {
    const accessToken = store.getState().auth.login.accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    if (response && response.data) return response.data;
    return response;
}, function (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "";

    // ✅ Token hết hạn hoặc không hợp lệ → xóa token và chuyển về login
    if (status === 401 && message.toLowerCase().includes("token")) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error?.response?.data || error);
  
});

export default instance;
