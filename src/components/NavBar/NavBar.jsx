// Navbar.js
import { useState } from "react";
import { IconButton, Menu, MenuItem, Avatar } from "@mui/material";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const borrowedBooks = [
    "Book 1 - Due: 2024-09-01",
    "Book 2 - Due: 2024-09-15",
    "Book 3 - Due: 2024-10-01",
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", padding: 16 }}>
      <IconButton onClick={handleClick}>
        <Avatar src="/path/to/profile-image.jpg" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {borrowedBooks.map((book, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {book}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;
