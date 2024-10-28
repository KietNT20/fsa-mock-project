import { Typography } from "@mui/material";
import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    LineElement,
    PointElement,
    RadialLinearScale,
    Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, PointElement, LineElement);

const RadarChartComponent = ({ data, title, suggestedMax }) => {
    // Nếu data hoặc labels trống, không hiển thị cảnh báo
    if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
        return <Typography>Không có dữ liệu để hiển thị biểu đồ.</Typography>;
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: 0,
                suggestedMax: suggestedMax || 10, // Sử dụng suggestedMax được truyền vào
            },
        },
    };

    return (
        <div className="chart-container">
            <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
                {title}
            </Typography>
            <div className="chart-wrapper">
                <Radar data={data} options={options} />
            </div>
        </div>
    );
};

export default RadarChartComponent;
