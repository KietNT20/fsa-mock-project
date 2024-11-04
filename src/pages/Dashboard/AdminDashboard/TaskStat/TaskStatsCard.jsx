import { COLORS } from "@/constant/color";
import { Launch as DetailIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";

const TaskStatsCard = ({ taskStats, handleOpenTaskModal }) => {
  return (
    <>
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
          <Grid2 container spacing={2}>
            <Grid2 size={{ sm: 12, md: 6 }}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                Late Tasks
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: COLORS.PRIMARY_RED }}
              >
                {taskStats.lateTasks.length}
              </Typography>
            </Grid2>
            <Grid2 size={{ sm: 12, md: 6 }}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                Waiting Tasks
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: COLORS.PRIMARY_BLUE }}
              >
                {taskStats.waitingTasks.length}
              </Typography>
            </Grid2>
            <Grid2 size={{ sm: 12, md: 6 }}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                In-Progress Tasks
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: COLORS.PRIMARY_YELLOW }}
              >
                {taskStats.inProgressTasks.length}
              </Typography>
            </Grid2>
            <Grid2 size={{ sm: 12, md: 6 }}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                Tasks Due in 3 Days
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: COLORS.PRIMARY_GREEN }}
              >
                {taskStats.tasksDueInThreeDays.length}
              </Typography>
            </Grid2>
          </Grid2>

          <Divider sx={{ my: 3 }} />

          <Box
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
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
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default TaskStatsCard;
