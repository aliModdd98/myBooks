import { ThemeProvider } from "@mui/material";
import "./App.css";

import Navigation from "./router/navigation";
import theme from "./theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
