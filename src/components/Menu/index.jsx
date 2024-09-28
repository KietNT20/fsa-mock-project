import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

const MenuList = () => {
  return (
    <List>
      {ROUTES.map((item) => (
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
                  color: "#1976d2",
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
      ))}
    </List>
  );
};

export default MenuList;
