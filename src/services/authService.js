import { API } from '@/api/apiUrl';
import axiosInstance from '@/utils/axiosInstance';

export const authService = {
  login() {
    return axiosInstance.post(`${API.LOGIN}`);
  },
};
