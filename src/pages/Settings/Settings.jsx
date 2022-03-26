import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Stack, Snackbar, Alert } from "@mui/material";
import {url} from "../../ENV";

export const Settings = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    //request

    async function onSubmit() {
      const email = localStorage.getItem("email");
      localStorage.setItem("email","");
      const editedPerson = {
        email: email,
      };

      console.log(JSON.stringify(editedPerson));

      await fetch(`${url}/delete_user`, {
        method: "POST",
        body: JSON.stringify(editedPerson),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    onSubmit();
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
          <Typography sx={{ color: "text.secondary" }}>
            Delete your account and associated data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button onClick={handleClick}>Delete Account and Data</Button>
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
