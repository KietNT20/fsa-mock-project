import { useState } from "react";

export const useDashboardModals = () => {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDetails, setModalDetails] = useState({});

  const handleOpenTaskModal = (taskStats) => {
    setModalTitle("All Task Details");
    setModalDetails({
      "Late Tasks": taskStats.lateTasks,
      "Waiting Tasks": taskStats.waitingTasks,
      "In-Progress Tasks": taskStats.inProgressTasks,
      "Tasks Due in 3 Days": taskStats.tasksDueInThreeDays,
    });
    setOpenTaskModal(true);
  };

  const handleOpenProjectModal = (projectStats) => {
    setModalTitle("All Project Details");
    setModalDetails({
      "Running Projects": projectStats.runningProjects,
      "Releasing in 7 Days": projectStats.projectsReleasingSoon,
      "Prioritized Projects": projectStats.prioritizedProjects,
    });
    setOpenProjectModal(true);
  };

  const handleOpenUserModal = (userTaskStats) => {
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

  return {
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
  };
};
