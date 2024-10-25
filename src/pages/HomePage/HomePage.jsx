import { useGetApiUsers } from "@/hooks/useUsers";
import { saveUserProfile } from "@/store/actions/userProfileAction";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

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
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Typography>
        Đây là trang chính của hệ thống, nơi hiển thị các thông tin và báo cáo
        quan trọng.
      </Typography>
      <Typography>
        Bạn có thể tùy chỉnh trang này để thêm nội dung như biểu đồ, danh sách
        công việc, và nhiều hơn nữa.
      </Typography>
    </div>
  );
};

export default HomePage;
