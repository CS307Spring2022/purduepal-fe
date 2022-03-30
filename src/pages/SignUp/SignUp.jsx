import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { ReactComponent as Logo } from "./../../icons/logo.svg";
import { ReactComponent as Train } from "../../icons/trainSmall.svg";

import { useNavigate } from "react-router-dom";

import { url } from "../../ENV";

// import { MostCommonPasswords } from "../../utils/MostCommonPasswords";

import "./SignUp.css";

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [signUpStatus,setSignUpStatus] = useState("");
  const [signUpSuccess,setSignUpSuccess] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState("");

  const [lastName, setLastName] = useState("");
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [lastNameErrMsg, setLastNameErrMsg] = useState("");

  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");

  const [username, setUsername] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [usernameErrMsg, setUsernameErrMsg] = useState("");

  const [pass, setPass] = useState("");
  const [invalidPass, setInvalidPass] = useState(false);
  const [passErrMsg, setPassErrMsg] = useState("");

  const [confirmPass, setConfirmPass] = useState("");
  const [invalidConfirmPass, setInvalidConfirmPass] = useState(false);
  const [confirmPassErrMsg, setConfirmPassErrMsg] = useState("");
  
  // const [isCommonPass, setIsCommonPass] =useState(false);


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

  useEffect(() => {
    
    const uppercaseRegex = /[A-Z]+/;
    const digitRegex = /\d+/;
    const specialCharacterRegex = /[~`!@#$%^&*()_+={}[\]|\\/\-<,>.?;:"']+/;
    const MIN_PASS_LENGTH = 8;

    if (firstName.length > 0 && firstNameErrMsg) {
      setFirstNameErrMsg("");
      setInvalidFirstName(false);
    }

    if (lastName.length > 0 && lastNameErrMsg) {
      setLastNameErrMsg("");
      setInvalidLastName(false);
    }

    if (username.length > 0 && usernameErrMsg) {
      setUsernameErrMsg("");
      setInvalidUsername(false);
    }

    if (pass.length >= MIN_PASS_LENGTH && 
        pass.match(uppercaseRegex) !== null &&
        pass.match(digitRegex) !== null &&
        pass.match(specialCharacterRegex) !== null &&
        passErrMsg) {
      setPassErrMsg("");
      setInvalidPass(false);
    } else if (pass.length > 0) {
      if (pass.length < MIN_PASS_LENGTH ||
          pass.match(uppercaseRegex) === null ||
          pass.match(digitRegex) === null ||
          pass.match(specialCharacterRegex) === null) {
        setPassErrMsg("Password is too weak: Ensure at least:\n 1 uppercase letters\n 2 digits\n 1 special character\n 8 characters in total\n");
        setInvalidPass(true);
      }
    }

    if (confirmPass.length > 0) {
      if (confirmPass !== pass) {
        setConfirmPassErrMsg("Passwords Do Not Match!");
        setInvalidConfirmPass(true);
      } else {
        setConfirmPassErrMsg("");
        setInvalidConfirmPass(false);
      }
    }
  }, [firstName, firstNameErrMsg, lastName, lastNameErrMsg,
      username, usernameErrMsg, pass, passErrMsg,confirmPass,confirmPassErrMsg]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let valid = !(invalidFirstName || invalidLastName || invalidEmail || invalidUsername || invalidPass || invalidConfirmPass);

    if (!valid) {
      alert("Form data Invalid!");
      return;
    }

    if (data.get("firstName").length === 0) {
      setFirstNameErrMsg("First Name is Required");
      setInvalidFirstName(true);
      valid = false;
    }

    if (data.get("lastName").length === 0) {
      setLastNameErrMsg("Last Name is Required");
      setInvalidLastName(true);
      valid = false;
    }

    if (data.get("username").length === 0) {
      setUsernameErrMsg("Username is Required");
      setInvalidUsername(true);
      valid = false;
    }

    if (data.get("email").length === 0) {
      setEmailErrMsg("Email is Required");
      setInvalidEmail(true);
      valid = false;
    }
    // const standardizedPass = data.get("password").toLowerCase();
    // const isCommon = MostCommonPasswords.has(standardizedPass) || MostCommonPasswords.has(data.get("password"));
    // console.log(data.get("password"),isCommon);
    if (data.get("password").length === 0) {
      setPassErrMsg("Password is Required");
      setInvalidPass(true);
      valid = false;
    }

    if (data.get("confirmPassword").length === 0) {
      setConfirmPassErrMsg("Confim Password is Required")
      setInvalidConfirmPass(true);
      valid = false;
    }

    if (!valid) {
      alert("Form data Invalid!!");
    } else {
      async function onSubmit() {

        // const email = localStorage.getItem("email");
        const signInDetails = {
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          username: data.get("username"),
          password: data.get("password"),
          confirmPassword: data.get("confirmPassword")
        };
  
        console.log(JSON.stringify(signInDetails));
  
        const response = await fetch(`${url}/sign_up`, {
          method: "POST",
          body: JSON.stringify(signInDetails),
          headers: {
            "Content-Type": "application/json",
          },
        });

        return response.json()
      }

      function sleep(delay) {
        return new Promise( res => setTimeout(res, delay) );
      }
      async function handleResponse(result) {
        console.log(result)
        if (result['return_code']) {
          setSignUpSuccess(true);
          setSignUpStatus("Signup Successful! Redirecting to Login Page shortly...");
          await sleep(1200);
          navigate("/");
          setSignUpStatus("");
          setSignUpSuccess(false);
        } else {
          if (result['msg'] === "Email in Use!" || result['msg'] === "Username Taken! Please Choose Another.") {
            setSignUpSuccess(false);
            setSignUpStatus(result["msg"])
          } else {
            setSignUpSuccess(false);
            setSignUpStatus("We've Encountered an Error! Sorry, please try again at a later time.")
          }
        }
      }

      const signUpResponse = onSubmit().then(result => {
        handleResponse(result);
      });
      return signUpResponse;
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
          style={{ marginTop: "10vh", textAlign: "center", color: theme.palette.primary.main }}
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
            <PermIdentityOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Typography component="p" variant="p" color={signUpSuccess ? theme.palette.success.main : theme.palette.error.main}>
            {signUpStatus}
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
              id="FirstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              error={invalidFirstName}
              onChange={(e) => setFirstName(e.target.value)}
              helperText={firstNameErrMsg}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="LastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              error={invalidLastName}
              onChange={(e) => setLastName(e.target.value)}
              helperText={lastNameErrMsg}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={invalidEmail}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailErrMsg}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              error={invalidUsername}
              onChange={(e) => setUsername(e.target.value)}
              helperText={usernameErrMsg}
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
              onChange={(e) => {setPass(e.target.value)}}
              helperText={passErrMsg}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              error={invalidConfirmPass}
              onChange={(e) => {setConfirmPass(e.target.value)}}
              helperText={confirmPassErrMsg}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid
              container
              justifyContent="center"
              sx={{ alignItems: "center", textAlign: "center" }}
            >
              <Grid item xs={6} sm={6} md={6}>
                <Link href="/purduepal-fe" variant="body2">
                  {"Have An Account? Sign In!"}
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

export default SignUp;