import { ROUTES } from "@/routes/routes";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux"; // To get the user role from the state
import { NavLink } from "react-router-dom";

const MenuList = () => {
  const { profile } = useSelector((state) => state.profile); // Get the user profile and role

  return (
    <List>
      {ROUTES.map((item) => {
        if (
          (item.label === "Dashboard" || item.label === "Users") &&
          profile?.role === 0
        ) {
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
                  transform: "scale(1.05)",
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
  );
};

export default MenuList;
