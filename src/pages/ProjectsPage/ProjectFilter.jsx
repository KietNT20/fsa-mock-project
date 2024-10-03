import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const ProjectFilter = ({ searchQuery, setSearchQuery, selectedPriority, setSelectedPriority }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end", // Align search and select to the right
                gap: 2, // Add space between the search and select components
                marginBottom: 2, // Optional: Add some space below the filters
            }}
        >
            {/* Search Input */}
            <TextField
                label="Search by project name"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                    width: "100%", // Adjust the width as needed
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        fontSize: "1.8rem",
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: "1.8rem",
                    },
                }}
            />

            {/* Select Input for filtering by priority */}
            <FormControl
                variant="outlined"
                sx={{
                    minWidth: 150,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        fontSize: "1.8rem",
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: "1.8rem",
                    },
                }}
            >
                <InputLabel>Priority</InputLabel>
                <Select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    label="Priority"
                >
                    <MenuItem value="" sx={{ fontSize: "1.6rem" }}>
                        All
                    </MenuItem>
                    <MenuItem value="1" sx={{ fontSize: "1.6rem" }}>
                        High
                    </MenuItem>
                    <MenuItem value="2" sx={{ fontSize: "1.6rem" }}>
                        Medium
                    </MenuItem>
                    <MenuItem value="3" sx={{ fontSize: "1.6rem" }}>
                        Low
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default ProjectFilter;
