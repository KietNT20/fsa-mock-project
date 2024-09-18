import { API } from "@/api/apiUrl";
import axiosInstance from "@/utils/axiosInstance";

export const authService = {
  login(payload) {
    return axiosInstance.post(`${API.LOGIN}`, payload);
  },
  register(payload) {
    return axiosInstance.post(`${API.REGISTER}`, payload);
  },
};

export const loginUser = async ({ name, password }) => {
  try {
    const res = await authService.login({ name, password });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
