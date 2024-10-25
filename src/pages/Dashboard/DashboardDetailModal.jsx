import { Close as CloseIcon } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid2,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";

const DashboardDetailModal = ({ open, onClose, title, details }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative", // Để định vị nút close
          width: "80%",
          maxWidth: 1200,
          maxHeight: "90vh",
          overflow: "auto",
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          p: 4,
          background: "linear-gradient(to right, #fff, #f9f9f9)",
          "&:focus": {
            outline: "none",
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#666",
            "&:hover": {
              color: "#000",
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: "2.4rem" }} />
        </IconButton>

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
            pr: 4, // Thêm padding right để tránh chồng lên nút close
          }}
        >
          {title}
        </Typography>

        {/* Rest of the modal content remains the same */}
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ maxHeight: "calc(90vh - 200px)", overflow: "auto", pr: 1 }}>
          <Grid2 container spacing={3}>
            {Object.keys(details).map((category) => (
              <Grid2 item xs={12} sm={6} md={6} key={category}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    padding: 2,
                    borderRadius: 4,
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: "#555",
                      mb: 2,
                      textTransform: "capitalize",
                      borderBottom: "2px solid #eee",
                      paddingBottom: 1,
                      textAlign: "center",
                    }}
                  >
                    {category}
                  </Typography>
                  {details[category].length > 0 ? (
                    <ul
                      style={{
                        listStyleType: "none",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {details[category].map((item, index) => (
                        <li
                          key={index}
                          style={{
                            padding: "8px 12px",
                            backgroundColor:
                              index % 2 === 0 ? "#f9f9f9" : "#fff",
                            borderRadius: 4,
                            marginBottom: 4,
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "1.6rem",
                              color: "#333",
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <span style={{ minWidth: "24px" }}>
                              {index + 1}.
                            </span>
                            <span>
                              {typeof item === "object" ? item.name : item}
                            </span>
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#888",
                        textAlign: "center",
                        py: 2,
                      }}
                    >
                      Không có dữ liệu
                    </Typography>
                  )}
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    </Modal>
  );
};

export default DashboardDetailModal;
