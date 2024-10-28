import FilterByStatus from "@/components/FilterByStatus";
import SearchBar from "@/components/SearchBar";
import { useGetApiTask, useUpdateTask } from "@/hooks/useTask";
import {
  DateRange as DateRangeIcon,
  EventNote as EventNoteIcon,
  Folder as FolderIcon,
  PriorityHigh as PriorityHighIcon,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";
import TaskUpdateModal from "./TaskUpdateModal";

const formatDate = (dateString) => {
  try {
    return format(parseISO(dateString), "dd/MM/yyyy HH:mm:ss");
  } catch (error) {
    console.error("Error parsing date:", error);
    return dateString;
  }
};
const menuItems = [
  { value: "all", label: "All Statuses" },
  { value: "1", label: "Pending" },
  { value: "2", label: "In Progress" },
  { value: "3", label: "QA Testing" },
  { value: "4", label: "Done" },
];

// Function to return color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return "rgba(255, 223, 0, 0.3)";
    case 2:
      return "rgba(54, 162, 235, 0.5)";
    case 3:
      return "rgba(255, 99, 132, 0.3)";
    case 4:
      return "rgba(75, 192, 192, 0.5)";
    default:
      return "rgba(0, 0, 0, 0.1)";
  }
};

const TasksPage = () => {
  const { data: taskData, isLoading, error } = useGetApiTask();
  const { userProfile } = useSelector((state) => state.userProfile);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input (user_name)
  const [statusFilter, setStatusFilter] = useState("all"); // State for status filter

  const { mutate: updateTask } = useUpdateTask();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error loading tasks</Typography>;
  }

  // Handle search term change
  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  // Handle status filter change
  const handleStatusFilter = (value) => {
    setStatusFilter(value);
  };

  // Filter tasks based on user_mail, searchTerm (task_name), and status
  const filteredTasks = taskData.filter((task) => {
    const matchesUserEmail = task.user_mail === userProfile.email;

    // Handle search filter by task_name
    const matchesSearch =
      searchTerm === "" || task.task_name.toLowerCase().includes(searchTerm);

    // Handle status filter
    const matchesStatus =
      statusFilter === "all" || task.status === parseInt(statusFilter);

    // Return tasks that match both search and status
    return matchesUserEmail && matchesSearch && matchesStatus;
  });

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleUpdateStatus = (status) => {
    if (selectedTask) {
      updateTask({
        id: selectedTask.id,
        task_name: selectedTask.task_name,
        user_mail: selectedTask.user_mail,
        project_id: selectedTask.project_id,
        time_start: selectedTask.time_start,
        time_end: selectedTask.time_end,
        status,
        note: selectedTask.note,
      });
      handleModalClose();
    }
  };

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 6 }}
      >
        Task Page
      </Typography>

      {/* Search and Filter Components */}
      <Grid2
        container
        spacing={2}
        sx={{
          marginTop: 6,
          marginBottom: 2,
          width: "100%",
        }}
      >
        <Grid2 size={6} item xs={12} md={4}>
          <SearchBar onSearch={handleSearch} />
        </Grid2>
        <Grid2 size={2} item xs={12} md={4}>
          <FilterByStatus
            onFilter={handleStatusFilter}
            currentFilter={statusFilter}
            menuItems={menuItems}
          />
        </Grid2>
      </Grid2>

      {filteredTasks.length > 0 ? (
        <Grid2 container spacing={3}>
          {filteredTasks.map((task) => (
            <Grid2 item xs={12} key={task.id}>
              <Card
                style={{
                  width: "40vw",
                  borderRadius: "15px",
                  background: "#ffffff",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  padding: "10px",
                  cursor: "pointer",
                  margin: "5px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(0, 0, 0, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0, 0, 0, 0.3)";
                }}
                onClick={() => handleCardClick(task)}
              >
                <CardContent>
                  {/* Apply background color to task name only */}
                  <Typography
                    variant="h5"
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "24px",
                      color: "black",
                      backgroundColor: getStatusColor(task.status),
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    {task.task_name}
                  </Typography>

                  <Divider
                    style={{ margin: "10px 0", border: "0.5px solid #666666" }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#2d2f30",
                          fontWeight: "bold",
                          fontSize: "1.6rem",
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
                          {task.project_name}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#2d2f30",
                          fontWeight: "bold",
                          fontSize: "1.6rem",
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
                          {formatDate(task.project_start)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#2d2f30",
                          fontWeight: "bold",
                          fontSize: "1.6rem",
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
                          {formatDate(task.project_end)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Divider
                    style={{ margin: "10px 0", border: "0.5px solid #2d2f30" }}
                  />

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <EventNoteIcon
                          sx={{ marginRight: 1, color: "#2d2f30" }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                        >
                          User Email: {task.user_mail}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <EventNoteIcon
                          sx={{ marginRight: 1, color: "#2d2f30" }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                        >
                          User Name: {task.user_name}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <EventNoteIcon
                          sx={{ marginRight: 1, color: "#2d2f30" }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                        >
                          Note: {task.note || "None"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <DateRangeIcon
                          sx={{ marginRight: 1, color: "#2d2f30" }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                        >
                          Start Task: {formatDate(task.time_start)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <DateRangeIcon
                          sx={{ marginRight: 1, color: "#2d2f30" }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "1.8rem", color: "#2d2f30" }}
                        >
                          End Task: {formatDate(task.time_end)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
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
                          {task.status === 1
                            ? "Pending"
                            : task.status === 2
                              ? "In Progress"
                              :task.status === 3?
                            "QA Testing": "Completed"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#546e7a", // Darker color for stronger emphasis
            paddingTop: "20px",
            fontSize: "2rem",
            letterSpacing: "0.05rem",
            textTransform: "uppercase",
            animation: "fadeIn 1.5s ease-in-out",
          }}
        >
          No tasks found
        </Typography>
      )}

      {/* Render Modal */}
      {selectedTask && (
        <TaskUpdateModal
          open={modalOpen}
          handleClose={handleModalClose}
          task={selectedTask}
          handleUpdate={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default TasksPage;
