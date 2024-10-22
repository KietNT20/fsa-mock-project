import { Sort as SortIcon } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const SortMenuComponent = ({ onSortFieldChange, fields }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Mở menu sắp xếp
  const handleSortIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng menu sắp xếp
  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  // Xử lý khi chọn field để sắp xếp
  const handleSortField = (field) => {
    onSortFieldChange(field); // Gọi callback để xử lý sắp xếp
    handleSortMenuClose(); // Đóng menu sau khi chọn
  };

  return (
    <>
      <IconButton
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        onClick={handleSortIconClick}
      >
        <SortIcon
          sx={{ fontSize: 30, color: "#ffffff" }} // Tăng kích thước và màu của icon
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleSortMenuClose}
      >
        {fields.map((field, index) => (
          <MenuItem
            key={index}
            onClick={() => handleSortField(field.value)}
            sx={{ fontSize: "1.6rem", padding: "10px 20px" }} // Tăng font size và padding
          >
            Sort by {field.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SortMenuComponent;
