import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

const ProjectCreationModal = ({ open, onClose }) => {
  const [projectData, setProjectData] = useState({
    name: "",
    payment: "",
    time_start: null,
    time_end: null,
    note: "",
    priority: "",
  });

  const handleInputChange = (field, value) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = () => {
    console.log("projectData", projectData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="create-project-dialog-title"
        PaperProps={{
          sx: {
            padding: "30px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #f3f3f3, #e6e6fa)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
            width: "650px",
            maxWidth: "100%",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          id="create-project-dialog-title"
          sx={{
            fontSize: "2.6rem",
            color: "#444",
            fontWeight: "600",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
          }}
        >
          Create New Project
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingTop: "20px",
            paddingBottom: "10px",
          }}
        >
          <DialogContentText
            sx={{
              fontSize: "1.8rem",
              color: "#666",
              textAlign: "center",
              marginBottom: "10px",
              fontWeight: "500",
            }}
          >
            Fill in the project details below
          </DialogContentText>

          {/* Project Name */}
          <TextField
            label="Project Name"
            variant="outlined"
            fullWidth
            value={projectData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            sx={{
              marginBottom: "15px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontSize: "1.8rem",
              },
              "& .MuiInputLabel-root": {
                fontSize: "1.8rem",
              },
            }}
          />

          {/* Payment */}
          <TextField
            label="Payment"
            variant="outlined"
            fullWidth
            value={projectData.payment}
            onChange={(e) => handleInputChange("payment", e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontSize: "1.8rem",
              },
              "& .MuiInputLabel-root": {
                fontSize: "1.8rem",
              },
            }}
          />

          <DateTimePicker
            label="Start Date and Time"
            value={projectData.time_start}
            onChange={(newDate) => handleInputChange("time_start", newDate)}
            ampm={false} 
            slotProps={{
              textField: {
                marginBottom: "30px",
                fullWidth: true,
                margin: "normal",
                variant: "outlined",
                inputProps: {
                  style: {
                    fontSize: "1.8rem",
                    padding: "16px",
                  },
                },
                InputLabelProps: {
                  style: {
                    fontSize: "1.8rem",
                  },
                },
                InputProps: {
                  style: {
                    fontSize: "1.8rem",
                  },
                },
                sx: {
                  "& .MuiSvgIcon-root": {
                    fontSize: "2.4rem",
                  },
                },
              },
            }}
          />

          <DateTimePicker
            label="End Date and Time"
            value={projectData.time_end}
            onChange={(newDate) => handleInputChange("time_end", newDate)}
            ampm={false}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                variant: "outlined",
                inputProps: {
                  style: {
                    fontSize: "1.8rem", // Input text size
                    padding: "16px", // Input padding
                  },
                },
                InputLabelProps: {
                  style: {
                    fontSize: "1.8rem", // Label size
                  },
                },
                InputProps: {
                  style: {
                    fontSize: "1.8rem", // Label size
                  },
                },
                sx: {
                  "& .MuiSvgIcon-root": {
                    fontSize: "2.4rem", // Icon size
                  },
                },
              },
            }}
          />


          {/* Note */}
          <TextField
            label="Note"
            fullWidth
            multiline
            rows={2}
            value={projectData.note}
            onChange={(e) => handleInputChange("note", e.target.value)}
            sx={{
              marginTop: "10px",
              marginBottom: "15px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontSize: "1.8rem",
              },
              "& .MuiInputLabel-root": {
                fontSize: "1.8rem",
              },
            }}
          />

          {/* Priority */}
          <TextField
            label="Priority"
            select
            fullWidth
            value={projectData.priority}
            onChange={(e) => handleInputChange("priority", e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontSize: "1.8rem",
              },
              "& .MuiInputLabel-root": {
                fontSize: "1.8rem",
              },
            }}
          >
            <MenuItem value="" sx={{ fontSize: "1.6rem" }}>
              Priority
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
          </TextField>
        </DialogContent>

        {/* Actions */}
        <DialogActions
          sx={{
            justifyContent: "space-between",
            padding: "20px 40px",
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              color: "#fff",
              backgroundColor: "#ff4d4d",
              padding: "14px 30px",
              borderRadius: "50px",
              fontSize: "1.4rem",
              textTransform: "none",
              fontWeight: "500",
              boxShadow: "0px 4px 10px rgba(255, 77, 77, 0.3)",
              "&:hover": {
                backgroundColor: "#e60000",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            sx={{
              color: "#fff",
              backgroundColor: "#4CAF50",
              padding: "14px 30px",
              borderRadius: "50px",
              fontSize: "1.4rem",
              textTransform: "none",
              fontWeight: "500",
              boxShadow: "0px 4px 10px rgba(76, 175, 80, 0.3)",
              "&:hover": {
                backgroundColor: "#388E3C",
              },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ProjectCreationModal;
