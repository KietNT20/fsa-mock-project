import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Box, Button, Grid2, Paper, Typography } from "@mui/material";

const ProfileSection = ({
  userProfile,
  userDetailData,
  handleEditProfile,
  handleAvatarClick,
}) => {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 6,
        borderRadius: "20px",
        background: "linear-gradient(135deg, #bbdefb, #ffffff)",
        color: "#636969",
      }}
    >
      <Grid2 container spacing={4} alignItems="center">
        {/* Avatar Section */}
        <Grid2 item xs={12} sm={4} textAlign="center">
          <Box
            sx={{
              position: "relative",
              width: 180,
              height: 180,
              mx: "auto",
            }}
          >
            <Avatar
              src={userProfile.avarta || "/default-avatar.png"}
              sx={{
                width: 180,
                height: 180,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                border: "1px solid #1e88e5",
                borderRadius: "50%",
              }}
            />
            <CameraAltIcon
              onClick={handleAvatarClick}
              sx={{
                position: "absolute",
                bottom: 10,
                right: 10,
                cursor: "pointer",
                fontSize: "3.5rem",
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                padding: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Box>
          <Button
            variant="contained"
            disabled={userProfile.email === "admin@gmail.com"}
            startIcon={<EditIcon />}
            sx={{
              mt: 2,
              fontSize: "1.4rem",
              backgroundColor: "#1565c0",
              "&:hover": { backgroundColor: "#0d47a1" },
            }}
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>
        </Grid2>

        {/* Profile Details Section */}
        <Grid2 item xs={12} sm={8}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
            {userDetailData?.name}
          </Typography>

          <Box>
            {/* Email */}
            <Box display="flex" alignItems="center" mb={2}>
              <EmailIcon sx={{ mr: 2, fontSize: "2rem", color: "#1565c0" }} />
              <Typography variant="body1" sx={{ fontSize: "1.6rem" }}>
                <strong>Email: </strong> {userDetailData?.email}
              </Typography>
            </Box>

            {/* Phone */}
            <Box display="flex" alignItems="center" mb={2}>
              <PhoneIcon sx={{ mr: 2, fontSize: "2rem", color: "#1565c0" }} />
              <Typography variant="body1" sx={{ fontSize: "1.6rem" }}>
                <strong>Phone: </strong>{" "}
                {userDetailData?.phone || "Not provided"}
              </Typography>
            </Box>

            {/* Address */}
            <Box display="flex" alignItems="center" mb={2}>
              <HomeIcon sx={{ mr: 2, fontSize: "2rem", color: "#1565c0" }} />
              <Typography variant="body1" sx={{ fontSize: "1.6rem" }}>
                <strong>Address: </strong>{" "}
                {userDetailData?.address || "Not provided"}
              </Typography>
            </Box>

            {/* Joined Date */}
            <Box display="flex" alignItems="center">
              <CalendarTodayIcon
                sx={{ mr: 2, fontSize: "2rem", color: "#1565c0" }}
              />
              <Typography variant="body1" sx={{ fontSize: "1.6rem" }}>
                <strong>Joined: </strong> {userDetailData?.joined || "Unknown"}
              </Typography>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default ProfileSection;
