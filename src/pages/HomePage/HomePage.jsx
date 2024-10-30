import { useGetApiUsers } from "@/hooks/useUsers";
import { saveUserProfile } from "@/store/actions/userProfileAction";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import comingSoonImage from "../../assets/HomeAsset/home.png";

const HomePage = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { data: userListData } = useGetApiUsers();
  // console.log("userListData", userListData);

  useEffect(() => {
    if (profile?.email && userListData) {
      const matchedUser = userListData.find(
        (user) => user.email === profile?.email,
      );
      if (matchedUser) {
        dispatch(saveUserProfile(matchedUser));
      }
    }
  }, [profile?.email, userListData, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Home Page
      </Typography>
      <img
        src={comingSoonImage}
        alt="Coming Soon"
        style={{ width: "400px", height: "auto" }}
      />
    </Box>
  );
};

export default HomePage;
