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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/HomeAsset/logo2.png";

const Header = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userProfile } = useSelector((state) => state.userProfile);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    navigate(PATH.PROFILE);
    handleMenuClose();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: 'calc(100vw - (100vw - 100%))',
          ml: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#1976d2",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "20px",
            paddingRight: "20px",
            position: "relative",
          }}
        >
          {/* Menu Icon*/}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <img
            src={Logo}
            alt="logo"
            style={{ width: "130px", height: "auto" }}
          />

          {/* Slogan */}
          {!isMobile && (
            <Typography
              variant="subtitle1"
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "1.3rem",
                color: "#ffffff",
                textAlign: "center",
                lineHeight: "1.2",
              }}
            >
              Nền tảng quản lý dự án chuyên nghiệp
              <br />
              <span style={{ fontSize: "1.1rem", color: "#cfcfcf" }}>
                Kết nối - Đồng bộ - Thành công
              </span>
            </Typography>
          )}

          {/* Avatar*/}
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
