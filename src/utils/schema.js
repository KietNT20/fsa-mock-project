import { REGEX } from "@/constant/regex";
import * as yup from "yup";

export const schema = yup.object().shape({
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
