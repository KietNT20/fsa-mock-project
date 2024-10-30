import { ROUTES } from "@/routes/routes";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const MenuList = () => {
  const { userProfile } = useSelector((state) => state.userProfile);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "0",
      }}
    >
      <List sx={{ padding: 0 }}>
        {ROUTES.map((item) => {
          if (item.label === "Users" && userProfile?.role === 0) {
            return null;
          }
          if (item.label === "Tasks" && userProfile?.role === 1) {
            return null;
          }
          return (
            <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  minHeight: 80,
                  justifyContent: "initial",
                  px: 3.2,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 4,
                    justifyContent: "center",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#0d47a1",
                    },
                  }}
                >
                  {<item.icon sx={{ fontSize: 25 }} />}
                </ListItemIcon>
                <Typography
                  variant="h5"
                  sx={{ transition: "color 0.3s ease", fontSize: "1.6rem" }}
                >
                  {item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default MenuList;
