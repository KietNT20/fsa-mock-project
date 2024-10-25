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
        <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
          Loading tasks...
        </Typography>
      </Box>
    );
  }

  if (taskError) {
    return (
      <Typography color="error" sx={{ fontSize: "1.5rem" }}>
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
          paddingTop: "20px",
          fontSize: "2rem",
          letterSpacing: "0.05rem",
          textTransform: "uppercase",
          animation: "fadeIn 1.5s ease-in-out",
        }}
      >
        No tasks available for this project.
      </Typography>
    );
  }

  return (
    <>
      <Grid2 container spacing={4}>
        {taskList.map((task) => (
          <Grid2 size={{ xs: 12, md: 4 }} key={task.id}>
            <TaskCard task={task} onClick={handleClickOpen} />
          </Grid2>
        ))}
      </Grid2>

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
