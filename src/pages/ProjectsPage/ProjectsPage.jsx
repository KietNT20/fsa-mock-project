import ConfirmationModal from "@/components/ConfirmationModal"; // Import the ConfirmationModal
import CustomizedCard from "@/components/CustomizedCard";
import CustomizedTable from "@/components/CustomizedTable";
import {
  useCreateProject,
  useDeleteProject,
  useGetProject,
  useUpdateProject,
} from "@/hooks/useProject";
import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import ProjectFilter from "./ProjectFilter";
import ProjectModal from "./ProjectModal";

const ProjectsPage = () => {
  const { dataProject } = useGetProject();
  const { mutate: doDeleteProject } = useDeleteProject();
  const { mutate: doCreateProject } = useCreateProject();
  const { mutate: doUpdateProject } = useUpdateProject();
  const { profile } = useSelector((state) => state.profile);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedProject, setSelectedProject] = useState(null);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // Confirmation modal state
  const [projectToDelete, setProjectToDelete] = useState(null); // Track the project to delete

  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedPriority, setSelectedPriority] = useState(""); // State for priority filter

  const handleOpenModal = (mode = "create", project = null) => {
    setModalMode(mode);
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleDeleteProject = useCallback((projectId) => {
    setProjectToDelete(projectId); // Set the project to delete
    setConfirmModalOpen(true); // Open the confirmation modal
  }, []);

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      doDeleteProject({ id: projectToDelete });
      setConfirmModalOpen(false); // Close the confirmation modal
    }
  };

  const handleCreateProject = (projectData) => {
    doCreateProject(projectData);
  };

  const handleUpdateProject = (projectData) => {
    doUpdateProject(projectData);
  };

  const dataHeader = [
    "name",
    "payment",
    "time_start",
    "time_end",
    "note",
    "priority",
    ...(profile?.role === 1 ? ["action"] : []),
  ];

  // Filtered projects based on search query and priority filter
  const filteredProjects = dataProject?.filter((project) => {
    const matchesSearchQuery = project.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority
      ? project.priority === parseInt(selectedPriority)
      : true;
    return matchesSearchQuery && matchesPriority;
  });

  return (
    <React.Fragment>
      <Box>
        {profile?.role === 0 && (
          <Typography
            variant="h3"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Projects Page
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 1,
            marginBottom: 2,
          }}
        >
          {profile?.role === 1 && (
            <Button
              variant="contained"
              onClick={() => handleOpenModal("create")}
              sx={{
                background: "linear-gradient(135deg, #0d47a1 , #90caf9)",
                padding: "12px 24px",
                fontSize: "1.5rem",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#1565c0",
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Create New Project
            </Button>
          )}

          <ProjectFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
          />
        </Box>
      </Box>

      <ProjectModal
        open={modalOpen}
        onClose={() => handleCloseModal()}
        mode={modalMode}
        project={selectedProject}
        onCreateProject={(projectData) => handleCreateProject(projectData)}
        onUpdateProject={(projectData) => handleUpdateProject(projectData)}
      />

      {profile?.role === 0 ? (
        <CustomizedCard cardCell={dataHeader} cardDatas={filteredProjects} />
      ) : (
        <CustomizedTable
          title="Project Table List"
          tableCell={dataHeader}
          tableDatas={filteredProjects} // Pass filtered projects
          onUpdate={(project) => handleOpenModal("update", project)}
          onDelete={(projectId) => handleDeleteProject(projectId)}
        />
      )}

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => confirmDeleteProject()}
        title="Confirm Project Deletion"
        content="Are you sure you want to delete this project? This action cannot be undone."
        disagree="Cancel"
        agree="Delete"
      />
    </React.Fragment>
  );
};

export default ProjectsPage;
