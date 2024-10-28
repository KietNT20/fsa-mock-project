import { Box, Typography } from "@mui/material";
import React from "react";

const InfoItem = ({ title, icon, value }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginY: "15px",
    }}
  >
    <Typography
      variant="body2"
      sx={{
        color: "#2d2f30",
        fontWeight: "bold",
        fontSize: "1.6rem",
        marginBottom: "10px",
      }}
    >
      {title}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {React.cloneElement(icon, { sx: { marginRight: 1, color: "#2d2f30" } })}
      <Typography variant="body1" sx={{ fontSize: "1.8rem", color: "#2d2f30" }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

export default InfoItem;
