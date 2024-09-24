import { AUTH_ACTIONS } from "@/constant/action";

const initialState = {
  loading: false,
  user: null, // Khởi tạo user là null, vì thường user là một object
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        loading: true, // Đặt loading là true khi bắt đầu yêu cầu
        error: null, // Reset error khi thực hiện một request không
      };
    case AUTH_ACTIONS.REGISTER_REQUEST:
      return {
        ...state,
        loading: true, // Đặt loading là true khi bắt đầu yêu cầu
        error: null, // Reset error khi thực hiện một request mới
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false, // Tắt loading sau khi này
        user: action.payload, // Lưu thông tin người dùng vào store (thể là một object)
        error: null,
      };
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false, // Tắt loading sau khi thành công
        user: action.payload, // Lưu thông tin người dùng vào store (thường là một object)
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        loading: false, // Tắt loading sau khi thất bị
        error: action.payload, // Lưu thông tin lỗi
      };
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        loading: false, // Tắt loading sau khi thất bại
        error: action.payload, // Lưu thông tin lỗi
      };
    default:
      return state;
  }
};
