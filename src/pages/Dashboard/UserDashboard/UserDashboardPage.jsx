import RadarChartComponent from "@/components/ChartRardar";
import { useGetApiTask } from "@/hooks/useTask";
import { useGetApiUsers } from "@/hooks/useUsers";
import { Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboarDetailModal from "../DashboarDetailModal";
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
    });
    setOpenTaskByUserModal(true);
  };

  const handleCloseTaskByUserModal = () => setOpenTaskByUserModal(false);

  return (
    <>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 6 }}
      >
        User Dashboard Page
      </Typography>
      {TaskByUserStat && (
        <Grid2
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          {/* User Task Status Breakdown Radar Chart */}
          <Grid2 item xs={12} md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
<RadarChartComponent
    data={{
        labels: ["Total Tasks", "Not Started", "In Progress","Tasks Due in 7 Days", "Bug Fixing", "Completed"],
        datasets: [
            {
                label: "User Task Stats",
                data: [
                  TaskByUserStat?.totalUserTasks, // Total tasks
                    TaskByUserStat?.notStartedCount,
                    TaskByUserStat?.inProgressCount,
                    TaskByUserStat?.usersWithTasksDueIn7Days.map(
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
            <TaskByUserStatCard
              TaskByUserStat={TaskByUserStat}
              handleOpenTaskByUserModal={handleOpenTaskByUserModal}
            />
          </Grid2>
        </Grid2>
      )}
      <DashboarDetailModal
        open={OpenTaskByUserModal}
        onClose={handleCloseTaskByUserModal}
        title={modalTitle}
        details={modalDetails}
      />
    </>
  );
};

export default UserDashboardPage;
