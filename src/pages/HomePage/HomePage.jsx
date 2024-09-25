import { Typography } from "@mui/material";

const HomePage = () => {
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
