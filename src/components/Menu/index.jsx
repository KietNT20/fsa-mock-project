import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography
} from "@mui/material";

import { PATH } from "@/constant/path";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from "@mui/icons-material/MoveToInbox";
import TaskIcon from '@mui/icons-material/Task';
import WorkIcon from '@mui/icons-material/Work';
import { NavLink } from "react-router-dom";

const MenuList = () => {
  const menuItems = [
    { path: PATH.HOME, label: "Homepage", icon: <InboxIcon sx={{ fontSize: 30 }} /> },
    { path: PATH.DASHBOARD, label: "Dashbboard", icon: <DashboardIcon sx={{ fontSize: 30 }} /> },
    { path: PATH.TASK, label: "Task", icon: <TaskIcon sx={{ fontSize: 30 }} /> },
    { path: PATH.PROJECT, label: "Project", icon: <WorkIcon sx={{ fontSize: 30 }} /> },
    { path: PATH.USERS, label: "User", icon: <AccountCircleIcon sx={{ fontSize: 30 }} /> },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            component={NavLink}
            to={item.path}
            sx={{
              minHeight: 80,
              justifyContent: "initial",
              px: 3.2,
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Animation transition
              "&:hover": {
                transform: "scale(1.05)", // Phóng to nhẹ khi hover
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Thêm shadow khi hover
                backgroundColor: "#f0f0f0", // Màu nền nhẹ khi hover
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: "center",
                transition: "color 0.3s ease", // Transition cho icon
                "&:hover": {
                  color: "#1976d2", // Thay đổi màu icon khi hover
                }
              }}
            >
              {item.icon}
            </ListItemIcon>
            <Typography variant="h6" sx={{ transition: "color 0.3s ease" }}>
              {item.label}
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuList;
