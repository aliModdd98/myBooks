import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function BookCard({ book, onBorrow, onAddToCart }) {
  const [isBorrowed, setIsBorrowed] = useState(false);

  const handleAddToCart = () => {
    // Add book information to the same space in local storage
    const cartBooks = JSON.parse(localStorage.getItem("cart")) || [];
    cartBooks.push(book);
    localStorage.setItem("cart", JSON.stringify(cartBooks));

    // Mark the book as borrowed
    setIsBorrowed(true);
  };

  const handleBorrowClick = () => {
    if (!isBorrowed) {
      handleAddToCart();
      onBorrow(book); // If any additional logic needs to be executed on borrowing
    }
  };

  const handleAddToCartClick = () => {
    if (!isBorrowed) {
      handleAddToCart();
      onAddToCart(book); // If any additional logic needs to be executed on adding to cart
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        ninWidth: "300px",
        height: "100%",
        position: "relative",
        borderColor: "#7B1FA2",
      }}
    >
      {/* Image section at the top */}
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: 250,
          objectFit: "cover",
        }}
        image={book.cover}
        alt={book.title}
      />

      {/* Content section below the image */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 2,
          flex: 1,
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ color: "#7B1FA2", fontWeight: "bold" }}
          >
            {book.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="body2">{book.author}</Typography>
            <Typography variant="body2">{book.category}</Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {book.description}
          </Typography>
        </CardContent>
        <Box sx={{ textAlign: "center", marginTop: 1 }}>
          <Button
            size="small"
            onClick={handleBorrowClick}
            disabled={isBorrowed}
            sx={{
              color: isBorrowed ? "#FFFFFF" : "#FFFFFF",
              backgroundColor: isBorrowed ? "" : "#7B1FA2",
              "&:hover": {
                backgroundColor: isBorrowed ? "#8E24AA" : "#6A1B9A",
              },
            }}
          >
            {isBorrowed ? "Borrowed" : "Borrow Book"}
          </Button>
        </Box>
      </Box>

      {/* Add to Cart Button */}
      <Tooltip title="Add to cart">
        <span>
          {" "}
          <IconButton
            sx={{
              backgroundColor: isBorrowed ? "#9C27B0" : "#7B1FA2",
              position: "absolute",
              top: 4,
              left: 4,
              zIndex: 1,
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: isBorrowed ? "#8E24AA" : "#6A1B9A",
              },
            }}
            onClick={handleAddToCartClick}
            disabled={isBorrowed} // Disable the button when borrowed
          >
            <AddCircleIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Card>
  );
}

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  onBorrow: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default BookCard;
``;
