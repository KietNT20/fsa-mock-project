import { Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";

const CustomizedCard = ({ cardCell = [], cardDatas = [] }) => {
  // console.log("cardDatas", cardDatas);
  // console.log("cardCell", cardCell);

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
    } catch (error) {
      console.error("Error parsing date:", error);
      return dateString;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        justifyContent: "start",
        padding: "30px 20px",
        flexWrap: "wrap",
      }}
    >
      {cardDatas.map((item, index) => (
        <Card
          key={index}
          style={{
            width: 350,
            height: 400,
            borderRadius: "20px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.3s",
            cursor: "pointer",
            padding: "10px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <CardContent>
            {cardCell.map((cell, cellIndex) => (
              <Typography
                key={cellIndex}
                variant={cellIndex === 0 ? "h5" : "body1"}
                style={{
                  fontWeight: cellIndex === 0 ? "bold" : "normal",
                  fontSize: cellIndex === 0 ? "26px" : "18px",
                  padding: "10px",
                  marginTop: "10px",
                }}
              >
                {capitalize(cell)}:{" "}
                {cell.includes("time")
                  ? formatDate(item[cell])
                  : cell.includes("note") && item[cell] === ""
                    ? "None"
                    : item[cell]}
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomizedCard;
