import { Box, Button, MenuItem, Modal, Select, Typography } from '@mui/material';
import { useState } from 'react';

const TaskUpdateModal = ({ open, handleClose, task, handleUpdate }) => {
    const [status, setStatus] = useState(task?.status || '');

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSave = () => {
        handleUpdate(status);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 700,  // Increased width for larger modal
                    bgcolor: 'background.paper',
                    borderRadius: '12px',  // Slightly larger rounded corners
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',  // Subtle shadow
                    p: 5,  // Increased padding for a larger modal
                    outline: 'none',
                }}
            >
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4, fontSize: '2.4rem' }} // Larger title font size
                >
                    Update Task Status
                </Typography>
                <Box mt={3}>
                    <Typography
                        variant="body1"
                        sx={{ mb: 2, fontWeight: '500', fontSize: '2rem' }} // Increased font size for the task name
                    >
                        Current Task: <strong>{task.task_name}</strong>
                    </Typography>
                    <Select
                        fullWidth
                        value={status}
                        onChange={handleStatusChange}
                        sx={{
                            mt: 2,
                            p: 1,
                            borderRadius: '8px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            fontSize: '1.8rem', // Increased font size for the dropdown
                        }}
                    >
                        <MenuItem sx={{ fontSize: '1.8rem' }} value={1}>Pending</MenuItem>
                        <MenuItem sx={{ fontSize: '1.8rem' }} value={2}>In Progress</MenuItem>
                        <MenuItem sx={{ fontSize: '1.8rem' }} value={3}>Completed</MenuItem>
                    </Select>
                </Box>
                <Box mt={5} display="flex" justifyContent="space-between">
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                        sx={{
                            color: "#fff",
                            backgroundColor: "#ff4d4d",
                            padding: "14px 30px",
                            borderRadius: "50px",
                            fontSize: "1.4rem",
                            textTransform: "none",
                            fontWeight: "500",
                            boxShadow: "0px 4px 10px rgba(255, 77, 77, 0.3)",
                            "&:hover": {
                                backgroundColor: "#e60000",
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        sx={{
                            color: "#fff",
                            backgroundColor: "#1565C0",
                            padding: "14px 30px",
                            borderRadius: "50px",
                            fontSize: "1.4rem",
                            textTransform: "none",
                            fontWeight: "500",
                            boxShadow: "0px 4px 10px rgba(76, 175, 80, 0.3)",
                            "&:hover": {
                                backgroundColor: "#0B4C8C",
                            },
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default TaskUpdateModal;
