import { MoreHoriz } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const CustomizedTable = ({
  tableCell = [],
  tableData = [],
  handleDelete,
  handleEdit,
  handleView,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  if (tableCell.length === 0 || tableData.length === 0) {
    return (
      <Typography className="no-data-message">
        No data available to display
      </Typography>
    );
  }

  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setUserToDelete(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
    handleClose();
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setUserToDelete(null);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      handleDelete(userToDelete);
    }
    handleCloseConfirmDialog();
  };

  return (
    <>
      <TableContainer component={Paper} className="custom-table-container">
        <Table className="custom-table">
          <TableHead>
            <TableRow>
              {tableCell.map((cell, index) => (
                <TableCell key={index} className="table-header-cell">
                  {cell.charAt(0).toUpperCase() + cell.slice(1)}
                </TableCell>
              ))}
              <TableCell className="table-header-cell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={row.id || index} className="table-row">
                {tableCell.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} className="table-cell">
                    {row[cell]}
                  </TableCell>
                ))}
                <TableCell className="table-cell">
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, row.id)}
                  >
                    <MoreHoriz />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        handleView(userToDelete);
                        handleClose();
                      }}
                    >
                      View
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleEdit(userToDelete);
                        handleClose();
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleOpenConfirmDialog}>
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(CustomizedTable);
