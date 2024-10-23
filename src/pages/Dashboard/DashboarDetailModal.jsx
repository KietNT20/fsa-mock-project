import { Box, Divider, Grid2, Modal, Typography } from "@mui/material";

const DashboarDetailModal = ({ open, onClose, title, details }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 8,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          p: 4,
          background: "linear-gradient(to right, #fff, #f9f9f9)",
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h3"
          component="h2"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {title}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid2 container spacing={3} sx={{ mt: 2 }}>
          {Object.keys(details).map((category) => (
            <Grid2
              item
              xs={12}
              sm={6}
              md={3}
              key={category}
              sx={{
                border: "1px solid #ddd",
                padding: 2,
                borderRadius: 4,
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#555",
                  mb: 1,
                  textTransform: "capitalize",
                  borderBottom: "2px solid #eee",
                  paddingBottom: 1,
                }}
              >
                {category}
              </Typography>
              {details[category].length > 0 ? (
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                  {details[category].map((item, index) => (
                    <li
                      key={index}
                      style={{
                        padding: "8px 0",
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                        borderRadius: 4,
                        textAlign: "left",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.8rem", color: "#333" }}
                      >
                        {index + 1}.{" "}
                        {typeof item === "object" ? item.name : item}
                        {/* Kiểm tra nếu item là object thì hiển thị item.name, ngược lại hiển thị trực tiếp item */}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Không có dữ liệu
                </Typography>
              )}
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Modal>
  );
};

export default DashboarDetailModal;
