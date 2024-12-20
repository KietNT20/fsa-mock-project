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
import { projectModalSchema } from "./schemas/schema";

const ProjectModal = ({
  open,
  onClose,
  mode,
  project,
  onCreateProject,
  onUpdateProject,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState(dayjs());

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(projectModalSchema),
    defaultValues: {
      name: "",
      payment: "",
      time_start: currentDateTime,
      time_end: null,
      note: "",
      priority: "",
    },
  });

  useEffect(() => {
    if (mode === "create") {
      setCurrentDateTime(dayjs());
    }

    if (mode === "update" && project) {
      reset({
        name: project.name || "",
        payment: project.payment || "",
        time_start: project.time_start ? dayjs(project.time_start) : dayjs(),
        time_end: project.time_end ? dayjs(project.time_end) : null,
        note: project.note || "",
        priority: project.priority || "",
      });
    } else if (mode === "create") {
      reset({
        name: "",
        payment: "",
        time_start: dayjs(),
        time_end: null,
        note: "",
        priority: "",
      });
    }
  }, [mode, project, reset]);

  const onSubmit = (data) => {
    if (mode === "create") {
      onCreateProject(data);
    } else if (mode === "update") {
      onUpdateProject({ ...data, id: project.id });
    }
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="create-project-dialog-title"
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
          {mode === "create" ? "Create New Project" : "Update Project"}
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
            {mode === "create"
              ? "Fill in the project details below"
              : "Update the project details below"}
          </DialogContentText>

          {/* Project Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Project Name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
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

          {/* Payment */}
          <Controller
            name="payment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Payment"
                variant="outlined"
                fullWidth
                error={!!errors.payment}
                helperText={errors.payment?.message}
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

          {/* Start Date */}
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
                disabled={mode === "update"}
                views={["year", "month", "day", "hours", "minutes"]}
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

          {/* End Date */}
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
                views={["year", "month", "day", "hours", "minutes"]}
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
                sx={{
                  marginTop: "10px",
                  marginBottom: "15px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1.8rem",
                  },
                }}
              />
            )}
          />

          {/* Priority */}
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Priority"
                select
                fullWidth
                error={!!errors.priority}
                helperText={errors.priority?.message}
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
                <MenuItem value="" sx={{ fontSize: "1.6rem" }}>
                  Priority
                </MenuItem>
                <MenuItem value="1" sx={{ fontSize: "1.6rem" }}>
                  High
                </MenuItem>
                <MenuItem value="2" sx={{ fontSize: "1.6rem" }}>
                  Medium
                </MenuItem>
                <MenuItem value="3" sx={{ fontSize: "1.6rem" }}>
                  Low
                </MenuItem>
              </TextField>
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
            onClick={onClose}
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
            onClick={handleSubmit(onSubmit)}
            sx={{
              color: "#fff",
              backgroundColor: mode === "create" ? "#4CAF50" : "#1565C0",
              padding: "14px 30px",
              borderRadius: "50px",
              fontSize: "1.4rem",
              textTransform: "none",
              fontWeight: "500",
              boxShadow: "0px 4px 10px rgba(76, 175, 80, 0.3)",
              "&:hover": {
                backgroundColor: mode === "create" ? "#388E3C" : "#0B4C8C",
              },
            }}
          >
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ProjectModal;
