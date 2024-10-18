import FilterByStatus from "@/components/FilterByStatus";
import SearchBar from "@/components/SearchBar";
import { PATH } from "@/constant/path";
import { useCreateTask, useGetApiTask } from "@/hooks/useTask"; // Hook to fetch all tasks
import { Money, Note } from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Box, Button, Divider, Grid2, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectDetailModal from "./ProjectDetailModal";
import TaskByProject from "./TaskByProject";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);
  const { mutate: createTask } = useCreateTask();

  const [searchTerm, setSearchTerm] = useState(""); // State for search input (user_name)
  const [statusFilter, setStatusFilter] = useState("all"); // State for status filter

  const menuItems = [
    { value: "all", label: "All Statuses" },
    { value: "1", label: "Not Started" },
    { value: "2", label: "In Progress" },
    { value: "3", label: "Completed" },
  ];

  const handleCreateTask = (taskData) => {
    createTask(taskData, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        console.error("Error creating task:", error);
      },
    });
  };

  useEffect(() => {
    const storedProject = sessionStorage.getItem("selectedProject");
    if (storedProject) {
      setProject(JSON.parse(storedProject));
    } else {
      console.error("No project data found");
      navigate(PATH.HOME);
    }
  }, [navigate]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch all tasks from API
  const {
    data: taskData,
    isLoading: taskLoading,
    error: taskError,
  } = useGetApiTask();

  // Filter tasks by project ID
  const taskList = taskData?.filter((task) => task.project_id === project?.id);

  // Filter tasks based on search term (user_name) and status
  const filteredTasks = useMemo(() => {
    if (!taskList) return [];
    return taskList.filter((task) => {
      const matchesSearchTerm =
        task.user_mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.user_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || task.status.toString() === statusFilter;
      return matchesSearchTerm && matchesStatus;
    });
  }, [taskList, searchTerm, statusFilter]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
  };

  if (!project) {
    return <Typography>No project details found</Typography>;
  }

  return (
    <>
      <Box>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 2 }}
        >
          Project Detail
        </Typography>

        {/* Search and Filter Options */}
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
          {/* Create Task Button */}
          <Grid2
            item
            size={4}
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                background: "linear-gradient(135deg, #0d47a1 , #90caf9)",
                padding: "12px 24px",
                fontSize: "1.3rem",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#464849",
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Create New Task
            </Button>
          </Grid2>
        </Grid2>
      </Box>

      {/* Modal for creating a task */}
      <ProjectDetailModal
        open={open}
        handleClose={handleClose}
        projectId={project?.id}
        onSubmitTask={handleCreateTask}
      />

      {/* Project Details */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: "12px",
          background: "#ffffff",
          color: "#636969",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#000000", fontSize: "2.4rem" }}
          >
            {project.name}
          </Typography>
        </Box>

        <Divider
          sx={{ marginY: 3, borderColor: "#464849", borderWidth: "1.5px" }}
        />

        <Grid2
          container
          spacing={6}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 5, mb: 1 }}
        >
          <Grid2 item xs={12} md={3}>
            <Box display="flex" alignItems="center">
              <Money sx={{ mr: 1, fontSize: "2.4rem", color: "#464849" }} />
              <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
                <strong>Payment: </strong> {project.payment}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 item xs={12} md={3}>
            <Box display="flex" alignItems="center">
              <PriorityHighIcon
                sx={{ mr: 1, fontSize: "2.4rem", color: "#464849" }}
              />
              <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
                <strong>Priority: </strong>{" "}
                {project.priority === 1
                  ? "High"
                  : project.priority === 2
                    ? "Medium"
                    : "Low"}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 item xs={12} md={3}>
            <Box display="flex" alignItems="center">
              <CalendarTodayIcon
                sx={{ mr: 1, fontSize: "2.4rem", color: "#464849" }}
              />
              <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
                <strong>Start Date: </strong>{" "}
                {new Date(project.time_start).toLocaleString()}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 item xs={12} md={3}>
            <Box display="flex" alignItems="center">
              <CalendarTodayIcon
                sx={{ mr: 1, fontSize: "2.4rem", color: "#464849" }}
              />
              <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
                <strong>End Date: </strong>{" "}
                {new Date(project.time_end).toLocaleString()}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 item xs={12} md={3}>
            <Box display="flex" alignItems="center">
              <Note sx={{ mr: 1, fontSize: "2.4rem", color: "#464849" }} />
              <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
                <strong>Note: </strong> {project.note || "None"}
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Paper>
      {/* Display tasks below the project details */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: "12px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          color: "#424242",
          maxHeight: "400px",
          overflowY: "auto",
          mx: "auto",
          mt: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 3, fontSize: "2.4rem" }}
        >
          Project Tasks
        </Typography>
        <Divider
          sx={{ marginY: 2, borderColor: "#808585", borderWidth: "0.5px" }}
        />
        <TaskByProject
          taskList={filteredTasks}
          taskLoading={taskLoading}
          taskError={taskError}
        />
      </Paper>
    </>
  );
};

export default ProjectDetail;
