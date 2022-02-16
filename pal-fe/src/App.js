import { React, useState } from "react";
import "./App.css";
import { Stack, ThemeProvider, createTheme } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NavBar } from "./components/Navbar";
import { Explore } from "./pages/Explore/Explore";
import { Profile } from "./pages/Profile/Profile";
import { SignIn } from "./pages/SignIn/SignIn";
import { CreatePost } from "./components/CreatePost";
import { SignUp } from "./pages/SignUp/SignUp";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword"

import { getDesignTokens } from "./themes/Theme";

function App() {
  const theme = createTheme(getDesignTokens("dark"));
  const location = useLocation();

  console.log(location.pathname);

  const [isSignedIn, setIsSignedIn] = useState(location.pathname !== "/" && location.pathname !== "/signup" && location.pathname !== "/forgotPassword"); //temporary till signin is actually implemented

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction={"row"}
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        {isSignedIn ? <NavBar /> : null}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        {isSignedIn ? <CreatePost /> : null}
      </Stack>
    </ThemeProvider>
  );
}

export default App;
