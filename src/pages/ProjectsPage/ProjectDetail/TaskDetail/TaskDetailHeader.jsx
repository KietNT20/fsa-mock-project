// components/TaskDetail/TaskDetailHeader.jsx
import { getStatusText } from "@/utils/status";
import { Box, Divider, Typography } from "@mui/material";

const TaskDetailHeader = ({ taskName, status, statusColor }) => (
  <>
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h5"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          color: "black",
          backgroundColor: statusColor,
          padding: "10px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        {taskName}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontSize: "1.8rem",
          color: "#2d2f30",
          mt: 1,
        }}
      >
        Status: {getStatusText(status)}
      </Typography>
    </Box>
    <Divider style={{ margin: "10px 0", border: "0.5px solid #666666" }} />
  </>
);

export default TaskDetailHeader;
