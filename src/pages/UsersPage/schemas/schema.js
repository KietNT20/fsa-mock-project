import { REGEX } from "@/constant/regex";
import * as yup from "yup";

export const userModalSchema = yup.object().shape({
  email: yup
    .string()
    .test("is-email", "Enter a valid email", (value) => {
      const emailRegex = REGEX.EMAIL;
      return emailRegex.test(value);
    })
    .required("Email or username is required"),
  name: yup
    .string()
    .test("is-name", "Enter a valid name", (value) => {
      const nameRegex = REGEX.NAME;
      return nameRegex.test(value);
    })
    .required("Username is required"),
  role: yup.string().required("Role is required"),
});
