import CustomizedCard from "@/components/CustomizedCard";
import CustomizedTable from "@/components/CustomizedTable";
import {
  useCreateApiUser,
  useDeleteApiUser,
  useGetApiUsers,
  useUpdateApiUser,
} from "@/hooks/useUsers";
import { Box, Button, Pagination, Skeleton, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import UserModal from "./UserModal";

const itemsPerPage = 6;

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedProject, setSelectedProject] = useState(null);
  const { profile } = useSelector((state) => state.profile);
  const userRole = profile?.role;
  const { data: dataUsers, isLoading, isError, error } = useGetApiUsers();
  const { mutate: doDeleteUser, isPending: deleteUserLoading } =
    useDeleteApiUser();
  const { mutate: doUpdateUser, isPending: updateUserLoading } =
    useUpdateApiUser();
  const { mutate: doCreateUser, isPending: createUserLoading } =
    useCreateApiUser();

  const handleDeleteUser = useCallback(
    (userId) => {
      // console.log("Deleting user with ID:", userId);
      doDeleteUser({ id: userId });
    },
    [doDeleteUser]
  );

  const paginatedData = useMemo(() => {
    if (!dataUsers) return [];
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dataUsers.slice(startIndex, endIndex);
  }, [dataUsers, page]);

  const handleOpenModal = (mode = "create", user = null) => {
    setModalMode(mode);
    setSelectedProject(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  // Handle user creation
  const handleCreateUser = (data) => {
    doCreateUser(data);
  };

  // Handle user update
  const handleUpdateUser = (data) => {
    doUpdateUser(data);
  };

  const pageCount = dataUsers ? Math.ceil(dataUsers.length / itemsPerPage) : 0;

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setPage(value);
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

  const columnsUsers = [
    "name",
    "email",
    "role",
    ...(userRole === 1 ? ["action"] : []),
  ];

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <React.Fragment>
      <Box>
        {userRole === 0 ? (
          <Typography
            variant="h3"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            User Page
          </Typography>
        ) : (
          <Typography
            variant="h3"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Users Management Page
          </Typography>
        )}

        {userRole === 1 && (
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
            Create New User
          </Button>
        )}
      </Box>

      <UserModal
        open={modalOpen}
        onClose={() => handleCloseModal()}
        mode={modalMode}
        project={selectedProject}
        onCreateUser={(data) => handleCreateUser(data)}
        onUpdateUser={(data) => handleUpdateUser(data)}
        createLoading={createUserLoading}
        updateLoading={updateUserLoading}
      />

      {isLoading ||
      deleteUserLoading ||
      createUserLoading ||
      updateUserLoading ? (
        <TableSkeleton />
      ) : !dataUsers || dataUsers.length === 0 ? (
        <Typography>No users data available.</Typography>
      ) : userRole === 1 ? (
        <CustomizedTable
          tableCell={columnsUsers}
          tableDatas={paginatedData}
          onDelete={handleDeleteUser}
          onUpdate={(user) => handleOpenModal("update", user)}
          deleteLoading={deleteUserLoading}
        />
      ) : (
        <CustomizedCard cardCell={columnsUsers} cardDatas={paginatedData} />
      )}
      {!isLoading && dataUsers && dataUsers.length > 0 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
        />
      )}
    </React.Fragment>
  );
};

export default UsersPage;
