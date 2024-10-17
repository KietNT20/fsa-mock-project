import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterByStatus = ({ onFilter, currentFilter, menuItems }) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="priority-filter-label" sx={{ fontSize: "1.4rem" }}>
        Filter by Status
      </InputLabel>
      <Select
        labelId="role-filter-label"
        value={currentFilter}
        onChange={(e) => onFilter(e.target.value)}
        label="Filter by Status"
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
        {menuItems.map((menuItem) => (
          <MenuItem key={menuItem.value} value={menuItem.value} sx={{ fontSize: "1.4rem" }}>
            <Box display="flex" justifyContent="space-between" width="100%">
              {menuItem.label}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterByStatus;
