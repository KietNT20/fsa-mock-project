import { Card, CardContent, Typography } from "@mui/material";
import { format, parseISO } from "date-fns"; // Import date-fns to format time

const CustomizedCard = ({ cardCell = [], cardDatas = [] }) => {
  // Function to capitalize the first letter of the string
  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // Function to format the date and time
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy HH:mm:ss");
    } catch (error) {
      console.error("Error parsing date:", error);
      return dateString;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: "20px",
        padding: "30px 20px",
      }}
    >
      {cardDatas.map((item, index) => (
        <Card
          key={index}
          style={{
            flex: "1 1 calc(25% - 20px)",
            maxWidth: "330px",
            minWidth: "250px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #bbdefb, #ffffff)",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "pointer",
            padding: "10px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
          }}
        >
          <CardContent
            style={{
              padding: "20px",
            }}
          >
            {cardCell.map((cell, cellIndex) => (
              <Typography
                key={cellIndex}
                variant={cellIndex === 0 ? "h5" : "body1"}
                style={{
                  fontWeight: cellIndex === 0 ? "bold" : "normal",
                  fontSize: cellIndex === 0 ? "22px" : "18px",
                  padding: "8px 0",
                  marginTop: "10px",
                  color: cellIndex === 0 ? "#1565c0" : "#424242",
                }}
              >
                {capitalize(cell)}:{" "}
                {cell === "priority"
                  ? item[cell] === 1
                    ? "High"
                    : item[cell] === 2
                      ? "Medium"
                      : "Low"
                  : cell.includes("time")
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
