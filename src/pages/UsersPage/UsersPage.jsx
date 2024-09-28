// components/UsersPage.js
import CustomizedTable from "@/components/CustomizedTable";
import { useUsers } from "@/hooks/useUsers";
import { Typography } from "@mui/material";
import React from "react";

const UsersPage = () => {
  const { dataUsers } = useUsers();
  console.log(dataUsers);
  return (
    <React.Fragment>
      <div>
        <Typography variant="h4" gutterBottom>
          Users Page
        </Typography>
        <Typography>Đây là trang quản lý người dùng.</Typography>
      </div>
      <CustomizedTable />
    </React.Fragment>
  );
};

export default UsersPage;
