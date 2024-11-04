import { Box, Container, Divider, Typography } from "@mui/material";
import DashboardDetailModal from "../DashboardDetailModal";
import { ProjectSection, TaskSection, UserSection } from "./DashboardSection";
import DashboardStats from "./DashboardStats";
import { useDashboardData } from "./useDashboardData";
import { useDashboardModals } from "./useDashboardModals";

const styles = {
  pageTitle: {
    textAlign: "center",
    fontWeight: "bold",
    mb: 2,
  },
};

const AdminDashboardPage = () => {
  const { taskStats, projectStats, userTaskStats, isLoading, isError } =
    useDashboardData();
  console.log("userTaskStats", userTaskStats);

  const {
    openTaskModal,
    openProjectModal,
    openUserModal,
    modalTitle,
    modalDetails,
    handleOpenTaskModal,
    handleOpenProjectModal,
    handleOpenUserModal,
    handleCloseTaskModal,
    handleCloseProjectModal,
    handleCloseUserModal,
  } = useDashboardModals();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (isError) {
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

      <DashboardStats
        taskStats={taskStats}
        projectStats={projectStats}
        userTaskStats={userTaskStats}
        handleOpenTaskModal={handleOpenTaskModal}
        handleOpenProjectModal={handleOpenProjectModal}
        handleOpenUserModal={handleOpenUserModal}
      />

      {taskStats && (
        <>
          <TaskSection
            taskStats={taskStats}
            handleOpenTaskModal={handleOpenTaskModal}
          />
          <Divider />
        </>
      )}

      {projectStats && (
        <>
          <ProjectSection
            projectStats={projectStats}
            handleOpenProjectModal={handleOpenProjectModal}
          />
          <Divider />
        </>
      )}

      {userTaskStats && (
        <UserSection
          userTaskStats={userTaskStats}
          handleOpenUserModal={handleOpenUserModal}
        />
      )}

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
