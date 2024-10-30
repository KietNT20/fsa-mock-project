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
import AddBoxIcon from "@mui/icons-material/AddBox";
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

const itemsPerPage = 5;

const ProjectsPage = () => {
  const { data: dataProject, isLoading, isError, error } = useGetProject();
  const { mutate: doDeleteProject, isPending: deleteProjectPending } =
    useDeleteProject();
  const { mutate: doCreateProject, isPending: addProjectPending } =
    useCreateProject();
  const { mutate: doUpdateProject, isPending: updateProjectPending } =
    useUpdateProject();
  const { userProfile } = useSelector((state) => state.userProfile);
  const userRole = userProfile?.role;
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
        <Skeleton key={index} variant="rectangular" height={40} />
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
    ...(userProfile?.role === 1 ? ["action"] : []),
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

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <React.Fragment>
      <Box>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 3 }}
        >
          {userRole === 0 ? "Projects Page" : "Projects Management Page"}
        </Typography>

        <Grid2
          container
          spacing={2}
          sx={{
            width: "100%",
          }}
        >
          {userRole === 0 && (
            <>
              <Grid2 size={{ xs: 6, sm: 8, md: 6, lg: 6, xl: 6 }}>
                <SearchBar data={dataProject || []} onSearch={handleSearch} />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 2 }}>
                <FilterByPriority
                  onFilter={handlePriorityFilter}
                  currentFilter={priorityFilter}
                />
              </Grid2>
            </>
          )}
          {userRole === 1 && (
            <>
              <Grid2 size={{ xs: 12, sm: 4, md: 6, lg: 6, xl: 6 }}>
                <SearchBar data={dataProject || []} onSearch={handleSearch} />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 3, md: 2, lg: 2, xl: 2 }}>
                <FilterByPriority
                  onFilter={handlePriorityFilter}
                  currentFilter={priorityFilter}
                />
              </Grid2>
              <Grid2
                size={{ xs: 6, sm: 5, md: 4, lg: 4, xl: 4 }}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  onClick={() => handleOpenModal("create")}
                  sx={{
                    background: "linear-gradient(135deg, #0d47a1 , #90caf9)",
                    padding: "8px 16px",
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
                  <AddBoxIcon sx={{ fontSize: 25, marginRight: "2px" }} />
                  Create Project
                </Button>
              </Grid2>
            </>
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

      {userProfile?.role === 0 ? (
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
          {!isLoading && dataProject && dataProject.length > 0 && (
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              sx={{ display: "flex", justifyContent: "center" }}
            />
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default ProjectsPage;
