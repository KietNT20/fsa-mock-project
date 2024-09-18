import { API } from "@/api/apiUrl";
import axiosInstance from "@/utils/axiosInstance";

export const authService = {
  login(payload) {
    return axiosInstance.post(`${API.LOGIN}`, payload);
  },
};

export const loginUser = async (payload) => {
  try {
    const res = await authService.login(payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
