import { useState } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import BookCard from "../../components/BookCard/BookCard";
import { useNavigate } from "react-router-dom";
import Books from "./../../const/data";
import Header from "../../components/Header/Header";

const BooksPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleBorrow = (book) => {
    if (!cart.includes(book)) {
      setCart([...cart, book]);
    }
  };

  const handleAddToCart = (book) => {
    const updatedCart = [...cart, book];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBorrowBooks = () => {
    navigate("/cart", { state: { selectedBooks: cart } });
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingTop: { xs: "150px", md: "80px" },
      }}
    >
      <Header cartLength={cart.length} />
      <Grid container spacing={3} sx={{ marginTop: 1, alignItems: "stretch" }}>
        {Books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <BookCard
              book={book}
              onBorrow={handleBorrow}
              onAddToCart={handleAddToCart}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7B1FA2", // Purple color
            "&:hover": {
              backgroundColor: "#6A1B9A", // Darker purple on hover
            },
          }}
          onClick={handleBorrowBooks}
        >
          Go to Cart ({cart.length})
        </Button>
      </Box>
    </Container>
  );
};

export default BooksPage;
