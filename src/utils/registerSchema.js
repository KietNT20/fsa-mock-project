import { REGEX } from "@/constant/regex"; // Đường dẫn đến file chứa các regex constants
import * as yup from "yup";

export const registerSchema = yup.object().shape({
  // Kiểm tra username bằng cách chấp nhận cả email và username
  username: yup
    .string()
    .test(
      "is-email-or-username",
      "Enter a valid email or username",
      (value) => {
        const emailRegex = REGEX.EMAIL;
        const usernameRegex = REGEX.USERNAME;
        return emailRegex.test(value) || usernameRegex.test(value);
      },
    )
    .required("Username or email is required"),

  // Kiểm tra email hợp lệ bằng regex
  email: yup
    .string()
    .email("Invalid email")
    .matches(REGEX.EMAIL, "Invalid email")
    .required("Email is required"),

  // Kiểm tra mật khẩu có tối thiểu 8 ký tự
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  role: yup.string().required("Role is required"),
});
