import { InputAdornment, TextField } from "@mui/material";
import { forwardRef } from "react";

const InputText = (
  { type, disabled, placeholder, startIcon, endIcon, sx, ...props },
  ref
) => (
  <TextField
    fullWidth
    type={type}
    placeholder={placeholder}
    variant="outlined"
    size="medium"
    sx={sx}
    disabled={disabled}
    ref={ref}
    slotProps={{
      input: {
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ),
      },
    }}
    {...props}
  />
);
export default forwardRef(InputText);
