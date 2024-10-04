import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search user name or email..."
      onChange={(e) => onSearch(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          fontSize: "1.4rem",
          "& fieldset": {
            borderColor: "#90caf9",
          },
          "&:hover fieldset": {
            borderColor: "#1565c0",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#0d47a1",
          },
        },
        "& .MuiInputLabel-root": {
          fontSize: "1.4rem",
        },
      }}
    />
  );
};

export default SearchBar;
