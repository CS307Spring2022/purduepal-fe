import { React, useState } from "react";
import "./App.css";
import {
  Stack,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { VerticalNavbar } from "./components/VerticalNavbar";
import { Navbar } from "./components/Navbar";
import { Explore } from "./pages/Explore/Explore";
import { Profile } from "./pages/Profile/Profile";
import { SignIn } from "./pages/SignIn/SignIn";
import { CreatePost } from "./components/CreatePost";
import { SignUp } from "./pages/SignUp/SignUp";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";

import { getDesignTokens } from "./themes/Theme";
import { Saved } from "./pages/Saved/Saved";
import { Notications } from "./pages/Notifications/Notifications";
import { Settings } from "./pages/Settings/Settings";

function App() {
  const theme = createTheme(getDesignTokens("dark"));
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigation = matches ? <Navbar /> : <VerticalNavbar />;

  console.log(location.pathname);

  const [isSignedIn, setIsSignedIn] = useState(
    location.pathname !== "/" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/forgotPassword"
  ); //temporary till signin is actually implemented

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction={"row"}
        sx={{
          backgroundColor: theme.palette.background.default,
          maxWidth: "100vw",
        }}
      >
        {isSignedIn ? navigation : null}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/notifications" element={<Notications />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        {isSignedIn ? <CreatePost /> : null}
      </Stack>
    </ThemeProvider>
  );
}

export default App;
