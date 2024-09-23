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
          padding: '20px',  // Tạo khoảng cách bên trong modal
          borderRadius: '15px',  // Bo tròn các góc của modal
          background: 'linear-gradient(135deg, #f3e7e9, #e3eeff)', // Nền gradient cho modal
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',  // Tạo bóng đổ cho modal
          width: '500px',
          maxWidth: '100%',
        },
      }}
      
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontSize: '2.2rem',  // Tăng kích thước font cho tiêu đề
          color: '#333',  // Màu chữ cho tiêu đề
          fontWeight: 'bold',
          textAlign: 'center',  // Căn giữa tiêu đề
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{
            fontSize: '1.4rem',  // Tăng kích thước chữ nội dung
            color: '#555',  // Màu chữ cho nội dung
            textAlign: 'left',  // Căn lề trái cho nội dung
          }}
        >
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'flex-end',  // Căn lề phải cho các nút
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: 'white',
            backgroundColor: 'red',
            padding: '10px 20px',
            borderRadius: '50px',  // Làm nút bo tròn
            fontSize: '1.2rem',  // Tăng kích thước font của nút
            textTransform: 'none',  // Không viết hoa chữ
            '&:hover': {
              backgroundColor: 'darkred',
            },
          }}
        >
          {disagree}
        </Button>
        <Button
          onClick={onConfirm}
          autoFocus
          sx={{
            color: 'white',
            backgroundColor: 'green',
            padding: '10px 20px',
            borderRadius: '50px',
            fontSize: '1.2rem',  // Tăng kích thước font của nút
            textTransform: 'none',
            marginLeft: '15px',  // Khoảng cách giữa 2 nút
            '&:hover': {
              backgroundColor: 'darkgreen',
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
