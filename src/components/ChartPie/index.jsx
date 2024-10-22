import { Typography } from "@mui/material";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

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
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ marginTop: "20px", width: "35%" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        {title}
      </Typography>
      <Pie data={chartData} />
    </div>
  );
};

export default ChartComponent;
