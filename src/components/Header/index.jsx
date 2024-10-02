import { useTheme } from "@emotion/react";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

import { PATH } from "@/constant/path";
import { generateCartoonAvatar } from "@/utils/avatarUtils";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile icon
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout"; // Logout icon
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuList from "../Menu";

const drawerWidth = 240;

const Header = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { profile } = useSelector((state) => state.profile);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
      <MUIAppBar position="fixed" open={open}>
        <Toolbar sx={{ height: "75px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Mini variant drawer
          </Typography>

          {/* User Avatar/Button to Open Menu */}
          <IconButton color="inherit" onClick={handleMenuClick}>
            <Avatar
              alt={profile.name}
              src={generateCartoonAvatar(profile.name)}
              sx={{
                border: "2px solid #fff",
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
                width: 40,
                height: 40,
              }}
            />
          </IconButton>

          {/* User Menu */}
          <StyledMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <StyledMenuItem onClick={handleProfile}>
              <AccountCircleIcon sx={{ mr: 1.5, fontSize: "2rem" }} /> Profile
            </StyledMenuItem>
            <StyledMenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1.5, fontSize: "2rem" }} /> Logout
            </StyledMenuItem>
          </StyledMenu>
        </Toolbar>
      </MUIAppBar>

      <MuiDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MenuList />
        <Divider />
      </MuiDrawer>
    </>
  );
};

export default Header;

// Styled Menu to make it larger and more visually appealing
const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "10px",
    padding: theme.spacing(1),
    backgroundColor: "#f0f0f0",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    minWidth: "150px",
  },
}));

// Styled MenuItem
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "1.5rem",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

// MUI Styled Components
const MUIAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 15px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 15px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MuiDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
