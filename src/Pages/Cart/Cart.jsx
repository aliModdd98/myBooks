import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Header from "../../components/Header/Header";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [borrowingPeriod, setBorrowingPeriod] = useState({});
  const [returnDates, setReturnDates] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  const handlePeriodChange = (bookId, period) => {
    const today = new Date();
    let returnDate = new Date(today);

    switch (period) {
      case "1 week":
        returnDate.setDate(today.getDate() + 7);
        break;
      case "2 weeks":
        returnDate.setDate(today.getDate() + 14);
        break;
      case "1 month":
        returnDate.setMonth(today.getMonth() + 1);
        break;
      default:
        returnDate = today;
    }

    setBorrowingPeriod({ ...borrowingPeriod, [bookId]: period });
    setReturnDates({
      ...returnDates,
      [bookId]: returnDate.toLocaleDateString(),
    });

    const updatedCart = cart.map((book) => {
      if (book.id === bookId) {
        return { ...book, period, returnDate: returnDate.toLocaleDateString() };
      }
      return book;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleConfirmBorrow = () => {
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions before proceeding.");
      return;
    }

    const borrowingHistory =
      JSON.parse(localStorage.getItem("borrowingHistory")) || [];
    const newHistory = {
      date: new Date().toLocaleDateString(),
      books: cart.map((book) => ({
        title: book.title,
        dueDate: book.returnDate,
        returned: false,
      })),
    };
    borrowingHistory.push(newHistory);
    localStorage.setItem("borrowingHistory", JSON.stringify(borrowingHistory));

    navigate("/borrow");
  };

  return (
    <>
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

        <Grid
          container
          spacing={3}
          sx={{
            marginTop: 1,
            gap: 10,
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {cart.map((book) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex", justifyContent: "space-between" }} // Ensure the card is centered within the grid item
              key={book.id}
            >
              <Card
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: 400,
                  border: "1px solid #ddd",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  minWidth: "320px",

                  width: "100%",
                  "&:hover .infoOverlay": {
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={book.cover}
                  alt={book.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  className="infoOverlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                    padding: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" mb={1}>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" mb={1}>
                    {book.author}
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    {book.category}
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    {book.description}
                  </Typography>
                  <Select
                    value={borrowingPeriod[book.id] || ""}
                    onChange={(e) =>
                      handlePeriodChange(book.id, e.target.value)
                    }
                    sx={{
                      backgroundColor: "transparent",
                      color: "white",
                      borderRadius: "4px",
                      border: "2px solid black",
                      padding: "8px",
                      width: "150px",
                      "& .MuiSelect-select": {
                        padding: "8px",
                        borderRadius: "4px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#6a1b9a",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#6a1b9a",
                      },
                    }}
                  >
                    <MenuItem value="1 week">1 week</MenuItem>
                    <MenuItem value="2 weeks">2 weeks</MenuItem>
                    <MenuItem value="1 month">1 month</MenuItem>
                  </Select>
                  {returnDates[book.id] && (
                    <Typography mt={1}>
                      Return Date: {returnDates[book.id]}
                    </Typography>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ marginTop: 5 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                sx={{
                  color: "#6a1b9a",
                  "&.Mui-checked": {
                    color: "#6a1b9a",
                  },
                }}
              />
            }
            label="I agree to the terms and conditions"
            sx={{
              mt: 2,
            }}
          />
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#6a1b9a",
              color: "white",
              "&:hover": {
                backgroundColor: "#4a148c",
              },
            }}
            onClick={handleConfirmBorrow}
            disabled={!agreedToTerms}
          >
            Confirm Borrow
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Cart;
