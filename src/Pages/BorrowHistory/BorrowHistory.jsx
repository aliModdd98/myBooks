import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../../components/Header/Header";

const BorrowHistory = () => {
  const [cart, setCart] = useState([]);
  const [borrowingHistory, setBorrowingHistory] = useState(
    JSON.parse(localStorage.getItem("borrowingHistory")) || []
  );
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [filterDueDate, setFilterDueDate] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleDialogOpen = (history) => {
    setSelectedHistory(history);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleStatusChange = (index) => {
    const updatedHistory = borrowingHistory.map((record, i) => {
      if (i === index) {
        return {
          ...record,
          books: record.books.map((book) => ({
            ...book,
            returned: true,
          })),
        };
      }
      return record;
    });
    setBorrowingHistory(updatedHistory);
    localStorage.setItem("borrowingHistory", JSON.stringify(updatedHistory));
  };

  const filteredHistory = borrowingHistory.filter((record) => {
    const recordDate = new Date(record.date);
    const filterDateObject = new Date(filterDate);
    const filterDueDateObject = new Date(filterDueDate);
    return (
      (!filterDate ||
        recordDate.toDateString() === filterDateObject.toDateString()) &&
      (filterDueDate
        ? record.books.some(
            (book) => new Date(book.dueDate) <= filterDueDateObject
          )
        : true)
    );
  });

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
      <Typography variant="h4" gutterBottom>
        Borrowing History
      </Typography>

      <TextField
        label="Filter by Due Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={filterDueDate}
        onChange={(e) => setFilterDueDate(e.target.value)}
        sx={{
          mb: 3,
          "& .MuiInputLabel-root": {
            color: "black",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "purple",
          },
        }}
      />
      {filteredHistory.length === 0 ? (
        <Typography variant="body1">No borrowing history available.</Typography>
      ) : (
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Earliest Due Date</TableCell>
                <TableCell>Total Books</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHistory.map((history, index) => {
                const earliestDueDate = history.books
                  .map((book) => new Date(book.dueDate))
                  .sort((a, b) => a - b)[0];
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {earliestDueDate
                        ? earliestDueDate.toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>{history.books.length}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleDialogOpen(history)}
                      >
                        View Books
                      </Button>
                      {history.books.some((book) => !book.returned) && (
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ ml: 2 }}
                          onClick={() => handleStatusChange(index)}
                        >
                          Mark All as Returned
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Borrowed Books
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDialogClose}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ maxWidth: "600px" }}>
          {selectedHistory && (
            <Box>
              <Typography variant="h6">
                Date: {new Date(selectedHistory.date).toLocaleDateString()}
              </Typography>
              {selectedHistory.books.map((book, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography>
                    {book.title} - Due Date: {book.dueDate} - Status:{" "}
                    {book.returned ? "Returned" : "Not Returned"}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default BorrowHistory;
