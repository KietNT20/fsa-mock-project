import { API } from "@/api/apiUrl";
import { AUTH_ACTIONS } from "@/constant/action";
import axiosInstance from "@/utils/axiosInstance";

// Action for logging in user
export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_REQUEST });

    try {
      const res = await axiosInstance.post(`${API.LOGIN}`, { email, password });

      // Lưu res.data thay vì toàn bộ res
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: res });

      return res.data; // Trả về dữ liệu để các nơi khác có thể sử dụng
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        // Đảm bảo có lỗi từ response, nếu không trả về message mặc định
        payload: error.response?.data || "An error occurred while logging in.",
      });

      // Ném lỗi để các nơi gọi bắt được
      throw error.response?.data || error.message;
    }
  };

// Action for registering user
export const registerUser =
  ({ name, email, password }) =>
  async (dispatch) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_REQUEST });

    try {
      console.log("Sending Data: ", { name, email, password });
      const res = await axiosInstance.post(`${API.REGISTER}`, {
        name,
        email,
        password,
      });

      // Lưu res.data thay vì toàn bộ res
      dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: res });

      return res.data; // Trả về dữ liệu để các nơi khác có thể sử dụng
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        // Đảm bảo có lỗi từ response, nếu không trả về message mặc định
        payload:
          error.response?.data || "An error occurred during registration.",
      });

      // Ném lỗi để các nơi gọi bắt được
      throw error.response?.data || error.message;
    }
  };
