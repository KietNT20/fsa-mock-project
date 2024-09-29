import { useUsers } from "@/hooks/useUsers";
import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const UsersPage = () => {
  const { dataUsers } = useUsers();
  const { profile } = useSelector((state) => state.profile);
  console.log("profile", profile);
  console.log(dataUsers);
  return (
    <React.Fragment>
      <div>
        <Typography variant="h4" gutterBottom>
          Users Page
        </Typography>
        <Typography>Đây là trang quản lý người dùng.</Typography>
      </div>
      {profile?.role === 1 && <Typography>Chính sửa</Typography>}
      {/* <CustomizedTable tableCell={dataUsers} tableDatas={dataUsers} /> */}
    </React.Fragment>
  );
};

export default UsersPage;
