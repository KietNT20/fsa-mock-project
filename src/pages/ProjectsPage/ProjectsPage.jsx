import CustomizedCard from "@/components/CustomizedCard";
import CustomizedTable from "@/components/CustomizedTable";
import FilterByPriority from "@/components/FilterByPriority";
import SearchBar from "@/components/SearchBar";
import {
  useCreateProject,
  useDeleteProject,
  useGetProject,
  useUpdateProject,
} from "@/hooks/useProject";
import {
  Box,
  Button,
  Grid2,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ProjectModal from "./ProjectModal";

const itemsPerPage = 6;

const ProjectsPage = () => {
  const { dataProject } = useGetProject();
  const { mutate: doDeleteProject, isPending: deleteProjectPending } =
    useDeleteProject();
  const { mutate: doCreateProject, isPending: addProjectPending } =
    useCreateProject();
  const { mutate: doUpdateProject, isPending: updateProjectPending } =
    useUpdateProject();
  const { profile } = useSelector((state) => state.profile);
  const userRole = profile?.role;
  const disabled =
    deleteProjectPending || addProjectPending || updateProjectPending;

  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const handleOpenModal = (mode = "create", project = null) => {
    setModalMode(mode);
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleDeleteProject = useCallback(
    (projectId) => {
      console.log("Deleting user with ID:", projectId);
      doDeleteProject({ id: projectId });
    },
    [doDeleteProject],
  );

  const handleCreateProject = (projectData) => {
    doCreateProject(projectData);
  };

  const handleUpdateProject = (projectData) => {
    doUpdateProject(projectData);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handlePriorityFilter = (value) => {
    setPriorityFilter(value);
    setPage(1);
  };

  const TableSkeleton = () => (
    <>
      {[...Array(itemsPerPage)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={53}
          sx={{ my: 1 }}
        />
      ))}
    </>
  );

  const dataHeader = [
    "name",
    "payment",
    "time_start",
    "time_end",
    "note",
    "priority",
    ...(profile?.role === 1 ? ["action"] : []),
  ];

  // Filtered and paginated projects based on search term and priority filter
  const filteredProjects = useMemo(() => {
    if (!dataProject) return [];
    return dataProject.filter((project) => {
      const matchesSearchTerm = project.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPriority =
        priorityFilter === "all" ||
        project.priority.toString() === priorityFilter;
      return matchesSearchTerm && matchesPriority;
    });
  }, [dataProject, searchTerm, priorityFilter]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, page]);

  const pageCount = filteredProjects
    ? Math.ceil(filteredProjects.length / itemsPerPage)
    : 0;

  return (
    <React.Fragment>
      <Box>
        {userRole === 0 ? (
          <Typography
            variant="h3"
            sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 6 }}
          >
            Project Page
          </Typography>
        ) : (
          <Typography
            variant="h3"
            sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 6 }}
          >
            Projects Management Page
          </Typography>
        )}

        <Grid2
          container
          spacing={2}
          sx={{
            marginBottom: 2,
            width: "100%",
          }}
        >
          <Grid2 size={6} item xs={12} md={4}>
            <SearchBar onSearch={handleSearch} />
          </Grid2>
          <Grid2 size={2} item xs={12} md={4}>
            <FilterByPriority
              onFilter={handlePriorityFilter}
              currentFilter={priorityFilter}
            />
          </Grid2>
          {userRole === 1 && (
            <Grid2
              item
              size={4}
              xs={12}
              md={4}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
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
            </Grid2>
          )}
        </Grid2>
      </Box>

      <ProjectModal
        open={modalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        project={selectedProject}
        onCreateProject={handleCreateProject}
        onUpdateProject={handleUpdateProject}
      />

      {profile?.role === 0 ? (
        // For role 0, display all filtered projects without pagination
        <CustomizedCard cardCell={dataHeader} cardDatas={filteredProjects} />
      ) : (
        <>
          {disabled ? (
            <TableSkeleton />
          ) : (
            <CustomizedTable
              tableCell={dataHeader}
              tableDatas={paginatedProjects}
              onUpdate={(project) => handleOpenModal("update", project)}
              onDelete={(projectId) => handleDeleteProject(projectId)}
            />
          )}

          {/* Show pagination for role 1 */}
          {filteredProjects.length > 0 && pageCount > 1 && (
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
            />
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default ProjectsPage;
