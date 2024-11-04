import BarChartComponent from "@/components/ChartBar";
import ChartComponent from "@/components/ChartPie";
import { Box, Grid2, Paper } from "@mui/material";
import ProjectStatsCard from "./ProjectStat/ProjectStatsCard";
import TaskStatsCard from "./TaskStat/TaskStatsCard";
import UserStatCard from "./UserStat/UserStatCard";

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
};

export const TaskSection = ({ taskStats, handleOpenTaskModal }) => (
  <Box sx={styles.sectionContainer}>
    <Paper elevation={2} sx={{ p: 3 }}>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }} sx={{ mx: "auto" }}>
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
        <Grid2 size={{ md: 12, lg: 6 }}>
          <Box sx={styles.cardContainer}>
            <TaskStatsCard
              taskStats={taskStats}
              handleOpenTaskModal={() => handleOpenTaskModal(taskStats)}
            />
          </Box>
        </Grid2>
      </Grid2>
    </Paper>
  </Box>
);

export const ProjectSection = ({ projectStats, handleOpenProjectModal }) => (
  <Box sx={styles.sectionContainer}>
    <Paper elevation={2} sx={{ p: 3 }}>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }} sx={{ mx: "auto" }}>
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
        <Grid2 size={{ md: 12, lg: 6 }}>
          <Box sx={styles.cardContainer}>
            <ProjectStatsCard
              projectStats={projectStats}
              handleOpenProjectModal={() =>
                handleOpenProjectModal(projectStats)
              }
            />
          </Box>
        </Grid2>
      </Grid2>
    </Paper>
  </Box>
);

export const UserSection = ({ userTaskStats, handleOpenUserModal }) => (
  <Box sx={styles.sectionContainer}>
    <Paper elevation={2} sx={{ p: 3 }}>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }} sx={{ mx: "auto" }}>
          <Box sx={styles.chartContainer}>
            <BarChartComponent
              data={[
                userTaskStats.usersWithoutTasks.length,
                userTaskStats.usersWithTasksDueIn7Days.length,
              ]}
              labels={["Users Without Tasks", "Users With Tasks Due in 7 Days"]}
              title="User Task Stats"
            />
          </Box>
        </Grid2>
        <Grid2 size={{ md: 12, lg: 6 }}>
          <Box sx={styles.cardContainer}>
            <UserStatCard
              userTaskStats={userTaskStats}
              handleOpenUserModal={() => handleOpenUserModal(userTaskStats)}
            />
          </Box>
        </Grid2>
      </Grid2>
    </Paper>
  </Box>
);
