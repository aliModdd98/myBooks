import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SummaryStep = ({ formData, borrowedBooks }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (window.confirm("Do you want to confirm the borrowing?")) {
      localStorage.removeItem("cart");
      alert("Books borrowed successfully!");
      navigate("/history");
    }
  };

  if (!borrowedBooks || !Array.isArray(borrowedBooks)) {
    console.error("Invalid or missing borrowedBooks prop");
    return <Typography color="error">Error: No books to display</Typography>;
  }

  return (
    <Box sx={{ padding: 2, marginTop: 6 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Summary
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#6a1b9a",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Name of Book: {formData.fullName} <br />
        Library Card Number: {formData.cardNumber}
      </Typography>

      <Typography variant="h6" mt={2}>
        Borrowed Books
      </Typography>
      {borrowedBooks.length > 0 ? (
        borrowedBooks.map((book, index) => (
          <Typography key={index}>
            {book.title} - Due: {book.returnDate}
          </Typography>
        ))
      ) : (
        <Typography sx={{ color: "#6a1b9a" }}>No books to display</Typography>
      )}

      <Typography mt={2} sx={{ color: "#6a1b9a" }}>
        Total Books: {borrowedBooks.length}
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#6a1b9a", color: "white", marginTop: 4 }}
        onClick={handleConfirm}
      >
        Confirm Borrow
      </Button>
    </Box>
  );
};

// Define prop types for the component
SummaryStep.propTypes = {
  formData: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    cardNumber: PropTypes.string.isRequired,
  }).isRequired,
  borrowedBooks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      returnDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SummaryStep;
