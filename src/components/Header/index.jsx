import { PATH } from "@/constant/path";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile icon
import LogoutIcon from "@mui/icons-material/Logout"; // Logout icon
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Header = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userProfile } = useSelector((state) => state.userProfile);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(PATH.LOGIN, { replace: true });
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate(PATH.PROFILE); // Navigate to profile page
    handleMenuClose();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
          {/* User Avatar/Button to Open Menu */}
          <IconButton color="inherit" onClick={handleMenuClick}>
            <Avatar
              src={userProfile.avarta}
              sx={{
                border: "2px solid #fff",
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
                width: 40,
                height: 40,
              }}
            />
          </IconButton>
          {/* User Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: 2,
                minWidth: 150,
                padding: 1,
              },
            }}
          >
            <MenuItem
              onClick={handleProfile}
              sx={{
                fontSize: "1.6rem",
                padding: "12px 20px",
              }}
            >
              <AccountCircleIcon sx={{ mr: 1.5, fontSize: "2.2rem" }} /> Profile
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{
                fontSize: "1.6rem",
                padding: "12px 20px",
              }}
            >
              <LogoutIcon sx={{ mr: 1.5, fontSize: "2.2rem" }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
