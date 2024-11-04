import CustomizedCard from "@/components/CustomizedCard";
import TableUser from "@/components/CustomizedTable/TableUser";
import FilterByRole from "@/components/FilterByRole";
import SearchBar from "@/components/SearchBar";
import {
  useCreateApiUser,
  useDeleteApiUser,
  useGetApiUsers,
} from "@/hooks/useUsers";
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
import UserModal from "./UserModal";

const itemsPerPage = 5;

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const { userProfile } = useSelector((state) => state.userProfile);
  const userRole = userProfile?.role;
  const { data: dataUsers, isLoading, isError, error } = useGetApiUsers();
  const { mutate: doDeleteUser, isPending: deleteUserLoading } =
    useDeleteApiUser();
  const { mutate: doCreateUser, isPending: createUserLoading } =
    useCreateApiUser();

  // Filter users based on search and role
  const filteredUsers = useMemo(() => {
    if (!dataUsers) return [];
    const searchLower = searchTerm.toLowerCase();
    return dataUsers.filter(
      (user) =>
        (user.name?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower)) &&
        (roleFilter === "all" || user.role.toString() === roleFilter),
    );
  }, [dataUsers, searchTerm, roleFilter]);

  // Get paginated data
  const filteredAndPaginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, page]);

  const handleDeleteUser = useCallback(
    (userId) => {
      doDeleteUser({ id: userId });
    },
    [doDeleteUser],
  );

  const handleOpenModal = (mode = "create", user = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleCreateUser = (data) => {
    doCreateUser(data);
  };

  const pageCount = filteredUsers
    ? Math.ceil(filteredUsers.length / itemsPerPage)
    : 0;

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setPage(value);
  };

  const handleSearch = (value) => {
    setSearchTerm(value || "");
    setPage(1);
  };

  const handleSelectUser = (selectedOption) => {
    if (selectedOption) {
      setSearchTerm(selectedOption.email || selectedOption.name || "");
      setPage(1);
    }
  };

  const handleRoleFilter = (value) => {
    setRoleFilter(value);
    setPage(1);
  };

  const TableSkeleton = () => (
    <>
      {[...Array(itemsPerPage)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" height={40} />
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
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 3 }}
        >
          {userRole === 0 ? "User Page" : "Users Management Page"}
        </Typography>

        <Grid2
          container
          spacing={2}
          sx={{
            width: "100%",
          }}
        >
          <Grid2 size={6}>
            <SearchBar
              data={dataUsers || []}
              onSearch={handleSearch}
              onSelect={handleSelectUser}
            />
          </Grid2>
          <Grid2 size={2}>
            <FilterByRole
              onFilter={handleRoleFilter}
              currentFilter={roleFilter}
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
                Create New User
              </Button>
            </Grid2>
          )}
        </Grid2>
      </Box>

      <UserModal
        open={modalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        user={selectedUser}
        onCreateUser={handleCreateUser}
        createLoading={createUserLoading}
      />

      {isLoading || deleteUserLoading || createUserLoading ? (
        <TableSkeleton />
      ) : !filteredAndPaginatedData || filteredAndPaginatedData.length === 0 ? (
        <Typography>No users data available.</Typography>
      ) : userRole === 1 ? (
        <TableUser
          tableCell={columnsUsers}
          tableDatas={filteredAndPaginatedData}
          onDelete={handleDeleteUser}
          onUpdate={(user) => handleOpenModal("update", user)}
          deleteLoading={deleteUserLoading}
        />
      ) : (
        <CustomizedCard
          cardCell={columnsUsers}
          cardDatas={filteredAndPaginatedData}
        />
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
