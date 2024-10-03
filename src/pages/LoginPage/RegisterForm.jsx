import ButtonComp from "@/components/Button";
import ConfirmationModal from "@/components/ConfirmationModal";
import InputText from "@/components/InputText";
import Spinner from "@/components/Spinner";
import { useRegister } from "@/hooks/useRegister";
import { registerSchema } from "@/pages/LoginPage/schemas/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Email,
  Facebook,
  Google,
  LinkedIn,
  Lock,
  Person,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    doRegisterUser,
    registerLoading,
    isModalOpen,
    handleCloseModal,
    handleConfirmNavigate,
  } = useRegister();

  const onSubmit = (data) => {
    // console.log("Form Data Submitted:", data);
    doRegisterUser(data);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Box
      component="form"
      className="sign-up-form"
      sx={{
        width: "100%",
        maxWidth: 450,
        margin: "0 auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {registerLoading && <Spinner />}
      <Typography variant="h2" component="h2" className="title">
        SIGN UP
      </Typography>

      {/* Username input */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <InputText
            {...field}
            fullWidth
            type="text"
            label="Name"
            placeholder="Please enter your name"
            variant="outlined"
            size="medium"
            disabled={registerLoading}
            sx={styles.inputStyles}
            error={!!errors.name}
            helperText={errors.name?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" sx={{ fontSize: "2rem" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      {/* Email input */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputText
            {...field}
            fullWidth
            type="email"
            label="Email"
            placeholder="Please enter your email"
            variant="outlined"
            size="medium"
            disabled={registerLoading}
            sx={styles.inputStyles}
            error={!!errors.email}
            helperText={errors.email?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" sx={{ fontSize: "2rem" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      {/* Password input */}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <InputText
            {...field}
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Please enter your password"
            variant="outlined"
            size="medium"
            disabled={registerLoading}
            sx={styles.inputStyles}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" sx={{ fontSize: "2rem" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword()}
                      onMouseDown={(event) => handleMouseDownPassword(event)}
                    >
                      {showPassword ? (
                        <Visibility sx={{ fontSize: "2rem" }} />
                      ) : (
                        <VisibilityOff sx={{ fontSize: "2rem" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      {/* Submit Button */}
      <ButtonComp
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={registerLoading}
        sx={styles.buttonStyles}
      >
        Sign up
      </ButtonComp>

      {/* Social Media Section */}
      <Typography
        variant="body1"
        className="social-text"
        sx={{ mt: 2, fontSize: "1.4rem" }}
      >
        Or Sign up with social platforms
      </Typography>

      <Box className="social-media" sx={{ display: "flex", gap: 1, mt: 1 }}>
        {[Facebook, Twitter, Google, LinkedIn].map((Icon, index) => (
          <IconButton
            key={index}
            className="social-icon"
            sx={{ border: 1, borderColor: "grey.300" }}
          >
            <Icon fontSize="large" />
          </IconButton>
        ))}
      </Box>

      {/* Confirmation Modal */}

      <ConfirmationModal
        open={isModalOpen}
        onClose={() => handleCloseModal()}
        onConfirm={() => handleConfirmNavigate()}
        title="Confirm Navigation"
        content="Registration successful! Would you like to go to the login page?"
        disagree="Cancel"
        agree="Go to Login"
      />
    </Box>
  );
};

// Custom styles MUI components
export const styles = {
  buttonStyles: {
    height: "var(--height-btn)",
    width: "fit-content",
    px: "50px",
    fontSize: "1.4rem",
    backgroundColor: "var(--primary-color)",
    borderRadius: "49px",
  },
  inputStyles: {
    m: 3,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&:hover fieldset": {
        borderColor: "var(--primary-color)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--primary-color)",
        borderWidth: "2px",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "1.6rem",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.6rem",
      top: "-8px",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "1.2rem",
      marginTop: "8px",
      fontWeight: 500,
    },
  },
};

export default RegisterForm;
