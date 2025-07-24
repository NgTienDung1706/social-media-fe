import axios from "axios";
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

// Alter defaults after instance has been created
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
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

    // Trả lỗi cho component gọi xử lý tiếp
    return Promise.reject(error?.response?.data || error);
  
});

export default instance;
