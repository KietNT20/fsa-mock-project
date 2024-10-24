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
    .min(5, "Password must be at least 5 characters")
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
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});
