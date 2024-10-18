import { REGEX } from "@/constant/regex";
import * as yup from "yup";

export const projectModalSchema = yup.object().shape({
  name: yup.string().required("Project name is required"),

  payment: yup
    .string()
    .test("is-payment", "Enter a valid payment amount", (value) => {
      const paymentRegex = REGEX.PAYMENT;
      return paymentRegex ? paymentRegex.test(value) : true;
    })

    .max(6, "Maximum payment is 6 numbers")
    .required("Payment is required"),

  time_start: yup
    .date()
    .typeError("Start date must be a valid date")
    .required("Start date is required"),

  time_end: yup
    .date()
    .typeError("End date must be a valid date")
    .min(yup.ref("time_start"), "End date must be after the start date")
    .required("End date is required"),
  priority: yup.string().required("Priority is required"),
});
