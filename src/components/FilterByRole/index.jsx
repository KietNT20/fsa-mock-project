import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterByRole = ({ onFilter, currentFilter }) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="role-filter-label" sx={{ fontSize: "1.4rem" }}>
        Filter by Role
      </InputLabel>
      <Select
        labelId="role-filter-label"
        value={currentFilter}
        onChange={(e) => onFilter(e.target.value)}
        label="Filter by Role"
        sx={{
          fontSize: "1.4rem",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#90caf9",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1565c0",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0d47a1",
          },
          "&.MUIFormLabel-root-Mui-focused": {
            color: "#0d47a1",
          },
        }}
      >
        <MenuItem value="all" sx={{ fontSize: "1.4rem" }}>
          All Roles
        </MenuItem>
        <MenuItem value="0" sx={{ fontSize: "1.4rem" }}>
          User
        </MenuItem>
        <MenuItem value="1" sx={{ fontSize: "1.4rem" }}>
          Admin
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterByRole;
