import ConfirmationModal from "@/components/ConfirmationModal";
import { useDeleteTask, useUpdateTask } from "@/hooks/useTask";
import {
  DateRange as DateRangeIcon,
  EventNote as EventNoteIcon,
  Folder as FolderIcon,
  PriorityHigh as PriorityHighIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ProjectDetailModal from "./ProjectDetailModal";

const TaskByProject = ({ taskList, taskLoading, taskError }) => {
  const [open, setOpen] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "rgba(255, 223, 0, 0.3)";
      case 2:
        return "rgba(54, 162, 235, 0.5)";
      case 3:
        return "rgba(75, 192, 192, 0.5)";
      default:
        return "rgba(0, 0, 0, 0.1)";
    }
  };
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
          // Update selectedTask with the updated data
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
          <Grid2 item xs={12} md={4} lg={4} key={task.id}>
            <Paper
              onClick={() => handleClickOpen(task)}
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
                Status:{" "}
                {task.status === 1
                  ? "Not Started"
                  : task.status === 2
                    ? "In Process"
                    : "Done"}
              </Typography>

              <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
                <strong>Task Name:</strong> {task.task_name}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
                <strong>Note:</strong> {task.note}
              </Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>

      {/* Task Details Modal */}
      {selectedTask && (
        <>
          <Dialog
            open={open}
            onClose={() => handleClose()}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                width: "60vw",
                minHeight: "400px",
                borderRadius: "15px",
                background: "#ffffff",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                padding: "10px",
                margin: "5px",
                "&:hover": {
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)",
                },
              },
            }}
          >
            <DialogContent>
              <CardContent>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                    color: "black",
                    backgroundColor: getStatusColor(selectedTask.status),
                    padding: "10px",
                    borderRadius: "10px",
                    marginBottom: "20px", // Thêm margin cho tiêu đề
                  }}
                >
                  {selectedTask.task_name}
                </Typography>

                <Divider
                  style={{ margin: "10px 0", border: "0.5px solid #666666" }}
                />

                {/* Khoảng cách giữa các field */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    gap: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginY: "15px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#2d2f30",
                        fontWeight: "bold",
                        fontSize: "1.6rem",
                        marginBottom: "10px",
                      }}
                    >
                      Project
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <FolderIcon sx={{ marginRight: 1, color: "#2d2f30" }} />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                      >
                        {selectedTask.project_name}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginY: "15px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#2d2f30",
                        fontWeight: "bold",
                        fontSize: "1.6rem",
                        marginBottom: "10px",
                      }}
                    >
                      Start Project
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DateRangeIcon
                        sx={{ marginRight: 1, color: "#2d2f30" }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                      >
                        {new Date(selectedTask.project_start).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginY: "15px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#2d2f30",
                        fontWeight: "bold",
                        fontSize: "1.6rem",
                        marginBottom: "10px",
                      }}
                    >
                      End Project
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DateRangeIcon
                        sx={{ marginRight: 1, color: "#2d2f30" }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                      >
                        {new Date(selectedTask.project_end).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider
                  style={{ margin: "10px 0", border: "0.5px solid #2d2f30" }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <Box sx={{ flex: 1, marginY: "15px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <EventNoteIcon
                        sx={{ marginRight: 1, color: "#2d2f30" }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                      >
                        User Email: {selectedTask.user_mail}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <EventNoteIcon
                        sx={{ marginRight: 1, color: "#2d2f30" }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                      >
                        User Name: {selectedTask.user_name}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <EventNoteIcon
                        sx={{ marginRight: 1, color: "#2d2f30" }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                      >
                        Note: {selectedTask.note || "None"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ flex: 1, marginY: "15px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <DateRangeIcon
                        sx={{ marginRight: 1, color: "#2d2f30" }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                      >
                        Start Task:{" "}
                        {new Date(selectedTask.time_start).toLocaleString()}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <DateRangeIcon
                        sx={{ marginRight: 1, color: "#2d2f30" }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                      >
                        End Task:{" "}
                        {new Date(selectedTask.time_end).toLocaleString()}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <PriorityHighIcon
                        sx={{ marginRight: 1, color: "#2d2f30" }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                      >
                        Status:{" "}
                        {selectedTask.status === 1
                          ? "Pending"
                          : selectedTask.status === 2
                            ? "In Progress"
                            : "Complete"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </DialogContent>
            <DialogActions
              sx={{ justifyContent: "space-between", pt: 0, pb: 3, px: 3 }}
            >
              <Button
                onClick={handleClose}
                disabled={taskLoading}
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
                  onClick={() => handleUpdateClick()}
                  disabled={taskLoading}
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
                  onClick={() => handleDeleteClick()}
                  disabled={taskLoading}
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
          </Dialog>
          {/* Confirmation Modal for Deletion */}
          <ConfirmationModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={() => handleDelete()}
            title="Confirm Deletion"
            content={`Are you sure you want to delete this task?`}
            disagree="Cancel"
            agree="Confirm"
          />

          {/* Update Task Modal */}
          <ProjectDetailModal
            open={taskFormOpen}
            handleClose={() => {
              setTaskFormOpen(false);
              setOpen(true); // Reopen Task Details modal with updated data
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
