import { Box, Button, DialogActions } from "@mui/material";

const TaskDetailActions = ({ onClose, onUpdate, onDelete, loading }) => (
  <DialogActions sx={{ justifyContent: "space-between", pt: 0, pb: 3, px: 3 }}>
    <Button
      onClick={onClose}
      disabled={loading}
      color="secondary"
      sx={{
        color: "#fff",
        backgroundColor: "#afb3b3",
        padding: "14px 30px",
        borderRadius: "50px",
        fontSize: "1.5rem",
        textTransform: "none",
        fontWeight: "500",
        marginRight: "10px",
        marginLeft: "20px",
        "&:hover": {
          backgroundColor: "#8c9090",
        },
      }}
    >
      Cancel
    </Button>

    <Box>
      <Button
        onClick={onUpdate}
        disabled={loading}
        variant="contained"
        color="primary"
        sx={{
          color: "#fff",
          backgroundColor: "#1565C0",
          padding: "14px 30px",
          borderRadius: "50px",
          fontSize: "1.5rem",
          textTransform: "none",
          fontWeight: "500",
          marginRight: "15px",
          "&:hover": {
            backgroundColor: "#0B4C8C",
          },
        }}
      >
        Update
      </Button>
      <Button
        onClick={onDelete}
        disabled={loading}
        variant="contained"
        color="error"
        sx={{
          color: "#fff",
          backgroundColor: "#ff4d4d",
          padding: "14px 30px",
          borderRadius: "50px",
          fontSize: "1.5rem",
          textTransform: "none",
          fontWeight: "500",
          marginRight: "20px",
          "&:hover": {
            backgroundColor: "#e60000",
          },
        }}
      >
        Delete
      </Button>
    </Box>
  </DialogActions>
);

export default TaskDetailActions;
