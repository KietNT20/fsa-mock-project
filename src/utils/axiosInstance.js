import { API } from '@/api/apiUrl';
import axios from 'axios';
import { BASE_URL } from './environment';
import tokenMethod from './token';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.log('error', error);
    const originalRequest = error.config;

    // If error status is 403 or 401 and request has not key _retry
    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Call API refresh token for new token
        const res = await axiosInstance.put(`${API.REFRESH_TOKEN}`, {
          refreshToken: tokenMethod.get()?.refreshToken,
        });
        const { token: accessToken, refreshToken } = res.data?.data || {};

        // Save new token to localStorage
        tokenMethod.set({
          accessToken,
          refreshToken,
        });

        // Change Authorization header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Call API again with new token
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
        // Handle when refresh token fail
        tokenMethod.remove();
      }
    }

    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
