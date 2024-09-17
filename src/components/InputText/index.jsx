import { InputAdornment, TextField } from '@mui/material';

const InputText = ({ type, placeholder, startIcon, endIcon, sx, ...props }) => (
  <TextField
    fullWidth
    type={type}
    placeholder={placeholder}
    variant="outlined"
    size="medium"
    sx={sx}
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
export default InputText;
