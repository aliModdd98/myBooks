import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "../Pages/Welcome/Welcome";
import Books from "../Pages/Books/Books";
import Cart from "../Pages/Cart/Cart";
import BorrowedStepper from "../Pages/BorrowedStepper/BorrowedStepper";
import BorrowHistory from "../Pages/BorrowHistory/BorrowHistory";

function Navigation() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/books" element={<Books />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/borrow" element={<BorrowedStepper />} />
        <Route path="/history" element={<BorrowHistory />} />
      </Routes>
    </Router>
  );
}

export default Navigation;
