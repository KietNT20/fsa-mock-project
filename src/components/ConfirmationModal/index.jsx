import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  disagree,
  agree,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          padding: "20px",
          borderRadius: "15px",
          background: "linear-gradient(135deg, #f3e7e9, #e3eeff)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "500px",
          maxWidth: "100%",
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontSize: "2.2rem",
          color: "#333",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{
            fontSize: "1.4rem",
            color: "#555",
            textAlign: "left",
          }}
        >
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: "white",
            backgroundColor: "red",
            padding: "10px 20px",
            borderRadius: "50px",
            fontSize: "1.2rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "darkred",
            },
          }}
        >
          {disagree}
        </Button>
        <Button
          onClick={onConfirm}
          autoFocus
          sx={{
            color: "white",
            backgroundColor: "green",
            padding: "10px 20px",
            borderRadius: "50px",
            fontSize: "1.2rem", // Tăng kích thước font của nút
            textTransform: "none",
            marginLeft: "15px", // Khoảng cách giữa 2 nút
            "&:hover": {
              backgroundColor: "darkgreen",
            },
          }}
        >
          {agree}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;