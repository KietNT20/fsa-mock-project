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
import { format, parseISO } from "date-fns";

const CustomizedTable = ({
  title = "Table List",
  tableCell = [],
  tableDatas = [],
}) => {
  console.log("tableDatas", tableDatas);
  console.log("tableCell", tableCell);

  // Function to capitalize the first letter of the string
  if (tableCell.length === 0 || tableDatas.length === 0) {
    return <Typography>No data available to display</Typography>;
  }

  // Function to format the date and time
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
      {/* Dynamic title with a light to darker blue gradient */}
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
                  {cell.includes("role")
                    ? row[cell] === 0
                      ? "User"
                      : "Admin"
                    : cell.includes("time")
                      ? formatDate(row[cell])
                      : cell.includes("note") && row[cell] === ""
                        ? "None"
                        : row[cell]}
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
