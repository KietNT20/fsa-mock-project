import Spinner from "@/components/Spinner";
import { useUpdateApiUser, useUpdateRoleUser } from "@/hooks/useUsers";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { userModalSchema } from "./schemas/schema";

const UserModal = ({
  open,
  onClose,
  mode,
  user,
  onCreateUser,
  createLoading,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userModalSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });
  const { userProfile } = useSelector((state) => state.userProfile);

  const isRoleDisabled = userProfile?.role === 0 || createLoading;

  const { mutate: updateUserInfo, isPending: updateUserNameLoading } =
    useUpdateApiUser();

  const { mutate: updateUserRole, isPending: updateUserRoleLoading } =
    useUpdateRoleUser();

  useEffect(() => {
    if (mode === "update" && user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
        role: user.role?.toString() || "",
      });
    } else {
      reset({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    }
  }, [mode, user, reset]);

  const onSubmit = async (data) => {
    if (mode === "create") {
      onCreateUser({ ...data, role: "0" });
    } else if (mode === "update") {
      console.log("data", data);
      if (data.name !== user.name || data.password !== user.password) {
        await updateUserInfo({
          email: user.email,
          name: data.name,
          password: data.password,
        });
      }
      if (data.role !== user.role?.toString()) {
        await updateUserRole({ email: user.email, role: parseInt(data.role) });
      }
    }
    onClose();
  };

  const isSubmitDisabled =
    createLoading || updateUserNameLoading || updateUserRoleLoading;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="user-modal-title"
      PaperProps={{
        sx: {
          padding: "30px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #f3f3f3, #e6e6fa)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
          width: "50%",
          maxWidth: "100%",
          overflow: "hidden",
        },
      }}
    >
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        {isSubmitDisabled && <Spinner />}
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
          {mode === "create" ? "Create New User" : "Update User"}
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
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
              ? "Fill in the user details below"
              : "Update the user details below"}
          </DialogContentText>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="User Name"
                variant="outlined"
                fullWidth
                disabled={isSubmitDisabled}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
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

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                disabled={isSubmitDisabled || mode === "update"}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
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

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={
                  mode === "create" ? "Password: User@123" : "New Password"
                }
                variant="outlined"
                fullWidth
                disabled={isSubmitDisabled || mode === "create"}
                value={field.value}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
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

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Role"
                value={mode === "create" ? "0" : field.value}
                disabled={
                  isRoleDisabled || isSubmitDisabled || mode === "create"
                }
                fullWidth
                error={!!errors.role}
                helperText={errors.role?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1.8rem",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "1.6rem", // Adjust this value to increase the font size of the error message
                    color: "#d32f2f", // Ensures the error message remains red
                  },
                }}
              >
                <MenuItem value="1" sx={{ fontSize: "1.6rem" }}>
                  ADMIN
                </MenuItem>
                <MenuItem value="0" sx={{ fontSize: "1.6rem" }}>
                  USER
                </MenuItem>
              </TextField>
            )}
          />
        </DialogContent>

        <DialogActions
          sx={{
            width: "100%",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              color: "#fff",
              backgroundColor: "#ff4d4d",
              padding: "1.4rem 8rem",
              borderRadius: "10px",
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
            type="submit"
            disabled={isSubmitDisabled}
            sx={{
              color: "#fff",
              backgroundColor: mode === "create" ? "#4CAF50" : "#1565C0",
              padding: "1.4rem 8rem",
              borderRadius: "10px",
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
      </Box>
    </Dialog>
  );
};

export default UserModal;
