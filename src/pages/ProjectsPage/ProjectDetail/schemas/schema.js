import { REGEX } from "@/constant/regex";
import * as yup from "yup";

export const projectModalDetailSchema = yup.object().shape({
  task_name: yup.string().required("Task name is required"),
  user_mail: yup
    .string()
    .test("is-email", "Enter a valid email", (value) => {
      const emailRegex = REGEX.EMAIL;
      return emailRegex.test(value);
    })
    .required("Email or username is required"),
  time_start: yup
    .date()
    .typeError("Start date must be a valid date")
    .required("Start date is required"),
  time_end: yup
    .date()
    .typeError("End date must be a valid date")
    .min(yup.ref("time_start"), "End date must be after the start date")
    .required("End date is required"),
});
