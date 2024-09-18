import { InputAdornment, TextField } from "@mui/material";
import { forwardRef } from "react";

const InputText = (
  { type, placeholder, startIcon, endIcon, sx, ...props },
  ref,
) => (
  <TextField
    fullWidth
    type={type}
    placeholder={placeholder}
    variant="outlined"
    size="medium"
    sx={sx}
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
