import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { ReactComponent as Logo } from "./../../icons/logo.svg";
import { ReactComponent as Train } from "../../icons/trainSmall.svg";

import "./ForgotPassword.css";

export const ForgotPassword = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");

  useEffect(() => {
    if (
      email.match(/[\w\d]+@([\w]*.)*purdue\.edu/) === null &&
      email.length !== 0
    ) {
      setInvalidEmail(true);
      setEmailErrMsg("Input must be a valid Purdue email");
    }
  }, [email]);

  useEffect(() => {
    if (
      email.match(/[\w\d]+@([\w]*.)*purdue\.edu/) !== null &&
      email.length > 0 &&
      emailErrMsg
    ) {
      setEmailErrMsg("");
      setInvalidEmail(false);
    }
  }, [email, emailErrMsg]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    if (data.get("email").length === 0) {
      setEmailErrMsg("Email is Required");
      setInvalidEmail(true);
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
        <Link href="/purduepal-fe" underline="none">
          <Typography
            component="h1"
            variant="h3"
            style={{ marginTop: "10vh", textAlign: "center" }}
          >
            PurduePAL
          </Typography>
        </Link>
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
            Forgot Password
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
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={invalidEmail}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailErrMsg}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Recover Password
            </Button>
            <Grid
              container
              justifyContent="center"
              sx={{ alignItems: "center", textAlign: "center" }}
            >
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
