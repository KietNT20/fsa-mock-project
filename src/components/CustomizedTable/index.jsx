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

const CustomizedTable = ({ tableCell = [], tableDatas = [] }) => {
  console.log("tableDatas", tableDatas);
  console.log("tableCell", tableCell);

  // Nếu không có dữ liệu, hiển thị thông báo
  if (tableCell.length === 0 || tableDatas.length === 0) {
    return <Typography>No data available to display</Typography>;
  }

  // Hàm để biến chữ cái đầu của từ thành in hoa
  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

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
        Danh Sách Người Dùng
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
                  width: `${100 / tableCell.length}%`, // Chia đều cột
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
              key={index} // Sử dụng index làm key cho mỗi row
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
              {tableCell.map((cell, cellIndex) => (
                <StyledTableCell
                  key={cellIndex}
                  align="center" // Căn giữa nội dung
                  style={{
                    fontSize: "15px",
                    padding: "15px",
                    width: `${100 / tableCell.length}%`, // Chia đều cột
                  }}
                >
                  {/* Kiểm tra và hiển thị role tương ứng */}
                  {row[cell]}
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
