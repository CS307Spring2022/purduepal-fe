import React from "react";
import "./App.css";
import { Stack, Fab, ThemeProvider, createTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NavBar } from "./components/Navbar";
import { Explore } from "./pages/Explore";
import { Profile } from "./pages/Profile";

function App() {
  const theme = createTheme({
    // palette values for dark mode
    palette: {
      primary: {
        main: "#DAAA00",
      },
      secondary: {
        main: "#6F727B",
      },
      background: {
        default: "#000000",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Stack direction={"row"} className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
