import { getStatusColor, getStatusText } from "@/utils/status";
import { Paper, Typography } from "@mui/material";

const TaskCard = ({ task, onClick }) => {
  return (
    <Paper
      onClick={() => onClick(task)}
      sx={{
        minWidth: "350px",
        px: 4,
        py: 3,
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 2,
          fontSize: "2rem",
          backgroundColor: getStatusColor(task.status),
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        Status: {getStatusText(task.status)}
      </Typography>

      <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
        <strong>Task Name:</strong> {task.task_name}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
        <strong>Note:</strong> {task.note}
      </Typography>
    </Paper>
  );
};

export default TaskCard;
