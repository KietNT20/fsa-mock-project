import {
  Button,
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

const CustomizedTable = ({ tableCell = [], tableData = [], handleDelete }) => {
  if (tableCell.length === 0 || tableData.length === 0) {
    return (
      <Typography className="no-data-message">
        No data available to display
      </Typography>
    );
  }

  return (
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
                <Button onClick={() => handleDelete(row.id)} color="secondary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(CustomizedTable);
