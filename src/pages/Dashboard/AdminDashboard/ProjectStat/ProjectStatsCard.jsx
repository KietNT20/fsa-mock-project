import { Launch as DetailIcon } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";

const ProjectStatsCard = ({ projectStats, handleOpenProjectModal }) => {
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
            <Grid2 item xs={12} sm={6} md={4}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                Running Projects
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: "#2196f3" }}
              >
                {projectStats.runningProjects.length}
              </Typography>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={4}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                Releasing in 7 Days
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: "#ff9800" }}
              >
                {projectStats.projectsReleasingSoon.length}
              </Typography>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={4}>
              <Typography
                variant="h4"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                Prioritized Projects
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.8rem", color: "#4caf50" }}
              >
                {projectStats.prioritizedProjects.length}
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
            <Grid2 item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenProjectModal}
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

export default ProjectStatsCard;
