import { REGEX } from "@/constant/regex";
import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .test("is-email", "Enter a valid email", (value) => {
      const emailRegex = REGEX.EMAIL;
      return emailRegex.test(value);
    })
    .required("Email or username is required"),
  password: yup
    .string()
    .test(
      "is-valid-password",
      "Password have at least 7 characters, must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      (value) => {
        const passwordRegex = REGEX.PASSWORD;
        return passwordRegex.test(value);
      },
    )
    .required("Password is required"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(REGEX.EMAIL, "Invalid email")
    .required("Email is required"),
  name: yup.string().required("Username is required"),
  password: yup
    .string()
    .test(
      "is-valid-password",
      "Password have at least 7 characters, must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      (value) => {
        const passwordRegex = REGEX.PASSWORD;
        return passwordRegex.test(value);
      },
    )
    .required("Password is required"),
});
