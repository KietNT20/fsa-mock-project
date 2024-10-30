import RadarChartComponent from "@/components/ChartRardar";
import { useGetApiTask } from "@/hooks/useTask";
import { useGetApiUsers } from "@/hooks/useUsers";
import { Box, Container, Grid2, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboarDetailModal from "../DashboardDetailModal";
import TaskByUserStatCard from "./TaskByUser/TaskByUserStatCard";
import { calculateTaskByUsersStats } from "./TaskByUser/TaskByUserUtils";

const currentDate = new Date();

const UserDashboardPage = () => {
  const {
    data: taskData,
    isLoading: taskLoading,
    isError: taskError,
  } = useGetApiTask();
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetApiUsers();
  const [TaskByUserStat, setTaskByUserStat] = useState(null);
  const [OpenTaskByUserModal, setOpenTaskByUserModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDetails, setModalDetails] = useState({});

  // Get user profile from Redux
  const { userProfile } = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (!userLoading && !userError && userData && taskData && userProfile) {
      const stats = calculateTaskByUsersStats(
        userData,
        taskData,
        userProfile,
        currentDate,
      );
      setTaskByUserStat(stats);
    }
  }, [userData, taskData, userProfile, userLoading, userError]);

  if (taskLoading || userLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (taskError || userError) {
    return <Typography>Error fetching data</Typography>;
  }

  const handleOpenTaskByUserModal = () => {
    const taskNames =
      TaskByUserStat.usersWithTasksDueIn7Days[0]?.tasks.map(
        (task) => task.task_name,
      ) || [];
    console.log(taskNames);

    setModalTitle("All Task By User Details");
    setModalDetails({
      "Tasks Due in 7 Days": taskNames,

      "Tasks Not Started": TaskByUserStat.notStartedTasks,
      "Tasks In Progress": TaskByUserStat.inProgressTasks,
      "Tasks Bug Fixing": TaskByUserStat.bugFixingTasks,
      "Tasks Completed": TaskByUserStat.completedTasks,
    });
    setOpenTaskByUserModal(true);
  };

  const handleCloseTaskByUserModal = () => setOpenTaskByUserModal(false);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={styles.pageTitle}>
        User Dashboard Page
      </Typography>
      {TaskByUserStat && (
        <Box sx={styles.sectionContainer}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Box sx={styles.chartContainer}>
                  <RadarChartComponent
                    data={{
                      labels: [
                        "Total Tasks",
                        "Not Started",
                        "In Progress",
                        "Tasks Due in 7 Days",
                        "Bug Fixing",
                        "Completed",
                      ],
                      datasets: [
                        {
                          label: "User Task Stats",
                          data: [
                            TaskByUserStat?.totalUserTasks,
                            TaskByUserStat?.notStartedCount,
                            TaskByUserStat?.inProgressCount,
                            TaskByUserStat.usersWithTasksDueIn7Days.map(
                              (user) => user.taskCount,
                            ),
                            TaskByUserStat?.bugFixingCount,
                            TaskByUserStat?.completedCount,
                          ],
                          backgroundColor: "rgba(54, 162, 235, 0.5)",
                          borderColor: "rgba(54, 162, 235, 1)",
                          borderWidth: 1,
                        },
                      ],
                    }}
                    suggestedMax={TaskByUserStat.totalUserTasks || 10}
                    title="User Task Stat"
                  />
                </Box>
              </Grid2>

              {/* Project Stats Card */}
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Box sx={styles.cardContainer}>
                  <TaskByUserStatCard
                    TaskByUserStat={TaskByUserStat}
                    handleOpenTaskByUserModal={handleOpenTaskByUserModal}
                  />
                </Box>
              </Grid2>
            </Grid2>
          </Paper>
        </Box>
      )}
      <DashboarDetailModal
        open={OpenTaskByUserModal}
        onClose={handleCloseTaskByUserModal}
        title={modalTitle}
        details={modalDetails}
      />
    </Container>
  );
};

export default UserDashboardPage;
const styles = {
  sectionContainer: {
    py: 2,
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
