import { Card, CardContent, Grid2, Paper, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";

const CustomizedCard = ({ cardCell = [], cardDatas = [] }) => {
  // Hàm để viết hoa chữ cái đầu của chuỗi
  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // Hàm để định dạng ngày tháng
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy HH:mm:ss a");
    } catch (error) {
      console.error("Error parsing date:", error);
      return dateString;
    }
  };

  // Hàm trả về màu nền dựa vào mức độ ưu tiên
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1:
        return "rgba(255, 99, 132, 0.2)";
      case 2:
        return "rgba(54, 162, 235, 0.2)";
      case 3:
        return "rgba(75, 192, 192, 0.2)";
      default:
        return "rgba(0, 0, 0, 0.1)";
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        color: "#424242",
        maxHeight: "490px",
        overflowY: "auto",
        mx: "auto",
        mt: 2,
      }}
    >
      <Grid2 container spacing={3}>
        {cardDatas.map((item, index) => (
          <Grid2
            size={{ xs: 12, sm: 8, md: 6, lg: 4, xl: 3 }}
            key={item.id || index}
          >
            <Card
              style={{
                borderRadius: "10px",
                background: "#ffffff",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0, 0, 0, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 8px 15px rgba(0, 0, 0, 0.3)";
              }}
            >
              <CardContent>
                {cardCell.map(
                  (cell, cellIndex) =>
                    cell !== "priority" && (
                      <Typography
                        key={cellIndex}
                        variant={cellIndex === 0 ? "h5" : "body1"}
                        style={{
                          fontWeight: cellIndex === 0 ? "bold" : "normal",
                          fontSize: cellIndex === 0 ? "1.8rem" : "1.6rem",
                          padding: cellIndex === 0 ? "10px" : "8px 0",
                          marginTop: "10px",
                          color: "#000000",
                          borderRadius: cellIndex === 0 ? "10px" : null,
                          backgroundColor:
                            cellIndex === 0
                              ? getPriorityColor(item.priority)
                              : null,
                        }}
                      >
                        {capitalize(cell)}:{" "}
                        {cell.includes("time")
                          ? formatDate(item[cell])
                          : cell.includes("note") && item[cell] === ""
                            ? "None"
                            : item[cell]}
                      </Typography>
                    ),
                )}
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Paper>
  );
};

export default CustomizedCard;
