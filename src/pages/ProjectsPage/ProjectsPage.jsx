// components/ProjectsPage.js
import CustomizedCard from "@/components/CustomizedCard";
import CustomizedTable from "@/components/CustomizedTable";
import { useProject } from "@/hooks/useProject";
import { Box, Button, Typography } from "@mui/material"; // Added Box for layout
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProjectCreationModal from "./ProjectCreationModal";

const ProjectsPage = () => {
  const { dataProject } = useProject();
  const { profile } = useSelector((state) => state.profile);
  console.log("profile", profile);
  console.log(dataProject);

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Headers cho table và card
  const dataHeader = [
    "name",
    "payment",
    "time_start",
    "time_end",
    "note",
    "priority",
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

        {/* Conditionally render the 'Create New Project' button for admin users (role 1) */}
        {profile?.role === 1 && (
          <Button
            variant="contained"
            onClick={handleOpenModal}
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

      <ProjectCreationModal open={modalOpen} onClose={handleCloseModal} />

      {/* Conditionally render either CustomizedCard or CustomizedTable based on user role */}
      {profile?.role === 0 ? (
        <CustomizedCard cardCell={dataHeader} cardDatas={dataProject} />
      ) : (
        <CustomizedTable
          title="Project Table List"
          tableCell={dataHeader}
          tableDatas={dataProject}
        />
      )}
    </React.Fragment>
  );
};

export default ProjectsPage;
