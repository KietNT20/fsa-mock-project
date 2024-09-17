import axiosInstance from '@/utils/axiosInstance';

export const authService = {
  login() {
    return axiosInstance.post(`/login`);
  },
};
