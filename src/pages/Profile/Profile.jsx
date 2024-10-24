import useAvatarUpload from "@/hooks/useAvatar";
import { useGetApiUserById } from "@/hooks/useUsers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserModal from "../UsersPage/UserModal";

const Profile = () => {
  const { userProfile } = useSelector((state) => state.userProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const { isLoading, error, uploadAvatar } = useAvatarUpload();
  const { userDetailData } = useGetApiUserById(userProfile.id);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAvatarClick = () => {
    setIsAvatarModalOpen(true);
  };

  const handleAvatarModalClose = () => {
    setIsAvatarModalOpen(false);
    setPreviewAvatar(null);
  };

  const handleUpdateUser = () => {
    handleCloseModal();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    const file = document.querySelector('input[type="file"]').files[0];
    if (file) {
      uploadAvatar(file);
      setIsAvatarModalOpen(false);
    }
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
                  <strong>Joined: </strong>{" "}
                  {userDetailData?.joined || "Unknown"}
                </Typography>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Paper>

      {/* Avatar Upload Modal */}
      <Dialog
        open={isAvatarModalOpen}
        onClose={handleAvatarModalClose}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#1565C0",
          }}
        >
          Upload New Avatar
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 5,
          }}
        >
          <input
            type="file"
            onChange={handleFileChange}
            style={{
              padding: "12px",
              backgroundColor: "#f1f3f4",
              borderRadius: "10px",
              marginBottom: "25px",
              width: "100%",
              textAlign: "center",
            }}
          />

          {previewAvatar && (
            <Box
              textAlign="center"
              sx={{
                position: "relative",
                width: 500,
                height: 500,
                overflow: "hidden",
                borderRadius: "10px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                mb: 4,
              }}
            >
              <Box
                sx={{
                  width: 500,
                  height: 500,
                  backgroundImage: `url(${previewAvatar})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "grab",
                }}
              />
            </Box>
          )}

          {isLoading && (
            <Typography sx={{ color: "#1565C0", fontWeight: "500" }}>
              Uploading...
            </Typography>
          )}
          {error && (
            <Typography sx={{ color: "red", fontWeight: "500" }}>
              Error: {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 4 }}>
          <Button
            onClick={handleSaveAvatar}
            variant="contained"
            sx={{
              backgroundColor: "#1565C0",
              color: "#fff",
              fontWeight: "bold",
              padding: "12px 25px",
              fontSize: "1.1rem",
              "&:hover": { backgroundColor: "#0d47a1" },
            }}
          >
            Save Avatar
          </Button>
          <Button
            onClick={handleAvatarModalClose}
            variant="outlined"
            sx={{
              color: "#1565C0",
              borderColor: "#1565C0",
              padding: "12px 25px",
              fontSize: "1.1rem",
              "&:hover": { borderColor: "#0d47a1", color: "#0d47a1" },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

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
