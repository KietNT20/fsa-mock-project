import CustomizedTable from "@/components/CustomizedTable";
import { useDeleteApiUser, useGetApiUsers } from "@/hooks/useUsers";
import { columnsUsers } from "@/utils/columns";
import { Container, Pagination, Skeleton, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";

const itemsPerPage = 6;

const UsersPage = () => {
  const { data: dataUsers, isLoading, isError, error } = useGetApiUsers();
  const { mutate: doDeleteUser } = useDeleteApiUser();
  const [page, setPage] = useState(1);

  const handleDeleteUser = useCallback(
    (userId) => {
      // console.log("Deleting user with ID:", userId);
      doDeleteUser({ id: userId });
    },
    [doDeleteUser],
  );

  const paginatedData = useMemo(() => {
    if (!dataUsers) return [];
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dataUsers.slice(startIndex, endIndex);
  }, [dataUsers, page]);

  const pageCount = dataUsers ? Math.ceil(dataUsers.length / itemsPerPage) : 0;

  const handlePageChange = (event, value) => {
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

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Users Page
      </Typography>
      <Typography gutterBottom>This is the user management page.</Typography>
      {isLoading ? (
        <TableSkeleton />
      ) : !dataUsers || dataUsers.length === 0 ? (
        <Typography>No users data available.</Typography>
      ) : (
        <CustomizedTable
          tableCell={columnsUsers}
          tableData={paginatedData}
          handleDelete={handleDeleteUser}
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
    </Container>
  );
};

export default UsersPage;
