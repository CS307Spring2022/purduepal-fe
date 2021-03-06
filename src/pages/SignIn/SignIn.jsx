import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { ReactComponent as Logo } from "./../../icons/logo.svg";
import { ReactComponent as Train } from "../../icons/trainSmall.svg";

import GlobalState from "../../contexts/GlobalStates";
import { url } from "../../ENV";

import "./SignIn.css";

const SignIn = () => {
  const theme = useTheme();
  const {isSignedIn, setIsSignedIn, userTheme, setUserTheme} = useContext(GlobalState);
  const navigate = useNavigate();

  // const [isSignedIn,setIsSignedIn] = isSignedInState;
  // const [userTheme,setUserTheme] = userThemeState;

  // console.log(isSignedIn);

  useEffect(() => {
    if (isSignedIn) {
      
      navigate("/home");
    }
  });

  const [loginStatus, setLoginStatus] = useState("");

  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");

  const [pass, setPass] = useState("");
  const [invalidPass, setInvalidPass] = useState(false);
  const [passErrMsg, setPassErrMsg] = useState("");

  // useEffect(() => {
  //   if (
  //     email.match(/[\w\d]+@([\w]*.)*purdue\.edu/) === null &&
  //     email.length !== 0
  //   ) {
  //     setInvalidEmail(true);
  //     setEmailErrMsg("Input must be a valid Purdue email");
  //   }
  // }, [email]);

  // useEffect(() => {
  //   if (
  //     email.match(/[\w\d]+@([\w]*.)*purdue\.edu/) !== null &&
  //     email.length > 0 &&
  //     emailErrMsg
  //   ) {
  //     setEmailErrMsg("");
  //     setInvalidEmail(false);
  //   }
  // }, [email, emailErrMsg]);

  useEffect(() => {
    if (pass.length > 0 && passErrMsg) {
      setPassErrMsg("");
      setInvalidPass(false);
    }
  }, [pass, passErrMsg]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    let valid = true;
    if (data.get("email").length === 0) {
      setEmailErrMsg("Email or Username is Required");
      setInvalidEmail(true);
      valid = false;
    }

    if (data.get("password").length === 0) {
      setPassErrMsg("Password is Required");
      setInvalidPass(true);
      valid = false;
    }

    if (!valid) {
      // alert("Invalid Data!");
      setLoginStatus("Login Failed! Check Email and Password!");
    } else {
      setLoginStatus("");
      async function onSubmit() {
        // const email = localStorage.getItem("email");
        const signInDetails = {
          email: data.get("email"),
          password: data.get("password"),
        };

        // console.log(JSON.stringify(signInDetails));

        const response = await fetch(`${url}/login`, {
          method: "POST",
          body: JSON.stringify(signInDetails),
          headers: {
            "Content-Type": "application/json",
          },
        });

        return response.json();
      }
      const loginSuccess = onSubmit().then((result) => {
        if (result["return_code"]) {
          localStorage.setItem("email", result["email"]);
          localStorage.setItem("username", result["username"]);
          localStorage.setItem("userTheme", result["darkMode"] ? "dark" : "light")
          setUserTheme(localStorage.getItem("userTheme"))
          // console.log(result["public"])
          localStorage.setItem("public",result["public"] ? "public" : "private")
          setIsSignedIn(true);
          // navigate('/home');
          navigate("/home");
          return true;
        }
        setLoginStatus("Login Failed! Check Email and Password!");
        setIsSignedIn(false);
        return false;
      });

      return loginSuccess;
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          display: ["none", "block", "block", "block", "block"],
          backgroundRepeat: "no-repeat",
          backgroundColor: theme.palette.background.default,
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          style={{
            marginTop: "10vh",
            textAlign: "center",
            color: theme.palette.primary.main,
          }}
        >
          PurduePAL
        </Typography>
        <div className="trainContainer">
          <Train />
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography
            component="p"
            variant="p"
            sx={{ color: theme.palette.error.main }}
          >
            {loginStatus}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address or Username"
              name="email"
              autoComplete="username"
              autoFocus
              error={invalidEmail}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailErrMsg}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={invalidPass}
              onChange={(e) => setPass(e.target.value)}
              helperText={passErrMsg}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid
              container
              justifyContent="center"
              sx={{ alignItems: "center", textAlign: "center" }}
            >
              <Grid item xs={6} sm={6} md={6}>
                <Link href="/purduepal-fe/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Link href="/purduepal-fe/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid item style={{ width: "100%" }} sx={{ mt: 3, mb: 2 }}>
                <Logo fill={theme.palette.primary.main} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
