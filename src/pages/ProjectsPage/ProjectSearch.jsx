import { Search } from "@mui/icons-material";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";

const ProjectSearch = ({ data = [], onSearch }) => {
  return (
    <Autocomplete
      fullWidth
      freeSolo
      options={data}
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        return option.name || "";
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search Project Name..."
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
      onInputChange={(_, newValue) => {
        onSearch(newValue || "");
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
      }}
    />
  );
};

export default ProjectSearch;
