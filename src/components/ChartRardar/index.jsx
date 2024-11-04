import { COLORS } from "@/constant/color";
import { Typography } from "@mui/material";
import {
  ArcElement,
  Chart as ChartJS,
  Filler, // Import Filler
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import "../../assets/scss/pages/_chartPie.scss";

// Đăng ký tất cả các thành phần cần thiết, bao gồm Filler
ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler, // Đăng ký Filler để hỗ trợ fill
);

const RadarChartComponent = ({ data, title, suggestedMax }) => {
  if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
    return <Typography>Không có dữ liệu để hiển thị biểu đồ.</Typography>;
  }

  // Tùy chỉnh dữ liệu với màu sắc và fill
  const modifiedData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      fill: true,
      backgroundColor: COLORS.MUTED_RED,
      borderColor: COLORS.PRIMARY_RED,
      pointBackgroundColor: COLORS.PRIMARY_RED,
      pointHoverBorderColor: COLORS.PRIMARY_RED,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: suggestedMax || 10,
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={{ position: "relative", height: "100%", width: "100%" }}
    >
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
        {title}
      </Typography>
      <div className="chart-wrapper" style={{ height: "400px", width: "100%" }}>
        <Radar data={modifiedData} options={options} />
      </div>
    </div>
  );
};

export default RadarChartComponent;
