// components/SearchBar/index.jsx
import { Search } from "@mui/icons-material";
import { Autocomplete, InputAdornment, Paper, TextField } from "@mui/material";

const SearchBar = ({ data = [], onSearch, onSelect }) => {
  const getFilteredOptions = (searchText) => {
    return data.filter(
      (item) =>
        item.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  return (
    <Autocomplete
      fullWidth
      options={data}
      getOptionLabel={(option) => {
        // Nếu option là string (người dùng đang gõ), trả về chính nó
        if (typeof option === "string") return option;
        // Nếu option là object (từ data), trả về email hoặc name
        return option.email || option.name || "";
      }}
      filterOptions={(options, { inputValue }) => {
        return getFilteredOptions(inputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search user name or email..."
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <Paper
          component="li"
          {...props}
          sx={{
            p: 1,
            fontSize: "1.4rem",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <div>
            <div>{option.name}</div>
            <div style={{ fontSize: "1.2rem", color: "#666" }}>
              {option.email}
            </div>
          </div>
        </Paper>
      )}
      freeSolo
      onInputChange={(event, newInputValue) => {
        event.preventDefault();
        if (onSearch) onSearch(newInputValue);
      }}
      onChange={(event, newValue) => {
        event.preventDefault();
        if (onSelect && newValue && typeof newValue !== "string") {
          onSelect(newValue);
        }
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
