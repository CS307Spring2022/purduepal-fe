import { useState, useContext, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Stack, Snackbar, Alert } from "@mui/material";

import { useNavigate, Navigate } from "react-router-dom";

import GlobalState from "../../contexts/GlobalStates";
import { url } from "../../ENV";

const Settings = () => {
  const navigate = useNavigate();
  const { isSignedIn, setIsSignedIn, userTheme, setUserTheme } =
    useContext(GlobalState);

  const [expanded, setExpanded] = useState(false);

  const handleLogoutClick = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    setIsSignedIn(false);
    navigate("/");
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [open, setOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(
    localStorage.getItem("public") === "public"
  );

  const [openPublic, setOpenPublic] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem("public",isPublic);
  // },[isPublic])

  const handlePublicClick = () => {
    const publicObj = {
      email: localStorage.getItem("email"),
      public: localStorage.getItem("public") === "public",
    };
    async function onPublic() {
      setOpenPublic(true);
      await fetch(`${url}/updatePublic`, {
        method: "POST",
        body: JSON.stringify(publicObj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setIsPublic(!isPublic);
      let curStat = localStorage.getItem("public");
      localStorage.setItem(
        "public",
        curStat === "public" ? "private" : "public"
      );
      setIsPublic(localStorage.getItem("public") === "public");
    }
    onPublic();
  };

  useEffect(() => {
    localStorage.setItem("userTheme", userTheme);
  }, [userTheme]);

  const handleThemeClick = () => {
    setUserTheme(userTheme === "dark" ? "light" : "dark");
  };

  const handleDeleteClick = () => {
    setOpen(true);
    //request

    async function onSubmit() {
      const email = localStorage.getItem("email");
      localStorage.setItem("email", "");
      const editedPerson = {
        email: email,
      };

      // console.log(JSON.stringify(editedPerson));

      await fetch(`${url}/delete_user`, {
        method: "POST",
        body: JSON.stringify(editedPerson),
        headers: {
          "Content-Type": "application/json",
        },
      });

      handleLogoutClick();
    }
    onSubmit();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenPublic(false);
  };

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Stack
      justifyContent={"start"}
      alignItems={"center"}
      width="100%"
      mt={3}
      ml={{ xs: 0, sm: "110px", md: "240px", lg: "240px" }}
      height="100%"
      minHeight="100vh"
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ width: "95%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Account Settings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button onClick={handleLogoutClick}>Logout</Button>
          <Button onClick={handleDeleteClick}>Delete Account and Data</Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {`Account Deleted :(`}
            </Alert>
          </Snackbar>
        </AccordionDetails>

        <AccordionDetails>
          <Button onClick={handlePublicClick}>
            Make Account {!isPublic ? "Public" : "Private"}
          </Button>
          <Snackbar
            open={openPublic}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {localStorage.getItem("public") !== "public" ? "Account is Private now" : "Account is Public now"}
            </Alert>
          </Snackbar>
          <Button onClick={handleThemeClick}>
            Switch To {userTheme === "dark" ? "light" : "dark"} Theme
          </Button>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {`Account Deleted :(`}
            </Alert>
          </Snackbar>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default Settings;
