import { useGetApiUserById } from "@/hooks/useUsers";
import { generateCartoonAvatar } from "@/utils/avatarUtils";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserModal from "../UsersPage/UserModal";

const Profile = () => {
  const { userProfile } = useSelector((state) => state.userProfile);
  console.log("userProfile", userProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userDetailData } = useGetApiUserById(userProfile.id);
  // const dispatch = useDispatch();

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateUser = () => {
    handleCloseModal();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
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
            <Avatar
              src={generateCartoonAvatar(userDetailData?.name)}
              sx={{
                width: 180,
                height: 180,
                mx: "auto",
                mb: 3,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                border: "1px solid #1e88e5",
                borderRadius: "50%",
              }}
            />
            <Button
              variant="contained"
              disabled={userProfile.email === "admin@gmail.com"}
              startIcon={<EditIcon />}
              sx={{
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
                  <strong>Joined: </strong>{" "}
                  {userDetailData?.joined || "Unknown"}
                </Typography>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Paper>

      {/* UserModal */}
      <UserModal
        open={isModalOpen}
        onClose={handleCloseModal}
        mode="update"
        user={userProfile}
        onCreateUser={handleUpdateUser}
      />
    </Container>
  );
};

export default Profile;
