import ConfirmationModal from "@/components/ConfirmationModal";
import { useDeleteTask, useUpdateTask } from "@/hooks/useTask";
import { Box, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import ProjectDetailModal from "./ProjectDetailModal";
import TaskCard from "./TaskDetail/TaskCard";
import TaskDetailModal from "./TaskDetail/TaskDetailModal";

const TaskByProject = ({ taskList, taskLoading, taskError }) => {
  const [open, setOpen] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const handleClickOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskFormOpen(false);
    setSelectedTask(null);
  };

  const handleDelete = () => {
    if (selectedTask?.id) {
      deleteTask(
        { id: selectedTask.id },
        {
          onSuccess: () => {
            handleClose();
          },
          onError: (err) => {
            console.error("Delete Error:", err);
          },
        },
      );
    }
    setConfirmOpen(false);
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleUpdateClick = () => {
    setOpen(false);
    setTaskFormOpen(true);
  };

  const handleUpdateSubmit = (updatedData) => {
    updateTask(
      { ...updatedData, id: selectedTask.id },
      {
        onSuccess: () => {
          setSelectedTask({
            ...selectedTask,
            ...updatedData,
          });
          setTaskFormOpen(false);
          setOpen(true);
        },
        onError: (err) => {
          console.error("Update Error:", err);
        },
      },
    );
  };

  if (taskLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <Typography variant="h6" sx={{ fontSize: "1.4rem" }}>
          Loading tasks...
        </Typography>
      </Box>
    );
  }

  if (taskError) {
    return (
      <Typography color="error" sx={{ fontSize: "1.4rem" }}>
        Failed to load tasks.
      </Typography>
    );
  }

  if (!taskList || taskList.length === 0) {
    return (
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#546e7a",
          paddingTop: "10px",
          fontSize: "1.6rem",
          letterSpacing: "0.05rem",
          textTransform: "uppercase",
          animation: "fadeIn 1.3s ease-in-out",
        }}
      >
        No tasks available for this project.
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, height: "100%", p: 1 }}>
        <Grid2
          container
          spacing={3}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
            alignItems: "stretch",
          }}
        >
          {taskList.map((task) => (
            <Grid2 item key={task.id} sx={{ height: "100%" }}>
              <TaskCard
                task={task}
                onClick={handleClickOpen}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {selectedTask && (
        <>
          <TaskDetailModal
            open={open}
            onClose={handleClose}
            task={selectedTask}
            onUpdate={handleUpdateClick}
            onDelete={handleDeleteClick}
            loading={taskLoading}
          />

          <ConfirmationModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={handleDelete}
            title="Confirm Deletion"
            content="Are you sure you want to delete this task?"
            disagree="Cancel"
            agree="Confirm"
          />

          <ProjectDetailModal
            open={taskFormOpen}
            handleClose={() => {
              setTaskFormOpen(false);
              setOpen(true);
            }}
            projectId={selectedTask.project_id}
            onSubmitTask={handleUpdateSubmit}
            taskData={selectedTask}
            isUpdate={true}
          />
        </>
      )}
    </>
  );
};

export default TaskByProject;
