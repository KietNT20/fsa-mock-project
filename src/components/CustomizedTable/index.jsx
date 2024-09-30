import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Button,
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
import React from "react";

const CustomTable = ({ tableCell = [], tableData = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleAction = (action) => {
    console.log(`Performing ${action} on:`, selectedRow);
    handleClose();
  };

  if (tableCell.length === 0 || tableData.length === 0) {
    return (
      <Typography className="no-data-message">
        No data available to display
      </Typography>
    );
  }

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <TableContainer component={Paper} className="custom-table-container">
      <Typography variant="h4" className="table-title">
        User List
      </Typography>
      <Table className="custom-table">
        <TableHead>
          <TableRow>
            {tableCell.map((cell, index) => (
              <TableCell key={index} className="table-header-cell">
                {capitalize(cell)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index} className="table-row">
              {tableCell.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="table-cell">
                  {cell === "more" ? (
                    <>
                      <Button
                        className="more-button"
                        aria-controls={`simple-menu-${index}`}
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, row)}
                      >
                        <MoreHorizIcon />
                      </Button>
                      <Menu
                        id={`simple-menu-${index}`}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl) && selectedRow === row}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleAction("edit")}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleAction("delete")}>
                          Delete
                        </MenuItem>
                        <MenuItem onClick={() => handleAction("view")}>
                          View Details
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    row[cell]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
