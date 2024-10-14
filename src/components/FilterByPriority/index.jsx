import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterByPriority = ({ onFilter, currentFilter }) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="priority-filter-label" sx={{ fontSize: "1.4rem" }}>
        Filter by Priority
      </InputLabel>
      <Select
        labelId="role-filter-label"
        value={currentFilter}
        onChange={(e) => onFilter(e.target.value)}
        label="Filter by Priority"
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
          All Priorities
        </MenuItem>
        <MenuItem value="1" sx={{ fontSize: "1.4rem" }}>
          High
        </MenuItem>
        <MenuItem value="2" sx={{ fontSize: "1.4rem" }}>
          Medium
        </MenuItem>
        <MenuItem value="3" sx={{ fontSize: "1.4rem" }}>
          Low
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterByPriority;
