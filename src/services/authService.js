import { API } from "@/api/apiUrl";
import axiosInstance from "@/utils/axiosInstance";

export const authService = {
  login(payload) {
    return axiosInstance.post(`${API.LOGIN}`, payload);
  },
};
