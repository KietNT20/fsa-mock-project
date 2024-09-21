import ButtonComp from "@/components/Button";
import InputText from "@/components/InputText";
import { useLogin } from "@/hooks/useLogin";
import { loginSchema } from "@/pages/LoginPage/schemas/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Facebook,
  Google,
  LinkedIn,
  Lock,
  Person,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { doLoginUser, loginLoading } = useLogin();

  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    doLoginUser({ email, password });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Box
      component="form"
      className="sign-in-form"
      onSubmit={(e) => handleSubmit(onSubmit)(e)}
      sx={{
        width: "100%",
        maxWidth: 500,
        margin: "0 auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "var(--white-cl)",
      }}
    >
      <Typography variant="h2" component="h2" className="title">
        SIGN IN
      </Typography>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputText
            {...field}
            fullWidth
            label="Email"
            type="text"
            placeholder="Please enter your email"
            size="medium"
            sx={styles.inputStyles}
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={loginLoading}
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

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <InputText
            {...field}
            label="Password"
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="Please enter your password"
            sx={styles.inputStyles}
            size="medium"
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={loginLoading}
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

      <ButtonComp
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={styles.buttonStyles}
      >
        {loginLoading ? <CircularProgress color="inherit" /> : "Sign in"}
      </ButtonComp>

      <Typography
        variant="body1"
        className="social-text"
        sx={{ mt: 2, fontSize: "1.4rem" }}
      >
        Or Sign in with social platforms
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
    </Box>
  );
};

export default LoginForm;

// Custom styles MUI components
export const styles = {
  buttonStyles: {
    height: "var(--height-btn)",
    width: "fit-content",
    px: "50px",
    mt: 3,
    fontSize: "1.8rem",
    backgroundColor: "var(--primary-color)",
    borderRadius: "49px",
  },
  inputStyles: {
    m: 3,
    "& .MuiOutlinedInput-root": {
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
