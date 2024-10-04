import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { useState } from "react";

const CustomizedTable = ({
  title = "Table List",
  tableCell = [],
  tableDatas = [],
  onUpdate, // Callback for handling update action
  onDelete, // Callback for handling delete action
  onActionClick, // Callback when the 3-dot menu is clicked
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
    if (onActionClick) {
      onActionClick(row);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(selectedRow);
    }
    handleClose();
  };

  const handleDelete = () => {
    if (onDelete && selectedRow?.id) {
      onDelete(selectedRow.id);
    } else {
      console.error("No project ID found");
    }
    handleClose();
  };

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy HH:mm:ss");
    } catch (error) {
      console.error("Error parsing date:", error);
      return dateString;
    }
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        margin: "20px auto",
        height: "75vh",
        maxWidth: "100%",
        overflowY: "auto",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{
          paddingBottom: "10px",
          fontWeight: "bold",
          background: "linear-gradient(135deg, #0d47a1 , #90caf9)",
          color: "#fff",
          borderRadius: "8px 8px 0 0",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        {title}
      </Typography>

      <Table sx={{ minWidth: 500, width: "100%" }}>
        <TableHead>
          <TableRow>
            {tableCell.map((cell, index) => (
              <StyledTableCell
                key={index}
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  backgroundColor: "#fff",
                  color: "black",
                  textAlign: "center",
                  width: `${100 / tableCell.length}%`,
                }}
              >
                {capitalize(cell)}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableDatas.map((row, index) => (
            <StyledTableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#fff",
                height: "60px",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: "#e0f7fa",
                  transform: "scale(1.02)",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              {tableCell &&
                tableCell.map((cell, cellIndex) => (
                  <StyledTableCell
                    key={cellIndex}
                    align="center"
                    style={{
                      fontSize: "15px",
                      padding: "15px",
                      width: `${100 / tableCell.length}%`,
                    }}
                  >
                    {cell === "action" ? (
                      <>
                        <IconButton
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={(event) => handleClick(event, row)}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              width: "fit-content",
                              boxShadow: "none",
                              border: "1px solid #ddd",
                            },
                          }}
                        >
                          <MenuItem onClick={() => handleUpdate(row)}>
                            <ListItemIcon>
                              <EditIcon
                                fontSize="medium"
                                sx={{ color: "#0d47a1" }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Update"
                              primaryTypographyProps={{
                                fontSize: "1.8rem",
                                color: "#0d47a1",
                              }}
                            />
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(row)}>
                            <ListItemIcon>
                              <DeleteIcon
                                fontSize="medium"
                                sx={{ color: "#e83535" }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Delete"
                              primaryTypographyProps={{
                                fontSize: "1.8rem",
                                color: "#e83535",
                              }}
                            />
                          </MenuItem>
                        </Menu>
                      </>
                    ) : cell === "priority" ? (
                      row[cell] === 1 ? (
                        "High"
                      ) : row[cell] === 2 ? (
                        "Medium"
                      ) : (
                        "Low"
                      )
                    ) : cell.includes("role") ? (
                      row[cell] === 0 ? (
                        "User"
                      ) : (
                        "Admin"
                      )
                    ) : cell.includes("time") ? (
                      formatDate(row[cell])
                    ) : cell.includes("note") && row[cell] === "" ? (
                      "None"
                    ) : (
                      row[cell]
                    )}
                  </StyledTableCell>
                ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomizedTable;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
