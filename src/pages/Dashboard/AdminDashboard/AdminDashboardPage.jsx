import BarChartComponent from "@/components/ChartBar";
import ChartComponent from "@/components/ChartPie";
import { useGetProject } from "@/hooks/useProject";
import { useGetApiTask } from "@/hooks/useTask";
import { useGetApiUsers } from "@/hooks/useUsers";
import { Divider, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DashboarDetailModal from "../DashboarDetailModal";
import ProjectStatsCard from "./ProjectStat/ProjectStatsCard";
import { calculateProjectStats } from "./ProjectStat/ProjectUtils";
import TaskStatsCard from "./TaskStat/TaskStatsCard";
import { calculateTaskStats } from "./TaskStat/TaskUtils";
import UserStatCard from "./UserStat/UserStatCard"; // Ensure this imports your UserStatCard
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

  // Tính toán số liệu cho nhiệm vụ, dự án và người dùng khi dữ liệu thay đổi
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
    return <Typography>Loading...</Typography>;
  }

  if (taskError || projectError || userError) {
    return <Typography>Error fetching data</Typography>;
  }

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 6 }}
      >
        Admin Dashboard Page
      </Typography>

      {/* Task Stats Section */}
      {taskStats && (
        <Grid2
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 60,
            marginBottom: 60,
          }}
        >
          {/* Task Chart */}
          <Grid2 item xs={12} md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
            </div>
          </Grid2>

          {/* Task Stats Card */}
          <Grid2
            container
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 90,
              marginBottom: 90,
            }}
          >
            <TaskStatsCard
              taskStats={taskStats}
              handleOpenTaskModal={handleOpenTaskModal}
            />
          </Grid2>
        </Grid2>
      )}
      <Divider sx={{ my: 3 }} />

      {/* Project Stats Section */}
      {projectStats && (
        <Grid2
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 60,
            marginBottom: 60,
          }}
        >
          {/* Project Chart */}
          <Grid2 item xs={12} md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
            </div>
          </Grid2>

          {/* Project Stats Card */}
          <Grid2
            container
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 90,
              marginBottom: 90,
            }}
          >
            <ProjectStatsCard
              projectStats={projectStats}
              handleOpenProjectModal={handleOpenProjectModal}
            />
          </Grid2>
        </Grid2>
      )}

      <Divider sx={{ my: 3 }} />
      {/* User Task Stats Section */}
      {userTaskStats && (
        <Grid2
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 60,
            marginBottom: 60,
          }}
        >
          {/* User Task Stats Bar Chart */}
          <Grid2 item xs={12} md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
            </div>
          </Grid2>
          {/* User Stats Card */}
          <Grid2
            container
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 90,
              marginBottom: 90,
            }}
          >
            <UserStatCard
              userTaskStats={userTaskStats}
              handleOpenUserModal={handleOpenUserModal}
            />
          </Grid2>
        </Grid2>
      )}

      {/* Modal cho Task Details */}
      <DashboarDetailModal
        open={openTaskModal}
        onClose={handleCloseTaskModal}
        title={modalTitle}
        details={modalDetails}
      />

      {/* Modal cho Project Details */}
      <DashboarDetailModal
        open={openProjectModal}
        onClose={handleCloseProjectModal}
        title={modalTitle}
        details={modalDetails}
      />

      {/* Modal cho User Details */}
      <DashboarDetailModal
        open={openUserModal}
        onClose={handleCloseUserModal}
        title={modalTitle}
        details={modalDetails}
      />
    </div>
  );
};

export default AdminDashboardPage;
