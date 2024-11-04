import StatCard from "@/components/StatCard";
import {
  FolderSpecial as ProjectIcon,
  Assignment as TaskIcon,
  Group as UserIcon,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

const DashboardStats = ({
  taskStats,
  projectStats,
  userTaskStats,
  handleOpenTaskModal,
  handleOpenProjectModal,
  handleOpenUserModal,
}) => {
  const stats = [
    {
      title: "Total Tasks",
      value: taskStats?.totalTasks || 0,
      icon: TaskIcon,
      color: "#00ACC1", // cyan
      onClick: () => handleOpenTaskModal(taskStats),
    },
    {
      title: "Total Projects",
      value: projectStats?.totalProjects || 0,
      icon: ProjectIcon,
      color: "#43A047", // green
      onClick: () => handleOpenProjectModal(projectStats),
    },
    {
      title: "Total Users",
      value: userTaskStats?.totalUser || 0,
      icon: UserIcon,
      color: "#FB8C00", // orange
      onClick: () => handleOpenUserModal(userTaskStats),
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {stats.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardStats;
