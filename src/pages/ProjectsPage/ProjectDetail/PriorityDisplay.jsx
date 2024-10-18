import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Box, Typography } from "@mui/material";

const PriorityDisplay = ({ priority }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1:
        return "error.main";
      case 2:
        return "success.main";
      case 3:
        return "warning.main";
      default:
        return "text.primary";
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 1:
        return "High";
      case 2:
        return "Medium";
      case 3:
        return "Low";
      default:
        return "Unknown";
    }
  };

  const color = getPriorityColor(priority);

  return (
    <Box display="flex" alignItems="center">
      <PriorityHighIcon sx={{ mr: 1, fontSize: "2.4rem", color: color }} />
      <Typography variant="body1" sx={{ fontSize: "1.8rem", color: color }}>
        <strong>Priority: </strong>
        {getPriorityText(priority)}
      </Typography>
    </Box>
  );
};

export default PriorityDisplay;
