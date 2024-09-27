import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Typography,
  TextField,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import Books from "./../../const/data";

const Header = ({ cartLength }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setFilteredBooks(Books);
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter books based on the search term
    if (searchTerm) {
      setFilteredBooks(
        Books.filter(
          (book) =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)
        )
      );
    } else {
      setFilteredBooks(Books);
    }
  };

  const handleSearch = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleProfileOption = (option) => {
  //   handleClose();
  //   // Implement profile option functionality here
  //   console.log(`Selected profile option: ${option}`);
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        width: "100%",
        borderBottom: "2px solid #ddd",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        gap: 2,
        position: "fixed",
        top: 5,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{ textAlign: isMobile ? "center" : "left" }}
      >
        Our Books
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          sx={{ width: isMobile ? "100%" : 300, flex: 1 }}
        />
        <IconButton onClick={goToCart} color="inherit">
          <Badge badgeContent={cartLength} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={handleProfileClick} color="inherit">
          <Avatar src="/path/to/profile-image.jpg" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => navigate("/books")}>Home</MenuItem>
          <MenuItem onClick={() => navigate("/history")}>History</MenuItem>
          <MenuItem onClick={() => navigate("/")}>Logout</MenuItem>
        </Menu>
      </Box>

      {/* Modal for search results */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Search Results</DialogTitle>
        <DialogContent>
          <List>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <ListItem key={book.id}>
                  <Typography>
                    {book.title} by {book.author}
                  </Typography>
                </ListItem>
              ))
            ) : (
              <Typography>No results found</Typography>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
Header.propTypes = {
  cartLength: PropTypes.number,
};

export default Header;
