import ChartComponent from "@/components/ChartPie";
import { useGetApiTask } from "@/hooks/useTask";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { calculateTaskStats } from "./TaskUtils";

const DashboardPage = () => {
  const { data: taskData, isLoading, isError } = useGetApiTask(); // Lấy dữ liệu từ API
  const [taskStats, setTaskStats] = useState(null); // Tính toán và lưu trữ task stats

  // Ngày hiện tại
  const currentDate = new Date();

  useEffect(() => {
    if (!isLoading && !isError && taskData) {
      const stats = calculateTaskStats(taskData, currentDate);
      setTaskStats(stats); // Lưu taskStats để truyền vào biểu đồ
    }
  }, [taskData, isLoading, isError]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error fetching tasks</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard Page
      </Typography>
      <Typography>Đây là trang quản lý thông số.</Typography>

      {/* Sử dụng ChartComponent với dữ liệu từ taskStats */}
      {taskStats && (
        <ChartComponent
          data={[
            taskStats.lateTasks,
            taskStats.waitingTasks,
            taskStats.inProgressTasks,
            taskStats.tasksDueInThreeDays,
          ]}
          labels={[
            "Late Tasks",
            "Waiting Tasks",
            "In-Progress Tasks",
            "Tasks Due in 3 Days",
          ]}
          title="Task Stats"
        />
      )}
    </div>
  );
};

export default DashboardPage;
