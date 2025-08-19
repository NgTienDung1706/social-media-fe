import axios from "axios";
import { store } from "@/redux/store";
import { setAccessToken, logoutSuccess } from "@/redux/authSlice";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Để gửi cookie từ server
});

let isRefreshing = false;
let failedQueue = [];

// Function to add failed requests to the queue
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

instance.interceptors.request.use(
  function (config) {
    const accessToken = store.getState().auth.login.accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response && response.data) return response.data;
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const status = error?.response?.status;
    const message = error?.response?.data?.message || "";

    if (
      status === 401 &&
      !originalRequest._retry &&
      message.toLowerCase().includes("token")
    ) {
      originalRequest._retry = true;
      if (isRefreshing) {
        // Nếu đang refresh => đưa request vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = "Bearer " + token;
              resolve(instance(originalRequest));
            },
            reject,
          });
        });
      }
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );
        const newAccessToken = res.data.accessToken;
        store.dispatch(setAccessToken(newAccessToken));
        processQueue(null, newAccessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = "Bearer " + newAccessToken;
        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        store.dispatch(logoutSuccess());
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error?.response?.data || error);
  }
);

export default instance;
