import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  styled,
  Container,
} from "@mui/material";
import PersonalInfoStep from "../../components/PersoalInfoStep/PersoalInfoStep";
import CardInfoStep from "../../components/CardInfoStep/CardInfoStep";
import SummaryStep from "../../components/SummeryStep/SummeryStep";
import Header from "../../components/Header/Header";

// Custom styles for the Stepper
const CustomStepper = styled(Stepper)(({ theme }) => ({
  "& .MuiStepIcon-root": {
    color: theme.palette.grey[400],
  },
  "& .Mui-active .MuiStepIcon-root": {
    color: "#6a1b9a",
  },
  "& .Mui-completed .MuiStepIcon-root": {
    color: "#6a1b9a",
  },
  "& .MuiStepIcon-text": {
    fill: "#fff",
  },
}));

const steps = ["Personal Information", "Library Card Information", "Summary"];
const stepDescriptions = [
  "Enter your personal details including name and email.",
  "Provide your library card details to proceed with borrowing.",
  "Review your information and confirm the borrowing of books.",
];

const BorrowedStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cart, setCart] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    fullName: "",
    cardNumber: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Retrieve borrowed books from localStorage
  const borrowedBooks = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  const validateStep = () => {
    let newErrors = {};
    if (activeStep === 0) {
      if (!formData.firstName) {
        newErrors.firstName = "First Name is required";
      }
      if (!formData.lastName) {
        newErrors.lastName = "Last Name is required";
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailPattern.test(formData.email)) {
        newErrors.email = "Valid Email is required";
      }
    } else if (activeStep === 1) {
      if (!formData.fullName) {
        newErrors.fullName = "Full Name is required";
      }
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Library Card Number is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      fullName: "",
      cardNumber: "",
    });
    setErrors({});
  };

  const handleFinish = () => {
    handleConfirmBorrow();
    handleReset();
  
  navigate("/history");
  };
  const handleConfirmBorrow = () => {
    const borrowingHistory =
      JSON.parse(localStorage.getItem("borrowingHistory")) || [];
    const newHistory = {
      date: new Date().toLocaleDateString(),
      books: borrowedBooks.map((book) => ({
        title: book.title,
        dueDate: book.returnDate,
        returned: false,
      })),
    };
    console.log("New history entry:", newHistory);
    borrowingHistory.push(newHistory);
    localStorage.setItem("borrowingHistory", JSON.stringify(borrowingHistory));
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
      <Header cartLength={cart.length} />{" "}
      <Box sx={{ width: "100%", padding: 2 }}>
        <CustomStepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </CustomStepper>
        <Box sx={{ marginTop: 3 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", fontSize: "20px" }}
            color="text.secondary"
            gutterBottom
          >
            {stepDescriptions[activeStep]}
          </Typography>
          {activeStep === 0 && (
            <PersonalInfoStep
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          )}
          {activeStep === 1 && (
            <CardInfoStep
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          )}
          {activeStep === 2 && (
            <SummaryStep formData={formData} borrowedBooks={borrowedBooks} />
          )}
          <Box sx={{ marginTop: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{ mr: 1, color: "black", borderColor: "black" }}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              ""
            ) : (
              <Button
                onClick={handleNext}
                variant="contained"
                sx={{ backgroundColor: "#6a1b9a", color: "white" }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default BorrowedStepper;
