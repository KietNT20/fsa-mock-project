import useAvatarUpload from "@/hooks/useAvatar";
import { useGetApiUserById } from "@/hooks/useUsers";
import Container from "@mui/material/Container";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import UserModal from "../UsersPage/UserModal";
import AvatarUploadModal from "./AvatarUploadModal";
import ProfileSection from "./ProfileSection";

const Profile = () => {
  const { userProfile } = useSelector((state) => state.userProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const { isLoading, error, uploadAvatar } = useAvatarUpload();
  const { userDetailData } = useGetApiUserById(userProfile.id);
  const fileInputRef = useRef(null);

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
    const file = fileInputRef.current.files[0];
    if (file) {
      uploadAvatar(file);
      setIsAvatarModalOpen(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <ProfileSection
        userProfile={userProfile}
        userDetailData={userDetailData}
        handleEditProfile={handleEditProfile}
        handleAvatarClick={handleAvatarClick}
      />
      <AvatarUploadModal
        isAvatarModalOpen={isAvatarModalOpen}
        handleAvatarModalClose={handleAvatarModalClose}
        handleFileChange={handleFileChange}
        handleSaveAvatar={handleSaveAvatar}
        previewAvatar={previewAvatar}
        isLoading={isLoading}
        error={error}
        fileInputRef={fileInputRef}
      />
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
