import BarChartComponent from "@/components/ChartBar";
import ChartComponent from "@/components/ChartPie";
import { useGetProject } from "@/hooks/useProject";
import { useGetApiTask } from "@/hooks/useTask";
import { useGetApiUsers } from "@/hooks/useUsers";
import {
  Box,
  Container,
  Divider,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DashboardDetailModal from "../DashboardDetailModal";
import ProjectStatsCard from "./ProjectStat/ProjectStatsCard";
import { calculateProjectStats } from "./ProjectStat/ProjectUtils";
import TaskStatsCard from "./TaskStat/TaskStatsCard";
import { calculateTaskStats } from "./TaskStat/TaskUtils";
import UserStatCard from "./UserStat/UserStatCard";
import { calculateUsersTaskStats } from "./UserStat/UserUtils";

const currentDate = new Date();

const AdminDashboardPage = () => {
  const {
    data: taskData,
    isLoading: taskLoading,
    isError: taskError,
  } = useGetApiTask();
  const {
    data: projectData,
    isLoading: projectLoading,
    isError: projectError,
  } = useGetProject();
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetApiUsers();

  const [taskStats, setTaskStats] = useState(null);
  const [projectStats, setProjectStats] = useState(null);
  const [userTaskStats, setUserTaskStats] = useState(null);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDetails, setModalDetails] = useState({});

  useEffect(() => {
    if (!taskLoading && !taskError && taskData) {
      const stats = calculateTaskStats(taskData, currentDate);
      setTaskStats((prevStats) =>
        JSON.stringify(prevStats) !== JSON.stringify(stats) ? stats : prevStats,
      );
    }

    if (!projectLoading && !projectError && projectData) {
      const stats = calculateProjectStats(projectData, currentDate);
      setProjectStats((prevStats) =>
        JSON.stringify(prevStats) !== JSON.stringify(stats) ? stats : prevStats,
      );
    }

    if (!userLoading && !userError && userData && taskData) {
      const stats = calculateUsersTaskStats(taskData, userData, currentDate);
      setUserTaskStats(stats);
    }
  }, [
    taskData,
    taskLoading,
    taskError,
    projectData,
    projectLoading,
    projectError,
    userLoading,
    userError,
    userData,
  ]);

  // Handler để mở modal task
  const handleOpenTaskModal = () => {
    setModalTitle("All Task Details");
    setModalDetails({
      "Late Tasks": taskStats.lateTasks,
      "Waiting Tasks": taskStats.waitingTasks,
      "In-Progress Tasks": taskStats.inProgressTasks,
      "Tasks Due in 3 Days": taskStats.tasksDueInThreeDays,
    });
    setOpenTaskModal(true);
  };

  // Handler để mở modal project
  const handleOpenProjectModal = () => {
    setModalTitle("All Project Details");
    setModalDetails({
      "Running Projects": projectStats.runningProjects,
      "Releasing in 7 Days": projectStats.projectsReleasingSoon,
      "Prioritized Projects": projectStats.prioritizedProjects,
    });
    setOpenProjectModal(true);
  };

  // Handler để mở modal user
  const handleOpenUserModal = () => {
    setModalTitle("All User Details");
    setModalDetails({
      "Users Without Tasks": userTaskStats.usersWithoutTasks,
      "Users With Tasks Due in 7 Days": userTaskStats.usersWithTasksDueIn7Days,
    });
    setOpenUserModal(true);
  };

  const handleCloseTaskModal = () => setOpenTaskModal(false);
  const handleCloseProjectModal = () => setOpenProjectModal(false);
  const handleCloseUserModal = () => setOpenUserModal(false);

  if (taskLoading || projectLoading || userLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (taskError || projectError || userError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Typography color="error">Error fetching data</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" sx={styles.pageTitle}>
        Admin Dashboard Page
      </Typography>

      {/* Task Stats Section */}
      {taskStats && (
        <Box sx={styles.sectionContainer}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Box sx={styles.chartContainer}>
                  <ChartComponent
                    data={[
                      taskStats.lateTasks.length,
                      taskStats.waitingTasks.length,
                      taskStats.inProgressTasks.length,
                      taskStats.tasksDueInThreeDays.length,
                    ]}
                    labels={[
                      "Late Tasks",
                      "Waiting Tasks",
                      "In-Progress Tasks",
                      "Tasks Due in 3 Days",
                    ]}
                    title="Task Stats"
                  />
                </Box>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Box sx={styles.cardContainer}>
                  <TaskStatsCard
                    taskStats={taskStats}
                    handleOpenTaskModal={handleOpenTaskModal}
                  />
                </Box>
              </Grid2>
            </Grid2>
          </Paper>
        </Box>
      )}

      <Divider />

      {/* Project Stats Section */}
      {projectStats && (
        <Box sx={styles.sectionContainer}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Box sx={styles.chartContainer}>
                  <ChartComponent
                    data={[
                      projectStats.runningProjects.length,
                      projectStats.projectsReleasingSoon.length,
                      projectStats.prioritizedProjects.length,
                    ]}
                    labels={[
                      "Running Projects",
                      "Releasing in 7 Days",
                      "Prioritized Projects",
                    ]}
                    title="Project Stats"
                  />
                </Box>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Box sx={styles.cardContainer}>
                  <ProjectStatsCard
                    projectStats={projectStats}
                    handleOpenProjectModal={handleOpenProjectModal}
                  />
                </Box>
              </Grid2>
            </Grid2>
          </Paper>
        </Box>
      )}

      <Divider />

      {/* User Stats Section */}
      {userTaskStats && (
        <Box sx={styles.sectionContainer}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Box sx={styles.chartContainer}>
                  <BarChartComponent
                    data={[
                      userTaskStats.usersWithoutTasks.length,
                      userTaskStats.usersWithTasksDueIn7Days.length,
                    ]}
                    labels={[
                      "Users Without Tasks",
                      "Users With Tasks Due in 7 Days",
                    ]}
                    title="User Task Stats"
                  />
                </Box>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Box sx={styles.cardContainer}>
                  <UserStatCard
                    userTaskStats={userTaskStats}
                    handleOpenUserModal={handleOpenUserModal}
                  />
                </Box>
              </Grid2>
            </Grid2>
          </Paper>
        </Box>
      )}

      {/* Modals */}
      <DashboardDetailModal
        open={openTaskModal}
        onClose={handleCloseTaskModal}
        title={modalTitle}
        details={modalDetails}
      />
      <DashboardDetailModal
        open={openProjectModal}
        onClose={handleCloseProjectModal}
        title={modalTitle}
        details={modalDetails}
      />
      <DashboardDetailModal
        open={openUserModal}
        onClose={handleCloseUserModal}
        title={modalTitle}
        details={modalDetails}
      />
    </Container>
  );
};

export default AdminDashboardPage;

const styles = {
  sectionContainer: {
    py: 4,
  },
  chartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  pageTitle: {
    textAlign: "center",
    fontWeight: "bold",
    mb: 2,
  },
};
