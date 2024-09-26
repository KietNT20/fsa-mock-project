// components/ProjectsPage.js
import { Typography } from "@mui/material";
import { useState } from "react";
import CardLayout from "./CardLayout";
import TableLayout from "./TableLayout";

const ProjectsPage = () => {
  const [user] = useState({ name: "John Doe", role: 0});

  return (
    <div>
      <Typography variant="h3"> Chào mừng, {user.name}! </Typography>
      {user.role === 1 ? <TableLayout /> : <CardLayout />}
    </div>
  );
};

export default ProjectsPage;
