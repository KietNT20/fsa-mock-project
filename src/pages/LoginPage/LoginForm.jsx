import ButtonComp from "@/components/Button";
import InputText from "@/components/InputText";
import { useLogin } from "@/hooks/useLogin";
import { schema } from "@/utils/schema";
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
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

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
    mt: 3,
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
      fontSize: "1.4rem",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "1.2rem",
      marginTop: "8px",
      fontWeight: 500,
    },
  },
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { doLoginUser, isPending } = useLogin();

  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    doLoginUser({ email, password });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      component="form"
      className="sign-in-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h2" component="h2" className="title">
        Sign in
      </Typography>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputText
            {...field}
            fullWidth
            type="text"
            placeholder="Email or Username"
            variant="outlined"
            size="medium"
            sx={styles.inputStyles}
            error={!!errors.email}
            helperText={errors.email?.message}
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
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            variant="outlined"
            sx={styles.inputStyles}
            size="medium"
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
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
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
        Login
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
