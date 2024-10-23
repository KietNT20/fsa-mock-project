import { Typography } from "@mui/material";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import "../../assets/scss/pages/_chartPie.scss";

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ data, labels, title }) => {
  if (!data || !labels || !title) {
    return <Typography>Không có dữ liệu để hiển thị biểu đồ.</Typography>;
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(201, 203, 207, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true, // Tự động thay đổi kích thước
    maintainAspectRatio: false, // Để biểu đồ linh hoạt với tỷ lệ khung hình
  };

  return (
    <div className="chart-container">
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
        {title}
      </Typography>
      <div className="chart-wrapper">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
