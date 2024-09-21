import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm, title, content , disagree, agree}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {disagree}
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    {agree}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
