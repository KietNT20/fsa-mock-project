import { InputAdornment, TextField } from "@mui/material";
import { forwardRef } from "react";

const InputText = (
  { type, disabled, placeholder, label, startIcon, endIcon, sx, ...props },
  ref,
) => (
  <TextField
    label={label}
    type={type}
    placeholder={placeholder}
    size="medium"
    variant="outlined"
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
