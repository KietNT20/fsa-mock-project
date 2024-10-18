import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { projectModalDetailSchema } from "./schemas/schema";

const ProjectDetailModal = ({
  open,
  handleClose,
  projectId,
  onSubmitTask,
  taskData,
  isUpdate,
  disabled,
}) => {
  const [currentDateTime] = useState(dayjs());

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      task_name: taskData?.task_name || "",
      user_mail: taskData?.user_mail || "",
      project_id: projectId || taskData?.project_id || "",
      status: taskData?.status || "",
      note: taskData?.note || "",
      time_start: taskData?.time_start || currentDateTime,
      time_end: taskData?.time_end || null,
    },
    resolver: yupResolver(projectModalDetailSchema),
  });

  useEffect(() => {
    if (taskData && isUpdate) {
      // Reset form fields with task data when updating
      reset({
        task_name: taskData.task_name,
        user_mail: taskData.user_mail,
        project_id: taskData.project_id,
        status: taskData.status,
        note: taskData.note,
        time_start: taskData.time_start
          ? dayjs(taskData.time_start)
          : currentDateTime,
        time_end: taskData.time_end ? dayjs(taskData.time_end) : null,
      });
    } else {
      reset({
        user_mail: "",
        project_id: projectId || "",
        status: "1",
        note: "",
        time_start: currentDateTime,
        time_end: null,
      });
    }
  }, [open, projectId, reset, taskData, isUpdate, currentDateTime]);

  const onSubmit = (data) => {
    console.log(data);
    onSubmitTask({ ...data, project_id: projectId });
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="create-task-dialog-title"
        PaperProps={{
          sx: {
            padding: "30px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #f3f3f3, #e6e6fa)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
            width: "650px",
            maxWidth: "100%",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "2.6rem",
            color: "#444",
            fontWeight: "600",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
          }}
        >
          {isUpdate ? "Update Task" : "Create New Task"}
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingTop: "20px",
            paddingBottom: "10px",
          }}
        >
          <DialogContentText
            sx={{
              fontSize: "1.8rem",
              color: "#666",
              textAlign: "center",
              marginBottom: "10px",
              fontWeight: "500",
            }}
          >
            {isUpdate
              ? "Update the task details below"
              : "Fill in the task details below"}
          </DialogContentText>

          {/* Task Name */}
          <Controller
            name="task_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Task Name"
                variant="outlined"
                fullWidth
                error={!!errors.task_name}
                helperText={errors.task_name?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1.8rem",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "1.6rem",
                    color: "#d32f2f",
                  },
                }}
              />
            )}
          />
          {/* User Mail */}
          <Controller
            name="user_mail"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="User Mail"
                variant="outlined"
                fullWidth
                error={!!errors.user_mail}
                helperText={errors.user_mail?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1.8rem",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "1.6rem",
                    color: "#d32f2f",
                  },
                }}
              />
            )}
          />

          {/* Status */}
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Status"
                select
                fullWidth
                error={!!errors.status}
                helperText={errors.status?.message}
                disabled
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1.8rem",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "1.6rem",
                    color: "#d32f2f",
                  },
                }}
              >
                <MenuItem value="1" sx={{ fontSize: "1.6rem" }}>
                  Not Started
                </MenuItem>
                <MenuItem value="2" sx={{ fontSize: "1.6rem" }}>
                  In Process
                </MenuItem>
                <MenuItem value="3" sx={{ fontSize: "1.6rem" }}>
                  Done
                </MenuItem>
              </TextField>
            )}
          />

          {/* Time Start */}
          <Controller
            name="time_start"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="Start Date and Time"
                ampm={false}
                minutesStep={1}
                secondsStep={1}
                minDateTime={currentDateTime}
                views={["year", "month", "day", "hours", "minutes", "seconds"]}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    error: !!errors.time_start,
                    helperText: errors.time_start?.message,
                    inputProps: {
                      style: {
                        fontSize: "1.8rem",
                        padding: "16px",
                      },
                    },
                    InputLabelProps: {
                      style: {
                        fontSize: "1.8rem",
                      },
                    },
                    InputProps: {
                      style: {
                        fontSize: "1.8rem",
                      },
                    },
                    sx: {
                      "& .MuiSvgIcon-root": {
                        fontSize: "2.4rem",
                      },
                      "& .MuiFormHelperText-root": {
                        fontSize: "1.6rem",
                        color: "#d32f2f",
                      },
                    },
                  },
                }}
              />
            )}
          />

          {/* Time End */}
          <Controller
            name="time_end"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="End Date and Time"
                ampm={false}
                minutesStep={1}
                secondsStep={1}
                views={["year", "month", "day", "hours", "minutes", "seconds"]}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    error: !!errors.time_end,
                    helperText: errors.time_end?.message,
                    inputProps: {
                      style: {
                        fontSize: "1.8rem",
                        padding: "16px",
                      },
                    },
                    InputLabelProps: {
                      style: {
                        fontSize: "1.8rem",
                      },
                    },
                    InputProps: {
                      style: {
                        fontSize: "1.8rem",
                      },
                    },
                    sx: {
                      "& .MuiSvgIcon-root": {
                        fontSize: "2.4rem",
                      },
                      "& .MuiFormHelperText-root": {
                        fontSize: "1.6rem",
                        color: "#d32f2f",
                      },
                    },
                  },
                }}
              />
            )}
          />

          {/* Note */}
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Note"
                fullWidth
                multiline
                rows={2}
                error={!!errors.user_mail}
                helperText={errors.user_mail?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1.8rem",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "1.6rem",
                    color: "#d32f2f",
                  },
                }}
              />
            )}
          />
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "space-between",
            padding: "20px 40px",
          }}
        >
          <Button
            onClick={() => handleClose()}
            disabled={disabled}
            sx={{
              color: "#fff",
              backgroundColor: "#ff4d4d",
              padding: "14px 30px",
              borderRadius: "50px",
              fontSize: "1.4rem",
              textTransform: "none",
              fontWeight: "500",
              boxShadow: "0px 4px 10px rgba(255, 77, 77, 0.3)",
              "&:hover": {
                backgroundColor: "#e60000",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit(onSubmit)()}
            disabled={disabled}
            sx={{
              color: "#fff",
              backgroundColor: isUpdate ? "#1565C0" : "#4CAF50",
              padding: "14px 30px",
              borderRadius: "50px",
              fontSize: "1.4rem",
              textTransform: "none",
              fontWeight: "500",
              boxShadow: `0px 4px 10px rgba(${isUpdate ? "33, 150, 243" : "76, 175, 80"}, 0.3)`,
              "&:hover": {
                backgroundColor: isUpdate ? "#0B4C8C" : "#388E3C",
              },
            }}
          >
            {isUpdate ? "Update Task" : "Create Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ProjectDetailModal;
