import {
  clearSelectedRow,
  setSelectedRow,
} from "@/store/actions/infoRowAction";
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../ConfirmationModal";
import SortMenuComponent from "../Sort";

const TableUser = ({
  title = "Table List",
  tableCell = [],
  tableDatas = [],
  onUpdate,
  onDelete,
  onActionClick,
  deleteLoading,
}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [sortedData, setSortedData] = useState(tableDatas);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const dispatch = useDispatch();
  const { infoRow } = useSelector((state) => state.selectedRow);

  // Các trường có thể sắp xếp
  const sortFields = [
    { label: "Name", value: "name" },
    { label: "Email", value: "email" },
  ];

  // Hàm xử lý sắp xếp
  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  // Sắp xếp dữ liệu khi tableDatas, sortField hoặc sortDirection thay đổi
  useEffect(() => {
    let sortedArray = [...tableDatas];
    if (sortField === "name") {
      sortedArray.sort((a, b) =>
        sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      );
    } else if (sortField === "email") {
      sortedArray.sort((a, b) =>
        sortDirection === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email),
      );
    }
    setSortedData(sortedArray);
  }, [tableDatas, sortField, sortDirection]);

  const handleClick = (event, row) => {
    setAnchorElUser(event.currentTarget);
    dispatch(setSelectedRow(row));
    if (onActionClick) {
      onActionClick(row);
    }
  };

  const handleClose = () => {
    setAnchorElUser(null);
    dispatch(clearSelectedRow());
  };

  const handleUpdate = () => {
    if (onUpdate && infoRow) {
      onUpdate(infoRow);
    }
    handleClose();
  };

  const handleDeleteClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete && infoRow?.id) {
      onDelete(infoRow.id);
    }
    setIsConfirmOpen(false);
    dispatch(clearSelectedRow());
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
  };

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          margin: "15px auto",
          minHeight: "61.8vh",
          maxWidth: "100%",
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
            padding: "10px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #0d47a1 , #90caf9)",
            color: "#fff",
            borderRadius: "8px 8px 0 0",
            position: "relative",
          }}
        >
          {title}
          {/* Truyền fields và handleSort cho SortMenuComponent */}
          <SortMenuComponent
            onSortFieldChange={handleSort}
            fields={sortFields}
          />
        </Typography>

        <Table sx={{ minWidth: 500, width: "100%" }}>
          <TableHead>
            <TableRow>
              {tableCell.map((cell, index) => (
                <StyledTableCell
                  key={index}
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.8rem",
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
            {sortedData.map((row, index) => (
              <StyledTableRow
                key={row.id || index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#fff",
                  height: "56px",
                  transition: "background-color 0.3s ease, transform 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#e0f7fa",
                    transform: "scale(1.02)",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                {tableCell.map((cell, cellIndex) => (
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
                          anchorEl={anchorElUser}
                          keepMounted
                          open={Boolean(anchorElUser)}
                          onClose={handleClose}
                          slotProps={{
                            paper: {
                              style: {
                                width: "fit-content",
                                boxShadow: "none",
                                border: "1px solid #ddd",
                              },
                            },
                          }}
                        >
                          <MenuItem onClick={handleUpdate}>
                            <ListItemIcon>
                              <EditIcon
                                fontSize="medium"
                                sx={{ color: "#0d47a1" }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Update"
                              primaryTypographyProps={{
                                fontSize: "1.6rem",
                                color: "#0d47a1",
                              }}
                            />
                          </MenuItem>
                          <MenuItem
                            disabled={deleteLoading}
                            onClick={handleDeleteClick}
                          >
                            <ListItemIcon>
                              <DeleteIcon
                                fontSize="medium"
                                sx={{ color: "#e83535" }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Delete"
                              primaryTypographyProps={{
                                fontSize: "1.6rem",
                                color: "#e83535",
                              }}
                            />
                          </MenuItem>
                        </Menu>
                      </>
                    ) : cell.includes("role") ? (
                      row[cell] === 0 ? (
                        "User"
                      ) : (
                        "Admin"
                      )
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
      <ConfirmationModal
        open={isConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        content="Are you sure you want to delete this item?"
        disagree="Cancel"
        agree="Delete"
      />
    </>
  );
};

export default TableUser;

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
