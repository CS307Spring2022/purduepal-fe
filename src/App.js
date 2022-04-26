import { useState, useEffect } from "react";
import "./App.css";
import {
  Stack,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import Home from "./pages/Home/Home";
import { VerticalNavbar } from "./components/VerticalNavbar";
import { Navbar } from "./components/Navbar";
// import Explore from "./pages/Explore/Explore";
// import { Profile } from "./pages/Profile/Profile";
// import SignIn from "./pages/SignIn/SignIn";
import { CreatePost } from "./components/CreatePost";
// import { SignUp } from "./pages/SignUp/SignUp";
// import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
// import { PostThread } from "./pages/PostThread/PostThread";
import { TopicFeed } from "./pages/Explore/TopicFeed";
import CircularProgress from "@mui/material/CircularProgress";

import { getDesignTokens } from "./themes/Theme";
// import { Saved } from "./pages/Saved/Saved";
// import { Notications } from "./pages/Notifications/Notifications";
// import { Settings } from "./pages/Settings/Settings";

import GlobalState from "./contexts/GlobalStates";
import { Error404 } from "./components/404";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home/Home"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const Explore = lazy(() => import("./pages/Explore/Explore"));
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);
const Notifications = lazy(() => import("./pages/Notifications/Notifications"));
const PostThread = lazy(() => import("./pages/PostThread/PostThread"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Saved = lazy(() => import("./pages/Saved/Saved"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
// export const UserContext = createContext();

function App() {
  let cachedTheme = localStorage.getItem("userTheme") 
  const [userTheme, setUserTheme] = useState(cachedTheme === undefined || cachedTheme === null ? "dark" : localStorage.getItem("userTheme"))
  const theme = createTheme(getDesignTokens(userTheme));
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
  const [isOnPosts, setIsOnPosts] = useState(
    location.pathname === "/home" || location.pathname.includes("postThread")
  );

  const [on404, setOn404] = useState(location.pathname === "/404");

  useEffect(() => {
    setOn404(location.pathname === "/404");
    setIsOnPosts(
      location.pathname === "/home" || location.pathname.includes("postThread")
    );
  }, [location.pathname]);

  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.email !== undefined
  );

  // const navigate = useNavigate()

  // if (isSignedIn) {
  //   navigate('/home')
  // }


  return (
    <GlobalState.Provider value={{isSignedIn, setIsSignedIn, userTheme,setUserTheme}}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<CircularProgress />}>
          <Stack
            direction={"row"}
            sx={{
              backgroundColor: theme.palette.background.default,
              maxWidth: "100vw",
            }}
          >
            {isSignedIn && !on404 ? navigation : null}
            <Routes>
              <Route caseSensitive path="/" element={<SignIn />} />
              <Route caseSensitive path="/signup" element={<SignUp />} />
              <Route caseSensitive path="/forgotPassword" element={<ForgotPassword />} />
              <Route caseSensitive path="/home" element={<Home />} />
              <Route caseSensitive path="/explore" element={<Explore />} />
              <Route caseSensitive path="/topicFeed" element={<TopicFeed />} />
              <Route caseSensitive path="/profile" element={<Profile />} />
              <Route caseSensitive path="/saved" element={<Saved />} />
              <Route caseSensitive path="/notifications" element={<Notifications />} />
              <Route caseSensitive path="/settings" element={<Settings />} />
              <Route caseSensitive path="/postThread" element={<PostThread />} />
              <Route caseSensitive path="/404" element={<Error404 />} />
              <Route caseSensitive path="*" element={<Navigate replace to="/404" />} />
            </Routes>
            {isSignedIn && isOnPosts && !on404 ? <CreatePost /> : null}
          </Stack>
        </Suspense>
      </ThemeProvider>
    </GlobalState.Provider>
  );
}

export default App;
