import { COLORS } from "@/constant/color";
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
          COLORS.PRIMARY_RED,
          COLORS.PRIMARY_BLUE,
          COLORS.PRIMARY_YELLOW,
          COLORS.PRIMARY_GREEN,
          COLORS.PRIMARY_PURPLE,
          COLORS.PRIMARY_ORANGE,
          COLORS.PRIMARY_GRAY,
        ],
        borderColor: [
          COLORS.BORDER_RED,
          COLORS.BORDER_BLUE,
          COLORS.BORDER_YELLOW,
          COLORS.BORDER_GREEN,
          COLORS.BORDER_PURPLE,
          COLORS.BORDER_ORANGE,
          COLORS.BORDER_GRAY,
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
