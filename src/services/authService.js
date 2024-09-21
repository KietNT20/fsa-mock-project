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

export const loginUser = async ({ email, password }) => {
  try {
    const res = await authService.login({ email, password });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const registerUser = async ({ email, name, password }) => {
  try {
    const res = await authService.register({ email, name, password });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
