import { Divider, Paper, Typography } from "@mui/material";
import TaskByProject from "./TaskByProject";

const ProjectTask = ({ taskList, taskLoading, taskError }) => {
  return (
    <div>
      {/* Display tasks below the project details */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: "12px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          color: "#424242",
          maxHeight: "330px",
          overflowY: "auto",
          mx: "auto",
          mt: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, fontSize: "2rem" }}
        >
          Project Tasks
        </Typography>
        <Divider
          sx={{ marginY: 1, borderColor: "#808585", borderWidth: "0.5px" }}
        />
        <TaskByProject
          taskList={taskList}
          taskLoading={taskLoading}
          taskError={taskError}
        />
      </Paper>
    </div>
  );
};

export default ProjectTask;
