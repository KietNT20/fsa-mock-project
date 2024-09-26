import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const TableLayout = () => {
    const rows = [
        { name: "Sản phẩm A", price: 100, category: "Điện tử" },
        { name: "Sản phẩm B", price: 200, category: "Thời trang" },
        { name: "Sản phẩm C", price: 300, category: "Gia dụng" },
    ];

    return (
        <TableContainer
            component={Paper}
            style={{
                margin: "20px auto",
                maxWidth: "100%", // Chiếm 100% chiều rộng của màn hình
                overflowX: "auto", // Cuộn ngang nếu bảng vượt quá chiều rộng
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
            <Table sx={{ minWidth: 500, width: "100%" }}> {/* width 100% */}
                <TableHead>
                    <TableRow>
                        <TableCell
                            style={{
                                fontWeight: "bold",
                                fontSize: "16px",
                                backgroundColor: "#f5f5f5",
                            }}
                        >
                            Sản phẩm
                        </TableCell>
                        <TableCell
                            align="right"
                            style={{
                                fontWeight: "bold",
                                fontSize: "16px",
                                backgroundColor: "#f5f5f5",
                            }}
                        >
                            Giá (VND)
                        </TableCell>
                        <TableCell
                            align="right"
                            style={{
                                fontWeight: "bold",
                                fontSize: "16px",
                                backgroundColor: "#f5f5f5",
                            }}
                        >
                            Danh mục
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
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
                            <TableCell
                                component="th"
                                scope="row"
                                style={{ fontSize: "15px", padding: "15px" }}
                            >
                                {row.name}
                            </TableCell>
                            <TableCell
                                align="right"
                                style={{ fontSize: "15px", padding: "15px" }}
                            >
                                {row.price}
                            </TableCell>
                            <TableCell
                                align="right"
                                style={{ fontSize: "15px", padding: "15px" }}
                            >
                                {row.category}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableLayout;
