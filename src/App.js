import { useState, useEffect} from "react";
import "./App.css";
import {
  Stack,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { VerticalNavbar } from "./components/VerticalNavbar";
import { Navbar } from "./components/Navbar";
import { Explore } from "./pages/Explore/Explore";
import { Profile } from "./pages/Profile/Profile";
import { SignIn } from "./pages/SignIn/SignIn";
import { CreatePost } from "./components/CreatePost";
import { SignUp } from "./pages/SignUp/SignUp";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { PostThread } from "./pages/PostThread/PostThread";
import { TopicFeed } from "./pages/Explore/TopicFeed";

import { getDesignTokens } from "./themes/Theme";
import { Saved } from "./pages/Saved/Saved";
import { Notications } from "./pages/Notifications/Notifications";
import { Settings } from "./pages/Settings/Settings";

import GlobalState from "./contexts/GlobalStates";
import { Error404 } from "./components/404";

// export const UserContext = createContext();

function App() {
  const theme = createTheme(getDesignTokens("dark"));
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigation = matches ? <Navbar /> : <VerticalNavbar />;

  // console.log(location.pathname);

  // const [isSignedIn, setIsSignedIn] = useState(
  //   location.pathname !== "/" &&
  //     location.pathname !== "/signup" &&
  //     location.pathname !== "/forgotPassword"
  // ); //temporary till signin is actually implemented

  // console.log(localStorage.email);
  const [isOnPosts,setIsOnPosts] = useState(
    location.pathname === "/home" ||
    location.pathname.includes("postThread")
  )
  
  const [on404, setOn404] = useState(
    location.pathname === "/404"
  );

  useEffect(() => {
    setOn404(location.pathname==="/404");
    setIsOnPosts(location.pathname === "/home" ||
    location.pathname.includes("postThread"))
  },[location.pathname])

  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.email !== undefined
  )
  // const navigate = useNavigate()

  // if (isSignedIn) {
  //   navigate('/home')
  // }


  return (
    <GlobalState.Provider value={[isSignedIn, setIsSignedIn]}>
      <ThemeProvider theme={theme}>
        <Stack
          direction={"row"}
          sx={{
            backgroundColor: theme.palette.background.default,
            maxWidth: "100vw",
          }}
        >
          {isSignedIn && !on404 ? navigation : null}
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/topicFeed" element={<TopicFeed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/notifications" element={<Notications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/postThread" element={<PostThread/>} />
            <Route path="/404" element={<Error404/>} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
          {isSignedIn && isOnPosts && !on404 ? <CreatePost /> : null}
        </Stack>
      </ThemeProvider>
    </GlobalState.Provider>

  );
}

export default App;
