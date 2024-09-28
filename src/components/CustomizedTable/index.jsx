import {
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

const CustomizedTable = ({ tableCell, tableDatas }) => {
  console.log("tableDatas", tableDatas);
  console.log("tableCell", tableCell);
  return (
    <TableContainer
      component={Paper}
      style={{
        margin: "20px auto",
        maxWidth: "100%",
        overflowX: "auto",
        boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      {/* Tiêu đề bảng */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{
          paddingBottom: "10px",
          fontWeight: "bold",
          backgroundColor: "#1976d2",
          color: "white",
          borderRadius: "8px 8px 0 0",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        Danh Sách Sản Phẩm
      </Typography>

      {/* Bảng dữ liệu */}
      <Table sx={{ minWidth: 500, width: "100%" }}>
        {" "}
        {/* width 100% */}
        <TableHead>
          <TableRow>
            {tableCell.map((cell, index) => (
              <StyledTableCell
                key={index}
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                {cell}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableDatas.map((row, index) => (
            <StyledTableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                height: "60px",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: "#e0f7fa",
                  transform: "scale(1.02)",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <StyledTableCell
                component="th"
                scope="row"
                style={{ fontSize: "15px", padding: "15px" }}
              >
                {row.name}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                style={{ fontSize: "15px", padding: "15px" }}
              >
                {row.price}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                style={{ fontSize: "15px", padding: "15px" }}
              >
                {row.category}
              </StyledTableCell>
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
