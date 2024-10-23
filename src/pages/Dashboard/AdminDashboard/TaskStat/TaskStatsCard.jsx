import { Launch as DetailIcon } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";

const TaskStatsCard = ({ taskStats, handleOpenTaskModal }) => {
  return (
    <Grid2
      item
      xs={12}
      md={6}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          width: "100%",
          padding: "20px",
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        }}
      >
        <CardContent>
          <Grid2 container spacing={3}>
            <Grid2 item xs={12} sm={6} md={3}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                Late Tasks
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: "#f44336" }}
              >
                {taskStats.lateTasks.length}
              </Typography>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={3}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                Waiting Tasks
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: "#ff9800" }}
              >
                {taskStats.waitingTasks.length}
              </Typography>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={3}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                In-Progress Tasks
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: "#2196f3" }}
              >
                {taskStats.inProgressTasks.length}
              </Typography>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={3}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                Tasks Due in 3 Days
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: "#4caf50" }}
              >
                {taskStats.tasksDueInThreeDays.length}
              </Typography>
            </Grid2>
          </Grid2>

          <Divider sx={{ my: 3 }} />

          <Grid2
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid2 item xs={12} sm={6} md={9}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                Total Tasks
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: "#000000" }}
              >
                {taskStats.totalTasks}
              </Typography>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenTaskModal}
                sx={{
                  color: "#fff",
                  backgroundColor: "#1565C0",
                  padding: "15px 20px",
                  borderRadius: "50px",
                  fontSize: "1.4rem",
                  textTransform: "none",
                  fontWeight: "500",
                  boxShadow: `0px 4px 10px rgba(33, 150, 243, 0.3)`,
                  "&:hover": {
                    backgroundColor: "#0B4C8C",
                  },
                }}
              >
                <DetailIcon
                  fontSize="large"
                  sx={{ color: "#ffffff", marginRight: "7px" }}
                />
                View Details
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default TaskStatsCard;
