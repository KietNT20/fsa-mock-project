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

const TaskByUserStatCard = ({ TaskByUserStat, handleOpenTaskByUserModal }) => {
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
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                User With Tasks Due in 7 Days
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: COLORS.BORDER_RED }}
              >
                {TaskByUserStat.usersWithTasksDueIn7Days?.[0]?.taskCount || 0}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Not Started
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: COLORS.BORDER_YELLOW }}
              >
                {TaskByUserStat.notStartedCount || 0}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                In Progress
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: COLORS.BORDER_BLUE }}
              >
                {TaskByUserStat.inProgressCount || 0}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Bug Fixing
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: COLORS.BORDER_ORANGE }}
              >
                {TaskByUserStat.bugFixingCount || 0}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Completed
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: COLORS.BORDER_GREEN }}
              >
                {TaskByUserStat.completedCount || 0}
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
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Total User Tasks
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: "#000000" }}
              >
                {TaskByUserStat.totalUserTasks || 0}
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                onClick={handleOpenTaskByUserModal}
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

export default TaskByUserStatCard;
