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
  name: yup.string().required("Username is required"),
  password: yup.string(),
});
