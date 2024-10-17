import { Card, CardContent, Typography } from "@mui/material";
import { format, parseISO } from "date-fns"; // Import date-fns to format time

const CustomizedCard = ({ cardCell = [], cardDatas = [] }) => {
  // Function to capitalize the first letter of the string
  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy HH:mm:ss");
    } catch (error) {
      console.error("Error parsing date:", error);
      return dateString;
    }
  };

  // Function to return the background color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1:
        return "rgba(255, 99, 132, 0.2)"; // Light Red for High
      case 2:
        return "rgba(54, 162, 235, 0.2)"; // Light Blue for Medium
      case 3:
        return "rgba(75, 192, 192, 0.2)"; // Light Green for Low
      default:
        return "rgba(0, 0, 0, 0.1)"; // Default light gray
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: "20px",
        padding: "5px",
      }}
    >
      {cardDatas.map((item, index) => (
        <Card
          key={index}
          style={{
            flex: "1 1 calc(25% - 20px)",
            maxWidth: "330px",
            minWidth: "250px",
            borderRadius: "15px",
            background: "#ffffff",
            boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "pointer",
            padding: "10px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.3)";
          }}
        >
          <CardContent
          >
            {/* Project title with background color based on priority */}
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                fontSize: "22px",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: getPriorityColor(item.priority),
                color: "#000000",
              }}
            >
              Name: {item.name}
            </Typography>

            {/* Other fields */}
            {cardCell.map((cell, cellIndex) => (
              cell !== "priority" && ( // Exclude priority as we moved it to the title
                <Typography
                  key={cellIndex}
                  variant={cellIndex === 0 ? "h6" : "body1"}
                  style={{
                    fontWeight: "normal",
                    fontSize: cellIndex === 0 ? "22px" : "18px",
                    padding: "8px 0",
                    marginTop: "10px",
                    color: "#000000",
                  }}
                >
                  {capitalize(cell)}:{" "}
                  {cell.includes("time")
                    ? formatDate(item[cell])
                    : cell.includes("note") && item[cell] === ""
                    ? "None"
                    : item[cell]}
                </Typography>
              )
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomizedCard;
