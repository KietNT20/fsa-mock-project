import comingSoonImage2 from "@/assets/HomeAsset/Under_Construction.gif";
import { useGetApiUsers } from "@/hooks/useUsers";
import { saveUserProfile } from "@/store/actions/userProfileAction";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
      <img
        src={comingSoonImage2}
        alt="Coming Soon"
        style={{ width: "700px", height: "auto" }}
      />
    </Box>
  );
};

export default HomePage;
