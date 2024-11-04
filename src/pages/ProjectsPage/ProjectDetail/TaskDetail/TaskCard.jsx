import { getStatusColor, getStatusText } from "@/utils/status";
import { Paper, Typography } from "@mui/material";

const TaskCard = ({ task, onClick, sx }) => {
  console.log("task", task);

  return (
    <Paper
      onClick={() => onClick(task)}
      sx={{
        minWidth: "330px",
        height: "100%",
        px: 3,
        py: 2,
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        },
        ...sx,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 2,
          fontSize: "1.8rem",
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
        <strong>User:</strong> {task.user_name}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
        <strong>User Email:</strong> {task.user_mail}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
        <strong>Note:</strong> {task.note}
      </Typography>
    </Paper>
  );
};

export default TaskCard;
