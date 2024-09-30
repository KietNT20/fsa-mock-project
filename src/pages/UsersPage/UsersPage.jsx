import CustomizedTable from "@/components/CustomizedTable";
import { useUsers } from "@/hooks/useUsers";
import { columnsUsers } from "@/utils/columns";
import { CircularProgress, Pagination, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const UsersPage = () => {
  const { dataUsers, isLoading, isError, error } = useUsers();
  const { profile } = useSelector((state) => state.profile);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const paginatedData = useMemo(() => {
    if (!dataUsers) return [];
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dataUsers.slice(startIndex, endIndex);
  }, [dataUsers, page]);

  const pageCount = dataUsers ? Math.ceil(dataUsers.length / itemsPerPage) : 0;

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setPage(value);
  };

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  if (!dataUsers || dataUsers.length === 0) {
    return <Typography>No users data available.</Typography>;
  }

  return (
    <React.Fragment>
      {isLoading && <CircularProgress />}
      <div>
        <Typography variant="h4" gutterBottom>
          Users Page
        </Typography>
        <Typography>Đây là trang quản lý người dùng.</Typography>
      </div>
      {profile?.role === 1 && <Typography>Chính sửa</Typography>}
      <CustomizedTable tableCell={columnsUsers} tableData={paginatedData} />
      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </React.Fragment>
  );
};

export default UsersPage;
