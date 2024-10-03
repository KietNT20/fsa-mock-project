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
import ProjectModal from "./ProjectModal";

const ProjectsPage = () => {
  const { dataProject } = useGetProject();
  const { mutate: doDeleteProject } = useDeleteProject();
  const { mutate: doCreateProject } = useCreateProject();
  const { mutate: doUpdateProject } = useUpdateProject(); // Import the update project mutation
  const { profile } = useSelector((state) => state.profile);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // Mode for the modal ('create' or 'update')
  const [selectedProject, setSelectedProject] = useState(null); // Track the project being updated

  const handleOpenModal = (mode = "create", project = null) => {
    setModalMode(mode);
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleDeleteProject = useCallback(
    (projectId) => {
      if (projectId) {
        doDeleteProject({ id: projectId });
      } else {
        console.error("Invalid project ID");
      }
    },
    [doDeleteProject],
  );

  // Handle project creation
  const handleCreateProject = (projectData) => {
    doCreateProject(projectData);
  };

  // Handle project update
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

        {profile?.role === 1 && (
          <Button
            variant="contained"
            onClick={() => handleOpenModal("create")}
            sx={{
              background: "linear-gradient(135deg, #0d47a1 , #90caf9)",
              padding: "12px 24px",
              fontSize: "1.3rem",
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
        <CustomizedCard cardCell={dataHeader} cardDatas={dataProject} />
      ) : (
        <CustomizedTable
          title="Project Table List"
          tableCell={dataHeader}
          tableDatas={dataProject}
          onUpdate={(project) => handleOpenModal("update", project)}
          onDelete={(projectId) => handleDeleteProject(projectId)}
        />
      )}
    </React.Fragment>
  );
};

export default ProjectsPage;
