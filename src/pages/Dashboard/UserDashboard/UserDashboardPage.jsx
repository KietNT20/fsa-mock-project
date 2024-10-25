import BarChartComponent from "@/components/ChartBar";
import { useGetApiTask } from "@/hooks/useTask";
import { useGetApiUsers } from "@/hooks/useUsers";
import { Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector from react-redux
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
    // Lấy tên các task cần hoàn thành trong 7 ngày cho user hiện tại
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
                data={TaskByUserStat.usersWithTasksDueIn7Days.map(
                  (user) => user.taskCount,
                )}
                labels={TaskByUserStat.usersWithTasksDueIn7Days.map(
                  (user) => user.email,
                )}
                title="User Task Stats"
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
