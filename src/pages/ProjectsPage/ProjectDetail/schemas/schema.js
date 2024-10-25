import dayjs from "dayjs";
import * as yup from "yup";

export const createProjectModalDetailSchema = (
  projectTimeStart,
  projectTimeEnd,
) => {
  return yup.object().shape({
    task_name: yup.string().required("Task name is required"),
    user_mail: yup
      .string()
      .email("Invalid email format")
      .required("User mail is required"),
    status: yup.string().required("Status is required"),
    note: yup.string(),
    time_start: yup
      .date()
      .required("Start time is required")
      .min(
        dayjs(projectTimeStart).toDate(),
        "Task start time must be after project start time",
      )
      .max(
        dayjs(projectTimeEnd).toDate(),
        "Task start time must be before project end time",
      ),
    time_end: yup
      .date()
      .required("End time is required")
      .min(yup.ref("time_start"), "End time must be after start time")
      .max(
        dayjs(projectTimeEnd).toDate(),
        "Task end time must be before project end time",
      ),
  });
};
