import { Button, Container, Grid, Typography, Box } from "@mui/material";
import Lottie from "lottie-react";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import bookAnimation from "./../../assets/book.json";
import { useNavigate } from "react-router";

const Welcome = () => {
  const navigate = useNavigate();

  const handleStartTrail = () => {
    navigate("/books");
  };
  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: { xs: "20px", sm: "40px" },
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto 20px auto",
            position: "relative",
          }}
        >
          <Lottie
            animationData={bookAnimation}
            loop={true}
            autoplay={true}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", sm: "3rem" },
            color: "#333",
          }}
        >
          📚 Welcome to the Booking Management System
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            fontSize: { xs: "1.25rem", sm: "1.75rem" },
            color: "#555",
          }}
        >
          Manage all your bookings with ease and efficiency.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" }, color: "#666" }}
        >
          Get started by exploring the available options.
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleStartTrail}
              startIcon={<LibraryBooksIcon />}
              endIcon={<RocketLaunchOutlinedIcon />}
              sx={{
                backgroundColor: "#7B1FA2",
                "&:hover": {
                  backgroundColor: "#7b1fa2c6",
                },
                padding: { xs: "10px 20px", sm: "12px 24px" },
                fontSize: { xs: "0.875rem", sm: "1rem" },
                borderRadius: "50px", // Rounded button
              }}
            >
              Start Your Trail
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Welcome;
