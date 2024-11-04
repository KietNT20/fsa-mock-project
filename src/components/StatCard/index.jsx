import { Info } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";

const StatCard = ({ title, value, icon: Icon, color, onClick }) => {
  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: color,
        color: "white",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
          transition: "all 0.3s",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {value}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Icon sx={{ fontSize: 40, mb: 1, opacity: 0.8 }} />
            <IconButton
              size="small"
              onClick={onClick}
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <Info />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
