import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    // Custom styles for TextField
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "#9c27b0",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#9c27b0",
              borderWidth: 2,
              outerWidth: 0,
            },
          },
        },
      },
    },
    // Custom styles for Select
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ddd",
            },
            "&:hover fieldset": {
              borderColor: "#9c27b0",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#9c27b0",
              borderWidth: 2,
            },
          },
        },
      },
    },
    // Custom styles for Button
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5", // Default background color
          color: "#000", // Default text color
          "&:hover": {
            backgroundColor: "rgba(156, 39, 176, 0.2)",
            color: "#000", // Light purple background on hover
          },
        },
      },
    },
  },
});

export default theme;
