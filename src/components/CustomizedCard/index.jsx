import { Card, CardContent, Typography } from "@mui/material";

const CustomizedCard = () => {
  const items = [
    { name: "Sản phẩm A", price: 100, category: "Điện tử" },
    { name: "Sản phẩm B", price: 200, category: "Thời trang" },
    { name: "Sản phẩm C", price: 300, category: "Gia dụng" },
  ];

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
      {items.map((item, index) => (
        <Card
          key={index}
          style={{
            width: 350,
            height: 400,
            borderRadius: "20px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.3s",
            padding: "20px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              style={{ fontWeight: "bold", marginBottom: "15px" }}
            >
              {item.name}
            </Typography>
            <Typography
              color="text.secondary"
              style={{ marginBottom: "20px", fontSize: "18px" }}
            >
              Giá: {item.price} VND
            </Typography>
            <Typography
              variant="body1"
              style={{ color: "#4caf50", fontSize: "16px" }}
            >
              Danh mục: {item.category}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomizedCard;
